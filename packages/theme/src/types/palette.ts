export type PrimarySecondary = {
  primary: string
  secondary: string
}

export type Base = PrimarySecondary & {
  contrast: string
}

export type WebPalette = {
  bodyText: Base
  surface: Base & {
    tertiary: string
    background: string
  }
  border: {
    primary: string
    activeHover: string
    contrast: string
  }
  state: {
    success: PrimarySecondary
    warning: PrimarySecondary
    error: PrimarySecondary
  }
}
