import { getTranslations } from 'next-intl/server'
import type { FC } from 'react'

import { anchors } from '@/shared'
import { MainHeader } from '@/shared/components'

import { ControlsPart, KeyboardKeys, type ControlSectionDefinition } from '../../component'

import { ControlsDivider } from './constrols-divider'
import { ControlPartsSection, Root } from './styles'

export const ControlsSection: FC = async () => {
  const t = await getTranslations('home.controls')
  const movementRightSections: ControlSectionDefinition[] = [
    {
      id: String(Math.random()),
      text: t('movement.right.text'),
      videoUrl: 'right_movement.mp4',
      activeKeyboardKeys: [KeyboardKeys.RIGHT],
    },
  ]
  const movementLeftSections: ControlSectionDefinition[] = [
    {
      id: String(Math.random()),
      text: t('movement.left.text'),
      videoUrl: 'left_movement.mp4',
      activeKeyboardKeys: [KeyboardKeys.LEFT],
    },
  ]
  const movementUpSections: ControlSectionDefinition[] = [
    {
      id: String(Math.random()),
      text: t('movement.jump.text'),
      videoUrl: 'jumping.mp4',
      activeKeyboardKeys: [KeyboardKeys.SPACE, KeyboardKeys.UP],
    },
  ]
  return (
    <Root>
      <MainHeader id={anchors[1].path}>{t('header')}</MainHeader>
      <ControlPartsSection>
        <ControlsPart header={t('movement.headerRight')} sections={movementRightSections} />
        <ControlsDivider />
        <ControlsPart header={t('movement.headerLeft')} sections={movementLeftSections} />
        <ControlsDivider />
        <ControlsPart animate header={t('movement.headerJump')} sections={movementUpSections} />
        <ControlsDivider />
      </ControlPartsSection>
    </Root>
  )
}
