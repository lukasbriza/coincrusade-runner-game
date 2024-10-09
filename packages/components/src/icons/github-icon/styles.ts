import { styled } from '@lukasbriza/styles'

import type { OwnerState } from '../../types'

export const Root = styled('div')<OwnerState<{ size: number }>>(({ theme: { palette }, ownerState: { size } }) => ({
  position: 'relative',
  cursor: 'pointer',
  width: `${size}px`,
  height: `${size}px`,

  '& > path': {
    fill: palette.common.black,
  },

  '& > svg:hover > path': {
    fill: '#F24F28',
  },

  '&::before': {
    position: 'absolute',
    content: "' '",
    background: palette.surface.contrast,
    width: 'calc(99% - 4px)',
    height: 'calc(99% - 1px)',
    zIndex: -1,
    borderRadius: '50%',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
}))
