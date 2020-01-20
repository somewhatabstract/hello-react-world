import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Home link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Home/);
  expect(linkElement).toBeInTheDocument();
});

test('renders About link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/About/);
  expect(linkElement).toBeInTheDocument();
});

test('renders Contact link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Contact/);
  expect(linkElement).toBeInTheDocument();
});
