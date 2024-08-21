import { EventBus, EventBusEvents } from '../event-bus'

export const logMapDifficultyListener = (callback: (mapDifficulty: number) => void) => {
  EventBus.on(EventBusEvents.LogMapDifficulty, callback)
}
