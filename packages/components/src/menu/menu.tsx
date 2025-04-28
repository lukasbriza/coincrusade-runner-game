'use client'

import clsx from 'clsx'
import type { FC } from 'react'

import { LanguageSwitcher } from '../language-switcher'
import { MenuItem } from '../menu-item'

import { menuClasses } from './classes'
import { useMenu } from './hooks'
import { MobileMenu } from './mobile-menu'
import { IconsMenuSection, LanguageSwitcherWrapper, MenuItemsWrapper, Root } from './styles'
import type { MenuProps } from './types'

export const Menu: FC<MenuProps> = ({
  color,
  items = [],
  iconSection,
  onItemClick,
  onModalStateChange,
  menuBackground,
  itemClassName,
  mobileMenuIconClassName,
  mobileMenuRootClass,
  languageSwitcher,
  maxWidth,
  ...restProps
}) => {
  const { onItemClickHandler } = useMenu(onItemClick)

  return (
    <Root {...restProps} data-testid="menu" ownerState={{ maxWidth }}>
      {iconSection ? (
        <IconsMenuSection className={menuClasses.isDesktop} data-testid="iconmenusection">
          {iconSection.map((icon) => icon)}
        </IconsMenuSection>
      ) : null}
      <MenuItemsWrapper data-testid="menuitemswrapper">
        {items.map(({ name, path, active }) => (
          <MenuItem
            key={name}
            active={active}
            className={clsx(menuClasses.isDesktop, menuClasses.desktopMenuItem, itemClassName)}
            color={color}
            text={name}
            onClick={onItemClickHandler({ name, path })}
          />
        ))}
      </MenuItemsWrapper>
      {languageSwitcher ? (
        <LanguageSwitcherWrapper>
          <LanguageSwitcher {...languageSwitcher} />
        </LanguageSwitcherWrapper>
      ) : null}
      <MobileMenu
        color={color}
        iconSection={iconSection}
        itemClassName={itemClassName}
        items={items}
        menuBackground={menuBackground}
        mobileMenuIconClassName={mobileMenuIconClassName}
        mobileMenuRootClass={mobileMenuRootClass}
        onItemClick={onItemClick}
        onModalStateChange={onModalStateChange}
      />
    </Root>
  )
}
