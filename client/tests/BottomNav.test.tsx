import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BottomNav from '../src/components/BottomNav';
import { describe, it, expect } from 'vitest';
import React from 'react';

describe('BottomNav Component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <BottomNav />
      </MemoryRouter>
    );
    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeDefined();
  });

  it('displays the correct navigation items', () => {
    render(
      <MemoryRouter>
        <BottomNav />
      </MemoryRouter>
    );
    const importLink = screen.getByText(/import/i);
    const generateLink = screen.getByText(/generate/i);
    const transferLink = screen.getByText(/transfer/i);

    expect(importLink).toBeDefined();
    expect(generateLink).toBeDefined();
    expect(transferLink).toBeDefined();
  });
});
