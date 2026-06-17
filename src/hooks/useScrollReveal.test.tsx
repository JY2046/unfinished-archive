import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { useScrollReveal } from './useScrollReveal';

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  private readonly callback: IntersectionObserverCallback;
  readonly root = null;
  readonly rootMargin = '0px';
  readonly thresholds = [0];

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }

  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
  takeRecords = vi.fn(() => []);

  reveal(target: Element) {
    this.callback(
      [
        {
          boundingClientRect: target.getBoundingClientRect(),
          intersectionRatio: 1,
          intersectionRect: target.getBoundingClientRect(),
          isIntersecting: true,
          rootBounds: null,
          target,
          time: 1,
        },
      ],
      this,
    );
  }
}

function RevealFixture() {
  useScrollReveal();

  return (
    <main className="site-shell">
      <section data-testid="section">Visible archive section</section>
    </main>
  );
}

beforeEach(() => {
  MockIntersectionObserver.instances = [];
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

test('marks sections as visible when they enter the viewport', () => {
  render(<RevealFixture />);

  const section = screen.getByTestId('section');
  expect(section).toHaveClass('reveal-section');
  expect(section).not.toHaveClass('is-visible');

  MockIntersectionObserver.instances[0].reveal(section);

  expect(section).toHaveClass('is-visible');
});
