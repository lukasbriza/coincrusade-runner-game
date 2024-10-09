import clsx from 'clsx'
import type { FC } from 'react'

import { menuIconClasses } from './classes'
import { Root } from './styles'
import type { MenuIconProps } from './types'
import { useMenuIcon } from './use-menu-icon'

export const MenuIcon: FC<MenuIconProps> = ({ className, active, width, height, color, onClick, ...restProps }) => {
  const { isActiveHandler } = useMenuIcon(active, height, onClick)

  return (
    <Root className={className} ownerState={{ color, height, width }} onClick={isActiveHandler} {...restProps}>
      <div className={clsx(menuIconClasses.line, menuIconClasses.a1)} />
      <div className={clsx(menuIconClasses.line, menuIconClasses.a2)} />
      <div className={clsx(menuIconClasses.line, menuIconClasses.a3)} />
    </Root>
  )
}
