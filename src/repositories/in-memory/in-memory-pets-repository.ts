import { Organization, Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about ?? null,
      age: data.age,
      size: data.size,
      energy: data.energy,
      independence: data.independence,
      ambient: data.ambient,
      pictures: data.pictures as string[],
      requirements: data.requirements as string[],
      created_at: new Date(),
      organization_id: data.organization_id,
    }

    this.items.push(pet)

    return pet
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findManyByOrganizations(organizations: Organization[]) {
    const organizationsIds = organizations.map(
      (organization) => organization.id,
    )

    return this.items.filter((item) =>
      organizationsIds.includes(item.organization_id),
    )
  }
}
