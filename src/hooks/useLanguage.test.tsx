import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { useLanguage } from './useLanguage';

const STORAGE_KEY = 'unfinished-archive-language';

const resetLanguageTestState = () => {
  localStorage.removeItem(STORAGE_KEY);
  document.documentElement.lang = 'en';
};

beforeEach(() => {
  vi.restoreAllMocks();
  resetLanguageTestState();
});

afterEach(() => {
  vi.restoreAllMocks();
  resetLanguageTestState();
});

test('starts in English by default', () => {
  const { result } = renderHook(() => useLanguage());

  expect(result.current.language).toBe('en');
});

test('starts in Chinese when that language was persisted', () => {
  localStorage.setItem(STORAGE_KEY, 'zh');

  const { result } = renderHook(() => useLanguage());

  expect(result.current.language).toBe('zh');
});

test('toggles from English to Chinese and persists the choice', () => {
  const { result } = renderHook(() => useLanguage());

  act(() => {
    result.current.toggleLanguage();
  });

  expect(result.current.language).toBe('zh');
  expect(localStorage.getItem(STORAGE_KEY)).toBe('zh');
  expect(document.documentElement.lang).toBe('zh-CN');
});

test('falls back to English when reading persisted language throws', () => {
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
    throw new Error('storage unavailable');
  });

  const { result } = renderHook(() => useLanguage());

  expect(result.current.language).toBe('en');
});

test('toggles language in memory when persisting throws', () => {
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('storage unavailable');
  });

  const { result } = renderHook(() => useLanguage());

  act(() => {
    result.current.toggleLanguage();
  });

  expect(result.current.language).toBe('zh');
  expect(document.documentElement.lang).toBe('zh-CN');
});
