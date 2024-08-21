import { EventBus, EventBusEvents } from '../event-bus'

export const secondPassedEmiter = () => {
  EventBus.emit(EventBusEvents.SecondPassed)
}
