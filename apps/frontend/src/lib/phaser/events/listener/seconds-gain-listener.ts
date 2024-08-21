import { EventBus, EventBusEvents } from '../event-bus'

export const secondsGainListener = (callback: (seconds: number) => void) => {
  EventBus.on(EventBusEvents.SecondsGain, callback)
}
