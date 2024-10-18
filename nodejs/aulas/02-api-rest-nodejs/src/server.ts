import { env } from './env'
import { app } from './app'

const PORT = env.PORT

app
  .listen({
    port: PORT,
  })
  .then(() => {
    console.log(`HTTP Server Running on port ${PORT}!`)
  })
  .catch((err) => {
    console.error('Error starting the server:', err)
  })
