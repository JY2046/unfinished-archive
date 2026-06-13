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

export function SelectedFiles({ language }: SelectedFilesProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const visibleFiles =
    activeFilter === 'all'
      ? selectedFiles
      : selectedFiles.filter((file) => file.category === activeFilter);

  return (
    <section id="files" aria-labelledby="files-title">
      <h2 id="files-title">{headings[language]}</h2>
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
            <p>{file.number}</p>
            <h3>{title}</h3>
            <p>{file.meaning[language]}</p>
            <p>{file.platform}</p>
            <a href={file.href} aria-label={linkLabel}>
              {linkLabel}
            </a>
          </article>
        );
      })}
    </section>
  );
}
