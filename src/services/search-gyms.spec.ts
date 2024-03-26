import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRespository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsService } from './search-gyms'

let gymsRepository: InMemoryGymsRespository
let searchGymsService: SearchGymsService

describe('Search gym service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRespository()
    searchGymsService = new SearchGymsService(gymsRepository)
  })

  it('should be able to search gym', async () => {
    await gymsRepository.create({
      title: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: -21.66464,
      longitude: -49.7626623,
    })

    const { gyms } = await searchGymsService.execute({
      query: 'Javascript Gym',
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Javascript Gym' })])
  })

  it('should be able to search gym', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Javascript Gym - ${i}`,
        description: null,
        phone: null,
        latitude: -21.66464,
        longitude: -49.7626623,
      })
    }

    const { gyms } = await searchGymsService.execute({
      query: 'Javascript Gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym - 21' }),
      expect.objectContaining({ title: 'Javascript Gym - 22' }),
    ])
  })
})
