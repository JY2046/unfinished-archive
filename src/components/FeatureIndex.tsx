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

const featureImages: Record<string, string> = {
  creation: 'assets/reference-crops/feature-creation.png',
  signals: 'assets/reference-crops/feature-ai.png',
  audio: 'assets/reference-crops/feature-audio.png',
};

export function FeatureIndex({ language }: FeatureIndexProps) {
  return (
    <section className="feature-index" aria-labelledby="feature-index-title">
      <h2 id="feature-index-title" className="visually-hidden">
        {headings[language]}
      </h2>
      {features.map((feature) => (
        <article key={feature.id}>
          <div>
            <p className="issue-number">{feature.number}</p>
            <p className="meta-label">Feature</p>
            <h3>{feature.title[language]}</h3>
            <p>{feature.summary[language]}</p>
            <a href={feature.href} aria-label={`${linkLabels[language]} ${feature.title[language]}`}>
              →
            </a>
          </div>
          <img src={featureImages[feature.id]} alt="" aria-hidden="true" />
          <a className="feature-index__text-link" href={feature.href}>
            {linkLabels[language]} {feature.title[language]}
          </a>
        </article>
      ))}
    </section>
  );
}
