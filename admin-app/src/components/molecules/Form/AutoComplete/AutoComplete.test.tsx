// import { render, screen, fireEvent } from '@testing-library/react'
// import AutoComplete from './index'

// const optionList: Option[] = [
//   {
//     id: 0,
//     label: 'Value1',
//     value: 'Value1',
//     disabled: false,
//     text: 'Value2',
//   },
//   {
//     id: 1,
//     label: 'Value2',
//     value: 'Value2',
//     disabled: false,
//     text: 'Value2',
//   },
// ]

// it('renders the autocomplete component with a label', async () => {
//   render(
//     <AutoComplete
//       name="AutoCompleteName"
//       defaultValue={{
//         id: 0,
//         value: '',
//         label: '',
//         disabled: false,
//         text: 'test',
//       }}
//       labelText="AutoComplete element"
//       options={optionList}
//       handleOnChange={(): boolean => true}
//       errors={{ message: '', type: '' }}
//       setRef={false}
//     />,
//   )

//   const selectComponent = screen.getByRole('combobox')
//   expect(selectComponent).toBeInTheDocument()

//   const labelComponent = screen.getByRole('caption')
//   expect(labelComponent).toBeInTheDocument()
//   expect(labelComponent).toHaveTextContent('AutoComplete element')
// })

// it('should select the option and display the corresponding label as a result', async () => {
//   const { getByTestId } = render(
//     <div data-testid="test">
//       <AutoComplete
//         name="AutoCompleteName"
//         defaultValue={{
//           id: 0,
//           value: '',
//           label: '',
//           disabled: false,
//           text: 'test',
//         }}
//         labelText="AutoComplete element"
//         options={optionList}
//         handleOnChange={(): boolean => true}
//         errors={{ message: '', type: '' }}
//         setRef={false}
//       />
//     </div>,
//   )

//   // step: 1 Opens the dropdown options list
//   const selectComponent = screen.getByRole('combobox')
//   fireEvent.keyDown(selectComponent, { keyCode: 40 })

//   // step: 2 Selects the dropdown option and close the dropdown options list
//   const option = await screen.findByText('Value1') // its a label in options list
//   fireEvent.click(option)

//   // step: 3 Check the selected value
//   expect(getByTestId('test')).toHaveTextContent('Value1')
// })

// it('check if onChange behavior work', async () => {
//   const onChange = jest.fn()

//   render(
//     <AutoComplete
//       name="AutoCompleteName"
//       defaultValue={{
//         id: 0,
//         value: '',
//         label: '',
//         disabled: false,
//         text: 'test',
//       }}
//       labelText="AutoComplete element"
//       errors={{ message: '', type: '' }}
//       options={optionList}
//       handleOnChange={onChange}
//       setRef={false}
//     />,
//   )

//   expect(onChange.mock.calls.length).toBe(0)
//   const selectComponent = screen.getByRole('combobox')

//   await fireEvent.keyDown(selectComponent, { keyCode: 40 })
//   const option = await screen.findByText('Value1')
//   fireEvent.click(option)

//   expect(onChange).toHaveBeenCalledTimes(1)
//   expect(onChange).toHaveBeenCalledWith(optionList[0], { action: 'select-option', name: undefined, option: undefined })
// })

// it('test whether the error message will be shown', async () => {
//   const container = render(
//     <AutoComplete
//       name="AutoCompleteName"
//       defaultValue={{
//         id: 0,
//         value: '',
//         label: '',
//         disabled: false,
//         text: 'test',
//       }}
//       labelText="AutoComplete element"
//       errors={{ message: 'This is an error message for testing', type: '' }}
//       options={optionList}
//       handleOnChange={(): boolean => true}
//       setRef={false}
//     />,
//   )

//   const res = await container.findByTestId('error-message')
//   expect(res).toHaveTextContent('This is an error message for testing')
// })
