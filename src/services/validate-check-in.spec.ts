import { expect, describe, it, beforeEach, vi } from 'vitest'
import { InMemoryCheckInsRespository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidateCheckInService } from './validate-check-in'
import { ResourseNotFoundError } from './errors/resource-not-found-error'
import { afterEach } from 'node:test'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'

let checkInsRepository: InMemoryCheckInsRespository
let validateCheckInService: ValidateCheckInService

describe('Validate check-in service', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRespository()
    validateCheckInService = new ValidateCheckInService(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validade the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      user_id: 1,
      gym_id: 1,
    })

    const { checkIn } = await validateCheckInService.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validade an inexistent check-in', async () => {
    await expect(() =>
      validateCheckInService.execute({
        checkInId: 1233123,
      }),
    ).rejects.toBeInstanceOf(ResourseNotFoundError)
  })

  it('should not be able to validade the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2024, 0, 21, 16, 40))

    const createdCheckIn = await checkInsRepository.create({
      user_id: 1,
      gym_id: 1,
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() =>
      validateCheckInService.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
