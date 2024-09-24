import { EventBus, EventBusEvents } from '../event-bus'

export const lifeAddedEmiter = () => {
  EventBus.emit(EventBusEvents.LifeAdded)
}
