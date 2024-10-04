import type { ModalProps } from '@lukasbriza/components'

import type { GameConfiguration } from '@/shared/components'

export type EngineSettingsProps = Pick<ModalProps, 'open'> & {
  onClose: () => void
}

export type EngineSettingsFormValues = Pick<
  GameConfiguration,
  | 'addTimeEveryNumberOfCoins'
  | 'baseTimeInSeconds'
  | 'healRate'
  | 'immortalityDuration'
  | 'maxPlayerLifes'
  | 'timeAdditionInSeconds'
>