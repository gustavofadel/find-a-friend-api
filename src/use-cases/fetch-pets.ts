import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchPetsUseCaseRequest {
  city: string
  age?: string | null
  energy?: string | null
  size?: string | null
  independence?: string | null
}

interface FetchPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    city,
    age,
    energy,
    size,
    independence,
  }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    const organizations =
      await this.organizationsRepository.findManyByCity(city)

    if (!organizations) {
      throw new ResourceNotFoundError()
    }

    let pets = await this.petsRepository.findManyByOrganizations(organizations)

    if (!pets) {
      throw new ResourceNotFoundError()
    }

    pets = await this.petsRepository.filterPets(pets, {
      age,
      energy,
      independence,
      size,
    })

    return {
      pets,
    }
  }
}
