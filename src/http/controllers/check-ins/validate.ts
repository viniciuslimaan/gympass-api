import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeValidateCheckInService } from '@/services/factories/make-validate-check-in-service'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.coerce.number(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const checkInService = makeValidateCheckInService()

  await checkInService.execute({
    checkInId,
  })

  return reply.status(204).send()
}
