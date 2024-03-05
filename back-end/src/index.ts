import 'reflect-metadata'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import UserResolver from './resolvers/User/User.resolver'
import { buildSchema } from 'type-graphql'
import UserRepository from './models/User/User.repository'
import { getSessionIdInCookie } from './http-utils'
import { User } from './database/prisma/generated/models/User'
import { ExpressContext } from 'apollo-server-express'
import { IncomingMessage } from 'http'

export type GlobalContext = {
  res: any // Adjust the type according to your server's response type
  req: IncomingMessage
  user: User | null
}

async function startServer() {
  const PORT = 4000

  const schema = await buildSchema({
    resolvers: [UserResolver],
    authChecker: async ({ context }) => {
      return Boolean(context.user)
    },
  })

  const server = new ApolloServer<GlobalContext>({
    schema: schema,
    cache: 'bounded',
    csrfPrevention: true,
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT, path: '/api' },
    context: async (context): Promise<GlobalContext> => {
      const sessionId = getSessionIdInCookie(context.req)
      const user = !sessionId
        ? null
        : await UserRepository.findBySessionId(sessionId)
      return { res: context.res, req: context.req, user }
    },
  })

  console.log(`🚀 Server is ready at ${url}api`)
}

startServer()
