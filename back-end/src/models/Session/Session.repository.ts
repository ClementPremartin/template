import { Session, User } from '../../database/prisma/generated'
import prisma from '../../database/client'
import { randomBytes } from 'crypto'

const generateSessionToken = () => {
  return randomBytes(16).toString('hex')
}

export default class SessionRepository {
  static async createSession(user: User) {
    return await prisma.session.create({
      data: {
        sessionToken: generateSessionToken(),
        userId: user.id,
      },
    })
  }

  static async findById(sessionToken: string): Promise<Session | null> {
    const session = await prisma.session.findFirst({
      where: {
        sessionToken: sessionToken,
      },
    })

    if (!session) {
      return null
    }

    return session
  }

  static async deleteSession(user: User, sessionToken: string) {
    const existingSession = await prisma.session.findFirst({
      where: {
        userId: user.id,
        sessionToken: sessionToken,
      },
    })
    if (existingSession) {
      await prisma.session.delete({
        where: {
          id: existingSession.id,
        },
      })
    }
  }
}
