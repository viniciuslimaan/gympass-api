import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface FetchNearbyhGymsServiceRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyhGymsServiceResponse {
  gyms: Gym[]
}

export class FetchNearbyhGymsService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyhGymsServiceRequest): Promise<FetchNearbyhGymsServiceResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
