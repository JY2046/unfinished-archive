import { features } from '../content';
import type { Language } from '../types';

type FeatureIndexProps = {
  language: Language;
};

const headings: Record<Language, string> = {
  en: 'Feature Index',
  zh: '功能索引',
};

const linkLabels: Record<Language, string> = {
  en: 'Open',
  zh: '打开',
};

export function FeatureIndex({ language }: FeatureIndexProps) {
  return (
    <section aria-labelledby="feature-index-title">
      <h2 id="feature-index-title">{headings[language]}</h2>
      {features.map((feature) => (
        <article key={feature.id}>
          <p>{feature.number}</p>
          <p>{feature.title[language]}</p>
          <p>{feature.summary[language]}</p>
          <a href={feature.href}>
            {linkLabels[language]} {feature.title[language]}
          </a>
        </article>
      ))}
    </section>
  );
}
