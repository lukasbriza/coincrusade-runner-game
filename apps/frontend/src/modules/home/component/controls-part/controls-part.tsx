/* eslint-disable jsx-a11y/media-has-caption */
import { Text } from '@lukasbriza/components'
import { type FC } from 'react'

import { Keyboard } from '../keyboard'

import { controlsPartClasses } from './classes'
import { PergamenBackground } from './pergamen-background'
import { ContentRoot, Root } from './styles'
import type { ControlsPartsProps } from './types'
import { VideoPart } from './video-part'

export const ControlsPart: FC<ControlsPartsProps> = ({ className, animate, sections, header }) => (
  <Root className={className}>
    <PergamenBackground>
      <Text className={controlsPartClasses.header} variant="h3">
        {header}
      </Text>
      {sections.map((section) => (
        <ContentRoot key={section.id}>
          <VideoPart section={section} />
          <Keyboard
            activeKeys={section.activeKeyboardKeys}
            animate={animate}
            className={controlsPartClasses.keyboard}
          />
          <Text className={controlsPartClasses.text} variant="L">
            {section.text}
          </Text>
        </ContentRoot>
      ))}
    </PergamenBackground>
  </Root>
)
