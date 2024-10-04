import type { Meta, StoryObj } from '@storybook/react'

import { CloseIcon } from '../../src/index'

const meta = {
  component: CloseIcon,
  title: 'Close icon',
} satisfies Meta<typeof CloseIcon>

type Story = StoryObj<typeof CloseIcon>

export const Primary: Story = {
  args: {},
}

export default meta
