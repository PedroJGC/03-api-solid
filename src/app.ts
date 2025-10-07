import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { appRoutes } from './http/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(appRoutes)

app.setErrorHandler((error, _, replay) => {
  if (error instanceof ZodError) {
    return replay
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    // biome-ignore lint/suspicious/noConsole: ignore
    console.error(error)
  } else {
    // TODO: Here we should log to a external tool like Datadog/NewRelic/Sentry
  }

  return replay.status(500).send({ message: 'Internal server error.' })
})
