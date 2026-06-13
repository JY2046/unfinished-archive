import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './App';

test('renders the archive masthead', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: 'Unfinished Archive' })).toBeVisible();
  expect(screen.getByText('未完成档案')).toBeVisible();
});
