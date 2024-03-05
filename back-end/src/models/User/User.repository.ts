import { compareSync, hashSync } from 'bcryptjs'
import prisma from '../../database/client'
import { User } from '../../database/prisma/generated'
import SessionRepository from '../Session/Session.repository'
import { Session } from '@prisma/client'

export const INVALID_CREDENTIALS_ERROR_MESSAGE = 'Identifiants incorrects.'

export default class UserRepository {
  //get all users from the database
  static async getUsers(): Promise<User[]> {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        createdAt: true,
      },
    })
    return users
  }

  static async getUserById(id: string): Promise<{
    id: string
    email: string
    firstname: string
    lastname: string
    createdAt: Date
  }> {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: id,
      },
    })
    return user
  }

  static async createUser(
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ): Promise<User> {
    return await prisma.user.create({
      data: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        hashedPassword: hashSync(password),
        createdAt: new Date(),
      },
    })
  }

  static async deleteUserById(id: string) {
    const user = await this.getUserById(id)

    if (user !== null) {
      await prisma.user.delete({
        where: {
          id: user.id,
        },
      })
      return `User with id ${id} has been deleted successfuly`
    } else {
      return `There is no existing user with id ${id}`
    }
  }

  static async updateUserById(dataToUpdate: {
    id: string
    firstname?: string
    lastname?: string
    email?: string
  }): Promise<User> {
    return await prisma.user.update({
      where: {
        id: dataToUpdate.id,
      },
      data: {
        firstname: dataToUpdate.firstname,
        lastname: dataToUpdate.lastname,
        email: dataToUpdate.email,
      },
    })
  }

  static async signIn(
    email: string,
    password: string
  ): Promise<{ user: User; session: Session }> {
    const user = await this.findByMail(email)

    if (
      !user ||
      user.hashedPassword === undefined ||
      !compareSync(password, user.hashedPassword)
    ) {
      throw new Error(INVALID_CREDENTIALS_ERROR_MESSAGE)
    }

    const session = await SessionRepository.createSession(user)
    return { user, session }
  }

  static async findByMail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    })
  }

  static async findBySessionId(sessionToken: string): Promise<User | null> {
    const session = await SessionRepository.findById(sessionToken)

    if (!session) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.userId,
      },
    })

    return user || null
  }
}
