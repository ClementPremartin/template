import { objectType } from 'nexus'
import { User } from '../User/User.entity'

export const Post = objectType({
  name: 'Post',
  definition: (t) => {
    t.int('id')
    t.string('createdAt')
    t.string('updatedAt')
    t.string('title')
    t.nullable.string('content')
    t.boolean('published')
    t.field('user', {
      type: User,
    })
  },
})
