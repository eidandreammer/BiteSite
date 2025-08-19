import { render, screen, fireEvent } from '@testing-library/react'
import ColorWheel from '../ColorWheel'

describe('ColorWheel', () => {
  const mockOnChange = jest.fn()
  const mockOnPaletteChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the color picker', () => {
    render(
      <ColorWheel
        value="#3B82F6"
        onChange={mockOnChange}
        onPaletteChange={mockOnPaletteChange}
      />
    )

    expect(screen.getByTestId('color-picker')).toBeInTheDocument()
  })

  it('displays the selected color value', () => {
    render(
      <ColorWheel
        value="#3B82F6"
        onChange={mockOnChange}
        onPaletteChange={mockOnPaletteChange}
      />
    )

    const colorPicker = screen.getByTestId('color-picker') as HTMLInputElement
    expect(colorPicker.value).toBe('#3B82F6')
  })

  it('calls onChange when color is changed', () => {
    render(
      <ColorWheel
        value="#3B82F6"
        onChange={mockOnChange}
        onPaletteChange={mockOnPaletteChange}
      />
    )

    const colorPicker = screen.getByTestId('color-picker')
    fireEvent.change(colorPicker, { target: { value: '#EF4444' } })

    expect(mockOnChange).toHaveBeenCalledWith('#EF4444')
  })

  it('renders harmony type buttons', () => {
    render(
      <ColorWheel
        value="#3B82F6"
        onChange={mockOnChange}
        onPaletteChange={mockOnPaletteChange}
      />
    )

    expect(screen.getByText('Complementary')).toBeInTheDocument()
    expect(screen.getByText('Analogous')).toBeInTheDocument()
    expect(screen.getByText('Triad')).toBeInTheDocument()
  })

  it('displays the generated palette section', () => {
    render(
      <ColorWheel
        value="#3B82F6"
        onChange={mockOnChange}
        onPaletteChange={mockOnPaletteChange}
      />
    )

    expect(screen.getByText('Generated Palette')).toBeInTheDocument()
  })
})
