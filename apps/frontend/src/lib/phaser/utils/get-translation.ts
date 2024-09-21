import { Locale } from '@/i18n/config'

import cs from '../translations/cs.json'
import en from '../translations/en.json'

export const getTranslation = (locale: keyof typeof Locale | undefined) => {
  switch (locale) {
    case Locale.cs: {
      return cs
    }
    case Locale.en: {
      return en
    }
    default: {
      return en
    }
  }
}
