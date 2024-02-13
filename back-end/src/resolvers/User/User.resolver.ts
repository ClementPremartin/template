import { PrismaClient } from '@prisma/client'
import { FieldResolver } from 'nexus'

const prisma = new PrismaClient()

export default class UserResolver {
  getUsers: FieldResolver<'Query', 'getUsers'> = async () => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstname: true,
        lastname: true,
      },
      orderBy: { id: 'desc' },
    })
    return users
  }
}
