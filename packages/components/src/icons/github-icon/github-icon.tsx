'use client'

import { forwardRef } from 'react'

import { Root } from './styles'
import type { GithubIconProps } from './types'

export const GithubIcon = forwardRef<SVGSVGElement, GithubIconProps>(({ className, onClick, size = 24 }, ref) => (
  <Root className={className} ownerState={{ size }} onClick={onClick}>
    <svg ref={ref} height={size} viewBox="0 0 256 256" width={size} xmlns="http://www.w3.org/2000/svg">
      <path d="M64 0h16v16H64zM80 0h16v16H80zM96 0h16v16H96zM112 0h16v16h-16zM128 0h16v16h-16zM144 0h16v16h-16zM160 0h16v16h-16zM176 0h16v16h-16zM48 16h16v16H48zM64 16h16v16H64zM80 16h16v16H80zM96 16h16v16H96zM112 16h16v16h-16zM128 16h16v16h-16zM144 16h16v16h-16zM160 16h16v16h-16zM176 16h16v16h-16zM192 16h16v16h-16zM32 32h16v16H32zM48 32h16v16H48zM64 32h16v16H64zM80 32h16v16H80zM96 32h16v16H96zM112 32h16v16h-16zM128 32h16v16h-16zM144 32h16v16h-16zM160 32h16v16h-16zM176 32h16v16h-16zM192 32h16v16h-16zM208 32h16v16h-16zM16 48h16v16H16zM32 48h16v16H32zM48 48h16v16H48zM80 48h16v16H80zM96 48h16v16H96zM112 48h16v16h-16zM128 48h16v16h-16zM144 48h16v16h-16zM160 48h16v16h-16zM192 48h16v16h-16zM208 48h16v16h-16zM224 48h16v16h-16zM16 64h16v16H16zM32 64h16v16H32zM48 64h16v16H48zM192 64h16v16h-16zM208 64h16v16h-16zM224 64h16v16h-16zM16 80h16v16H16zM32 80h16v16H32zM48 80h16v16H48zM192 80h16v16h-16zM208 80h16v16h-16zM224 80h16v16h-16zM0 96h16v16H0zM16 96h16v16H16zM32 96h16v16H32zM208 96h16v16h-16zM224 96h16v16h-16zM240 96h16v16h-16zM0 112h16v16H0zM16 112h16v16H16zM32 112h16v16H32zM208 112h16v16h-16zM224 112h16v16h-16zM240 112h16v16h-16zM0 128h16v16H0zM16 128h16v16H16zM32 128h16v16H32zM208 128h16v16h-16zM224 128h16v16h-16zM240 128h16v16h-16zM0 144h16v16H0zM16 144h16v16H16zM32 144h16v16H32zM208 144h16v16h-16zM224 144h16v16h-16zM240 144h16v16h-16zM0 160h16v16H0zM16 160h16v16H16zM32 160h16v16H32zM48 160h16v16H48zM192 160h16v16h-16zM208 160h16v16h-16zM224 160h16v16h-16zM240 160h16v16h-16zM16 176h16v16H16zM32 176h16v16H32zM48 176h16v16H48zM64 176h16v16H64zM176 176h16v16h-16zM192 176h16v16h-16zM208 176h16v16h-16zM224 176h16v16h-16zM16 192h16v16H16zM32 192h16v16H32zM64 192h16v16H64zM80 192h16v16H80zM96 192h16v16H96zM144 192h16v16h-16zM160 192h16v16h-16zM176 192h16v16h-16zM192 192h16v16h-16zM208 192h16v16h-16zM224 192h16v16h-16zM32 208h16v16H32zM48 208h16v16H48zM160 208h16v16h-16zM176 208h16v16h-16zM192 208h16v16h-16zM208 208h16v16h-16zM48 224h16v16H48zM64 224h16v16H64zM80 224h16v16H80zM96 224h16v16H96zM160 224h16v16h-16zM176 224h16v16h-16zM192 224h16v16h-16zM64 240h16v16H64zM80 240h16v16H80zM96 240h16v16H96zM160 240h16v16h-16zM176 240h16v16h-16z" />
    </svg>
  </Root>
))