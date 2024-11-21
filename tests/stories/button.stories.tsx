import { userEvent, within, expect } from '@storybook/test';

import { Button, buttonVariantsConfig } from '@/components/ui/atoms/button';

import type { Meta, StoryObj } from '@storybook/react';

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

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: (args) => <Button {...args} />
};

export const WithClick: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText('Button'));
    await expect(canvas.getByText('Button')).toBeInTheDocument();
  }
};
