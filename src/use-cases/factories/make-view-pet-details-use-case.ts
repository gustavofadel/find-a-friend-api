import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { ViewPetDetailsUseCase } from '../view-pet-details'

export function makeViewPetDetailsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const viewPetDetailsUseCase = new ViewPetDetailsUseCase(petsRepository)

  return viewPetDetailsUseCase
}
