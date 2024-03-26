import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-reposity'
import { GetUserProfileService } from '../get-user-profile'

export function makeGetUserProfileService() {
  const usersResposity = new PrismaUsersRepository()
  const service = new GetUserProfileService(usersResposity)

  return service
}
