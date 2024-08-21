import type { GameStateContextProps } from '@/modules/game/components/context/types'

import { EventBus, EventBusEvents } from '../event-bus'

export const knightDeadListener = (callback: (knight: IKnight, context: GameStateContextProps) => void) => {
  EventBus.on(EventBusEvents.KnightDead, callback)
}
