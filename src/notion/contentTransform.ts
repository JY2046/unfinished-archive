import type {
  FileCategory,
  SiteContent,
} from '../types';

export type NotionRow = {
  properties: Record<string, unknown>;
};

export type NotionCollections = {
  siteSettings: NotionRow[];
  selectedFiles: NotionRow[];
  signals: NotionRow[];
  audioNotes: NotionRow[];
  capabilities: NotionRow[];
  roamingNotes: NotionRow[];
  contactLinks: NotionRow[];
};

type FlatRow = Record<string, string | number | boolean | undefined>;

const baseUrl = 'https://jy2046.github.io/unfinished-archive/';
const allowedCategories = new Set<FileCategory>(['creation', 'ai', 'audio', 'roaming', 'work']);

const defaultBrand: SiteContent['brand'] = {
  title: 'Unfinished Archive',
  titleZh: '未完成档案',
  tagline: { en: '', zh: '' },
  identity: { en: '', zh: '' },
  intro: { en: '', zh: '' },
};

export function normalizeRows(rows: NotionRow[]): FlatRow[] {
  return rows
    .map((row) => row.properties as FlatRow)
    .filter((row) => row.Active === true || row.Active === '__YES__')
    .sort((left, right) => toNumber(left.Sort) - toNumber(right.Sort));
}

export function buildSiteContent(collections: NotionCollections): SiteContent {
  const settings = normalizeRows(collections.siteSettings);
  const brand = settings.reduce<SiteContent['brand']>((result, row) => {
    const key = text(row.Key);

    if (key === 'title') {
      result.title = text(row.English) || result.title;
      result.titleZh = text(row.Chinese) || result.titleZh;
    }

    if (key === 'tagline') {
      result.tagline = localized(row, 'English', 'Chinese');
    }

    if (key === 'identity') {
      result.identity = localized(row, 'English', 'Chinese');
    }

    if (key === 'intro') {
      result.intro = localized(row, 'English', 'Chinese');
    }

    return result;
  }, { ...defaultBrand });

  return {
    brand,
    features: [
      {
        id: 'creation',
        number: '01',
        title: { en: 'Creation', zh: '创作' },
        summary: {
          en: 'Short videos, visual experiments, and public notes.',
          zh: '短视频、视觉实验与公开表达。',
        },
        href: '#files',
      },
      {
        id: 'signals',
        number: '02',
        title: { en: 'AI Signals', zh: 'AI 信号' },
        summary: {
          en: 'Small observations about products, interfaces, and tools.',
          zh: '关于产品、界面与工具的细小观察。',
        },
        href: '#signals',
      },
      {
        id: 'audio',
        number: '03',
        title: { en: 'Audio Notes', zh: '声音笔记' },
        summary: {
          en: 'Podcasts about AI news, personal growth, and becoming.',
          zh: '关于 AI 资讯、个人成长和成为自己的播客。',
        },
        href: '#audio',
      },
    ],
    selectedFiles: normalizeRows(collections.selectedFiles).map((row) => ({
      id: text(row.Name),
      number: text(row.Number),
      category: category(row.Category),
      title: localized(row, 'Title EN', 'Title ZH'),
      meaning: localized(row, 'Meaning EN', 'Meaning ZH'),
      platform: text(row.Platform),
      href: urlOrFallback(row.Link, '#files'),
      imageKey: text(row['Image Key']) || undefined,
    })),
    signals: normalizeRows(collections.signals).map((row) => ({
      id: text(row.Name),
      number: text(row.Number),
      title: localized(row, 'Title EN', 'Title ZH'),
      body: localized(row, 'Body EN', 'Body ZH'),
    })),
    audioNotes: normalizeRows(collections.audioNotes).map((row) => {
      const apple = text(row['Apple Link']);
      const spotify = text(row['Spotify Link']);

      return {
        id: text(row.Name),
        episode: text(row.Episode) || undefined,
        title: localized(row, 'Title EN', 'Title ZH'),
        positioning: localized(row, 'Positioning EN', 'Positioning ZH'),
        recommendedEpisode: localized(row, 'Recommended EN', 'Recommended ZH'),
        href: apple || spotify || '#connect',
        duration: text(row.Duration) || undefined,
        published: text(row.Published) || undefined,
        coverLabel: text(row['Cover Label']) || undefined,
        waveKey: text(row['Wave Key']) || undefined,
        links: {
          apple: apple || undefined,
          spotify: spotify || undefined,
        },
      };
    }),
    capabilities: normalizeRows(collections.capabilities).map((row) => ({
      id: text(row.Name),
      title: localized(row, 'Title EN', 'Title ZH'),
      proof: localized(row, 'Proof EN', 'Proof ZH'),
    })),
    roamingNotes: normalizeRows(collections.roamingNotes).map((row) => ({
      id: text(row.Name),
      place: localized(row, 'Place EN', 'Place ZH'),
      caption: localized(row, 'Caption EN', 'Caption ZH'),
      meta: text(row.Meta),
      imageKey: text(row['Image Key']) || undefined,
    })),
    socialLinks: normalizeRows(collections.contactLinks)
      .filter((row) => Boolean(text(row.Link)))
      .map((row) => ({
        id: text(row.Name),
        label: text(row.Label),
        href: text(row.Link),
        caption: localized(row, 'Caption EN', 'Caption ZH'),
        kind: text(row.Kind) || undefined,
      })),
  };
}

function localized(row: FlatRow, englishKey: string, chineseKey: string) {
  return {
    en: text(row[englishKey]),
    zh: text(row[chineseKey]),
  };
}

function text(value: unknown): string {
  if (typeof value === 'string') {
    return value.trim();
  }

  if (typeof value === 'number') {
    return String(value);
  }

  return '';
}

function toNumber(value: unknown): number {
  return typeof value === 'number' ? value : Number.MAX_SAFE_INTEGER;
}

function category(value: unknown): FileCategory {
  const raw = text(value) as FileCategory;
  return allowedCategories.has(raw) ? raw : 'creation';
}

function urlOrFallback(value: unknown, fallbackHash: string): string {
  const raw = text(value);

  if (!raw) {
    return fallbackHash;
  }

  if (raw.startsWith(baseUrl)) {
    return raw.replace(baseUrl, '') || '/';
  }

  return raw;
}
