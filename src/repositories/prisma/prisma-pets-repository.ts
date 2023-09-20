import { prisma } from '@/lib/prisma'
import { Organization, Prisma } from '@prisma/client'
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

  async findMany(params: FindManyParams) {
    const query: any = {}

    if (params.age) {
      query.age = params.age
    }

    if (params.energy) {
      query.energy = params.energy
    }

    if (params.independence) {
      query.independence = params.independence
    }

    if (params.size) {
      query.size = params.size
    }

    const pets = await prisma.pet.findMany({
      where: {
        ...query,
      },
    })

    return pets
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
}
