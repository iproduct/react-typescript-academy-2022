import React from 'react';
import { render, screen } from '@testing-library/react';
import AppLambda from './AppLambda';

test('renders learn react link', () => {
  render(<AppLambda name="TypeScript"/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
