import prisma from '../../database/client'

export default class UserRepository {
  //get all users from the database
  static async getUsers(): Promise<
    {
      id: number
      firstname: string
      lastname: string
    }[]
  > {
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

  static async getUserById(id: number): Promise<{
    id: number
    email: string
    firstname: string
    lastname: string
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
    email: string
  ): Promise<{
    id: number
    email: string
    firstname: string
    lastname: string
  }> {
    return await prisma.user.create({
      data: {
        firstname: firstname,
        lastname: lastname,
        email: email,
      },
    })
  }

  static async deleteUserById(id: number) {
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

  static async updateUserById(
    id: number,
    firstname: string,
    lastname: string,
    email: string
  ) {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        firstname: firstname,
        lastname: lastname,
        email: email,
      },
    })
  }
}
