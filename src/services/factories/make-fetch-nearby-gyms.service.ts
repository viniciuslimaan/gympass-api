import { FetchNearbyhGymsService } from '../fetch-nearby-gyms'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeFetchNearbyGymsService() {
  const gymsResposity = new PrismaGymsRepository()
  const service = new FetchNearbyhGymsService(gymsResposity)

  return service
}
