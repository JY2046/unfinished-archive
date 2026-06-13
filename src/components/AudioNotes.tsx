import { audioNotes } from '../content';
import type { Language } from '../types';

type AudioNotesProps = {
  language: Language;
};

const headings: Record<Language, string> = {
  en: 'Audio Notes',
  zh: '声音笔记',
};

const linkVerbs: Record<Language, string> = {
  en: 'Listen to',
  zh: '收听',
};

export function AudioNotes({ language }: AudioNotesProps) {
  return (
    <section id="audio" aria-labelledby="audio-title">
      <h2 id="audio-title">{headings[language]}</h2>
      {audioNotes.map((audio) => {
        const title = audio.title[language];
        const linkLabel = `${linkVerbs[language]} ${title}`;

        return (
          <article key={audio.id}>
            <h3>{title}</h3>
            <p>{audio.positioning[language]}</p>
            <p>{audio.recommendedEpisode[language]}</p>
            <a href={audio.href} aria-label={linkLabel}>
              {linkLabel}
            </a>
          </article>
        );
      })}
    </section>
  );
}
