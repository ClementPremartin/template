import { hashSync } from 'bcryptjs'
import prisma from '../../database/client'
import { User } from '../../database/prisma/generated'

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
}
