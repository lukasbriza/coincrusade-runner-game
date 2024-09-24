import { ANIMATION_KEYS } from '../../assets'

import { knightRunSetup } from './knight-run-setup'

export const knightRun = (knight: IKnight) => {
  knightRunSetup(knight)
  return knight.anims.play(
    {
      key: ANIMATION_KEYS.ANIMATION_KNIGHT_RUN,
      repeat: -1,
      frameRate: 12,
    },
    true,
  )
}
