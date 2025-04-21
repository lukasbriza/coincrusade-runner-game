import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { tensor2d } from '@tensorflow/tfjs'
import type { Tensor } from '@tensorflow/tfjs'

import { AppConfig } from '../../app.config'
import { AVAILABLE_MODELS, MAX_PLATFORM_PENALTY, MAX_PLATFORM_SPEED } from '../../constants'
import { NeuralNetworkDto } from '../../dto'
import { NeuralNetworkRto } from '../../rto'
import { computePlatformModifier, loadNeuralModel } from '../../utils'

import { NeuralNetworkInputShape, NeuralNetworkOutputShape } from './types'

@Injectable()
export class NeuralNetworkService {
  constructor(private readonly configService: ConfigService<AppConfig, true>) {}

  async predict(log: NeuralNetworkDto): Promise<NeuralNetworkRto> {
    const networkInput: NeuralNetworkInputShape = [
      log.chunkMapDifficulties.reduce((a, b) => a + b),
      log.chunkPickedCoins,
      log.chunkGeneratedCoins,
      log.chunkLostLives,
      log.chunkElapsedSeconds,
      log.chunkGainedSeconds,
      computePlatformModifier(MAX_PLATFORM_PENALTY, MAX_PLATFORM_SPEED, log.chunkPlatformSpeed),
    ]

    const selectedModel = this.configService.get('NN_MODEL', { infer: true })
    const nnModel = await loadNeuralModel(selectedModel as AVAILABLE_MODELS)
    const prediction = nnModel.predict(tensor2d([networkInput]))
    const predictionResult = (prediction as Tensor).arraySync()

    const typedResult = Array.isArray(predictionResult)
      ? (predictionResult[0] as NeuralNetworkOutputShape)
      : (predictionResult as unknown as NeuralNetworkOutputShape)

    return {
      decrease: typedResult[0],
      stay: typedResult[1],
      increase: typedResult[2],
    }
  }
}
