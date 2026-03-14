import app from './app'

const PORT = parseInt(process.env.PORT ?? '3001', 10)
const HOST = process.env.HOST ?? '0.0.0.0'

const start = async () => {
  try {
    await app.listen({ port: PORT, host: HOST })
    console.log(`Ntina API running at http://${HOST}:${PORT}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
