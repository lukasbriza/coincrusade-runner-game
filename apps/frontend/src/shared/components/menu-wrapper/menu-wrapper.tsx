'use client'

import type { MenuProps } from '@lukasbriza/components'
import { useTheme } from '@lukasbriza/theme'
import type { FC } from 'react'

import { menuWrapperClasses } from './classes'
import { PageMenu, Root } from './styles'
import { useMenuWrapper } from './use-menu-wrapper'

export const MenuWrapper: FC<Omit<MenuProps, 'menuBackground'>> = ({ color, items, itemClassName, onItemClick }) => {
  const { blurBackground, mobileMenuAcive, handleModalStateChange } = useMenuWrapper()
  const { palette } = useTheme()
  const blur = mobileMenuAcive ? false : blurBackground

  return (
    <Root ownerState={{ blur }}>
      <PageMenu
        color={color}
        itemClassName={itemClassName}
        items={items}
        menuBackground={palette.surface.tertiary}
        mobileMenuIconClassName={menuWrapperClasses.mobileIcon}
        mobileMenuRootClass={menuWrapperClasses.mobileRoot}
        onItemClick={onItemClick}
        onModalStateChange={handleModalStateChange}
      />
    </Root>
  )
}