import { makeFetchPetsUseCase } from '@/use-cases/factories/make-fetch-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetsQuerySchema = z.object({
    city: z.string(),
    age: z.string().nullable(),
    energy: z.string().nullable(),
    size: z.string().nullable(),
    independence: z.string().nullable(),
  })

  const { city, age, energy, size, independence } = fetchPetsQuerySchema.parse(
    request.query,
  )

  const fetchPetsUseCase = makeFetchPetsUseCase()

  const { pets } = await fetchPetsUseCase.execute({
    city,
    age,
    energy,
    size,
    independence,
  })

  return reply.status(200).send({
    pets,
  })
}
