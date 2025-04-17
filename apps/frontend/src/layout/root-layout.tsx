import Head from 'next/head'
import { PublicEnvScript } from 'next-runtime-env'

import { i18nConfig } from '@/i18n/config'
import type { AsyncWebLayout } from '@/shared'

import { PagesLayout } from './pages-layout'
import { WebLayout } from './web-layout'

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

export const RootLayout: AsyncWebLayout = ({ children, params }) => {
  const { locale } = params

  return (
    <html lang={locale || i18nConfig.defaultLocale}>
      <Head>
        <meta key="robots" content={process.env.NEXT_PUBLIC_META_ROBOTS} name="robots" />
        <PublicEnvScript />
      </Head>
      <body>
        <WebLayout params={params}>
          <PagesLayout params={params}>{children}</PagesLayout>
        </WebLayout>
      </body>
    </html>
  )
}
