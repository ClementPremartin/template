/// <reference types="@types/jest" />;
import dotenv from 'dotenv'

import { Prisma, PrismaClient } from '@prisma/client'
import { hashSync } from 'bcryptjs'
import UserRepository from '../../models/User/User.repository'

dotenv.config({ path: '../.env.test' })

const prisma = new PrismaClient()

describe('AppUserRepository integration', () => {
  beforeAll(async () => {
    try {
      await prisma.$connect()
    } catch (error) {
      console.error('Failed to connect to database:', error)
    }
  })

  beforeEach(async () => {
    try {
      await prisma.user.create({
        data: {
          firstname: 'Jeanjean',
          lastname: 'Bon',
          email: 'jeanjeanbon@email.com',
          hashedPassword: hashSync('JeanjeanBon@1'),
          createdAt: new Date('2024-03-07T14:25:15.148Z'),
        },
      })
    } catch (error) {
      console.error('Failed to create user:', error)
    }
  })

  afterEach(async () => {
    try {
      await prisma.$queryRaw(
        Prisma.sql`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`
      )
    } catch (error) {
      console.error('Failed to truncate table:', error)
    }
  })
  afterAll(async () => {
    try {
      await prisma.$disconnect()
    } catch (error) {
      console.error('Failed to disconnect from database:', error)
    }
  })

  it('User Should be JeanjeanBon', async () => {
    const result = await UserRepository.findByMail('jeanjeanbon@email.com')
    expect(result?.email).toBe('jeanjeanbon@email.com')
    expect(result?.firstname).toBe('Jeanjean')
  })
})
