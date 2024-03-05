import { IncomingMessage } from 'http'
import { GlobalContext } from '.'
const MAX_AGE_DAYS = 365

export const getSessionIdInCookie = (
  req: IncomingMessage | undefined
): string => {
  if (!req) {
    return ''
  }
  const cookieHeader = req.headers.cookie
  if (!cookieHeader) {
    return ''
  }

  const cookies = cookieHeader.split(';').map((cookie) => cookie.trim())
  const sessionIdCookie = cookies.find((cookie) =>
    cookie.startsWith('sessionId=')
  )
  if (!sessionIdCookie) {
    return ''
  }

  return sessionIdCookie.split('=')[1]
}

export const setSessionIdInCookie = (ctx: GlobalContext, sessionId: string) => {
  ctx.res.cookie('sessionId', sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: true,
    maxAge: 1000 * 60 * 60 * 24 * MAX_AGE_DAYS,
  })
}
