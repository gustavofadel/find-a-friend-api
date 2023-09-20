import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a pet', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    const response = await request(app.server)
      .post(`/organizations/pets`)
      .set('Authorization', `Bearer ${token}`)
      .send({
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

    expect(response.statusCode).toEqual(201)
  })
})
