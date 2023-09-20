import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { registerPet } from './register'
import { viewDetails } from './view-details'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:petId', viewDetails)

  /** Authenticated */
  app.post('/organizations/pets', { onRequest: [verifyJWT] }, registerPet)
}
