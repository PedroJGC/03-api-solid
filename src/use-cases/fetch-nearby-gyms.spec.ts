/** biome-ignore-all lint/suspicious/useAwait: no need for await */
/** biome-ignore-all lint/nursery/useNumericSeparators: ignore */
/** biome-ignore-all lint/nursery/noAwaitInLoop: I need to use loop */

import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms use case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -16.05632,
      longitude: -47.9854592,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -15.8425228,
      longitude: -47.9947262,
    })

    const { gyms } = await sut.execute({
      userLatitude: -16.05632,
      userLongitude: -47.9854592,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
