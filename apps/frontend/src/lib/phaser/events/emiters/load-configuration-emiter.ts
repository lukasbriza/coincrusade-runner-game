import { EventBus, EventBusEvents } from '../event-bus'

export const loadConfigurationEmiter = () => {
  EventBus.emit(EventBusEvents.LoadConfiguration)
}
