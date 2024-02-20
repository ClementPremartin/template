import 'reflect-metadata'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import UserResolver from './resolvers/User/User.resolver'
import { buildSchema } from 'type-graphql'

async function startServer() {
  const PORT = 4000

  const schema = await buildSchema({
    resolvers: [UserResolver],
  })

  const server = new ApolloServer({
    schema: schema,
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT, path: '/api' },
  })

  console.log(`🚀 Server is ready at ${url}api`)
}

startServer()
