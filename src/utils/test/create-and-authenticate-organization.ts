import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrganization(app: FastifyInstance) {
  await prisma.organization.create({
    data: {
      caretaker_name: 'John Doe',
      email: 'johndoe@example.com',
      zip_code: '00000-000',
      address: 'Avenida A, 0000, Bairro B, Manaus - AM',
      latitude: -3.0747256,
      longitude: -60.0087278,
      phone: '(00) 00000-0000',
      password_hash: await hash('123456', 6),
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
