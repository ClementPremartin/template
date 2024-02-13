import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function insertUserForDevEnv() {
  await prisma.user.create({
    data: {
      firstname: 'Harry',
      lastname: 'Potter',
      email: 'harrypotter@email.com',
      posts: {
        create: { title: 'Windgardium Leviosa' },
      },
      profile: { create: { bio: 'I like levitation' } },
    },
  })
  await prisma.user.create({
    data: {
      firstname: 'Hermione',
      lastname: 'Granger',
      email: 'hermionegranger@email.com',
      posts: {
        create: { title: 'Lumos' },
      },
      profile: { create: { bio: 'I like light' } },
    },
  })
  await prisma.user.create({
    data: {
      firstname: 'Ron',
      lastname: 'Wisley',
      email: 'ronwisley@email.com',
      posts: {
        create: { title: 'Accio' },
      },
      profile: { create: { bio: 'I like accio' } },
    },
  })

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  })
  console.dir(allUsers, { depth: null })
}
