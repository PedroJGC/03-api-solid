import type { FastifyInstance } from 'fastify'
import { register } from './controllers/register'

// biome-ignore lint/suspicious/useAwait: ignore
export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
}
