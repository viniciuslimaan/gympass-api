import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeUserCheckInsHistoryService } from '@/services/factories/make-user-check-ins-history-service'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const fetchUserCheckInsHistoryService = makeUserCheckInsHistoryService()

  const { checkIns } = await fetchUserCheckInsHistoryService.execute({
    userId: Number(request.user.sub),
    page,
  })

  return reply.status(200).send({
    checkIns,
  })
}
