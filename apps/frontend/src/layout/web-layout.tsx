import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

import { MobileVerificator } from '@/shared/components'
import type { AsyncWebLayout } from '@/shared/types'

import {
  EmotionRegistry,
  GameConfigurationRegistry,
  InitialAnimationRegistry,
  MenuRegistry,
  SnackbarRegistry,
} from './registry'

export const WebLayout: AsyncWebLayout = async ({ children }) => {
  const messages = await getMessages()
  return (
    <EmotionRegistry>
      <NextIntlClientProvider messages={messages}>
        <SnackbarRegistry>
          <GameConfigurationRegistry>
            <InitialAnimationRegistry>
              <MenuRegistry>
                <MobileVerificator />
                {children}
              </MenuRegistry>
            </InitialAnimationRegistry>
          </GameConfigurationRegistry>
        </SnackbarRegistry>
      </NextIntlClientProvider>
    </EmotionRegistry>
  )
}
