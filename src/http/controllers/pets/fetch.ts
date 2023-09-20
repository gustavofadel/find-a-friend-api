import { makeFetchPetsUseCase } from '@/use-cases/factories/make-fetch-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetsQuerySchema = z.object({
    city: z.string(),
    age: z.string().optional(),
    energy: z.string().optional(),
    size: z.string().optional(),
    independence: z.string().optional(),
  })

  const queryParams = fetchPetsQuerySchema.parse(request.query)

  const fetchPetsUseCase = makeFetchPetsUseCase()

  const { pets } = await fetchPetsUseCase.execute(queryParams)

  return reply.status(200).send({
    pets,
  })
}
