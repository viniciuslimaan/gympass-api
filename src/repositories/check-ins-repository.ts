import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  findById(id: number): Promise<CheckIn | null>
  findByUserIdOnDate(userId: number, date: Date): Promise<CheckIn | null>
  findManyByUserId(userId: number, page?: number): Promise<CheckIn[]>
  countByUserId(userId: number): Promise<number>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  save(checkIn: CheckIn): Promise<CheckIn>
}
