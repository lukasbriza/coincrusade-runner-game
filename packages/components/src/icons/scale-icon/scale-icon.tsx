'use client'

import { webTheme } from '@lukasbriza/theme'
import { forwardRef } from 'react'

import type { ScaleIconProps } from './types'

export const ScaleIcon = forwardRef<SVGSVGElement, ScaleIconProps>(({ onClick, size = 24, className }, ref) => (
  <svg
    ref={ref}
    className={className}
    data-testid="scaleicon"
    fill="none"
    viewBox={`0 0 ${size} ${size}`}
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    <path
      d="M21 3h-8v2h4v2h2v4h2V3zm-4 4h-2v2h-2v2h2V9h2V7zm-8 8h2v-2H9v2H7v2h2v-2zm-4-2v4h2v2H5h6v2H3v-8h2z"
      fill={webTheme.palette.common.black}
    />
  </svg>
))
