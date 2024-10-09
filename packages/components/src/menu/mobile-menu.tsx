import { FocusTrap } from '@mui/base'
import clsx from 'clsx'
import type { FC } from 'react'

import { MenuIcon } from '../icons'
import { MenuItem } from '../menu-item'

import { menuClasses } from './classes'
import { useMobileMenu } from './hooks'
import { MenuModal, MobileMenuIconWrapper, MobileMenuWrapper } from './styles'
import type { MobileMenuProps } from './types'

export const MobileMenu: FC<MobileMenuProps> = ({
  color,
  iconSection,
  items,
  onItemClick,
  onModalStateChange,
  menuBackground,
  itemClassName,
  mobileMenuIconClassName,
  mobileMenuRootClass,
}) => {
  const { open, trigger, onItemClickHandler } = useMobileMenu(onItemClick, onModalStateChange)

  return (
    <>
      <MenuModal
        disablePortal
        hideBackdrop
        keepMounted
        open={open}
        ownerState={{ background: menuBackground }}
        slotProps={{ root: { className: clsx(mobileMenuRootClass, menuClasses.modal, menuClasses.isMobile) } }}
      >
        <FocusTrap disableEnforceFocus open={open}>
          <MobileMenuWrapper tabIndex={-1}>
            {items.map(({ name, path, active }) => (
              <MenuItem
                key={name}
                active={active}
                className={clsx(menuClasses.menuItem, open && menuClasses.showMenuItem, itemClassName)}
                color={color}
                text={name}
                onClick={onItemClickHandler({ name, path })}
              />
            ))}
            {iconSection ? (
              <MobileMenuIconWrapper className={clsx(menuClasses.menuItem, menuClasses.menuItemIcons)}>
                {iconSection.map((icon) => icon)}
              </MobileMenuIconWrapper>
            ) : null}
          </MobileMenuWrapper>
        </FocusTrap>
      </MenuModal>
      <MenuIcon
        active={open}
        className={clsx(mobileMenuIconClassName, menuClasses.icon, menuClasses.isMobile)}
        color={color}
        onClick={trigger}
      />
    </>
  )
}
