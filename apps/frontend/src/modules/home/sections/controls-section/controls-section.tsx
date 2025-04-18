import type { FC } from 'react'

import { getScopedI18n } from '@/i18n/server'
import { anchors } from '@/shared'
import { MainHeader } from '@/shared/components'

import { ControlsPart, KeyboardKeys, type ControlSectionDefinition } from '../../component'

import { ControlsDivider } from './constrols-divider'
import { ControlPartsSection, Root } from './styles'

export const ControlsSection: FC = async () => {
  const t = await getScopedI18n('home.controls')
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
        <ControlsDivider sizes="60%" />
        <ControlsPart header={t('movement.headerLeft')} sections={movementLeftSections} />
        <ControlsDivider sizes="60%" />
        <ControlsPart animate header={t('movement.headerJump')} sections={movementUpSections} />
        <ControlsDivider sizes="60%" />
      </ControlPartsSection>
    </Root>
  )
}
