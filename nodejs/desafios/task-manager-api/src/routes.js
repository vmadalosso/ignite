import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query

      const tasks = database.select('tasks', search ? {
        title: search,
        description: search,
      } : null)

      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date()
      }

      database.insert('tasks', task)

      return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      // Verifica se a task existe
      const tasks = database.select('tasks')
      const taskIndex = tasks.findIndex(task => task.id == id)

      if (taskIndex === -1) {
        return res.writeHead(404).end(JSON.stringify({ error: 'Task not found' }))
      }

      // Obter a tarefa atual
      const taskToUpdate = tasks[taskIndex]

      // Define um objeto para armazenar as atualizações
      const updates = {}

      if (title) {
        taskToUpdate.title = title
      }

      if (description) {
        taskToUpdate.description = description
      }

      // Atualiza a data de alteração
      taskToUpdate.updated_at = new Date().toISOString()

      //Persistindo a task atualizada no banco de dados
      database.update('tasks', id, updates)

      return res.writeHead(200).end(JSON.stringify(taskToUpdate))
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params

      const task = database.select('tasks').find(task => task.id == id)

      if (!task) {
        return res.writeHead(404).end(JSON.stringify({ error: 'Task not found' }))
      }

      task.completed_at = new Date()
      task.updated_at = new Date()

      database.update('tasks', id, task)

      return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      database.delete('tasks', id)

      return res.writeHead(204).end()
    }
  }
]