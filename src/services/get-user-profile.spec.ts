import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRespository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileService } from './get-user-profile'
import { ResourseNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRespository
let getUserProfileService: GetUserProfileService

describe('Get User profile service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRespository()
    getUserProfileService = new GetUserProfileService(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
    })

    const { user } = await getUserProfileService.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(Number))
    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      getUserProfileService.execute({
        userId: 0,
      }),
    ).rejects.toBeInstanceOf(ResourseNotFoundError)
  })
})
