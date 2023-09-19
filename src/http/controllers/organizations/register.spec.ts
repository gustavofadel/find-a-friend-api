import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Organization (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register an organization', async () => {
    const response = await request(app.server).post('/organizations').send({
      caretaker_name: 'John Doe',
      email: 'johndoe@example.com',
      zip_code: '00000-000',
      address: 'Avenida A, 0000, Bairro B, Manaus - AM',
      latitude: -3.0747256,
      longitude: -60.0087278,
      phone: '(00) 00000-0000',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
