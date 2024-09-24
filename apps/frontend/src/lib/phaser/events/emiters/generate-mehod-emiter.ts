import { EventBus, EventBusEvents } from '../event-bus'

export const generateMethodEmiter = () => {
  EventBus.emit(EventBusEvents.GenerateMethod)
}
