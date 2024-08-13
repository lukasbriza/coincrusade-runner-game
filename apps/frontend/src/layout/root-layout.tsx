import Head from 'next/head'
import { notFound } from 'next/navigation'
import { PublicEnvScript } from 'next-runtime-env'

import { i18nConfig } from '@/i18n/config'
import type { AsyncWebLayout } from '@/shared'
import { getFontStyle } from '@/shared/styles'

import { PagesLayout } from './pages-layout'
import { WebLayout } from './web-layout'

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

export const RootLayout: AsyncWebLayout = async ({ children, params }) => {
  if (!i18nConfig.locales.includes(params.locale)) {
    notFound()
  }
  const fontStyles = await getFontStyle()
  return (
    <html lang={params.locale || i18nConfig.defaultLocale}>
      <Head>
        <PublicEnvScript key="env" />
        <meta key="robots" content={process.env.NEXT_PUBLIC_META_ROBOTS} name="robots" />
        {fontStyles}
      </Head>
      <WebLayout params={params}>
        <PagesLayout params={params}>{children}</PagesLayout>
      </WebLayout>
    </html>
  )
}
