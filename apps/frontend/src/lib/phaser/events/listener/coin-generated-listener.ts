import { EventBus, EventBusEvents } from '../event-bus'

export const coinGeneratedListener = (callback: () => void) => {
  EventBus.on(EventBusEvents.CoinGenerated, callback)
}
