/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable unicorn/no-await-expression-member */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

import { routing } from './routing'

export default getRequestConfig(async ({ locale }) => {
  if (!routing.locales.map((l) => l.toString()).includes(locale)) {
    notFound()
  }

  const file = (await import(`./locales/${locale}.json`)).default
  return {
    messages: file,
  }
})
