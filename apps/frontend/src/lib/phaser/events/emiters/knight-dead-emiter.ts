import type { GameStateContextProps } from '@/modules/game/components/context/types'

import { EventBus, EventBusEvents } from '../event-bus'

export const knightDeadEmiter = (knight: IKnight, context: GameStateContextProps) => {
  EventBus.emit(EventBusEvents.KnightDead, knight, context)
}
