import type { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  // biome-ignore lint/suspicious/noConsole: ignore
  console.log(request.user.sub)

  return reply.status(200).send()
}
