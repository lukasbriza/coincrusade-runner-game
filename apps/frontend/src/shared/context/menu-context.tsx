'use client'

import { usePathname } from 'next/navigation'
import type { FC, ReactNode } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { useCurrentLocale } from '@/i18n/client'
import { routes } from '@/shared'

export type MenuContext = {
  hidden: boolean
}

const defaultValue: MenuContext = {
  hidden: true,
}

const MenuContext = createContext<MenuContext>(defaultValue)

export const MenuContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [hidden, setHidden] = useState<boolean>(defaultValue.hidden)
  const path = usePathname()
  const locale = useCurrentLocale()

  const context: MenuContext = useMemo(
    () => ({
      hidden,
    }),
    [hidden],
  )

  useEffect(() => {
    setHidden(path === `/${locale}${routes.game}`)
  }, [path, locale])

  return <MenuContext.Provider value={context}>{children}</MenuContext.Provider>
}

export const useMenuContext = () => useContext(MenuContext)
