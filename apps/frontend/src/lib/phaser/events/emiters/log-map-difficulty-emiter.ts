import { EventBus, EventBusEvents } from '../event-bus'

export const logMapDifficultyEmiter = (mapDifficulty: number) => {
  EventBus.emit(EventBusEvents.LogMapDifficulty, mapDifficulty)
}
