import { EventBus, EventBusEvents } from '../event-bus'

export const gamePauseListener = (callback: () => void) => {
  EventBus.on(EventBusEvents.PauseGame, callback)
}
