import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './App';

test('renders the archive masthead', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: 'Unfinished Archive' })).toBeVisible();
  expect(screen.getByText('未完成档案')).toBeVisible();
  expect(screen.getByRole('heading', { name: 'Selected Files' })).toBeVisible();
  expect(screen.getByRole('heading', { name: 'AI Signals' })).toBeVisible();
  expect(screen.getByRole('heading', { name: 'Audio Notes' })).toBeVisible();
  expect(screen.getByRole('heading', { name: 'Connect' })).toBeVisible();
  expect(screen.getByRole('link', { name: 'Open Short Video Experiments' })).toBeVisible();
  expect(screen.getByRole('link', { name: 'Open AI News Podcast' })).toBeVisible();
  expect(screen.getByRole('link', { name: 'Listen to AI Dispatch 01' })).toBeVisible();
  expect(screen.getByRole('link', { name: 'Listen to Becoming Notes' })).toBeVisible();
});
