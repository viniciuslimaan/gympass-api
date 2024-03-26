import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchUserCheckInsHistoryService } from '../fetch-user-check-ins-history'

export function makeUserCheckInsHistoryService() {
  const checkInsResposity = new PrismaCheckInsRepository()
  const service = new FetchUserCheckInsHistoryService(checkInsResposity)

  return service
}
