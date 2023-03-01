import { render, screen, fireEvent } from '@testing-library/react'
import { useForm, useFormContext, RegisterOptions } from 'react-hook-form'
import Dropdown from './index'

const optionList: Option[] = [
  {
    id: 0,
    label: 'Value1',
    value: 'Value1',
    disabled: false,
    text: 'Value2',
  },
  {
    id: 1,
    label: 'Value2',
    value: 'Value2',
    disabled: false,
    text: 'Value2',
  },
]

it('renders the dropdown with a label element and 2 items', async () => {
  render(
    <Dropdown
      label="Dropdown label"
      disabled={false}
      name="unit"
      options={optionList}
      key="dropdown"
      defaultValue=""
      validation={{}}
      onChange={() => {}}
    />,
  )
  const label = screen.getByLabelText('Dropdown label')
  expect(label).toBeInTheDocument()

  const dropdown = screen.getByRole('combobox')
  expect(dropdown.children).toHaveLength(2)
})

// TODO: test error message
// TODO: test onChange handler
// TODO: test validation?
// TODO: test defaultValue?
