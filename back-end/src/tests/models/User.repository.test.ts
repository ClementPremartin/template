/// <reference types="@types/jest" />;
import dotenv from 'dotenv'

import { Prisma, PrismaClient } from '@prisma/client'
import { hashSync } from 'bcryptjs'
import UserRepository, {
  INVALID_CREDENTIALS_ERROR_MESSAGE,
} from '../../models/User/User.repository'
import SessionRepository from '../../models/Session/Session.repository'

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
  describe('SignIn', () => {
    describe('When email address does not belong to existing user', () => {
      it('Throws invalid credentials error', async () => {
        const email = 'unknow@userInfo.com'
        expect(() => UserRepository.signIn(email, 'whatever')).rejects.toThrow(
          INVALID_CREDENTIALS_ERROR_MESSAGE
        )
      })
    })
    const email = 'jean@user.com'
    describe('When password is invalid', () => {
      it('Throws invalid credentials error', async () => {
        await UserRepository.createUser(
          'Jean',
          'User',
          email,
          'mot-de-passe-nul-de-jean'
        )
        expect(() =>
          UserRepository.signIn(email, 'wrong-password')
        ).rejects.toThrow(INVALID_CREDENTIALS_ERROR_MESSAGE)
      })
    })
    describe('When pasword is valid', () => {
      it('Create session in database', async () => {
        await UserRepository.createUser(
          'Jean',
          'User',
          email,
          'mot-de-passe-nul-de-jean'
        )
        const signIn = await UserRepository.signIn(
          email,
          'mot-de-passe-nul-de-jean'
        )
        const sessions = await SessionRepository.findSessions()
        expect(sessions).toHaveLength(1)
        expect(signIn.session.sessionToken).toBe(sessions[0].sessionToken)
      })
      it('Returns user and session', async () => {
        await UserRepository.createUser(
          'Jean',
          'User',
          email,
          'mot-de-passe-nul-de-jean'
        )
        const signIn = await UserRepository.signIn(
          email,
          'mot-de-passe-nul-de-jean'
        )
        expect(signIn).toHaveProperty('user')
        expect(signIn).toHaveProperty('session')
      })
    })
  })
  describe('SignOut', () => {
    const email = 'jean@user.com'
    describe('When user passed does not exits', () => {
      it('Return error message', async () => {
        const user = await UserRepository.createUser(
          'Jean',
          'User',
          email,
          'mot-de-passe-nul-de-jean'
        )
        expect(
          SessionRepository.deleteSession(user, 'session-token')
        ).rejects.toThrow('There is no existing Session')
      })
    })
    describe('When passed existing user', () => {
      it('Deletes session in database', async () => {
        const user = await UserRepository.createUser(
          'Jean',
          'User',
          email,
          'mot-de-passe-nul-de-jean'
        )
        const signInResult = await UserRepository.signIn(
          email,
          'mot-de-passe-nul-de-jean'
        )
        const result = await SessionRepository.deleteSession(
          user,
          signInResult.session.sessionToken
        )
        expect(result.id).toContain(signInResult.session.id)
      })
    })
  })
})
