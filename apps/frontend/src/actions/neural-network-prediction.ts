'use server'

import type { components } from '@/lib/openapi-fetch'
import client from '@/lib/openapi-fetch'

type Body = components['schemas']['NeuralNetworkDto']

export const neuralNetworkPrediction = async (body: Body) => {
  const { data, error } = await client.POST('/api/predict', { body })
  return { data, error }
}
