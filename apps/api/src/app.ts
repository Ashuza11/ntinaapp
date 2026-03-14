import Fastify from 'fastify'

const app = Fastify({
  logger: {
    level: process.env.NODE_ENV === 'test' ? 'silent' : 'info',
  },
})

// Health check
app.get('/health', async () => ({
  status: 'ok',
  service: 'ntina-api',
  timestamp: new Date().toISOString(),
}))

export default app
