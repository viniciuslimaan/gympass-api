import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { ValidateCheckInService } from '../validate-check-in'

export function makeValidateCheckInService() {
  const checkInsResposity = new PrismaCheckInsRepository()
  const service = new ValidateCheckInService(checkInsResposity)

  return service
}
