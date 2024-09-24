'use client'

import throttle from 'lodash.throttle'
import { useEffect, useState } from 'react'

export const useMenuWrapper = () => {
  const [blurBackground, setBlurBacground] = useState<boolean>(false)
  const [mobileMenuAcive, setMobileMenuActive] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = throttle(() => setBlurBacground(window.scrollY !== 0), 50)

    handleScroll()
    document.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleModalStateChange = (open: boolean) => setMobileMenuActive(open)

  return { blurBackground, mobileMenuAcive, handleModalStateChange }
}
