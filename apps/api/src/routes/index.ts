import { FastifyInstance } from 'fastify'

// Register all route modules here as they are built
export async function registerRoutes(app: FastifyInstance) {
  // TODO: auth, content, review, user routes
  app.log.info('Routes registered')
}
