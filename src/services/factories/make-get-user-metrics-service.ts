import { GetUserMetricsService } from '../get-user-metrics'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeGetUserMetricsService() {
  const checkInsResposity = new PrismaCheckInsRepository()
  const service = new GetUserMetricsService(checkInsResposity)

  return service
}
