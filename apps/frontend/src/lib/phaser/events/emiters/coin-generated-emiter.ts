import { EventBus, EventBusEvents } from '../event-bus'

export const coinGeneratedEmiter = () => {
  EventBus.emit(EventBusEvents.CoinGenerated)
}
