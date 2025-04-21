import { Text } from '@lukasbriza/components'
import type { FC } from 'react'

import { SnackbarContentBase } from './styles'

export const SocketSnackbar: FC<{ message: string }> = ({ message }) => (
  <SnackbarContentBase>
    <Text variant="S">{message}</Text>
  </SnackbarContentBase>
)
