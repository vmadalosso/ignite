import { View, Text, FlatList, Alert, TextInput } from 'react-native'
import { useRef, useState } from 'react'
import uuid from 'react-native-uuid'

import { Header } from '@/components/Header'
import { Task } from '@/components/Task'
import { Empty } from '@/components/Empty'
import { TaskDTO } from '@/utils/TaskDTO'

import '@/styles/global.css'

export function Home() {
  const [tasks, setTasks] = useState<TaskDTO[]>([
    // { id: '1', isCompleted: true, title: 'Jogar no Tigrinho' },
    // { id: '2', isCompleted: false, title: 'Pegar dinheiro com Agiota' },
    // { id: '3', isCompleted: false, title: 'Virar Dev' },
  ])
  const [newTask, setNewTask] = useState('')
  const inputRef = useRef<TextInput>(null)

  function handleTaskAdd() {
    if (newTask !== '' && newTask.length >= 5) {
      setTasks((tasks) => [
        ...tasks,
        { id: String(uuid.v4()), isCompleted: false, title: newTask.trim() },
      ])
      setNewTask('')
      inputRef.current?.blur()
    }
  }

  function handleTaskDone(id: string) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    )
  }

  function handleTaskDelete(id: string) {
    Alert.alert('Excluir tarefa', 'Deseja excluir essa tarefa?', [
      {
        text: 'Sim',
        style: 'default',
        onPress: () =>
          setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)),
      },
      {
        text: 'Não',
        style: 'cancel',
      },
    ])
  }

  const totalTasksCreated = tasks.length
  const totalTasksCompleted = tasks.filter(
    ({ isCompleted }) => isCompleted,
  ).length

  return (
    <View className="flex-1 bg-gray-600">
      <Header
        inputRef={inputRef}
        task={newTask}
        onChangeText={setNewTask}
        onPress={handleTaskAdd}
      />
      <View className="flex-1 mt-14 mx-6">
        <View className="flex-row items-center justify-between px-2 mb-5">
          <View className="flex-row items-center">
            <Text className="text-blue font-bold text-md">Criadas</Text>
            <View className="bg-gray-400 w-6 h-5 rounded-full items-center justify-center ml-2">
              <Text className="text-gray-200 text-sm font-bold">
                {totalTasksCreated}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center">
            <Text className="text-purple font-bold text-md">Concluídas</Text>
            <View className="bg-gray-400 w-6 h-5 rounded-full items-center justify-center ml-2">
              <Text className="text-gray-200 text-sm font-bold">
                {totalTasksCompleted}
              </Text>
            </View>
          </View>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(tasks) => tasks.id}
          renderItem={({ item }) => (
            <Task
              key={item.id}
              onTaskDone={() => handleTaskDone(item.id)}
              onTaskDelete={() => handleTaskDelete(item.id)}
              {...item}
            />
          )}
          ListEmptyComponent={<Empty />}
        />
      </View>
    </View>
  )
}
