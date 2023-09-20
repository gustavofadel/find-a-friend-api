import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { fetch } from './fetch'
import { registerPet } from './register'
import { viewDetails } from './view-details'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets', fetch)
  app.get('/pets/:petId', viewDetails)

  /** Authenticated */
  app.post('/organizations/pets', { onRequest: [verifyJWT] }, registerPet)
}
