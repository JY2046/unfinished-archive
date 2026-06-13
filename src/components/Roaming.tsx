import { roamingNotes } from '../content';
import type { Language } from '../types';

type RoamingProps = {
  language: Language;
};

const headings: Record<Language, string> = {
  en: 'Roaming',
  zh: '漫游',
};

export function Roaming({ language }: RoamingProps) {
  return (
    <section id="roaming" aria-labelledby="roaming-title">
      <h2 id="roaming-title">{headings[language]}</h2>
      {roamingNotes.map((note) => (
        <article key={note.id}>
          <p>{note.meta}</p>
          <h3>{note.place[language]}</h3>
          <p>{note.caption[language]}</p>
        </article>
      ))}
    </section>
  );
}
