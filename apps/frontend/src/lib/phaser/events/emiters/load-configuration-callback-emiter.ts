import type { GameConfiguration } from '@/shared/components'

import { EventBus, EventBusEvents } from '../event-bus'

export const loadConfigurationCallbackEmiter = (gameConiguration: GameConfiguration) => {
  EventBus.emit(EventBusEvents.LoadConfigurationCallback, gameConiguration)
}
