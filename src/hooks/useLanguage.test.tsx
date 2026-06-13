import { act, renderHook } from '@testing-library/react';
import { beforeEach, expect, test } from 'vitest';
import { useLanguage } from './useLanguage';

beforeEach(() => {
  localStorage.clear();
});

test('starts in English by default', () => {
  const { result } = renderHook(() => useLanguage());

  expect(result.current.language).toBe('en');
});

test('toggles from English to Chinese and persists the choice', () => {
  const { result } = renderHook(() => useLanguage());

  act(() => {
    result.current.toggleLanguage();
  });

  expect(result.current.language).toBe('zh');
  expect(localStorage.getItem('unfinished-archive-language')).toBe('zh');
  expect(document.documentElement.lang).toBe('zh-CN');
});
