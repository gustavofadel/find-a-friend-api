import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exists-error'
import { makeRegisterOrganizationUseCase } from '@/use-cases/factories/make-register-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerOrganization(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const ZIP_CODE_REGEX = /^[0-9]{5}-?[0-9]{3}$/

  const registerBodySchema = z.object({
    caretaker_name: z.string(),
    email: z.string().email(),
    zip_code: z.string().refine((value) => ZIP_CODE_REGEX.test(value)),
    address: z.string(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
    phone: z.string(),
    password: z.string().min(6),
  })

  const {
    caretaker_name,
    email,
    zip_code,
    address,
    latitude,
    longitude,
    phone,
    password,
  } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterOrganizationUseCase()

    await registerUseCase.execute({
      caretaker_name,
      email,
      zip_code,
      address,
      latitude,
      longitude,
      phone,
      password,
    })
  } catch (err) {
    if (err instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
