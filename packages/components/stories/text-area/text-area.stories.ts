import type { Meta, StoryObj } from '@storybook/react'

import { TextArea } from '../../src/index'

const meta = {
  component: TextArea,
  title: 'Text area',
} satisfies Meta<typeof TextArea>

type Story = StoryObj<typeof TextArea>

export const Primary: Story = {
  args: {
    defaultValue: 'default value',
    error: false,
    name: 'name',
    required: false,
    disabled: false,
    label: 'label',
    helper: 'helper',
    value: 'value',
  },
}

export default meta
