import Head from 'next/head'
import { notFound } from 'next/navigation'
import { PublicEnvScript } from 'next-runtime-env'

import { routing } from '@/i18n/routing'
import type { AsyncWebLayout } from '@/shared'
import { getFontStyle } from '@/shared/styles'

import { PagesLayout } from './pages-layout'
import { WebLayout } from './web-layout'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const RootLayout: AsyncWebLayout = async ({ children, params }) => {
  if (!routing.locales.includes(params.locale)) {
    notFound()
  }

  const fontStyles = await getFontStyle()
  return (
    <html lang={params.locale || routing.defaultLocale}>
      <Head>
        <meta key="robots" content={process.env.NEXT_PUBLIC_META_ROBOTS} name="robots" />
        <PublicEnvScript />
        {fontStyles}
      </Head>
      <body>
        <WebLayout params={params}>
          <PagesLayout params={params}>{children}</PagesLayout>
        </WebLayout>
      </body>
    </html>
  )
}
