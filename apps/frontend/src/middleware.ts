import createMiddleware from 'next-intl/middleware'

import { i18nConfig } from './i18n/config'

export default createMiddleware({
  // A list of all locales that are supported
  locales: i18nConfig.locales,
  // Used when no locale matches
  defaultLocale: i18nConfig.defaultLocale,
})

// Add RegExp for which routes avoid internationalisation
export const config = {
  // eslint-disable-next-line no-useless-escape
  matcher: ['/', '/(cs|en)/:path*'],
}
