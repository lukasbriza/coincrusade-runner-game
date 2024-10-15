import { EventBus, EventBusEvents } from '../event-bus'

export const gameEndListener = (callback: () => void) => {
  EventBus.on(EventBusEvents.EndGame, callback)
}
