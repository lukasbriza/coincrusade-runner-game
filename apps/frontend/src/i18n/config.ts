export const Locale = {
  cs: 'cs',
  en: 'en',
} as const

export const i18nConfig = {
  locales: [Locale.cs, Locale.en],
  defaultLocale: Locale.en,
  prefixDefault: true,
}
