import type { FC } from 'react'

import { ButtonStyled, Root } from './styles'
import type { ButtonProps } from './types'
import { useButton } from './use-button'

export const Button: FC<ButtonProps> = (props) => {
  const { type = 'submit', text, borderWidth = 3, className, onClick, disabled = false } = props
  const { ref } = useButton()
  return (
    <Root className={className} data-testid="button">
      <ButtonStyled
        ref={ref}
        disabled={disabled}
        ownerState={{
          borderWidth,
          disabled,
        }}
        type={type}
        onClick={onClick}
      >
        {text}
      </ButtonStyled>
    </Root>
  )
}
