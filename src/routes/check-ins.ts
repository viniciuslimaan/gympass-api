import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'

import { create } from '@/http/controllers/check-ins/create'
import { metrics } from '@/http/controllers/check-ins/metrics'
import { history } from '@/http/controllers/check-ins/history'
import { validate } from '@/http/controllers/check-ins/validate'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  // Check-ins
  app.post('/check-in', create)
  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)
  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validate,
  )
}
