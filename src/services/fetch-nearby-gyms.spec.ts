import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRespository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyhGymsService } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRespository
let fetchNearbyGymsService: FetchNearbyhGymsService

describe('Fetch nearby gyms service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRespository()
    fetchNearbyGymsService = new FetchNearbyhGymsService(gymsRepository)
  })

  it('should be able to fetch nearby gym', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -21.66464,
      longitude: -49.7626623,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -21.546082,
      longitude: -49.857398,
    })

    const { gyms } = await fetchNearbyGymsService.execute({
      userLatitude: -21.66464,
      userLongitude: -49.7626623,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
