/* eslint-disable no-useless-escape */

import { NextResponse, type NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

const assetExtensions = ['.mp4', '.mp3', '.jpg', '.png', '.gif', '.svg']

export function middleware(request: NextRequest) {
  const isLocale = routing.locales.some((locale) => request.nextUrl.pathname.startsWith(`/${locale}`))
  const publicAsstetPath = assetExtensions.some((extension) => request.nextUrl.pathname.includes(extension) && isLocale)

  if (publicAsstetPath) {
    const pathArray = request.nextUrl.pathname.split('/')
    pathArray.shift()
    pathArray.shift()
    return NextResponse.redirect(
      new URL(`/${pathArray.join('')}`, `${request.nextUrl.protocol}//${request.nextUrl.host}/`),
    )
  }

  const response = intlMiddleware(request)

  return response
}

// Match only internationalized pathnames
export const config = {
  matcher: ['/', '/(cs|en)/:path*', `/((?!_next|_vercel|.*\..*).*)`],
}
