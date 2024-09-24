import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

import { i18nConfig } from './config'

export const routing = defineRouting({
  locales: i18nConfig.locales,
  defaultLocale: i18nConfig.defaultLocale,
  localePrefix: 'always',
})

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation(routing)
