'use server'

import type { components } from '@/lib/openapi-fetch'
import client from '@/lib/openapi-fetch/client'

type Body = components['schemas']['GameLogDto']

export const saveGameLogs = async (body: Body) => {
  const { data, error } = await client.POST('/api/log', { body })
  return { data, error }
}
