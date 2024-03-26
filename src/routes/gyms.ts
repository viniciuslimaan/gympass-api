import { FastifyInstance } from 'fastify'

import { create } from '@/http/controllers/gyms/create'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { search } from '@/http/controllers/gyms/search'
import { nearby } from '@/http/controllers/gyms/nearby'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  // Gyms
  app.post('/gym', { onRequest: [verifyUserRole('ADMIN')] }, create)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
}
