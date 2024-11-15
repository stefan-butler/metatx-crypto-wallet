import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import HomePage from '../src/components/HomePage';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter, useNavigate } from 'react-router-dom'

//mocks the useNavigate hook - use vi.fn() instead of useNavigate
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(), 
  };
});

describe('HomePage Component', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    //reset mock before each test 
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it('renders the enter button', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    const enterButton = screen.getByRole('button', { name: /enter/i });
    expect(enterButton).toBeDefined;
  });

  it('navigates to /generate when enter is clicked', async() => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    const enterButton = screen.getByRole('button', { name: /enter/i });
    await userEvent.click(enterButton);

    expect(mockNavigate).toHaveBeenCalledWith('/generate')
  })
})
