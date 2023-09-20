import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exists-error'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    about: z.string().nullable(),
    age: z.string(),
    size: z.string(),
    energy: z.string(),
    independence: z.string(),
    ambient: z.string(),
    pictures: z.array(z.string().url()),
    requirements: z.array(z.string()),
  })

  const {
    name,
    about,
    age,
    size,
    energy,
    independence,
    ambient,
    pictures,
    requirements,
  } = registerBodySchema.parse(request.body)

  try {
    const registerPetUseCase = makeRegisterPetUseCase()

    await registerPetUseCase.execute({
      organizationId: request.user.sub,
      name,
      about,
      age,
      size,
      energy,
      independence,
      ambient,
      pictures,
      requirements,
    })
  } catch (err) {
    if (err instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
