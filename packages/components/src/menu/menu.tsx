'use client'

import clsx from 'clsx'
import type { FC } from 'react'

import { MenuItem } from '../menu-item'

import { menuClasses } from './classes'
import { useMenu } from './hooks'
import { MobileMenu } from './mobile-menu'
import { IconsMenuSection, MenuItemsWrapper, Root } from './styles'
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
  ...restProps
}) => {
  const { onItemClickHandler } = useMenu(onItemClick)

  return (
    <Root {...restProps}>
      {iconSection ? (
        <IconsMenuSection className={menuClasses.isDesktop}>{iconSection.map((icon) => icon)}</IconsMenuSection>
      ) : null}
      <MenuItemsWrapper>
        {items.map(({ name, path, active }) => (
          <MenuItem
            key={name}
            active={active}
            className={clsx(menuClasses.isDesktop, itemClassName)}
            color={color}
            text={name}
            onClick={onItemClickHandler({ name, path })}
          />
        ))}
      </MenuItemsWrapper>
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
