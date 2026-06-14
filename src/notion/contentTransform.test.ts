import { describe, expect, test } from 'vitest';
import { buildSiteContent, normalizeRows } from './contentTransform';

describe('normalizeRows', () => {
  test('keeps active rows and sorts them by Sort', () => {
    const rows = normalizeRows([
      { properties: { Name: 'third', Active: '__YES__', Sort: 3 } },
      { properties: { Name: 'inactive', Active: '__NO__', Sort: 1 } },
      { properties: { Name: 'first', Active: '__YES__', Sort: 1 } },
    ]);

    expect(rows.map((row) => row.Name)).toEqual(['first', 'third']);
  });
});

describe('buildSiteContent', () => {
  test('maps Notion rows into the website content shape', () => {
    const content = buildSiteContent({
      siteSettings: [
        {
          properties: {
            Name: 'Title',
            Key: 'title',
            English: 'Archive From Notion',
            Chinese: '来自 Notion 的档案',
            Active: '__YES__',
            Sort: 1,
          },
        },
        {
          properties: {
            Name: 'Tagline',
            Key: 'tagline',
            English: 'A generated tagline.',
            Chinese: '一条生成的标语。',
            Active: '__YES__',
            Sort: 2,
          },
        },
        {
          properties: {
            Name: 'Intro',
            Key: 'intro',
            English: 'Generated intro.',
            Chinese: '生成的介绍。',
            Active: '__YES__',
            Sort: 3,
          },
        },
        {
          properties: {
            Name: 'Identity',
            Key: 'identity',
            English: 'creator',
            Chinese: '创作者',
            Active: '__YES__',
            Sort: 4,
          },
        },
      ],
      selectedFiles: [
        {
          properties: {
            Name: 'file-one',
            Number: '001',
            Category: 'creation',
            'Title EN': 'File One',
            'Title ZH': '档案一',
            'Meaning EN': 'A file from Notion.',
            'Meaning ZH': '来自 Notion 的档案。',
            Platform: 'Archive',
            Link: 'https://example.com/file-one',
            'Image Key': 'file-public',
            Active: '__YES__',
            Sort: 2,
          },
        },
      ],
      signals: [
        {
          properties: {
            Name: 'signal-one',
            Number: 'Signal 01',
            'Title EN': 'Signal One',
            'Title ZH': '信号一',
            'Body EN': 'Signal body.',
            'Body ZH': '信号正文。',
            Active: '__YES__',
            Sort: 1,
          },
        },
      ],
      audioNotes: [
        {
          properties: {
            Name: 'audio-one',
            Episode: '01',
            'Title EN': 'Audio One',
            'Title ZH': '声音一',
            'Positioning EN': 'Audio positioning.',
            'Positioning ZH': '声音定位。',
            'Recommended EN': 'Recommended.',
            'Recommended ZH': '推荐。',
            Duration: '12:34',
            'Apple Link': 'https://example.com/apple',
            'Spotify Link': 'https://example.com/spotify',
            'Cover Label': 'AUDIO ONE',
            'Wave Key': 'wave-ai',
            Active: '__YES__',
            Sort: 1,
          },
        },
      ],
      capabilities: [
        {
          properties: {
            Name: 'taste',
            'Title EN': 'Taste',
            'Title ZH': '审美',
            'Proof EN': 'Clear judgement.',
            'Proof ZH': '清晰判断。',
            Active: '__YES__',
            Sort: 1,
          },
        },
      ],
      roamingNotes: [
        {
          properties: {
            Name: 'kyoto',
            'Place EN': 'Kyoto',
            'Place ZH': '京都',
            'Caption EN': 'Quiet.',
            'Caption ZH': '安静。',
            Meta: 'Apr 2024',
            'Image Key': 'roam-kyoto',
            Active: '__YES__',
            Sort: 1,
          },
        },
      ],
      contactLinks: [
        {
          properties: {
            Name: 'github',
            Label: 'GitHub',
            'Caption EN': 'See my work',
            'Caption ZH': '查看作品',
            Kind: 'github',
            Link: 'https://github.com/example',
            Active: '__YES__',
            Sort: 1,
          },
        },
        {
          properties: {
            Name: 'linkedin',
            Label: 'LinkedIn',
            'Caption EN': 'Coming soon',
            'Caption ZH': '稍后补充',
            Kind: 'linkedin',
            Active: '__YES__',
            Sort: 2,
          },
        },
      ],
    });

    expect(content.brand.title).toBe('Archive From Notion');
    expect(content.selectedFiles).toEqual([
      {
        id: 'file-one',
        number: '001',
        category: 'creation',
        title: { en: 'File One', zh: '档案一' },
        meaning: { en: 'A file from Notion.', zh: '来自 Notion 的档案。' },
        platform: 'Archive',
        href: 'https://example.com/file-one',
        imageKey: 'file-public',
      },
    ]);
    expect(content.signals[0].title.zh).toBe('信号一');
    expect(content.audioNotes[0].duration).toBe('12:34');
    expect(content.audioNotes[0].links?.spotify).toBe('https://example.com/spotify');
    expect(content.capabilities[0].proof.en).toBe('Clear judgement.');
    expect(content.roamingNotes[0].imageKey).toBe('roam-kyoto');
    expect(content.socialLinks).toEqual([
      {
        id: 'github',
        label: 'GitHub',
        href: 'https://github.com/example',
        caption: { en: 'See my work', zh: '查看作品' },
        kind: 'github',
      },
    ]);
  });
});
