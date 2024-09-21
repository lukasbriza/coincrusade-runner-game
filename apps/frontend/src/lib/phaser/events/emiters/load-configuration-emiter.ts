import { EventBus, EventBusEvents } from '../event-bus'

export const loadConfigurationemiter = () => {
  EventBus.emit(EventBusEvents.LoadConfiguration)
}
