import { EventBus, EventBusEvents } from '../event-bus'

export const emitError = (message: string) => {
  EventBus.emit(EventBusEvents.ThrowError)
  throw new Error(message)
}
