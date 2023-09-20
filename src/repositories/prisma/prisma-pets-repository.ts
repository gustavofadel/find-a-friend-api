import { prisma } from '@/lib/prisma'
import { Organization, Pet, Prisma } from '@prisma/client'
import { FindManyParams, PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findManyByOrganizations(organizations: Organization[]) {
    const organizationsIds = organizations.map(
      (organization) => organization.id,
    )

    const pets = await prisma.pet.findMany({
      where: {
        organization_id: {
          in: organizationsIds,
        },
      },
    })

    return pets
  }

  async filterPets(pets: Pet[], params: FindManyParams) {
    return pets.filter((item) => {
      let passesFilters = true

      if (params.age && params.age !== item.age) {
        passesFilters = false
      }

      if (params.energy && params.energy !== item.energy) {
        passesFilters = false
      }

      if (params.size && params.size !== item.size) {
        passesFilters = false
      }

      if (params.independence && params.independence !== item.independence) {
        passesFilters = false
      }

      return passesFilters
    })
  }
}
