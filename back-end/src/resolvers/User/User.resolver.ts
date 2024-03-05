import { Arg, Args, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import UserRepository from '../../models/User/User.repository'
import { SignInArgs, SignUpArgs, UpdateUserArgs } from './User.input'
import { User } from '../../database/prisma/generated/models'
import { setSessionIdInCookie } from '../../http-utils'
import { GlobalContext } from '../..'

@Resolver()
export default class UserResolver {
  @Query(() => [User])
  getUsers(): Promise<User[]> {
    return UserRepository.getUsers()
  }

  @Query(() => User)
  getUserById(@Arg('id') id: string): Promise<User> {
    return UserRepository.getUserById(id)
  }

  @Mutation(() => User)
  signUp(
    @Args() { firstname, lastname, email, password }: SignUpArgs
  ): Promise<User> {
    return UserRepository.createUser(firstname, lastname, email, password)
  }

  @Mutation(() => User)
  async signIn(
    @Args() { email, password }: SignInArgs,
    @Ctx() context: GlobalContext
  ): Promise<User> {
    const { user, session } = await UserRepository.signIn(email, password)
    setSessionIdInCookie(context, session.id)
    return user
  }

  @Mutation(() => String)
  deleteUserById(@Arg('id') id: string): Promise<string> {
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
