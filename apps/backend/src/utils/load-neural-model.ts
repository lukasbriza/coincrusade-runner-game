/* eslint-disable @typescript-eslint/require-await */

import { readFileSync } from 'node:fs'
import path from 'node:path'

import { io, loadLayersModel } from '@tensorflow/tfjs'

import { AVAILABLE_MODELS } from '../constants'

export const loadNeuralModel = async (modelType: AVAILABLE_MODELS) => {
  const fileModel = readFileSync(path.normalize(`${__dirname}/../../nn_models/${modelType}/model.json`), 'utf8')
  const fileWeights = readFileSync(path.normalize(`${__dirname}/../../nn_models/${modelType}/model.weights.bin`))

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const model: io.ModelJSON = JSON.parse(fileModel)
  const manifest = io.getWeightSpecs(model.weightsManifest)
  const weightBuffer = new Uint8Array(fileWeights.buffer).buffer

  const handler: io.IOHandler = {
    load: async () => io.getModelArtifactsForJSONSync(model, manifest, weightBuffer as ArrayBuffer),
  }

  const nnModel = await loadLayersModel(handler)
  return nnModel
}
