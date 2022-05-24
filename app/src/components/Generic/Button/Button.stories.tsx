import { ComponentStory, ComponentMeta } from '@storybook/react'

import Button from './index'

export default {
  label: 'Button',
  component: Button,
  onClick: (): string => {
    return ''
  },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

const generalArgs = { label: 'Button', buttonStyle: 'primary' }

export const Primary = Template.bind({})
Primary.args = {
  ...generalArgs,
  buttonStyle: 'primary',
}

export const Secondary = Template.bind({})
Secondary.args = {
  ...generalArgs,
  buttonStyle: 'secondary',
}
