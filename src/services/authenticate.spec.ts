import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRespository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredencialsError } from './errors/invalid-credencials-error'

let usersRepository: InMemoryUsersRespository
let authenticateService: AuthenticateService

describe('Authenticate service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRespository()
    authenticateService = new AuthenticateService(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
    })

    const { user } = await authenticateService.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(Number))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      authenticateService.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredencialsError)
  })

  it('should not be able to authenticate with wrong email', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
    })

    await expect(() =>
      authenticateService.execute({
        email: 'johndoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredencialsError)
  })
})
