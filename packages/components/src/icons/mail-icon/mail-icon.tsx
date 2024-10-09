'use client'

import { webTheme } from '@lukasbriza/theme'
import { forwardRef } from 'react'

import type { MailIconProps } from './types'

export const MailIcon = forwardRef<SVGSVGElement, MailIconProps>(({ className, onClick, size = 24 }, ref) => (
  <svg
    ref={ref}
    className={className}
    fill="none"
    height={size}
    viewBox="0 0 24 24"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    <path
      d="M22 4H2v16h20V4zM4 18V6h16v12H4zM8 8H6v2h2v2h2v2h4v-2h2v-2h2V8h-2v2h-2v2h-4v-2H8V8z"
      fill={webTheme.palette.common.black}
    />
  </svg>
))
