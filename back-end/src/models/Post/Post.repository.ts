import prisma from '../../database/client'
import { Post, User } from '../../database/prisma/generated'

export default class PostRepository {
  static async createPost(
    user: User,
    title: string,
    content: string,
    published: boolean
  ): Promise<Post> {
    const post = await prisma.post.create({
      data: {
        createdAt: new Date(),
        updatedAt: new Date(),
        title: title,
        content: content,
        published: published,
        authorId: user.id,
      },
    })
    return post
  }

  static async findAllPosts(user: User) {
    return await prisma.post.findMany({ where: { authorId: user.id } })
  }

  static async deletePostById(id: number) {
    const postToDelete = await prisma.post.findUnique({
      where: {
        id: id,
      },
    })
    if (!postToDelete) {
      throw new Error(`There is no existing post with id ${id}`)
    }

    await prisma.post.delete({ where: { id: id } })

    return 'Post has been deleted successfuly'
  }
}
