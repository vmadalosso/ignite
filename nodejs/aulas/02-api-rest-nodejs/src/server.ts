import { app } from './app'

// Converte o valor de PORT para número, se não estiver definido, usa 4000 como padrão
const PORT = Number(process.env.PORT) || 4000

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log(`HTTP Server Running on port ${PORT}!`)
  })
  .catch((err) => {
    console.error('Error starting the server:', err)
    process.exit(1)
  })
