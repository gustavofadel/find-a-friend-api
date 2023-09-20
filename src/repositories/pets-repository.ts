import { Organization, Pet, Prisma } from '@prisma/client'

export interface FindManyParams {
  age?: string | null
  energy?: string | null
  size?: string | null
  independence?: string | null
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  filterPets(pets: Pet[], params: FindManyParams): Promise<Pet[]>
  findManyByOrganizations(organizations: Organization[]): Promise<Pet[]>
}
