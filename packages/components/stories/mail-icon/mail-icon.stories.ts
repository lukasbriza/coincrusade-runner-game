import type { Meta, StoryObj } from '@storybook/react'

import { MailIcon } from '../../src/index'

const meta = {
  component: MailIcon,
  title: 'Mail icon',
} satisfies Meta<typeof MailIcon>

type Story = StoryObj<typeof MailIcon>

export const Primary: Story = {
  args: {
    size: 24,
  },
}

export default meta
