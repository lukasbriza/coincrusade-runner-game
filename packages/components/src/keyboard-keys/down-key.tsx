'use client'

import { webTheme } from '@lukasbriza/theme'
import { forwardRef } from 'react'

import type { KeyboardKeyProps } from './types'

export const DownKey = forwardRef<SVGSVGElement, KeyboardKeyProps>(
  (
    {
      isActive,
      activeColor = webTheme.palette.state.error.primary,
      activeColorSecondary = webTheme.palette.state.error.secondary,
      ...restProps
    },
    ref,
  ) => (
    <svg
      {...restProps}
      ref={ref}
      data-testid="downkey"
      viewBox="207.0048 252.4567 47.298 39.8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="matrix(1, 0, 0, 1, 103.08980560302734, 108.83366394042967)">
        <path
          d="M138.014,145.324h-20.801c-3.699,0-6.899,1.199-9.399,3.898c-2.7,2.602-3.899,5.701-3.899,9.301v11.6
		c0,3.701,1.199,6.801,3.899,9.4c2.5,2.6,5.7,3.9,9.399,3.9h20.801c3.699,0,6.8-1.301,9.3-3.9c2.7-2.6,3.899-5.699,3.899-9.4v-11.6
		c0-3.6-1.199-6.699-3.899-9.301C144.814,146.523,141.713,145.324,138.014,145.324z"
          fill={isActive ? activeColorSecondary : '#CCCCCC'}
        />
        <path
          d="M136.314,143.623h-16.8c-2.9,0-5.5,1.1-7.5,3.201c-2.1,2.1-3.1,4.6-3.1,7.5v9.299c0,3,1,5.6,3.1,7.6
		c2,2.102,4.6,3.102,7.5,3.102h16.8c2.899,0,5.5-1,7.5-3.102c2.2-2,3.2-4.6,3.2-7.6v-9.299c0-2.9-1-5.4-3.2-7.5
		C141.814,144.722,139.213,143.623,136.314,143.623z"
          fill={isActive ? activeColor : webTheme.palette.common.white}
        />
        <polygon
          fill={webTheme.palette.bodyText.secondary}
          points="131.265,150.023 123.765,150.023 123.765,159.824 119.065,159.824 127.565,168.222 
		136.065,159.824 131.265,159.824 	"
        />
      </g>
    </svg>
  ),
)
