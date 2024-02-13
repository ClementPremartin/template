import { objectType } from 'nexus'
import { User } from '../User/User.entity'

export const Profile = objectType({
  name: 'Profile',
  definition: (t) => {
    t.int('id')
    t.nullable.string('bio')
    t.field('user', {
      type: User,
    })
  },
})
