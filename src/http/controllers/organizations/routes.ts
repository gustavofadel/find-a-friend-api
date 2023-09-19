import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { registerOrganization } from './register'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organizations', registerOrganization)
  app.post('/sessions', authenticate)
}
