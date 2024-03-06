import {
  Arg,
  Args,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql'
import UserRepository from '../../models/User/User.repository'
import { SignInArgs, SignUpArgs, UpdateUserArgs } from './User.input'
import { User } from '../../database/prisma/generated/models'
import {
  getSessionIdInCookie,
  removeCookie,
  setSessionIdInCookie,
} from '../../http-utils'
import { GlobalContext } from '../..'
import SessionRepository from '../../models/Session/Session.repository'

@Resolver()
export default class UserResolver {
  @Authorized()
  @Query(() => [User])
  getUsers(): Promise<User[]> {
    return UserRepository.getUsers()
  }

  @Authorized()
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
    setSessionIdInCookie(context, session)
    return user
  }

  @Authorized()
  @Mutation(() => String)
  signOut(@Ctx() context: GlobalContext): String {
    const sessionToken = getSessionIdInCookie(context.req)
    if (!context.user) {
      throw new Error('There is no User to logOut')
    }
    if (!sessionToken) {
      throw new Error('User has no cookie')
    }
    removeCookie(context, sessionToken)
    SessionRepository.deleteSession(context.user, sessionToken)

    return `Session ${sessionToken} has been removed successfuly`
  }

  @Authorized()
  @Mutation(() => String)
  deleteUserById(@Arg('id') id: string): Promise<string> {
    return UserRepository.deleteUserById(id)
  }

  @Authorized()
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
