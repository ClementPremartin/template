import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql'
import UserRepository from '../../models/User/User.repository'
import { AddUserArgs, UpdateUserArgs } from './User.input'
import { User } from '../../database/prisma/generated/models'

@Resolver()
export default class UserResolver {
  @Query(() => [User])
  getUsers(): Promise<User[]> {
    return UserRepository.getUsers()
  }

  @Query(() => User)
  getUserById(@Arg('id') id: number): Promise<User> {
    return UserRepository.getUserById(id)
  }

  @Mutation(() => User)
  createUser(
    @Args() { firstname, lastname, email }: AddUserArgs
  ): Promise<User> {
    return UserRepository.createUser(firstname, lastname, email)
  }

  @Mutation(() => String)
  deleteUserById(@Arg('id') id: number): Promise<string> {
    return UserRepository.deleteUserById(id)
  }

  @Mutation(() => User)
  updateUserById(@Args() { id, firstname, lastname, email }: UpdateUserArgs) {
    const dataToUpdate = {
      id: id,
      ...(firstname && { firstname: firstname }),
      ...(lastname && { lastname: lastname }),
      ...(email && { email: email }),
    }

    return UserRepository.updateUserById(dataToUpdate)
  }
}
