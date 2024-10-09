import type { ComponentBaseProps } from '../types'

export type OnItemClickHandler = ((item: { name: string; path: string }) => void) | undefined

export type MenuProps = ComponentBaseProps & {
  color?: string | undefined
  iconSection?: JSX.Element[] | undefined
  items: { name: string; path: string; active: boolean }[]
  onItemClick?: OnItemClickHandler
  onModalStateChange?: ((open: boolean) => void) | undefined
  menuBackground?: string | undefined
  itemClassName?: string | undefined
  mobileMenuIconClassName?: string | undefined
  mobileMenuRootClass?: string | undefined
}

export type MobileMenuProps = {
  color?: string | undefined
  iconSection?: JSX.Element[] | undefined
  items: { name: string; path: string; active: boolean }[]
  onItemClick?: OnItemClickHandler
  onModalStateChange?: ((open: boolean) => void) | undefined
  menuBackground?: string | undefined
  itemClassName?: string | undefined
  mobileMenuIconClassName?: string | undefined
  mobileMenuRootClass?: string | undefined
}
