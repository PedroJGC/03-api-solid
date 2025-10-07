import type { FastifyInstance } from 'fastify'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'
import { register } from './controllers/register'

// biome-ignore lint/suspicious/useAwait: ignore
export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.get('/me', profile)
}
