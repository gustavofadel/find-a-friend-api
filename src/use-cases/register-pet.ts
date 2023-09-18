import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface RegisterPetUseCaseRequest {
  organizationId: string
  name: string
  about: string | null
  age: string
  size: string
  energy: string
  independence: string
  ambient: string
  pictures: string[]
  requirements: string[]
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    organizationId,
    name,
    about,
    age,
    size,
    energy,
    independence,
    ambient,
    pictures,
    requirements,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const organization =
      await this.organizationsRepository.findById(organizationId)

    if (!organization) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy,
      independence,
      ambient,
      pictures,
      requirements,
      organization_id: organizationId,
    })

    return {
      pet,
    }
  }
}
