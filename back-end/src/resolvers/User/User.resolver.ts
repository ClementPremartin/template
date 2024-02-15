import { Args, Mutation, Query, Resolver } from 'type-graphql'
import UserRepository from '../../models/User/User.repository'
import { AddUserArgs } from './User.input'
import { User } from '../../database/prisma/generated/models'

@Resolver()
export default class UserResolver {
  @Query(() => [User])
  getUsers(): Promise<User[]> {
    return UserRepository.getUsers()
  }

  @Mutation(() => User)
  createUser(
    @Args() { firstname, lastname, email }: AddUserArgs
  ): Promise<User> {
    return UserRepository.createUser(firstname, lastname, email)
  }
}
