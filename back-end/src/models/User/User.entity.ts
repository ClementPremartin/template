import { extendType, list, objectType } from 'nexus'
import UserResolver from '../../resolvers/User/User.resolver'

const userResolver = new UserResolver()

export const getUsers = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('getUsers', {
      type: list(User),
      resolve: userResolver.getUsers,
    })
  },
})

export const User = objectType({
  name: 'User',
  definition: (t) => {
    t.int('id')
    t.string('email')
    t.string('firstname')
    t.string('lastname')
  },
})
