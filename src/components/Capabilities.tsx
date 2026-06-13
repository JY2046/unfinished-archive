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
    <section aria-labelledby="capabilities-title">
      <h2 id="capabilities-title">{headings[language]}</h2>
      {capabilities.map((capability) => (
        <article key={capability.id}>
          <h3>{capability.title[language]}</h3>
          <p>{capability.proof[language]}</p>
        </article>
      ))}
    </section>
  );
}
