/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable unicorn/no-await-expression-member */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => {
  const file = (await import(`./locales/${locale}.json`)).default
  return {
    messages: file,
  }
})
