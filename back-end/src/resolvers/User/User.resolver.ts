import { Args, Mutation, Query, Resolver } from 'type-graphql'
import UserRepository from '../../models/User/User.repository'
import { AddUserArgs } from './User.input'
import { User } from '../../../node_modules/@generated/type-graphql/models'

@Resolver()
export default class UserResolver {
  @Query(() => [User])
  getUsers(): Promise<
    {
      id: number
      firstname: string
      lastname: string
    }[]
  > {
    return UserRepository.getUsers()
  }

  @Mutation(() => User)
  createUser(@Args() { firstname, lastname, email }: AddUserArgs): Promise<{
    id: number
    email: string
    firstname: string
    lastname: string
  }> {
    console.log(firstname)
    return UserRepository.createUser(firstname, lastname, email)
  }
}
