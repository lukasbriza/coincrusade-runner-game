import { EventBus, EventBusEvents } from '../event-bus'

export const chunkEndListener = (callback: () => void) => {
  EventBus.on(EventBusEvents.ChunkEnd, callback)
}
