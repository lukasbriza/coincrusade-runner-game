import { EventBus, EventBusEvents } from '../event-bus'

export const playerRelocateListener = (callback: (knight: IKnight) => void) => {
  EventBus.on(EventBusEvents.PlayerRelocate, callback)
}
