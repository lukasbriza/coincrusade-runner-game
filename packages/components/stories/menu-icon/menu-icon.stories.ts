import type { Meta, StoryObj } from '@storybook/react'

import { MenuIcon } from '../../src/index'

const meta = {
  component: MenuIcon,
  title: 'Menu icon',
} satisfies Meta<typeof MenuIcon>

type Story = StoryObj<typeof MenuIcon>

export const Primary: Story = {
  args: { active: false, width: undefined, height: undefined },
}

export default meta
