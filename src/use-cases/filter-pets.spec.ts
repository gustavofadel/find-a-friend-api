import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { FilterPetsUseCase } from './filter-pets'

let organizationsRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let sut: FilterPetsUseCase

describe('Filter Pets Use Case', () => {
  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new FilterPetsUseCase(petsRepository)

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
      organization_id: 'organization-01',
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

  it('should be able to filter a pet by age', async () => {
    const { pets } = await sut.execute({
      age: 'Filhote',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Alfredo' })])
  })

  it('should be able to filter a pet by size', async () => {
    const { pets } = await sut.execute({
      size: 'Pequenino',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Alfredo' })])
  })

  it('should be able to filter a pet by energy', async () => {
    const { pets } = await sut.execute({
      energy: 'Muita',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Alfredo' })])
  })

  it('should be able to filter a pet by independence', async () => {
    const { pets } = await sut.execute({
      independence: 'Baixo (precisa de companhia sempre)',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Alfredo' })])
  })

  it('should be able to filter a pet by all filters', async () => {
    const { pets } = await sut.execute({
      age: 'Filhote',
      size: 'Pequenino',
      energy: 'Muita',
      independence: 'Baixo (precisa de companhia sempre)',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Alfredo' })])
  })
})
