'use client'

import { type MenuProps } from '@lukasbriza/components'
import { useTheme } from '@lukasbriza/theme'
import { type FC } from 'react'

import { useChangeLocale, useCurrentLocale } from '@/i18n/client'
import { LANGUAGE_CHANGED_STORAGE_KEY, PAGE_MAX_WIDTH } from '@/shared'
import { setItem } from '@/utils'

import { useMenuContext } from '../../context'

import { menuWrapperClasses } from './classes'
import { languageSwitcherOptions } from './constants'
import { PageMenu, Root } from './styles'
import { useMenuWrapper } from './use-menu-wrapper'

export const MenuWrapper: FC<Omit<MenuProps, 'menuBackground'>> = ({ color, items, itemClassName, onItemClick }) => {
  const locale = useCurrentLocale()
  const changeLocale = useChangeLocale()

  const { hidden } = useMenuContext()
  const { blurBackground, mobileMenuAcive, handleModalStateChange } = useMenuWrapper()
  const { palette } = useTheme()
  const blur = mobileMenuAcive ? false : blurBackground

  if (hidden) {
    return null
  }

  return (
    <Root ownerState={{ blur }}>
      <PageMenu
        color={color}
        itemClassName={itemClassName}
        items={items}
        languageSwitcher={{
          initialValue: locale,
          options: languageSwitcherOptions,
          onSelect: (value) => {
            setItem(LANGUAGE_CHANGED_STORAGE_KEY, 'true')
            changeLocale(value as 'cs' | 'en')
          },
        }}
        maxWidth={PAGE_MAX_WIDTH}
        menuBackground={palette.surface.tertiary}
        mobileMenuIconClassName={menuWrapperClasses.mobileIcon}
        mobileMenuRootClass={menuWrapperClasses.mobileRoot}
        onItemClick={onItemClick}
        onModalStateChange={handleModalStateChange}
      />
    </Root>
  )
}
