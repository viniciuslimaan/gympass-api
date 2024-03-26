import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckInService } from './check-in'
import { InMemoryCheckInsRespository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRespository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'

let checkInsRepository: InMemoryCheckInsRespository
let gymsRepository: InMemoryGymsRespository
let checkInService: CheckInService

describe('Check-in service', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRespository()
    gymsRepository = new InMemoryGymsRespository()
    checkInService = new CheckInService(checkInsRepository, gymsRepository)

    gymsRepository.create({
      id: 1,
      title: 'Academia braba',
      description: '',
      phone: '',
      latitude: new Decimal(-21.66464),
      longitude: new Decimal(-49.7626623),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await checkInService.execute({
      userId: 1,
      gymId: 1,
      userLatitude: -21.66464,
      userLongitude: -49.7626623,
    })

    expect(checkIn.id).toEqual(expect.any(Number))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 0, 21, 5, 0))

    await checkInService.execute({
      userId: 1,
      gymId: 1,
      userLatitude: -21.66464,
      userLongitude: -49.7626623,
    })

    await expect(() =>
      checkInService.execute({
        userId: 1,
        gymId: 1,
        userLatitude: -21.66464,
        userLongitude: -49.7626623,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2024, 0, 21, 5, 0))

    await checkInService.execute({
      userId: 1,
      gymId: 1,
      userLatitude: -21.66464,
      userLongitude: -49.7626623,
    })

    vi.setSystemTime(new Date(2024, 0, 22, 5, 0))

    const { checkIn } = await checkInService.execute({
      userId: 1,
      gymId: 1,
      userLatitude: -21.66464,
      userLongitude: -49.7626623,
    })

    expect(checkIn.id).toEqual(expect.any(Number))
  })

  it('should not be able to check in on distant gym', async () => {
    await expect(() =>
      checkInService.execute({
        userId: 1,
        gymId: 1,
        userLatitude: -21.6827684,
        userLongitude: -49.7465627,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
