import { EventBus, EventBusEvents } from '../event-bus'

export const reasignPlatformSpeedCallbackListener = (callback: () => void) => {
  EventBus.on(EventBusEvents.ReasignPlatformSpeedCallback, callback)
}
