import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredencialsError } from './errors/invalid-credencials-error'
import { User } from '@prisma/client'
import { compare } from 'bcryptjs'

interface AuthenticateServiceRequest {
  email: string
  password: string
}

interface AuthenticateServiceResponse {
  user: User
}

export class AuthenticateService {
  constructor(private usersRepositoty: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const user = await this.usersRepositoty.findByEmail(email)

    if (!user) {
      throw new InvalidCredencialsError()
    }

    const doesPasswordMatches = await compare(password, user.password)

    if (!doesPasswordMatches) {
      throw new InvalidCredencialsError()
    }

    return { user }
  }
}
