import {
  Arg,
  Args,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql'
import { Post } from '../../database/prisma/generated'
import { AddPostArgs } from './Post.input'
import { GlobalContext } from '../..'
import PostRepository from '../../models/Post/Post.repository'

@Resolver()
export default class PostResolver {
  @Authorized()
  @Mutation(() => Post)
  async addPost(
    @Args() { title, content, published }: AddPostArgs,
    @Ctx() context: GlobalContext
  ): Promise<Post> {
    if (!context.user) {
      throw new Error('No user found')
    }
    const post = await PostRepository.createPost(
      context.user,
      title,
      content ? content : '',
      published
    )
    return post
  }

  @Authorized()
  @Query(() => [Post])
  getPosts(@Ctx() context: GlobalContext): Promise<Post[]> {
    if (!context.user) {
      throw new Error('No user found')
    }
    return PostRepository.findAllPosts(context.user)
  }

  @Authorized()
  @Mutation(() => String)
  async deletePostById(@Arg('id', () => Number) id: number): Promise<string> {
    return await PostRepository.deletePostById(id)
  }
}
