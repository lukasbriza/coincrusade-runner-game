import { EventBus, EventBusEvents } from '../event-bus'

export const gameResumeListener = (callback: () => void) => {
  EventBus.on(EventBusEvents.ResumeGame, callback)
}
