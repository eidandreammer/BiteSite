import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'

jest.mock('@/components/MagicBento/MagicBento.jsx', () => ({
  __esModule: true,
  default: () => <div data-testid="magic-bento" />
}))

jest.mock('@/components/ScrollStack/ScrollStack.jsx', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="scroll-stack">{children}</div>
  ),
  ScrollStackItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="scroll-stack-item">{children}</div>
  )
}))

jest.mock('@/components/ChromaGrid/ChromaGrid.jsx', () => ({
  __esModule: true,
  default: () => <div data-testid="chroma-grid" />
}))

jest.mock('@/components/InfiniteScroll/InfiniteScroll.jsx', () => ({
  __esModule: true,
  default: () => <div className="infinite-scroll-container" data-testid="infinite-scroll" />
}))

jest.mock('@/components/InfiniteMenu/InfiniteMenu.jsx', () => ({
  __esModule: true,
  default: () => <div data-testid="infinite-menu" />
}))

jest.mock('@/components/Stack/Stack.jsx', () => ({
  __esModule: true,
  default: () => <div className="stack-container" data-testid="stack" />
}))

import Features from '@/components/Features'

describe('Features section layout toggle', () => {
  it('renders Grid by default and switches to Stack', () => {
    render(<Features />)

    // Default heading
    expect(
      screen.getByRole('heading', { name: /why choose our web design services\?/i })
    ).toBeInTheDocument()

    // Grid card content present
    expect(screen.getByText(/custom design/i)).toBeInTheDocument()

    // Switch layout to Stack
    const select = screen.getByLabelText(/layout/i)
    fireEvent.change(select, { target: { value: 'stack' } })

    // Stack container should render
    expect(document.querySelector('.stack-container')).toBeInTheDocument()
  })
})


