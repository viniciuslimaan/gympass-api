import { CreateGymService } from '../create-gym'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeCreateGymService() {
  const gymsResposity = new PrismaGymsRepository()
  const service = new CreateGymService(gymsResposity)

  return service
}
