import { capabilities } from '../content';
import type { Language } from '../types';

type CapabilitiesProps = {
  language: Language;
};

const headings: Record<Language, string> = {
  en: 'Capabilities',
  zh: '能力',
};

export function Capabilities({ language }: CapabilitiesProps) {
  return (
    <section className="capabilities" aria-labelledby="capabilities-title">
      <div className="section-bar">
        <h2 id="capabilities-title">{headings[language]}</h2>
        <span>能力图谱</span>
      </div>
      {capabilities.map((capability) => (
        <article key={capability.id}>
          <h3>{capability.title[language]}</h3>
          <p>{capability.proof[language]}</p>
        </article>
      ))}
    </section>
  );
}
