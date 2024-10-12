import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

import type { AsyncWebLayout } from '@/shared/types'

import { EmotionRegistry, GameConfigurationRegistry, MenuRegistry, SnackbarRegistry } from './registry'

export const WebLayout: AsyncWebLayout = async ({ children }) => {
  const messages = await getMessages()
  return (
    <EmotionRegistry>
      <NextIntlClientProvider messages={messages}>
        <SnackbarRegistry>
          <GameConfigurationRegistry>
            <MenuRegistry>{children}</MenuRegistry>
          </GameConfigurationRegistry>
        </SnackbarRegistry>
      </NextIntlClientProvider>
    </EmotionRegistry>
  )
}
