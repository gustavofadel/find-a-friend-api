import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrganizationUseCase } from './create-organization'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: CreateOrganizationUseCase

describe('Create Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new CreateOrganizationUseCase(organizationsRepository)
  })

  it('should be able to register', async () => {
    const { organization } = await sut.execute({
      caretaker_name: 'John Doe',
      email: 'johndoe@example.com',
      zip_code: '00000-000',
      latitude: -3.0747256,
      longitude: -60.0087278,
      phone: '(00) 00000-0000',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { organization } = await sut.execute({
      caretaker_name: 'John Doe',
      email: 'johndoe@example.com',
      zip_code: '00000-000',
      latitude: -3.0747256,
      longitude: -60.0087278,
      phone: '(00) 00000-0000',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      organization.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      caretaker_name: 'John Doe',
      email,
      zip_code: '00000-000',
      latitude: -3.0747256,
      longitude: -60.0087278,
      phone: '(00) 00000-0000',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        caretaker_name: 'John Doe',
        email,
        zip_code: '00000-000',
        latitude: -3.0747256,
        longitude: -60.0087278,
        phone: '(00) 00000-0000',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })
})
