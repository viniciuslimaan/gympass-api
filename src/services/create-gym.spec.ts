import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRespository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymService } from './create-gym'

let gymsRepository: InMemoryGymsRespository
let createGymService: CreateGymService

describe('Create gym service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRespository()
    createGymService = new CreateGymService(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await createGymService.execute({
      title: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: -21.66464,
      longitude: -49.7626623,
    })

    expect(gym.id).toEqual(expect.any(Number))
  })
})
