import { render, screen, fireEvent } from '@testing-library/react'
import AutoComplete from './index'

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

it('renders the dropdown with a label element', async () => {})
