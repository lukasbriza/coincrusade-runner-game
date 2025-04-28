export type LanguageSwitcherOption = {
  value: string
  flag: React.ReactNode
}

export type LanguageSwitcherProps = {
  onSelect?: (value: string) => void
  options: LanguageSwitcherOption[]
  initialValue: string
}
