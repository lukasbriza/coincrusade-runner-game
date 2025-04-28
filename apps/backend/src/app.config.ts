import * as yup from 'yup'

import { AVAILABLE_MODELS } from './constants'

export type AppConfig = {
  CORS: string[] | undefined
  API_KEY: string
  PORT: number
  NODE_ENV: 'development' | 'production'
  NN_MODEL: string
  DATABASE_URL: string
  MAIL_MODULE_HOST: string
  MAIL_MODULE_USER: string
  MAIL_MODULE_PASSPHRASE: string
  MAIL_RECIPIENT: string
}

export const validateConfig = (config: Partial<Record<string, string>>): AppConfig => {
  const {
    CORS,
    API_KEY,
    PORT,
    NODE_ENV,
    NN_MODEL,
    DATABASE_URL,
    MAIL_MODULE_HOST,
    MAIL_MODULE_USER,
    MAIL_MODULE_PASSPHRASE,
    MAIL_RECIPIENT,
  } = config

  if (config.NODE_ENV === 'development') {
    return { ...config, NN_MODEL: NN_MODEL ?? AVAILABLE_MODELS.nn86 } as unknown as AppConfig
  }

  if (!DATABASE_URL) {
    throw new Error('Missing DATABASE_URL')
  }

  if (!API_KEY) {
    throw new Error('Missing API_KEY')
  }

  if (!MAIL_MODULE_HOST) {
    throw new Error('Missing MAIL_MODULE_HOST')
  }

  if (!MAIL_MODULE_USER) {
    throw new Error('Missing MAIL_MODULE_USER')
  }

  if (!MAIL_MODULE_PASSPHRASE) {
    throw new Error('Missing MAIL_MODULE_PASSPHRASE')
  }

  if (!MAIL_RECIPIENT) {
    throw new Error('Missing MAIL_RECIPIENT')
  }

  const isValidEnvironment = yup.string().oneOf(['development', 'production']).isValidSync(NODE_ENV)

  if (!isValidEnvironment) {
    throw new Error('Invalid NODE_ENV value. Can be only development | production.')
  }

  return {
    CORS: CORS?.split(','),
    PORT: Number(PORT || '9090'),
    API_KEY,
    NODE_ENV: NODE_ENV ?? 'development',
    NN_MODEL: NN_MODEL ?? AVAILABLE_MODELS.nn86,
    DATABASE_URL,
    MAIL_MODULE_HOST,
    MAIL_MODULE_USER,
    MAIL_MODULE_PASSPHRASE,
    MAIL_RECIPIENT,
  }
}
