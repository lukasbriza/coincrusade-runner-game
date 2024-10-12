import type { GameConfiguration } from '@/shared/context'

import { EventBus, EventBusEvents } from '../event-bus'

export const loadConfigurationCallbackEmiter = (gameConiguration: GameConfiguration) => {
  EventBus.emit(EventBusEvents.LoadConfigurationCallback, gameConiguration)
}
