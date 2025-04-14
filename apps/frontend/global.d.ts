import en from './src/i18n/locales/en'

type Messages = typeof en

declare global {
  interface IntlMessages extends Messages {}
}

