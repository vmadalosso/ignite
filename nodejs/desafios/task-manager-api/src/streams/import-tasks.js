import fs from 'node:fs'
import { parse } from 'csv-parse'

const csvFilePath = new URL('./tasks.csv', import.meta.url) // Este caminho deve permanecer o mesmo, já que está sendo referenciado a partir de streams/import-tasks.js

async function importTasks() {
  const parser = fs.createReadStream(csvFilePath)
    .pipe(parse({ columns: true })) // Lê o CSV como um objeto com cabeçalho
    .on('error', error => {
      console.error('Error reading CSV:', error.message)
    })

  // Pular a primeira linha (cabeçalho) e iterar sobre cada linha
  for await (const record of parser) {
    const { title, description } = record

    try {
      const response = await fetch('http://localhost:3333/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      })

      if (response.ok) {
        const responseBody = await response.text()

        if (responseBody) {
          const json = JSON.parse(responseBody)
          console.log(`Task imported: ${title}, Response:`, json)
        } else {
          console.log(`Task imported: ${title}, but response body is empty`)
        }
      } else {
        console.error(`Failed to import task: ${title}. Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error making request:', error.message)
    }
  }
}

importTasks()
