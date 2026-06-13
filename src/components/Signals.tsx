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
    <section id="signals" className="signals" aria-labelledby="signals-title">
      <div className="section-bar">
        <h2 id="signals-title">{headings[language]}</h2>
        <span>信号</span>
      </div>
      {signals.map((signal) => (
        <article key={signal.id}>
          <p aria-hidden="true">“</p>
          <h3>{signal.title[language]}</h3>
          <p>{signal.body[language]}</p>
          <span>{signal.number}</span>
        </article>
      ))}
    </section>
  );
}
