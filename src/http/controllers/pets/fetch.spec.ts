import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch and filter pets', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    await request(app.server)
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

    await request(app.server)
      .post(`/organizations/pets`)
      .set('Authorization', `Bearer ${token}`)
      .send({
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

    const response = await request(app.server)
      .get('/pets')
      .query({
        city: 'Manaus - AM',
        age: 'Filhote',
        size: 'Pequenino',
        // energy: 'Muita',
        independence: 'Baixo (precisa de companhia sempre)',
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Alfredo',
      }),
    ])
  })
})
