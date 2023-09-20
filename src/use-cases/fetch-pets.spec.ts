import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchPetsUseCase } from './fetch-pets'

let organizationsRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let sut: FetchPetsUseCase

describe('Fetch Pets Use Case', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsUseCase(organizationsRepository, petsRepository)

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

    await organizationsRepository.create({
      id: 'organization-02',
      caretaker_name: 'Jane Doe',
      email: 'janedoe@example.com',
      zip_code: '00000-000',
      address: 'Avenida C, 0000, Bairro D, Belém - PA',
      latitude: -1.400024,
      longitude: -48.4448369,
      phone: '(00) 00000-0000',
      password_hash: await hash('123456', 6),
    })

    await petsRepository.create({
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

    await petsRepository.create({
      organization_id: 'organization-02',
      name: 'Max',
      about:
        'Max é um cachorro simpático e amigável que adora fazer novos amigos. Ele é um companheiro leal e está sempre pronto para brincar e receber carinho.',
      age: 'Adulto',
      size: 'Grande',
      energy: 'Média',
      independence: 'Médio (precisa de companhia só de vez em quando)',
      ambient: 'Ambiente amplo',
      pictures: [
        'https://www.petlove.com.br/images/breeds/193103/profile/original/pastor_alemao-p.jpg?1532539270',
      ],
      requirements: [
        'Local grande para o animal para o animal correr e brincar',
        'Treinamento básico para boas maneiras',
      ],
    })
  })

  it('should be able to fetch pets by city', async () => {
    const { pets } = await sut.execute({
      city: 'Belém - PA',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Max' })])
  })

  it('should be able to filter pets by age', async () => {
    const { pets } = await sut.execute({
      city: 'Manaus - AM',
      age: 'Filhote',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Alfredo' })])
  })

  it('should be able to filter pets by size', async () => {
    const { pets } = await sut.execute({
      city: 'Manaus - AM',
      size: 'Pequenino',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Alfredo' })])
  })

  it('should be able to filter pets by energy', async () => {
    const { pets } = await sut.execute({
      city: 'Manaus - AM',
      energy: 'Muita',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Alfredo' })])
  })

  it('should be able to filter pets by independence', async () => {
    const { pets } = await sut.execute({
      city: 'Manaus - AM',
      independence: 'Baixo (precisa de companhia sempre)',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Alfredo' })])
  })

  it('should be able to fetch pets by all filters', async () => {
    const { pets } = await sut.execute({
      city: 'Manaus - AM',
      age: 'Filhote',
      size: 'Pequenino',
      energy: 'Muita',
      independence: 'Baixo (precisa de companhia sempre)',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Alfredo' })])
  })
})
