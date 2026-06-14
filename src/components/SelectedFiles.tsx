import { useState } from 'react';
import { selectedFiles } from '../content';
import type { FileCategory, Language } from '../types';

type SelectedFilesProps = {
  language: Language;
};

type Filter = 'all' | FileCategory;

const headings: Record<Language, string> = {
  en: 'Selected Files',
  zh: '精选档案',
};

const filters: Array<{ id: Filter; label: Record<Language, string> }> = [
  { id: 'all', label: { en: 'All', zh: '全部' } },
  { id: 'creation', label: { en: 'Creation', zh: '创作' } },
  { id: 'ai', label: { en: 'AI', zh: 'AI' } },
  { id: 'audio', label: { en: 'Audio', zh: '声音' } },
  { id: 'roaming', label: { en: 'Roaming', zh: '漫游' } },
  { id: 'work', label: { en: 'Work', zh: '工作' } },
];

const linkVerbs: Record<Language, string> = {
  en: 'Open',
  zh: '打开',
};

const fileImages: Record<string, string> = {
  'file-public': 'assets/reference-crops/file-public.png',
  'file-ai': 'assets/reference-crops/file-ai.png',
  'file-growth': 'assets/reference-crops/file-growth.png',
  'file-product': 'assets/reference-crops/file-product.png',
  'file-life': 'assets/reference-crops/file-life.png',
  'short-video': 'assets/reference-crops/file-public.png',
  'ai-news-podcast': 'assets/reference-crops/file-ai.png',
  'growth-podcast': 'assets/reference-crops/file-growth.png',
  'product-note': 'assets/reference-crops/file-product.png',
  'roaming-note': 'assets/reference-crops/file-life.png',
};

const fallbackFileImage = fileImages['file-public'];

export function SelectedFiles({ language }: SelectedFilesProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const visibleFiles =
    activeFilter === 'all'
      ? selectedFiles
      : selectedFiles.filter((file) => file.category === activeFilter);

  return (
    <section id="files" className="selected-files" aria-labelledby="files-title">
      <div className="section-bar">
        <h2 id="files-title">{headings[language]}</h2>
        <span>精选档案</span>
      </div>
      <div className="filter-bar" aria-label="Selected file filters">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            aria-pressed={activeFilter === filter.id}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label[language]}
          </button>
        ))}
      </div>
      {visibleFiles.map((file) => {
        const title = file.title[language];
        const linkLabel = `${linkVerbs[language]} ${title}`;

        return (
          <article key={file.id}>
            <p className="issue-number">{file.number}</p>
            <img src={fileImages[file.imageKey ?? file.id] ?? fallbackFileImage} alt="" aria-hidden="true" />
            <p className="meta-label">{file.platform}</p>
            <h3>{title}</h3>
            <p>{file.meaning[language]}</p>
            <a href={file.href} aria-label={linkLabel}>
              →
            </a>
          </article>
        );
      })}
    </section>
  );
}
