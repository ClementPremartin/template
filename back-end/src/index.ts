import 'reflect-metadata'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import UserResolver from './resolvers/User/User.resolver'
import { buildSchema } from 'type-graphql'

async function startServer() {
  const schema = await buildSchema({
    resolvers: [UserResolver],
  })

  const server = new ApolloServer({
    schema: schema,
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  })

  console.log(`🚀  Server ready at: ${url}`)
}

startServer()
