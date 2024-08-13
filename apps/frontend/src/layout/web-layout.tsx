import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

import type { AsyncWebLayout } from '@/shared/types'

import { EmotionRegistry, GameConfigurationRegistry } from './registry'

export const WebLayout: AsyncWebLayout = async ({ children }) => {
  const messages = await getMessages()
  return (
    <EmotionRegistry>
      <NextIntlClientProvider messages={messages}>
        <GameConfigurationRegistry>{children}</GameConfigurationRegistry>
      </NextIntlClientProvider>
    </EmotionRegistry>
  )
}
