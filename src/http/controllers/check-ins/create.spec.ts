import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('Create check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'Javascript Gym',
        description: 'Some description',
        phone: null,
        latitude: -21.66464,
        longitude: -49.7626623,
      },
    })

    const response = await request(app.server)
      .post('/check-in')
      .set('Authorization', `Bearer ${token}`)
      .send({
        gymId: gym.id,
        latitude: -21.66464,
        longitude: -49.7626623,
      })

    expect(response.statusCode).toEqual(201)
  })
})
