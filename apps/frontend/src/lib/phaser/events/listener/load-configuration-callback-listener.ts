import type { GameConfiguration } from '@/shared/context'

import { EventBus, EventBusEvents } from '../event-bus'

export const loadConfigurationCallbackListener = (callback: (gameConiguration: GameConfiguration) => void) => {
  EventBus.on(EventBusEvents.LoadConfigurationCallback, callback)
}
