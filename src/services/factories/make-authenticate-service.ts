import { AuthenticateService } from '../authenticate'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-reposity'

export function makeAuthenticateService() {
  const usersResposity = new PrismaUsersRepository()
  const service = new AuthenticateService(usersResposity)

  return service
}
