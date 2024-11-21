import type { Meta, StoryObj } from '@storybook/react';

import { Button, buttonVariantsConfig } from '@/components/ui/atoms/button';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  args: {
    variant: 'default',
    children: 'Button',
    size: 'lg'
  },
  argTypes: {
    variant: {
      options: Object.keys(buttonVariantsConfig.variants.variant),
      control: { type: 'select' }
    },
    size: {
      options: Object.keys(buttonVariantsConfig.variants.size),
      control: { type: 'select' }
    }
  }
};

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: (args) => <Button {...args} />
};

export default meta;
