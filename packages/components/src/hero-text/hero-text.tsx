import clsx from 'clsx'
import type { FC } from 'react'

import { Text } from '../text'

import { heroTextClasses } from './classes'
import { Root } from './styles'
import type { HeroTextProps } from './types'

export const HeroText: FC<HeroTextProps> = ({ main, subtitle, mainClassName, subtitleClassName, ...restProps }) => (
  <Root {...restProps}>
    <Text className={clsx(heroTextClasses.main, mainClassName)} component="h1" variant="h1">
      {main}
    </Text>
    <Text className={clsx(subtitleClassName, heroTextClasses.subtitle)} component="h3" variant="h3">
      {subtitle}
    </Text>
  </Root>
)
