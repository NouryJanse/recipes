import { screen } from '@testing-library/react'
import Home from '.'
import { renderWithStore } from '../../helpers/testHelper'

const setup = () => renderWithStore(<Home logout={() => {}} />)

it('renders the nav bar', () => {
  setup()
  const Navigation = screen.getByTestId('Navigation')
  expect(Navigation).toBeInTheDocument
})
