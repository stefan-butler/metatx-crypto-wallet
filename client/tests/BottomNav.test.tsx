import { render, screen } from '@testing-library/react';
import BottomNav from '../src/components/BottomNav';
import { describe, it, expect } from 'vitest';

describe('BottomNav Component', () => {
  it('renders without crashing', () => {
    render(<BottomNav />);
    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeDefined();
  });

  it('displays the correct navigation items', () => {
    render(<BottomNav />);
    const importLink = screen.getByText(/import/i);
    const generateLink = screen.getByText(/generate/i);
    const transferLink = screen.getByText(/transfer/i);

    expect(importLink).toBeDefined();
    expect(generateLink).toBeDefined();
    expect(transferLink).toBeDefined();
  })
});
