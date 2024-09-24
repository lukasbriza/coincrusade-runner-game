import { Generators } from '@/lib/phaser'

export const SKY_COLOR = 'rgba(101, 186, 227, 1)'
export const PAGE_MAX_WIDTH = 2050
export const PAGE_MIN_HEIGHT = 664
export const PERGAMEN_MAX_WIDTH = 1400
export const CONTROLS_VERTICAL_PERGAMEN_BREAKPOINT = 780

export const engines = [
  Generators.LinearGenerator,
  Generators.HamletSystem,
  Generators.NeuralNetworkGenerator,
  Generators.ReinforcementLearningGenerator,
] as const
