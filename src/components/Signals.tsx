import { signals } from '../content';
import type { Language } from '../types';

type SignalsProps = {
  language: Language;
};

const headings: Record<Language, string> = {
  en: 'AI Signals',
  zh: 'AI 信号',
};

export function Signals({ language }: SignalsProps) {
  return (
    <section id="signals" aria-labelledby="signals-title">
      <h2 id="signals-title">{headings[language]}</h2>
      {signals.map((signal) => (
        <article key={signal.id}>
          <p>{signal.number}</p>
          <h3>{signal.title[language]}</h3>
          <p>{signal.body[language]}</p>
        </article>
      ))}
    </section>
  );
}
