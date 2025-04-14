/* eslint-disable no-useless-escape */

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
// import createMiddleware from 'next-intl/middleware
import { createI18nMiddleware } from 'next-international/middleware'

import { i18nConfig } from './i18n/config'

// import { routing } from './i18n/routing'

// const intlMiddleware = createMiddleware(routing)

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'cs'],
  defaultLocale: 'cs',
})

const assetExtensions = ['.mp4', '.mp3', '.jpg', '.png', '.gif', '.svg']

export function middleware(request: NextRequest) {
  const isLocale = i18nConfig.locales.some((locale) => request.nextUrl.pathname.startsWith(`/${locale}`))
  const publicAsstetPath = assetExtensions.some((extension) => request.nextUrl.pathname.includes(extension) && isLocale)

  if (publicAsstetPath) {
    const pathArray = request.nextUrl.pathname.split('/')
    pathArray.shift()
    pathArray.shift()
    return NextResponse.redirect(
      new URL(`/${pathArray.join('')}`, `${request.nextUrl.protocol}//${request.nextUrl.host}/`),
    )
  }

  // const response = intlMiddleware(request)

  return I18nMiddleware(request)
}

// Match only internationalized pathnames
export const config = {
  matcher: ['/', '/(cs|en)/:path*', `/((?!_next|_vercel|favicon.ico|robots.txt|.*\..*).*)`],
}
