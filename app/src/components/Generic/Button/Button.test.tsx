import { render, screen } from '@testing-library/react'
import Button from './index'

it('renders with type button and some text', async () => {
  render(<Button type="button" label="test button" />)
  const ButtonComponent = screen.getByRole('button')
  expect(ButtonComponent).toBeInTheDocument()
  expect(ButtonComponent).toHaveTextContent('test button')
  expect(ButtonComponent).toHaveAttribute('type', 'button')
})

it('renders with type reset', async () => {
  render(<Button type="reset" label="test button" />)
  const ButtonComponent = screen.getByRole('button')
  expect(ButtonComponent).toBeInTheDocument()
  expect(ButtonComponent).toHaveAttribute('type', 'reset')
})

it('renders with type submit and a disabled property', async () => {
  render(<Button type="submit" label="test button" disabled />)
  const ButtonComponent = screen.getByRole('button')
  expect(ButtonComponent).toBeInTheDocument()
  expect(ButtonComponent).toHaveAttribute('type', 'submit')
  expect(ButtonComponent).toBeDisabled()
})

it('renders with a class', async () => {
  render(<Button type="submit" label="test button" classes="testClass" />)
  const ButtonComponent = screen.getByRole('button')
  expect(ButtonComponent).toBeInTheDocument()
  expect(ButtonComponent).toHaveClass('testClass')
})

it('renders with a child component', async () => {
  const child = <div data-testid="childOfButton">Im the child</div>
  const { queryByTestId } = render(<Button type="submit">{child}</Button>)
  const renderedChild = queryByTestId('childOfButton')
  const renderedButton = screen.getByRole('button')

  expect(renderedButton).toBeInTheDocument()
  expect(renderedChild).toBeInTheDocument()
  expect(renderedButton).toContainElement(renderedChild)
})
