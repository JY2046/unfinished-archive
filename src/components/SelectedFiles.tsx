import { selectedFiles } from '../content';
import type { Language } from '../types';

type SelectedFilesProps = {
  language: Language;
};

const headings: Record<Language, string> = {
  en: 'Selected Files',
  zh: '精选档案',
};

const linkVerbs: Record<Language, string> = {
  en: 'Open',
  zh: '打开',
};

export function SelectedFiles({ language }: SelectedFilesProps) {
  return (
    <section id="files" aria-labelledby="files-title">
      <h2 id="files-title">{headings[language]}</h2>
      {selectedFiles.map((file) => {
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
