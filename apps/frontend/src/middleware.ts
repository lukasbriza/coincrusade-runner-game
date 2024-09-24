/* eslint-disable no-useless-escape */
import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

export default createMiddleware(routing)

// Match only internationalized pathnames
export const config = {
  matcher: ['/', '/(cs|en)/:path*', `/((?!_next|_vercel|.*\..*).*)`],
}
