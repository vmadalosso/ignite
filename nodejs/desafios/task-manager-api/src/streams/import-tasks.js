import fs from 'node:fs'
import { parse } from 'csv-parse'
import { request } from 'node:http'

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

    // Fazendo a requisição POST para /tasks
    const req = request(
      {
        hostname: 'localhost', // O hostname do seu servidor
        port: 3333, // A porta do seu servidor
        path: '/tasks',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      (res) => {
        let body = ''
        res.on('data', chunk => {
          body += chunk
        })
        res.on('end', () => {
          console.log(`Task imported: ${title}, Response: ${body}`)
        })
      }
    )

    req.on('error', (error) => {
      console.error('Error making request:', error.message)
    })

    // Enviando o corpo da requisição
    req.write(JSON.stringify({ title, description }))
    req.end()
  }
}

importTasks()
