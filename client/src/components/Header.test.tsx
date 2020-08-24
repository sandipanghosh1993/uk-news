import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  beforeEach(() => {
    render(<Header />);
  });

  it('should render correct header text', () => {
    expect(screen.getByText('UK News')).toBeInTheDocument();
  });
});
