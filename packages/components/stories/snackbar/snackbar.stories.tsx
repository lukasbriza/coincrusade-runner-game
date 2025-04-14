import type { Meta, StoryObj } from '@storybook/react'

import { Snackbar, Text } from '../../src/index'

const meta = {
  component: Snackbar,
  title: 'Snackbar',
  render: (args) => (
    <Snackbar {...args}>
      <Text variant="S">Snackbar</Text>
    </Snackbar>
  ),
} satisfies Meta<typeof Snackbar>

type Story = StoryObj<typeof Snackbar>

export const Primary: Story = {
  args: {
    autoHideDuration: 5000,
    onClose: () => {
      // eslint-disable-next-line no-console
      console.log('onClose')
    },
  },
}

export default meta
