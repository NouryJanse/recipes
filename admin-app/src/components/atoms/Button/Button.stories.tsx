// import { ComponentStory, ComponentMeta } from '@storybook/react'

// import Button from './index'

// export default {
//   title: 'Generic/Button',
//   component: Button,
//   parameters: {
//     backgrounds: {
//       default: 'white',
//       values: [
//         {
//           name: 'lightgrey',
//           value: '#eaeaea',
//         },
//         {
//           name: 'white',
//           value: '#FFF',
//         },
//         {
//           name: 'black',
//           value: '#000',
//         },
//       ],
//     },
//   },
// } as ComponentMeta<typeof Button>

// const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

// export const Primary = Template.bind({})
// Primary.args = {
//   buttonStyle: 'primary',
//   type: 'submit',
//   label: 'Button',
//   onClick: (e: Event) => {
//     console.log(e.target)
//   },
// }

// export const PrimaryDisabled = Template.bind({})
// PrimaryDisabled.args = {
//   buttonStyle: 'primary',
//   type: 'submit',
//   label: 'Button',
//   disabled: true,
// }

// export const PrimaryNoEdge = Template.bind({})
// PrimaryNoEdge.args = {
//   buttonStyle: 'primary',
//   type: 'submit',
//   label: 'Button',
//   noedge: true,
// }

// export const Secondary = Template.bind({})
// Secondary.args = {
//   buttonStyle: 'secondary',
//   type: 'reset',
//   label: 'Button',
// }

// export const Tertiary = Template.bind({})
// Tertiary.args = {
//   buttonStyle: 'tertiary',
//   type: 'button',
//   label: 'Button',
// }
