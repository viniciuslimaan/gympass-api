import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRespository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryService } from './fetch-user-check-ins-history'

let checkInsRepository: InMemoryCheckInsRespository
let fetchUserCheckInsHistory: FetchUserCheckInsHistoryService

describe('Fetch user check-in history service', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRespository()
    fetchUserCheckInsHistory = new FetchUserCheckInsHistoryService(
      checkInsRepository,
    )
  })

  it('should be able to fetch check-in history', async () => {
    await checkInsRepository.create({
      user_id: 1,
      gym_id: 1,
    })

    await checkInsRepository.create({
      user_id: 1,
      gym_id: 2,
    })

    const { checkIns } = await fetchUserCheckInsHistory.execute({
      userId: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 1 }),
      expect.objectContaining({ gym_id: 2 }),
    ])
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        user_id: 1,
        gym_id: i,
      })
    }

    const { checkIns } = await fetchUserCheckInsHistory.execute({
      userId: 1,
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 21 }),
      expect.objectContaining({ gym_id: 22 }),
    ])
  })
})
