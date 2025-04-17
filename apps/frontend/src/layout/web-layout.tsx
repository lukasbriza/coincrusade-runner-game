import { I18nProviderClient } from '@/i18n/client'
import { MobileVerificator } from '@/shared/components'
import type { AsyncWebLayout } from '@/shared/types'

import {
  EmotionRegistry,
  GameConfigurationRegistry,
  InitialAnimationRegistry,
  MenuRegistry,
  SnackbarRegistry,
} from './registry'

export const WebLayout: AsyncWebLayout = ({ children, params }) => (
  <EmotionRegistry>
    <I18nProviderClient locale={params.locale}>
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
    </I18nProviderClient>
  </EmotionRegistry>
)
