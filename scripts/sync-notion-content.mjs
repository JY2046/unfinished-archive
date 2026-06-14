import { build } from 'esbuild';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const notionToken = process.env.NOTION_TOKEN;
const notionVersion = process.env.NOTION_VERSION ?? '2025-09-03';
const generatedPath = new URL('../src/generated/notion-content.ts', import.meta.url);

const dataSources = {
  siteSettings: process.env.NOTION_SITE_SETTINGS_ID ?? '1e73dcc7-c264-48c9-b906-09dca00acda2',
  selectedFiles: process.env.NOTION_SELECTED_FILES_ID ?? 'be6336b7-b083-4430-be90-27b7a2153c09',
  signals: process.env.NOTION_SIGNALS_ID ?? 'a3c020fd-c8b0-4f7f-8f0e-785920802407',
  audioNotes: process.env.NOTION_AUDIO_NOTES_ID ?? 'aa09b1e1-c655-437b-a2fe-aacb23f13552',
  capabilities: process.env.NOTION_CAPABILITIES_ID ?? '945a66d9-ae13-49f3-87cd-b975498df122',
  roamingNotes: process.env.NOTION_ROAMING_ID ?? 'cccc311a-e607-43d2-944d-cb05b1bed75a',
  contactLinks: process.env.NOTION_CONTACT_LINKS_ID ?? 'bfcfd1f3-5e3b-4db7-832e-f22fc484ec7b',
};

if (!notionToken) {
  await writeGeneratedContent(null);
  console.log('NOTION_TOKEN is not set. Using local fallback content.');
  process.exit(0);
}

const { buildSiteContent } = await loadTransformModule();
const collections = Object.fromEntries(
  await Promise.all(
    Object.entries(dataSources).map(async ([key, dataSourceId]) => [
      key,
      await queryDataSource(dataSourceId),
    ]),
  ),
);

await writeGeneratedContent(buildSiteContent(collections));
console.log('Synced Notion content into src/generated/notion-content.ts.');

async function loadTransformModule() {
  const buildDir = await mkdtemp(join(tmpdir(), 'unfinished-archive-notion-'));
  const outfile = join(buildDir, 'contentTransform.mjs');

  await build({
    bundle: true,
    entryPoints: [new URL('../src/notion/contentTransform.ts', import.meta.url).pathname],
    format: 'esm',
    outfile,
    platform: 'node',
    target: 'node22',
  });

  const module = await import(pathToFileURL(outfile).href);
  await rm(buildDir, { force: true, recursive: true });

  return module;
}

async function queryDataSource(dataSourceId) {
  const rows = [];
  let startCursor;

  do {
    const response = await fetch(`https://api.notion.com/v1/data_sources/${dataSourceId}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${notionToken}`,
        'Content-Type': 'application/json',
        'Notion-Version': notionVersion,
      },
      body: JSON.stringify({
        page_size: 100,
        start_cursor: startCursor,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Notion query failed for ${dataSourceId}: ${response.status} ${errorBody}`);
    }

    const body = await response.json();
    rows.push(...body.results.map(flattenPage));
    startCursor = body.has_more ? body.next_cursor : undefined;
  } while (startCursor);

  return rows;
}

function flattenPage(page) {
  return {
    properties: Object.fromEntries(
      Object.entries(page.properties ?? {}).map(([name, property]) => [name, flattenProperty(property)]),
    ),
  };
}

function flattenProperty(property) {
  switch (property.type) {
    case 'title':
      return plainText(property.title);
    case 'rich_text':
      return plainText(property.rich_text);
    case 'select':
      return property.select?.name ?? '';
    case 'checkbox':
      return property.checkbox;
    case 'number':
      return property.number ?? undefined;
    case 'url':
      return property.url ?? '';
    case 'date':
      return property.date?.start ?? '';
    default:
      return '';
  }
}

function plainText(richText) {
  return Array.isArray(richText)
    ? richText.map((part) => part.plain_text ?? '').join('')
    : '';
}

async function writeGeneratedContent(content) {
  const serialized = JSON.stringify(content, null, 2);
  const previous = await readFile(generatedPath, 'utf8').catch(() => '');
  const next = `import type { SiteContent } from '../types';\n\nexport const notionContent: SiteContent | null = ${serialized};\n`;

  if (previous !== next) {
    await writeFile(generatedPath, next);
  }
}
