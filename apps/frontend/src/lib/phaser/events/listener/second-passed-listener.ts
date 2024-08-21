import { EventBus, EventBusEvents } from '../event-bus'

export const secondPassedListener = (callback: () => void) => {
  EventBus.on(EventBusEvents.SecondsGain, callback)
}
