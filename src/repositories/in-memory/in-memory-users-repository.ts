import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomInt } from 'crypto'

export class InMemoryUsersRespository implements UsersRepository {
  public items: User[] = []

  async findById(id: number) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = {
      id: data.id ?? randomInt(200),
      name: data.name,
      email: data.email,
      password: data.password,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}
