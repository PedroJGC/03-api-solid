import { type Gym, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import type { FindManyNearbyParams, GymsRepository } from '../gyms-repository'

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }
  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Gym[]>(
      Prisma.sql`
      SELECT * from gyms
      WHERE ( 6371 * acos( 
        cos( radians(CAST(${latitude} AS DECIMAL)) ) * 
        cos( radians( CAST(latitude AS DECIMAL) ) ) * 
        cos( radians( CAST(longitude AS DECIMAL) ) - radians(CAST(${longitude} AS DECIMAL)) ) + 
        sin( radians(CAST(${latitude} AS DECIMAL)) ) * 
        sin( radians( CAST(latitude AS DECIMAL) ) ) 
      ) ) <= 10
    `
    )

    return gyms
  }
  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }
}
