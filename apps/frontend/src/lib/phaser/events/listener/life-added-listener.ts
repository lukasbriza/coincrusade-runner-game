import { EventBus, EventBusEvents } from '../event-bus'

export const lifeAddedListener = (callback: () => void) => {
  EventBus.on(EventBusEvents.LifeAdded, callback)
}
