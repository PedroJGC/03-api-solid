/** biome-ignore-all lint/suspicious/useAwait: ignore*/
/** biome-ignore-all lint/style/useConsistentMemberAccessibility: ignore */

import { randomUUID } from 'node:crypto'
import type { CheckIn, Prisma } from '@prisma/client'
import type { CheckInsRepository } from '../check-ins-repository'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  // biome-ignore lint/correctness/noUnusedFunctionParameters: ignore
  async findByUserIdOnDate(userId: string, date: Date) {
    const checkInOnSameData = this.items.find(
      (checkIn) => checkIn.user_id === userId
    )

    if (!checkInOnSameData) {
      return null
    }

    return checkInOnSameData
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }
}
