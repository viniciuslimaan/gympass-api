import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckInService } from '../check-in'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeCheckInService() {
  const checkInsResposity = new PrismaCheckInsRepository()
  const gymsResposity = new PrismaGymsRepository()
  const service = new CheckInService(checkInsResposity, gymsResposity)

  return service
}
