import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../pages/index'

describe('Home', () => {
    it('renders a search form', async () => {
      render(<Home />)
      expect(screen.getByRole('search')).toBeInTheDocument
    })
  })