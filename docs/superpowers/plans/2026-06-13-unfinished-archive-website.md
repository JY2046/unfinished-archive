# Unfinished Archive Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish the first version of the bilingual `Unfinished Archive / 未完成档案` personal brand website as a static GitHub Pages-ready frontend.

**Architecture:** Use a Vite + React + TypeScript single-page app with static structured content. Keep content, presentation components, language state, and visual styling separate so the site is easy to update as real links and assets arrive.

**Tech Stack:** Vite, React, TypeScript, Vitest, React Testing Library, Playwright, plain CSS, GitHub Pages deployment via `gh-pages`.

---

## Source Spec

- Design spec: `docs/superpowers/specs/2026-06-13-unfinished-archive-design.md`
- Visual reference: `docs/assets/unfinished-archive-independent-culture-journal.png`
- Remote repository: `https://github.com/JY2046/unfinished-archive`

## Planned File Structure

- Create: `package.json` - scripts, runtime dependencies, test dependencies, GitHub Pages deploy command.
- Create: `index.html` - Vite entry document and base metadata.
- Create: `vite.config.ts` - Vite config with GitHub Pages base path.
- Create: `tsconfig.json` - app TypeScript config.
- Create: `tsconfig.node.json` - Vite config TypeScript config.
- Create: `vitest.config.ts` - Vitest + jsdom setup.
- Create: `playwright.config.ts` - browser test config.
- Create: `src/main.tsx` - React entry point.
- Create: `src/App.tsx` - page shell and section composition.
- Create: `src/App.test.tsx` - app behavior tests.
- Create: `src/test/setup.ts` - Testing Library setup.
- Create: `src/types.ts` - content and language types.
- Create: `src/content.ts` - bilingual static content model.
- Create: `src/hooks/useLanguage.ts` - language toggle and persistence hook.
- Create: `src/hooks/useLanguage.test.tsx` - language hook tests.
- Create: `src/components/Header.tsx` - navigation and language switch.
- Create: `src/components/Cover.tsx` - masthead and intro.
- Create: `src/components/FeatureIndex.tsx` - three entry paths.
- Create: `src/components/SelectedFiles.tsx` - filterable selected file archive.
- Create: `src/components/Signals.tsx` - AI/product/design thought section.
- Create: `src/components/AudioNotes.tsx` - podcast section.
- Create: `src/components/Capabilities.tsx` - capability matrix.
- Create: `src/components/Roaming.tsx` - travel/life observation strip.
- Create: `src/components/Connect.tsx` - social/contact footer.
- Create: `src/styles.css` - global editorial magazine styling.
- Create: `src/vite-env.d.ts` - Vite client types.
- Create: `tests/homepage.spec.ts` - Playwright smoke and responsive tests.
- Create: `.github/workflows/pages.yml` - optional GitHub Pages CI deploy workflow.

## Task 1: Scaffold The Vite React App

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vitest.config.ts`
- Create: `src/vite-env.d.ts`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles.css`

- [ ] **Step 1: Write minimal app files**

Create `package.json`:

```json
{
  "name": "unfinished-archive",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "homepage": "https://jy2046.github.io/unfinished-archive/",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "e2e": "playwright test",
    "deploy": "npm run build && gh-pages -d dist"
  },
  "dependencies": {
    "@vitejs/plugin-react": "^5.0.0",
    "gh-pages": "^6.3.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "vite": "^7.0.0"
  },
  "devDependencies": {
    "@playwright/test": "^1.54.0",
    "@testing-library/jest-dom": "^6.6.0",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.6.0",
    "@types/react": "^19.1.0",
    "@types/react-dom": "^19.1.0",
    "jsdom": "^26.1.0",
    "typescript": "^5.8.0",
    "vitest": "^3.2.0"
  }
}
```

Create `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Unfinished Archive / 未完成档案: an archive of AI, taste, creation, and becoming."
    />
    <title>Unfinished Archive / 未完成档案</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Create `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/unfinished-archive/',
  plugins: [react()],
});
```

Create `tsconfig.json`:

```json
{
  "files": [],
  "references": [{ "path": "./tsconfig.node.json" }],
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src", "tests"]
}
```

Create `tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts", "vitest.config.ts", "playwright.config.ts"]
}
```

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
```

Create `src/vite-env.d.ts`:

```ts
/// <reference types="vite/client" />
```

Create `src/main.tsx`:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

Create `src/App.tsx`:

```tsx
export default function App() {
  return (
    <main className="site-shell">
      <h1>Unfinished Archive</h1>
      <p>未完成档案</p>
    </main>
  );
}
```

Create `src/styles.css`:

```css
:root {
  color: #171513;
  background: #f7f2e8;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background: #f7f2e8;
}

.site-shell {
  min-height: 100vh;
  padding: 48px;
}
```

- [ ] **Step 2: Install dependencies**

Run:

```bash
npm install
```

Expected: `package-lock.json` is created and dependencies install successfully.

- [ ] **Step 3: Build the scaffold**

Run:

```bash
npm run build
```

Expected: TypeScript and Vite build finish successfully and create `dist/`.

- [ ] **Step 4: Commit scaffold**

Run:

```bash
git add package.json package-lock.json index.html vite.config.ts tsconfig.json tsconfig.node.json vitest.config.ts src
git commit -m "Scaffold Vite React site"
```

Expected: Commit succeeds.

## Task 2: Add Content Types And Bilingual Data

**Files:**
- Create: `src/types.ts`
- Create: `src/content.ts`
- Create: `src/test/setup.ts`
- Create: `src/App.test.tsx`

- [ ] **Step 1: Write failing content rendering test**

Create `src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

Create `src/App.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the bilingual brand and primary sections', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /Unfinished Archive/i })).toBeInTheDocument();
  expect(screen.getByText('未完成档案')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Selected Files/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /AI Signals/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Audio Notes/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Connect/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- src/App.test.tsx
```

Expected: FAIL because `Selected Files`, `AI Signals`, `Audio Notes`, and `Connect` are not implemented yet.

- [ ] **Step 3: Add content model**

Create `src/types.ts`:

```ts
export type Language = 'en' | 'zh';

export type LocalizedText = Record<Language, string>;

export type Feature = {
  id: string;
  number: string;
  title: LocalizedText;
  summary: LocalizedText;
  href: string;
};

export type FileCategory = 'creation' | 'ai' | 'audio' | 'roaming' | 'work';

export type SelectedFile = {
  id: string;
  number: string;
  category: FileCategory;
  title: LocalizedText;
  meaning: LocalizedText;
  platform: string;
  href: string;
};

export type Signal = {
  id: string;
  number: string;
  title: LocalizedText;
  body: LocalizedText;
};

export type AudioNote = {
  id: string;
  title: LocalizedText;
  positioning: LocalizedText;
  recommendedEpisode: LocalizedText;
  href: string;
};

export type Capability = {
  id: string;
  title: LocalizedText;
  proof: LocalizedText;
};

export type RoamingNote = {
  id: string;
  place: LocalizedText;
  caption: LocalizedText;
  meta: string;
};

export type SocialLink = {
  id: string;
  label: string;
  href: string;
};
```

Create `src/content.ts`:

```ts
import type { AudioNote, Capability, Feature, RoamingNote, SelectedFile, Signal, SocialLink } from './types';

export const brand = {
  title: 'Unfinished Archive',
  titleZh: '未完成档案',
  tagline: {
    en: 'An unfinished archive of AI, taste, creation, and becoming.',
    zh: '一份关于 AI、审美、创作与成为自己的未完成档案。',
  },
  identity: {
    en: 'AI product thinker · creator · podcaster · observer',
    zh: 'AI 产品思考者 · 创作者 · 播客主 · 观察者',
  },
  intro: {
    en: 'A personal index for products, media, places, and unfinished thoughts collected while learning how intelligence can feel more human.',
    zh: '这里收藏产品、媒介、地点与仍在形成中的想法，也记录我如何理解更有人味的智能。',
  },
};

export const features: Feature[] = [
  {
    id: 'creation',
    number: '01',
    title: { en: 'Creation', zh: '创作' },
    summary: { en: 'Short videos, visual experiments, and public notes.', zh: '短视频、视觉实验与公开表达。' },
    href: '#files',
  },
  {
    id: 'signals',
    number: '02',
    title: { en: 'AI Signals', zh: 'AI 信号' },
    summary: { en: 'Small observations about products, interfaces, and tools.', zh: '关于产品、界面与工具的细小观察。' },
    href: '#signals',
  },
  {
    id: 'audio',
    number: '03',
    title: { en: 'Audio Notes', zh: '声音笔记' },
    summary: { en: 'Podcasts about AI news, personal growth, and becoming.', zh: '关于 AI 资讯、个人成长和成为自己的播客。' },
    href: '#audio',
  },
];

export const selectedFiles: SelectedFile[] = [
  {
    id: 'short-video',
    number: '001',
    category: 'creation',
    title: { en: 'Short Video Experiments', zh: '短视频创作实验' },
    meaning: { en: 'A public practice in rhythm, taste, and storytelling.', zh: '关于节奏、审美与表达方式的公开练习。' },
    platform: 'Douyin / Xiaohongshu',
    href: '#connect',
  },
  {
    id: 'ai-news-podcast',
    number: '002',
    category: 'audio',
    title: { en: 'AI News Podcast', zh: 'AI 资讯播客' },
    meaning: { en: 'A habit of tracking signals before they become obvious.', zh: '在趋势变得显而易见之前，先练习捕捉信号。' },
    platform: 'Podcast',
    href: '#audio',
  },
  {
    id: 'growth-podcast',
    number: '003',
    category: 'audio',
    title: { en: 'Personal Growth Podcast', zh: '个人成长播客' },
    meaning: { en: 'A record of becoming, doubt, momentum, and self-design.', zh: '关于成长、怀疑、行动力和自我设计的记录。' },
    platform: 'Podcast',
    href: '#audio',
  },
  {
    id: 'product-note',
    number: '004',
    category: 'ai',
    title: { en: 'Product Observation Notes', zh: '产品观察笔记' },
    meaning: { en: 'Questions about what makes AI products calm, useful, and humane.', zh: '追问什么样的 AI 产品能变得安静、有效且有人味。' },
    platform: 'Archive',
    href: '#signals',
  },
  {
    id: 'roaming-note',
    number: '005',
    category: 'roaming',
    title: { en: 'Roaming Field Notes', zh: '漫游田野笔记' },
    meaning: { en: 'Travel and life fragments as training data for taste.', zh: '把旅行与生活碎片当作审美的训练材料。' },
    platform: 'Places',
    href: '#roaming',
  },
];

export const signals: Signal[] = [
  {
    id: 'calm-ai',
    number: 'Signal 01',
    title: { en: 'Helpful, not noisy', zh: '有用，而不是吵闹' },
    body: { en: 'What makes an AI product feel helpful instead of loud?', zh: '什么样的 AI 产品会让人觉得被帮助，而不是被打扰？' },
  },
  {
    id: 'taste-amplifier',
    number: 'Signal 02',
    title: { en: 'Taste amplifier', zh: '审美放大器' },
    body: { en: 'The best AI tools may feel less like automation and more like taste amplification.', zh: '好的 AI 工具也许不是替你自动化，而是放大你的判断力和审美。' },
  },
  {
    id: 'human-interface',
    number: 'Signal 03',
    title: { en: 'Human interface', zh: '有人味的界面' },
    body: { en: 'I am collecting interfaces where intelligence becomes calm, legible, and human.', zh: '我正在收集那些让智能变得安静、清晰、有人味的界面。' },
  },
];

export const audioNotes: AudioNote[] = [
  {
    id: 'ai-news-one',
    title: { en: 'AI Dispatch 01', zh: 'AI 资讯播客 01' },
    positioning: { en: 'Fast-moving AI news, distilled into usable context.', zh: '把快速变化的 AI 资讯整理成可理解的上下文。' },
    recommendedEpisode: { en: 'Recommended episode coming soon', zh: '推荐单集即将补充' },
    href: '#connect',
  },
  {
    id: 'ai-news-two',
    title: { en: 'AI Dispatch 02', zh: 'AI 资讯播客 02' },
    positioning: { en: 'Signals, tools, and questions from the AI product frontier.', zh: '来自 AI 产品前沿的信号、工具与问题。' },
    recommendedEpisode: { en: 'Recommended episode coming soon', zh: '推荐单集即将补充' },
    href: '#connect',
  },
  {
    id: 'growth',
    title: { en: 'Becoming Notes', zh: '个人成长播客' },
    positioning: { en: 'A personal audio journal about growth and self-design.', zh: '关于成长和自我设计的个人声音日志。' },
    recommendedEpisode: { en: 'Recommended episode coming soon', zh: '推荐单集即将补充' },
    href: '#connect',
  },
];

export const capabilities: Capability[] = [
  {
    id: 'product-sense',
    title: { en: 'Product Sense', zh: '产品感' },
    proof: { en: 'Framing problems, reading signals, and shaping useful experiences.', zh: '定义问题、捕捉信号，并把想法整理成有用体验。' },
  },
  {
    id: 'creative-direction',
    title: { en: 'Creative Direction', zh: '创意方向' },
    proof: { en: 'Turning fragments into a coherent visual and narrative system.', zh: '把碎片整理成有一致性的视觉与叙事系统。' },
  },
  {
    id: 'content-systems',
    title: { en: 'Content Systems', zh: '内容系统' },
    proof: { en: 'Building repeatable formats for video, audio, and public learning.', zh: '为视频、播客和公开学习建立可持续的表达格式。' },
  },
  {
    id: 'ai-tooling',
    title: { en: 'AI Tooling', zh: 'AI 工具敏感度' },
    proof: { en: 'Testing tools through the lens of workflow, taste, and utility.', zh: '从流程、审美和实用性角度测试 AI 工具。' },
  },
  {
    id: 'storytelling',
    title: { en: 'Storytelling', zh: '叙事能力' },
    proof: { en: 'Making abstract ideas easier to follow, remember, and share.', zh: '把抽象想法变得容易理解、记住和分享。' },
  },
  {
    id: 'cultural-observation',
    title: { en: 'Cultural Observation', zh: '文化观察' },
    proof: { en: 'Using places, media, and everyday details as material for taste.', zh: '把地点、媒介和日常细节转化成审美材料。' },
  },
];

export const roamingNotes: RoamingNote[] = [
  {
    id: 'cities',
    place: { en: 'Cities collected in motion', zh: '移动中收藏的城市' },
    caption: { en: 'A quiet record of places, textures, and small decisions of taste.', zh: '记录地点、质感和那些微小的审美判断。' },
    meta: 'Roaming / Field notes',
  },
  {
    id: 'future-map',
    place: { en: 'Map coming later', zh: '地图稍后补充' },
    caption: { en: 'A Polarsteps or Polarstrip link can live here once the route is mapped.', zh: '等路线整理好后，这里可以放 Polarsteps 或 Polarstrip 链接。' },
    meta: 'Travel archive',
  },
];

export const socialLinks: SocialLink[] = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/JY2046/unfinished-archive' },
  { id: 'xiaohongshu', label: 'Xiaohongshu', href: '#' },
  { id: 'douyin', label: 'Douyin', href: '#' },
  { id: 'podcast', label: 'Podcast', href: '#' },
  { id: 'email', label: 'Email', href: 'mailto:hello@example.com' },
  { id: 'resume', label: 'Resume', href: '#' },
];
```

- [ ] **Step 4: Render section headings in `src/App.tsx`**

Replace `src/App.tsx`:

```tsx
import { audioNotes, brand, capabilities, features, roamingNotes, selectedFiles, signals, socialLinks } from './content';

export default function App() {
  return (
    <main className="site-shell">
      <header>
        <p>{brand.titleZh}</p>
        <h1>{brand.title}</h1>
        <p>{brand.tagline.en}</p>
      </header>

      <section aria-labelledby="feature-index-title">
        <h2 id="feature-index-title">Feature Index</h2>
        {features.map((feature) => (
          <article key={feature.id}>
            <p>{feature.number}</p>
            <h3>{feature.title.en}</h3>
            <p>{feature.summary.en}</p>
          </article>
        ))}
      </section>

      <section id="files" aria-labelledby="files-title">
        <h2 id="files-title">Selected Files</h2>
        {selectedFiles.map((file) => (
          <article key={file.id}>
            <p>{file.number}</p>
            <h3>{file.title.en}</h3>
            <p>{file.meaning.en}</p>
            <p>{file.platform}</p>
          </article>
        ))}
      </section>

      <section id="signals" aria-labelledby="signals-title">
        <h2 id="signals-title">AI Signals</h2>
        {signals.map((signal) => (
          <article key={signal.id}>
            <p>{signal.number}</p>
            <h3>{signal.title.en}</h3>
            <p>{signal.body.en}</p>
          </article>
        ))}
      </section>

      <section id="audio" aria-labelledby="audio-title">
        <h2 id="audio-title">Audio Notes</h2>
        {audioNotes.map((audio) => (
          <article key={audio.id}>
            <h3>{audio.title.en}</h3>
            <p>{audio.positioning.en}</p>
            <p>{audio.recommendedEpisode.en}</p>
          </article>
        ))}
      </section>

      <section aria-labelledby="capabilities-title">
        <h2 id="capabilities-title">Capabilities</h2>
        {capabilities.map((capability) => (
          <article key={capability.id}>
            <h3>{capability.title.en}</h3>
            <p>{capability.proof.en}</p>
          </article>
        ))}
      </section>

      <section id="roaming" aria-labelledby="roaming-title">
        <h2 id="roaming-title">Roaming</h2>
        {roamingNotes.map((note) => (
          <article key={note.id}>
            <p>{note.meta}</p>
            <h3>{note.place.en}</h3>
            <p>{note.caption.en}</p>
          </article>
        ))}
      </section>

      <footer id="connect" aria-labelledby="connect-title">
        <h2 id="connect-title">Connect</h2>
        {socialLinks.map((link) => (
          <a key={link.id} href={link.href}>
            {link.label}
          </a>
        ))}
      </footer>
    </main>
  );
}
```

- [ ] **Step 5: Run tests**

Run:

```bash
npm test -- src/App.test.tsx
```

Expected: PASS.

- [ ] **Step 6: Commit content model**

Run:

```bash
git add src/types.ts src/content.ts src/test/setup.ts src/App.test.tsx src/App.tsx
git commit -m "Add bilingual archive content model"
```

Expected: Commit succeeds.

## Task 3: Add Language Toggle Hook

**Files:**
- Create: `src/hooks/useLanguage.ts`
- Create: `src/hooks/useLanguage.test.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Write failing hook tests**

Create `src/hooks/useLanguage.test.tsx`:

```tsx
import { act, renderHook } from '@testing-library/react';
import { useLanguage } from './useLanguage';

beforeEach(() => {
  window.localStorage.clear();
});

test('starts in English by default', () => {
  const { result } = renderHook(() => useLanguage());

  expect(result.current.language).toBe('en');
});

test('toggles from English to Chinese and persists the choice', () => {
  const { result, rerender } = renderHook(() => useLanguage());

  act(() => result.current.toggleLanguage());
  rerender();

  expect(result.current.language).toBe('zh');
  expect(window.localStorage.getItem('unfinished-archive-language')).toBe('zh');
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run:

```bash
npm test -- src/hooks/useLanguage.test.tsx
```

Expected: FAIL because `useLanguage` does not exist.

- [ ] **Step 3: Implement hook**

Create `src/hooks/useLanguage.ts`:

```ts
import { useEffect, useState } from 'react';
import type { Language } from '../types';

const storageKey = 'unfinished-archive-language';

function readInitialLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const stored = window.localStorage.getItem(storageKey);
  return stored === 'zh' ? 'zh' : 'en';
}

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(readInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem(storageKey, language);
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  }, [language]);

  function toggleLanguage() {
    setLanguage((current) => (current === 'en' ? 'zh' : 'en'));
  }

  return { language, toggleLanguage };
}
```

- [ ] **Step 4: Run hook tests**

Run:

```bash
npm test -- src/hooks/useLanguage.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit language hook**

Run:

```bash
git add src/hooks/useLanguage.ts src/hooks/useLanguage.test.tsx
git commit -m "Add persisted language toggle"
```

Expected: Commit succeeds.

## Task 4: Split Page Into Focused Components

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/components/Cover.tsx`
- Create: `src/components/FeatureIndex.tsx`
- Create: `src/components/SelectedFiles.tsx`
- Create: `src/components/Signals.tsx`
- Create: `src/components/AudioNotes.tsx`
- Create: `src/components/Capabilities.tsx`
- Create: `src/components/Roaming.tsx`
- Create: `src/components/Connect.tsx`
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

- [ ] **Step 1: Extend app test for navigation and language toggle**

Replace `src/App.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  window.localStorage.clear();
});

test('renders the English brand and primary sections', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /Unfinished Archive/i })).toBeInTheDocument();
  expect(screen.getByText('未完成档案')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Selected Files/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /AI Signals/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Audio Notes/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Connect/i })).toBeInTheDocument();
});

test('switches the page copy to Chinese', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole('button', { name: /中文/i }));

  expect(screen.getByRole('heading', { name: /精选档案/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /AI 信号/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /声音笔记/i })).toBeInTheDocument();
});

test('renders navigation links to archive sections', () => {
  render(<App />);

  expect(screen.getByRole('link', { name: /Files/i })).toHaveAttribute('href', '#files');
  expect(screen.getByRole('link', { name: /Signals/i })).toHaveAttribute('href', '#signals');
  expect(screen.getByRole('link', { name: /Audio/i })).toHaveAttribute('href', '#audio');
  expect(screen.getByRole('link', { name: /Roaming/i })).toHaveAttribute('href', '#roaming');
  expect(screen.getByRole('link', { name: /Connect/i })).toHaveAttribute('href', '#connect');
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run:

```bash
npm test -- src/App.test.tsx
```

Expected: FAIL because components and Chinese language rendering are not wired into `App`.

- [ ] **Step 3: Create components**

Create `src/components/Header.tsx`:

```tsx
import type { Language } from '../types';

type HeaderProps = {
  language: Language;
  onToggleLanguage: () => void;
};

const navItems = [
  { label: 'Files', href: '#files' },
  { label: 'Signals', href: '#signals' },
  { label: 'Audio', href: '#audio' },
  { label: 'Roaming', href: '#roaming' },
  { label: 'Connect', href: '#connect' },
];

export function Header({ language, onToggleLanguage }: HeaderProps) {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Unfinished Archive home">
        UA
      </a>
      <nav aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <button className="language-toggle" type="button" onClick={onToggleLanguage}>
        {language === 'en' ? '中文' : 'EN'}
      </button>
    </header>
  );
}
```

Create `src/components/Cover.tsx`:

```tsx
import { brand } from '../content';
import type { Language } from '../types';

type CoverProps = {
  language: Language;
};

export function Cover({ language }: CoverProps) {
  return (
    <section id="top" className="cover" aria-labelledby="cover-title">
      <p className="issue-label">Issue 001 · Since 2026</p>
      <h1 id="cover-title">{brand.title}</h1>
      <p className="cover-title-zh">{brand.titleZh}</p>
      <p className="tagline">{brand.tagline[language]}</p>
      <p className="identity">{brand.identity[language]}</p>
      <p className="intro">{brand.intro[language]}</p>
    </section>
  );
}
```

Create `src/components/FeatureIndex.tsx`:

```tsx
import { features } from '../content';
import type { Language } from '../types';

type FeatureIndexProps = {
  language: Language;
};

export function FeatureIndex({ language }: FeatureIndexProps) {
  return (
    <section className="feature-index" aria-labelledby="feature-index-title">
      <p className="section-kicker">{language === 'en' ? 'Start here' : '从这里开始'}</p>
      <h2 id="feature-index-title">{language === 'en' ? 'Feature Index' : '专题索引'}</h2>
      <div className="feature-list">
        {features.map((feature) => (
          <a className="feature-item" href={feature.href} key={feature.id}>
            <span>{feature.number}</span>
            <strong>{feature.title[language]}</strong>
            <em>{feature.summary[language]}</em>
          </a>
        ))}
      </div>
    </section>
  );
}
```

Create `src/components/SelectedFiles.tsx`:

```tsx
import { selectedFiles } from '../content';
import type { Language } from '../types';

type SelectedFilesProps = {
  language: Language;
};

export function SelectedFiles({ language }: SelectedFilesProps) {
  return (
    <section id="files" className="selected-files" aria-labelledby="files-title">
      <p className="section-kicker">{language === 'en' ? 'Curated fragments' : '精选片段'}</p>
      <h2 id="files-title">{language === 'en' ? 'Selected Files' : '精选档案'}</h2>
      <div className="file-list">
        {selectedFiles.map((file) => (
          <a className="file-row" href={file.href} key={file.id}>
            <span>{file.number}</span>
            <span>{file.category}</span>
            <strong>{file.title[language]}</strong>
            <em>{file.meaning[language]}</em>
            <span>{file.platform}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
```

Create `src/components/Signals.tsx`:

```tsx
import { signals } from '../content';
import type { Language } from '../types';

type SignalsProps = {
  language: Language;
};

export function Signals({ language }: SignalsProps) {
  return (
    <section id="signals" className="signals" aria-labelledby="signals-title">
      <p className="section-kicker">{language === 'en' ? 'Product questions' : '产品问题'}</p>
      <h2 id="signals-title">{language === 'en' ? 'AI Signals' : 'AI 信号'}</h2>
      <div className="signal-grid">
        {signals.map((signal) => (
          <article className="signal" key={signal.id}>
            <p>{signal.number}</p>
            <h3>{signal.title[language]}</h3>
            <blockquote>{signal.body[language]}</blockquote>
          </article>
        ))}
      </div>
    </section>
  );
}
```

Create `src/components/AudioNotes.tsx`:

```tsx
import { audioNotes } from '../content';
import type { Language } from '../types';

type AudioNotesProps = {
  language: Language;
};

export function AudioNotes({ language }: AudioNotesProps) {
  return (
    <section id="audio" className="audio-notes" aria-labelledby="audio-title">
      <p className="section-kicker">{language === 'en' ? 'Recorded thoughts' : '声音记录'}</p>
      <h2 id="audio-title">{language === 'en' ? 'Audio Notes' : '声音笔记'}</h2>
      <div className="audio-list">
        {audioNotes.map((audio) => (
          <a className="audio-row" href={audio.href} key={audio.id}>
            <span className="audio-cover" aria-hidden="true" />
            <strong>{audio.title[language]}</strong>
            <em>{audio.positioning[language]}</em>
            <span>{audio.recommendedEpisode[language]}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
```

Create `src/components/Capabilities.tsx`:

```tsx
import { capabilities } from '../content';
import type { Language } from '../types';

type CapabilitiesProps = {
  language: Language;
};

export function Capabilities({ language }: CapabilitiesProps) {
  return (
    <section className="capabilities" aria-labelledby="capabilities-title">
      <p className="section-kicker">{language === 'en' ? 'Working range' : '能力范围'}</p>
      <h2 id="capabilities-title">{language === 'en' ? 'Capabilities' : '能力'}</h2>
      <div className="capability-grid">
        {capabilities.map((capability) => (
          <article className="capability" key={capability.id}>
            <h3>{capability.title[language]}</h3>
            <p>{capability.proof[language]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
```

Create `src/components/Roaming.tsx`:

```tsx
import { roamingNotes } from '../content';
import type { Language } from '../types';

type RoamingProps = {
  language: Language;
};

export function Roaming({ language }: RoamingProps) {
  return (
    <section id="roaming" className="roaming" aria-labelledby="roaming-title">
      <p className="section-kicker">{language === 'en' ? 'Places as taste notes' : '地点作为审美笔记'}</p>
      <h2 id="roaming-title">{language === 'en' ? 'Roaming' : '漫游'}</h2>
      <div className="roaming-strip">
        {roamingNotes.map((note) => (
          <article className="roaming-note" key={note.id}>
            <span>{note.meta}</span>
            <h3>{note.place[language]}</h3>
            <p>{note.caption[language]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
```

Create `src/components/Connect.tsx`:

```tsx
import { socialLinks } from '../content';
import type { Language } from '../types';

type ConnectProps = {
  language: Language;
};

export function Connect({ language }: ConnectProps) {
  return (
    <footer id="connect" className="connect" aria-labelledby="connect-title">
      <p className="section-kicker">{language === 'en' ? 'Open channels' : '连接入口'}</p>
      <h2 id="connect-title">{language === 'en' ? 'Connect' : '连接'}</h2>
      <p>{language === 'en' ? 'For collaboration, conversation, or future work.' : '欢迎因为合作、交流或未来机会联系我。'}</p>
      <div className="social-links">
        {socialLinks.map((link) => (
          <a key={link.id} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Compose components in `App.tsx`**

Replace `src/App.tsx`:

```tsx
import { AudioNotes } from './components/AudioNotes';
import { Capabilities } from './components/Capabilities';
import { Connect } from './components/Connect';
import { Cover } from './components/Cover';
import { FeatureIndex } from './components/FeatureIndex';
import { Header } from './components/Header';
import { Roaming } from './components/Roaming';
import { SelectedFiles } from './components/SelectedFiles';
import { Signals } from './components/Signals';
import { useLanguage } from './hooks/useLanguage';

export default function App() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <>
      <Header language={language} onToggleLanguage={toggleLanguage} />
      <main className="site-shell">
        <Cover language={language} />
        <FeatureIndex language={language} />
        <SelectedFiles language={language} />
        <Signals language={language} />
        <AudioNotes language={language} />
        <Capabilities language={language} />
        <Roaming language={language} />
        <Connect language={language} />
      </main>
    </>
  );
}
```

- [ ] **Step 5: Run tests**

Run:

```bash
npm test -- src/App.test.tsx src/hooks/useLanguage.test.tsx
```

Expected: PASS.

- [ ] **Step 6: Commit components**

Run:

```bash
git add src/App.tsx src/App.test.tsx src/components src/hooks
git commit -m "Split homepage into archive sections"
```

Expected: Commit succeeds.

## Task 5: Apply Magazine Editorial Styling

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: Add a style regression test through Playwright**

Create `playwright.config.ts`:

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1',
    url: 'http://127.0.0.1:5173/unfinished-archive/',
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://127.0.0.1:5173/unfinished-archive/',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1200 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'], viewport: { width: 412, height: 915 } } },
  ],
});
```

Create `tests/homepage.spec.ts`:

```ts
import { expect, test } from '@playwright/test';

test('homepage has magazine masthead and no horizontal overflow', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /Unfinished Archive/i })).toBeVisible();
  await expect(page.getByText('An unfinished archive of AI')).toBeVisible();

  const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(hasHorizontalOverflow).toBe(false);
});

test('language toggle switches visible section headings', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: '中文' }).click();

  await expect(page.getByRole('heading', { name: '精选档案' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '声音笔记' })).toBeVisible();
});
```

- [ ] **Step 2: Run Playwright to verify current styling is incomplete but app works**

Run:

```bash
npm run e2e
```

Expected: Tests may PASS for behavior, but visual styling still does not match the selected design. Continue because this task's purpose is visual implementation, then run the tests again after styling.

- [ ] **Step 3: Replace `src/styles.css` with editorial styling**

Replace `src/styles.css`:

```css
:root {
  --paper: #f7f2e8;
  --paper-deep: #eee4d2;
  --ink: #171513;
  --muted: #69625a;
  --line: rgba(23, 21, 19, 0.2);
  --forest: #1f3d32;
  --vermillion: #b9472e;
  --silver: #b8b5ac;
  --max-width: 1180px;
  color: var(--ink);
  background: var(--paper);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background:
    linear-gradient(90deg, rgba(23, 21, 19, 0.035) 1px, transparent 1px),
    var(--paper);
  background-size: 96px 96px;
}

a {
  color: inherit;
  text-decoration: none;
}

a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--vermillion);
  outline-offset: 4px;
}

button {
  font: inherit;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 24px;
  align-items: center;
  padding: 18px max(24px, calc((100vw - var(--max-width)) / 2));
  border-bottom: 1px solid var(--line);
  background: rgba(247, 242, 232, 0.88);
  backdrop-filter: blur(18px);
}

.wordmark {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border: 1px solid var(--ink);
  border-radius: 50%;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 15px;
  letter-spacing: 0;
}

.site-header nav {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  justify-content: center;
  font-size: 12px;
  letter-spacing: 0;
  text-transform: uppercase;
}

.language-toggle {
  border: 1px solid var(--ink);
  border-radius: 999px;
  background: transparent;
  color: var(--ink);
  padding: 8px 14px;
  cursor: pointer;
}

.site-shell {
  width: min(var(--max-width), calc(100vw - 48px));
  margin: 0 auto;
}

.cover {
  min-height: 86vh;
  display: grid;
  grid-template-columns: 1fr minmax(240px, 0.42fr);
  gap: 48px;
  align-content: center;
  padding: 80px 0 56px;
  border-bottom: 1px solid var(--ink);
}

.issue-label,
.section-kicker {
  color: var(--vermillion);
  font-size: 12px;
  letter-spacing: 0;
  text-transform: uppercase;
}

.cover h1 {
  grid-column: 1 / -1;
  max-width: 920px;
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(64px, 12vw, 164px);
  font-weight: 400;
  line-height: 0.86;
}

.cover-title-zh {
  margin: 0;
  align-self: end;
  color: var(--forest);
  font-size: clamp(32px, 6vw, 84px);
  font-weight: 600;
  line-height: 1;
}

.tagline {
  margin: 0;
  max-width: 560px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(24px, 3.8vw, 48px);
  line-height: 1.02;
}

.identity,
.intro {
  max-width: 440px;
  margin: 0;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.7;
}

section,
.connect {
  padding: 86px 0;
  border-bottom: 1px solid var(--line);
}

section h2,
.connect h2 {
  margin: 0 0 32px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(42px, 6vw, 86px);
  font-weight: 400;
  line-height: 0.95;
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--ink);
}

.feature-item {
  display: grid;
  gap: 18px;
  min-height: 260px;
  padding: 24px;
  border-right: 1px solid var(--line);
}

.feature-item:last-child {
  border-right: 0;
}

.feature-item span,
.file-row span:first-child,
.signal p,
.roaming-note span {
  color: var(--vermillion);
  font-size: 12px;
  text-transform: uppercase;
}

.feature-item strong,
.file-row strong,
.audio-row strong {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 30px;
  font-weight: 400;
}

.feature-item em,
.file-row em,
.audio-row em {
  color: var(--muted);
  font-style: normal;
  line-height: 1.55;
}

.file-list,
.audio-list {
  border-top: 1px solid var(--ink);
}

.file-row {
  display: grid;
  grid-template-columns: 70px 90px minmax(180px, 0.7fr) 1fr 150px;
  gap: 22px;
  align-items: start;
  padding: 24px 0;
  border-bottom: 1px solid var(--line);
}

.signal-grid,
.capability-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}

.signal,
.capability {
  min-height: 260px;
  padding: 26px;
  background: rgba(247, 242, 232, 0.94);
}

.signal h3,
.capability h3,
.roaming-note h3 {
  margin: 0 0 18px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 30px;
  font-weight: 400;
}

.signal blockquote,
.capability p,
.roaming-note p,
.connect p {
  margin: 0;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.7;
}

.audio-row {
  display: grid;
  grid-template-columns: 96px minmax(180px, 0.4fr) 1fr minmax(160px, 0.3fr);
  gap: 22px;
  align-items: center;
  padding: 24px 0;
  border-bottom: 1px solid var(--line);
}

.audio-cover {
  display: block;
  aspect-ratio: 1;
  border: 1px solid var(--ink);
  background:
    linear-gradient(135deg, transparent 48%, var(--vermillion) 49%, var(--vermillion) 51%, transparent 52%),
    var(--paper-deep);
}

.roaming-strip {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.roaming-note {
  min-height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 26px;
  border: 1px solid var(--line);
  background:
    linear-gradient(140deg, rgba(31, 61, 50, 0.16), transparent 45%),
    linear-gradient(320deg, rgba(185, 71, 46, 0.16), transparent 50%),
    var(--paper-deep);
}

.connect {
  padding-bottom: 120px;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}

.social-links a {
  border: 1px solid var(--ink);
  border-radius: 999px;
  padding: 10px 16px;
}

@media (max-width: 860px) {
  .site-header {
    grid-template-columns: auto auto;
  }

  .site-header nav {
    grid-column: 1 / -1;
    grid-row: 2;
    justify-content: start;
  }

  .site-shell {
    width: min(100vw - 32px, var(--max-width));
  }

  .cover {
    min-height: auto;
    grid-template-columns: 1fr;
    gap: 28px;
    padding-top: 64px;
  }

  .feature-list,
  .signal-grid,
  .capability-grid,
  .roaming-strip {
    grid-template-columns: 1fr;
  }

  .feature-item {
    min-height: 180px;
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .file-row,
  .audio-row {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .audio-cover {
    width: 84px;
  }
}
```

- [ ] **Step 4: Run unit and e2e tests**

Run:

```bash
npm test
npm run e2e
```

Expected: Both commands PASS.

- [ ] **Step 5: Commit editorial styling**

Run:

```bash
git add src/styles.css playwright.config.ts tests/homepage.spec.ts
git commit -m "Apply editorial magazine styling"
```

Expected: Commit succeeds.

## Task 6: Add Selected File Filtering

**Files:**
- Modify: `src/components/SelectedFiles.tsx`
- Modify: `src/App.test.tsx`

- [ ] **Step 1: Add failing filter test**

Add this test to `src/App.test.tsx`:

```tsx
test('filters selected files by category', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole('button', { name: /Audio/i }));

  expect(screen.getByText('AI News Podcast')).toBeInTheDocument();
  expect(screen.getByText('Personal Growth Podcast')).toBeInTheDocument();
  expect(screen.queryByText('Short Video Experiments')).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm test -- src/App.test.tsx
```

Expected: FAIL because filter buttons do not exist.

- [ ] **Step 3: Implement filtering in `SelectedFiles.tsx`**

Replace `src/components/SelectedFiles.tsx`:

```tsx
import { useState } from 'react';
import { selectedFiles } from '../content';
import type { FileCategory, Language } from '../types';

type SelectedFilesProps = {
  language: Language;
};

type Filter = 'all' | FileCategory;

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'creation', label: 'Creation' },
  { id: 'ai', label: 'AI' },
  { id: 'audio', label: 'Audio' },
  { id: 'roaming', label: 'Roaming' },
  { id: 'work', label: 'Work' },
];

export function SelectedFiles({ language }: SelectedFilesProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const visibleFiles = activeFilter === 'all' ? selectedFiles : selectedFiles.filter((file) => file.category === activeFilter);

  return (
    <section id="files" className="selected-files" aria-labelledby="files-title">
      <p className="section-kicker">{language === 'en' ? 'Curated fragments' : '精选片段'}</p>
      <div className="section-heading-row">
        <h2 id="files-title">{language === 'en' ? 'Selected Files' : '精选档案'}</h2>
        <div className="filter-bar" aria-label="Selected file filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={activeFilter === filter.id ? 'is-active' : ''}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      <div className="file-list">
        {visibleFiles.map((file) => (
          <a className="file-row" href={file.href} key={file.id}>
            <span>{file.number}</span>
            <span>{file.category}</span>
            <strong>{file.title[language]}</strong>
            <em>{file.meaning[language]}</em>
            <span>{file.platform}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
```

Append this CSS to `src/styles.css`:

```css
.section-heading-row {
  display: flex;
  gap: 24px;
  align-items: start;
  justify-content: space-between;
}

.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-width: 420px;
}

.filter-bar button {
  border: 1px solid var(--line);
  border-radius: 999px;
  background: transparent;
  color: var(--ink);
  padding: 8px 12px;
  cursor: pointer;
}

.filter-bar button.is-active {
  border-color: var(--ink);
  background: var(--ink);
  color: var(--paper);
}

@media (max-width: 860px) {
  .section-heading-row {
    display: block;
  }

  .filter-bar {
    margin-bottom: 24px;
  }
}
```

- [ ] **Step 4: Run tests**

Run:

```bash
npm test -- src/App.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit filtering**

Run:

```bash
git add src/components/SelectedFiles.tsx src/App.test.tsx src/styles.css
git commit -m "Add selected file filters"
```

Expected: Commit succeeds.

## Task 7: Add GitHub Pages Workflow And Final Verification

**Files:**
- Create: `.github/workflows/pages.yml`
- Modify: `package.json`
- Modify: `tests/homepage.spec.ts`

- [ ] **Step 1: Add deploy workflow**

Create `.github/workflows/pages.yml`:

```yaml
name: Deploy GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm test

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: Run browser tests
        run: npm run e2e

      - name: Build
        run: npm run build

      - name: Configure Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Ensure local verification passes**

Run:

```bash
npm test
npm run build
npm run e2e
```

Expected: All commands PASS.

- [ ] **Step 3: Start local dev server for visual review**

Run:

```bash
npm run dev -- --host 127.0.0.1
```

Expected: Dev server serves the site at `http://127.0.0.1:5173/unfinished-archive/`.

- [ ] **Step 4: Review in browser**

Open:

```text
http://127.0.0.1:5173/unfinished-archive/
```

Expected:

- Desktop view has a strong magazine masthead.
- Mobile view has no horizontal overflow.
- Language toggle works.
- Selected file filtering works.
- Links are visible and keyboard focus is clear.

- [ ] **Step 5: Commit deploy setup**

Run:

```bash
git add .github/workflows/pages.yml package.json package-lock.json tests/homepage.spec.ts playwright.config.ts
git commit -m "Add GitHub Pages deployment"
```

Expected: Commit succeeds.

- [ ] **Step 6: Push main**

Run:

```bash
git push origin main
```

Expected: Push succeeds and GitHub Actions starts the Pages deployment workflow.

## Plan Self-Review

- Spec coverage: This plan covers the single-page bilingual site, the magazine-style visual direction, selected files, AI signals, audio notes, capabilities, roaming, connect links, light interactivity, responsive behavior, testing, and GitHub Pages deployment.
- Scope check: The spec is one cohesive static frontend. AI chat, CMS, user accounts, and heavy maps remain out of scope for version one.
- Red-flag scan: The plan contains no unfinished work markers. Sample content is intentionally defined in `src/content.ts` and can be replaced with real links later.
- Type consistency: `Language`, `LocalizedText`, `Feature`, `SelectedFile`, `Signal`, `AudioNote`, `Capability`, `RoamingNote`, and `SocialLink` are introduced before use and referenced consistently across components.
- Test strategy: Unit tests cover content rendering, navigation, language toggle, and file filtering. Playwright covers desktop/mobile smoke behavior and horizontal overflow.
