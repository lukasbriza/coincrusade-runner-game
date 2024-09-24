'use client'

import type { FC, ReactNode } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { usePathname } from '@/i18n/routing'
import { routes } from '@/shared'

export type MenuContext = {
  hidden: boolean
}

const defaultValue: MenuContext = {
  hidden: false,
}

const MenuContext = createContext<MenuContext>(defaultValue)

export const MenuContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [hidden, setHidden] = useState<boolean>(defaultValue.hidden)
  const path = usePathname()

  const context: MenuContext = useMemo(
    () => ({
      hidden,
    }),
    [hidden],
  )

  useEffect(() => {
    setHidden(routes.game === path)
  }, [path])

  return <MenuContext.Provider value={context}>{children}</MenuContext.Provider>
}

export const useMenuContext = () => useContext(MenuContext)
