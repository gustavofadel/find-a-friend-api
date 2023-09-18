import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ViewPetDetailsUseCaseRequest {
  petId: string
}

interface ViewPetDetailsUseCaseResponse {
  pet: Pet
}

export class ViewPetDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: ViewPetDetailsUseCaseRequest): Promise<ViewPetDetailsUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
