import { afterEach, beforeEach, expect, test } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { socialLinks } from './content';

const STORAGE_KEY = 'unfinished-archive-language';

beforeEach(() => {
  localStorage.removeItem(STORAGE_KEY);
  document.documentElement.lang = 'en';
});

afterEach(() => {
  cleanup();
});

test('renders the English brand and primary archive sections', () => {
  render(<App />);

  expect(screen.getByRole('heading', { level: 1, name: 'Unfinished Archive' })).toBeVisible();
  expect(screen.getByText('未完成档案')).toBeVisible();
  expect(screen.getByRole('heading', { level: 2, name: 'Selected Files' })).toBeVisible();
  expect(screen.getByRole('heading', { level: 2, name: 'AI Signals' })).toBeVisible();
  expect(screen.getByRole('heading', { level: 2, name: 'Audio Notes' })).toBeVisible();
  expect(screen.getByRole('heading', { level: 2, name: 'Connect' })).toBeVisible();
  expect(screen.getByRole('link', { name: 'Open Short Video Experiments' })).toBeVisible();
  expect(screen.getByRole('link', { name: 'Open AI News Podcast' })).toBeVisible();
  expect(screen.getByRole('link', { name: 'Listen to AI Dispatch 01' })).toBeVisible();
  expect(screen.getByRole('link', { name: 'Listen to Becoming Notes' })).toBeVisible();
});

test('switches visible copy to Chinese when the language toggle is clicked', async () => {
  const user = userEvent.setup();

  render(<App />);

  await user.click(screen.getByRole('button', { name: '中文' }));

  expect(screen.getByRole('heading', { level: 2, name: '精选档案' })).toBeVisible();
  expect(screen.getByRole('heading', { level: 2, name: 'AI 信号' })).toBeVisible();
  expect(screen.getByRole('heading', { level: 2, name: '声音笔记' })).toBeVisible();
  expect(screen.getByRole('button', { name: 'EN' })).toBeVisible();
});

test('renders navigation links for the archive sections', () => {
  render(<App />);

  expect(screen.getByRole('navigation', { name: 'Primary' })).toBeVisible();
  expect(screen.getByRole('link', { name: 'Files' })).toHaveAttribute('href', '#files');
  expect(screen.getByRole('link', { name: 'Signals' })).toHaveAttribute('href', '#signals');
  expect(screen.getByRole('link', { name: 'Audio' })).toHaveAttribute('href', '#audio');
  expect(screen.getByRole('link', { name: 'Roaming' })).toHaveAttribute('href', '#roaming');
  expect(screen.getByRole('link', { name: 'Connect' })).toHaveAttribute('href', '#connect');
});

test('filters selected files by category', async () => {
  const user = userEvent.setup();

  render(<App />);

  await user.click(screen.getByRole('button', { name: 'Audio' }));

  expect(screen.getByText('AI News Podcast')).toBeVisible();
  expect(screen.getByText('Personal Growth Podcast')).toBeVisible();
  expect(screen.queryByText('Short Video Experiments')).not.toBeInTheDocument();
});

test('does not publish placeholder contact links', () => {
  expect(socialLinks).toHaveLength(1);
  expect(socialLinks).toEqual([
    { id: 'github', label: 'GitHub', href: 'https://github.com/JY2046/unfinished-archive' },
  ]);
  expect(socialLinks.map((link) => link.href)).not.toContain('#');
  expect(socialLinks.map((link) => link.href)).not.toContain('mailto:hello@example.com');
  expect(socialLinks.map((link) => link.href)).not.toContain('https://www.linkedin.com/');
});
