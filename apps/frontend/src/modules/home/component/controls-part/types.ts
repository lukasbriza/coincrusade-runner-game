import type { ComponentBaseProps } from '@lukasbriza/components'
import type { ReactNode } from 'react'

import type { KeyboardKeys } from '../keyboard'

export type ControlSectionDefinition = {
  id: string
  text: string
  videoUrl: string
  activeKeyboardKeys: KeyboardKeys[]
}

export type ControlsPartsProps = ComponentBaseProps & {
  animate?: boolean | undefined
  header: string
  sections: ControlSectionDefinition[]
}

export type PergamenBackgroundProps = ComponentBaseProps & {
  children: ReactNode
}

export type VideoPartProps = {
  section: ControlSectionDefinition
}
