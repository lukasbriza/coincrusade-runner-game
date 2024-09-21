import { ANIMATION_KEYS } from '../../assets'

export const waterWaves = (water: IWater) => {
  water.anims.play({ key: ANIMATION_KEYS.ANIMATION_SPRITE_WATER, repeat: -1 })
}
