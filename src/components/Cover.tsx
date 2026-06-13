import { brand } from '../content';
import type { Language } from '../types';

type CoverProps = {
  language: Language;
};

export function Cover({ language }: CoverProps) {
  const alternateTitle = language === 'en' ? brand.titleZh : brand.title;

  return (
    <section aria-labelledby="cover-title">
      <p>{alternateTitle}</p>
      <h1 id="cover-title">{language === 'en' ? brand.title : brand.titleZh}</h1>
      <p>{brand.tagline[language]}</p>
      <p>{brand.identity[language]}</p>
      <p>{brand.intro[language]}</p>
    </section>
  );
}
