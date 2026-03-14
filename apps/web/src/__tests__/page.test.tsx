import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

// Placeholder — replace with real page component tests
describe('Ntina Web', () => {
  it('renders placeholder content', () => {
    render(<div>Ntina</div>)
    expect(screen.getByText('Ntina')).toBeInTheDocument()
  })
})
