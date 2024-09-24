import { FocusTrap } from '@mui/base'
import clsx from 'clsx'
import type { FC } from 'react'

import { MenuIcon } from '../menu-icon'
import { MenuItem } from '../menu-item'

import { menuClasses } from './classes'
import { useMobileMenu } from './hooks'
import { MenuModal, MobileMenuWrapper } from './styles'
import type { MobileMenuProps } from './types'

export const MobileMenu: FC<MobileMenuProps> = ({
  color,
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
      <MenuIcon
        active={open}
        className={clsx(mobileMenuIconClassName, menuClasses.icon, menuClasses.isMobile)}
        color={color}
        onClick={trigger}
      />
      <MenuModal
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
          </MobileMenuWrapper>
        </FocusTrap>
      </MenuModal>
    </>
  )
}
