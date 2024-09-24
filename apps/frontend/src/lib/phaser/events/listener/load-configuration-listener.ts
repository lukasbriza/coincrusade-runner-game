import { EventBus, EventBusEvents } from '../event-bus'

export const loadConfigurationListener = (callback: () => void) => {
  EventBus.on(EventBusEvents.LoadConfiguration, callback)
}
