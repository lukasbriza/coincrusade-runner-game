import { EventBus, EventBusEvents } from '../event-bus'

export const gameRestartListener = (callback: () => void) => {
  EventBus.on(EventBusEvents.RestartGame, callback)
}
