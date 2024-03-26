import { InMemoryCheckInsRespository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { GetUserMetricsService } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInsRespository
let getUserMetrics: GetUserMetricsService

describe('Get user metrics service', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRespository()
    getUserMetrics = new GetUserMetricsService(checkInsRepository)
  })

  it('should be able to get user metrics', async () => {
    await checkInsRepository.create({
      user_id: 1,
      gym_id: 1,
    })

    await checkInsRepository.create({
      user_id: 1,
      gym_id: 2,
    })

    const { checkInsCount } = await getUserMetrics.execute({
      userId: 1,
    })

    expect(checkInsCount).toEqual(2)
  })
})
