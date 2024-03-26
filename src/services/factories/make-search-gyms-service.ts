import { SearchGymsService } from '../search-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeSearchGymsService() {
  const gymsResposity = new PrismaGymsRepository()
  const service = new SearchGymsService(gymsResposity)

  return service
}
