/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import type { IPlatformGenerator } from '../generators'
import { LinearGenerator } from '../generators'
import { HamletSystemGenerator } from '../generators/hamlet-system-generator'
import { NeuralNetworkGenerator } from '../generators/neural-network-generator'
import { ReinforcementLearningGenerator } from '../generators/reinforcement-learning-generator'
import type { IScene } from '../types'
import { Generators } from '../types'

export const getGenerator = (scene: IScene): IPlatformGenerator => {
  switch (scene.gameConfig.currentGenerator) {
    case Generators.HamletSystem: {
      return new HamletSystemGenerator(scene)
    }
    case Generators.NeuralNetworkGenerator: {
      return new NeuralNetworkGenerator(scene)
    }
    case Generators.ReinforcementLearningGenerator: {
      return new ReinforcementLearningGenerator(scene)
    }
    default: {
      return new LinearGenerator(scene)
    }
  }
}
