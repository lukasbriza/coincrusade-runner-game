'use client'

import { webTheme } from '@lukasbriza/theme'
import { forwardRef } from 'react'

import type { CloseIconProps } from './types'

export const CloseIcon = forwardRef<SVGSVGElement, CloseIconProps>(({ className, onClick, size = 24 }, ref) => (
  <svg
    ref={ref}
    className={className}
    data-testid="closeicon"
    fill="none"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    <path
      d="M5 5h2v2H5V5zm4 4H7V7h2v2zm2 2H9V9h2v2zm2 0h-2v2H9v2H7v2H5v2h2v-2h2v-2h2v-2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2v-2zm2-2v2h-2V9h2zm2-2v2h-2V7h2zm0 0V5h2v2h-2z"
      fill={webTheme.palette.common.black}
    />
  </svg>
))
