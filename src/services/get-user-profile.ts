import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourseNotFoundError } from './errors/resource-not-found-error'

interface GetUserProfileServiceRequest {
  userId: number
}

interface GetUserProfileServiceResponse {
  user: User
}

export class GetUserProfileService {
  constructor(private usersRepositoty: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileServiceRequest): Promise<GetUserProfileServiceResponse> {
    const user = await this.usersRepositoty.findById(userId)

    if (!user) {
      throw new ResourseNotFoundError()
    }

    return { user }
  }
}
