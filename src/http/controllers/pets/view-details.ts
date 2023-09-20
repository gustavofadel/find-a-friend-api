import { makeViewPetDetailsUseCase } from '@/use-cases/factories/make-view-pet-details-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function viewDetails(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const viewPetDetailsParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = viewPetDetailsParamsSchema.parse(request.params)

  const viewPetDetails = makeViewPetDetailsUseCase()

  const { pet } = await viewPetDetails.execute({
    petId,
  })

  return reply.status(200).send({
    pet,
  })
}
