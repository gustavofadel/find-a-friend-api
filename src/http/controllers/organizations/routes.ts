import { FastifyInstance } from 'fastify'
import { registerOrganization } from './register'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organizations', registerOrganization)
}
