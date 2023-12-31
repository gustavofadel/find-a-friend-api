import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { ViewPetDetailsUseCase } from './view-pet-details'

let organizationsRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let sut: ViewPetDetailsUseCase

describe('View Pet Details Use Case', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new ViewPetDetailsUseCase(petsRepository)

    await organizationsRepository.create({
      id: 'organization-01',
      caretaker_name: 'John Doe',
      email: 'johndoe@example.com',
      zip_code: '00000-000',
      address: 'Avenida A, 0000, Bairro B, Manaus - AM',
      latitude: -3.0747256,
      longitude: -60.0087278,
      phone: '(00) 00000-0000',
      password_hash: await hash('123456', 6),
    })

    await petsRepository.create({
      id: 'pet-01',
      organization_id: 'organization-01',
      name: 'Alfredo',
      about:
        'Eu sou um lindo doguinho de 3 anos, um jovem brincalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
      age: 'Filhote',
      size: 'Pequenino',
      energy: 'Muita',
      independence: 'Baixo (precisa de companhia sempre)',
      ambient: 'Ambiente amplo',
      pictures: [
        'https://static.wixstatic.com/media/nsplsh_89781f5a24c94051b61b06d633273eaf~mv2.jpg/v1/fill/w_450,h_450,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/nsplsh_89781f5a24c94051b61b06d633273eaf~mv2.jpg',
      ],
      requirements: [
        'Local grande para o animal para o animal correr e brincar',
        'Proibido apartamento',
        'Ambiente frio, pois possui muito pelo',
        'Cão com intolerância a lactose',
      ],
    })
  })

  it('should be able to view pet details', async () => {
    const { pet } = await sut.execute({
      petId: 'pet-01',
    })

    expect(pet).toEqual(expect.objectContaining({ name: 'Alfredo' }))
  })
})
