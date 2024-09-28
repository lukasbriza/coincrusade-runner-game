import { EventBus, EventBusEvents } from '../event-bus'

export const pauseGameListener = (callback: () => void) => {
  EventBus.on(EventBusEvents.PauseGame, callback)
}
