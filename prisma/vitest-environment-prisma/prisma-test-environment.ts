/** biome-ignore-all lint/suspicious/useAwait: ignore */
/** biome-ignore-all lint/suspicious/noConsole: ignore */
import type { Environment } from 'vitest/environments'

export default (<Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    console.log('Setup')

    return {
      async teardown() {
        console.log('Teardown')
      },
    }
  },
})
