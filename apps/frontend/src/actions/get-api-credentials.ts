'use server'

export const getApiCredentials = async (): Promise<{ API_URL: string; API_KEY: string }> =>
  new Promise((resolve) => {
    if (process.env.API_URL === undefined || process.env.API_URL === '') {
      throw new Error('API_URL is not set')
    }

    if (process.env.API_KEY === undefined || process.env.API_KEY === '') {
      throw new Error('API_KEY is not set')
    }

    resolve({ API_URL: process.env.API_URL, API_KEY: process.env.API_KEY })
  })
