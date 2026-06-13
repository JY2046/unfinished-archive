import { brand } from '../content';
import type { Language } from '../types';

type CoverProps = {
  language: Language;
};

export function Cover({ language }: CoverProps) {
  const alternateTitle = language === 'en' ? brand.titleZh : brand.title;

  return (
    <section className="cover" aria-labelledby="cover-title">
      <div className="cover__title">
        <h1 id="cover-title">{language === 'en' ? brand.title : brand.titleZh}</h1>
        <p className="cover__alternate">{alternateTitle}</p>
        <p className="cover__tagline">{brand.tagline[language]}</p>
      </div>
      <div className="cover__copy">
        <p>{brand.intro[language]}</p>
        <p>{brand.identity[language]}</p>
      </div>
      <aside className="cover__issue" aria-label="Current archive issue">
        <p>No.</p>
        <strong>07</strong>
        <span>May 2024</span>
        <span>In progress</span>
      </aside>
      <figure className="cover__image">
        <img src="assets/reference-crops/hero-collage.png" alt="Desk collage of notes, photos, and archive materials" />
        <figcaption>Archive the now. Iterate the next.</figcaption>
      </figure>
      <p className="cover__stamp" aria-hidden="true">
        Work in progress · Always
      </p>
    </section>
  );
}
