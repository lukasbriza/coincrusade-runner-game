'use client'

import { webTheme } from '@lukasbriza/theme'
import { forwardRef } from 'react'

import type { KeyboardKeyProps } from './types'

export const LeftKey = forwardRef<SVGSVGElement, KeyboardKeyProps>(
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
      data-testid="leftkey"
      viewBox="111.1869 297.4948 47.4 39.8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="matrix(1, 0, 0, 1, 64.92186737060547, 153.87184143066406)">
        <path
          d="M80.365,145.324h-20.8c-3.6,0-6.8,1.199-9.4,3.898c-2.6,2.602-3.9,5.701-3.9,9.301v11.6
		c0,3.701,1.3,6.801,3.9,9.4s5.8,3.9,9.4,3.9h20.8c3.7,0,6.9-1.301,9.4-3.9c2.6-2.6,3.9-5.699,3.9-9.4v-11.6
		c0-3.6-1.3-6.699-3.9-9.301C87.265,146.523,84.065,145.324,80.365,145.324z"
          fill={isActive ? activeColorSecondary : '#CCCCCC'}
        />
        <path
          d="M78.665,143.623h-16.7c-3,0-5.5,1.101-7.6,3.201c-2.1,2.1-3.1,4.6-3.1,7.5v9.299c0,3,1,5.601,3.1,7.601
		c2.1,2.101,4.6,3.101,7.6,3.101h16.7c3,0,5.5-1,7.6-3.101c2-2,3.1-4.601,3.1-7.601v-9.299c0-2.9-1.1-5.4-3.1-7.5
		C84.165,144.722,81.665,143.623,78.665,143.623z"
          fill={isActive ? activeColor : webTheme.palette.common.white}
        />
        <polygon
          fill={webTheme.palette.bodyText.secondary}
          points="79.065,162.222 79.065,154.722 69.365,154.722 69.365,149.923 60.865,158.523 69.365,166.923 
		69.365,162.222 	"
        />
      </g>
    </svg>
  ),
)
