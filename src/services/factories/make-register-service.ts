import { RegisterService } from '../register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-reposity'

export function makeRegisterService() {
  const usersResposity = new PrismaUsersRepository()
  const service = new RegisterService(usersResposity)

  return service
}
