import { FieldResolver } from 'nexus'
import UserRepository from '../../models/User/User.repository'

export default class UserResolver {
  getUsers: FieldResolver<'Query', 'getUsers'> = async () => {
    return UserRepository.getUsers()
  }
}
