import { EventBus, EventBusEvents } from '../event-bus'

export const generateMethodListener = (callback: () => void) => {
  EventBus.on(EventBusEvents.GenerateMethod, callback)
}
