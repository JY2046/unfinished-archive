import { roamingNotes } from '../content';
import type { Language } from '../types';

type RoamingProps = {
  language: Language;
};

const headings: Record<Language, string> = {
  en: 'Roaming',
  zh: '漫游',
};

const roamingImages: Record<string, string> = {
  kyoto: 'assets/reference-crops/roam-kyoto.png',
  osaka: 'assets/reference-crops/roam-osaka.png',
  coast: 'assets/reference-crops/roam-coast.png',
  lisbon: 'assets/reference-crops/roam-lisbon.png',
  bali: 'assets/reference-crops/roam-bali.png',
  seoul: 'assets/reference-crops/roam-seoul.png',
};

export function Roaming({ language }: RoamingProps) {
  return (
    <section id="roaming" className="roaming" aria-labelledby="roaming-title">
      <div className="section-bar">
        <h2 id="roaming-title">{headings[language]}</h2>
        <span>漫游记录</span>
      </div>
      {roamingNotes.map((note) => (
        <article key={note.id}>
          <img src={roamingImages[note.id]} alt="" aria-hidden="true" />
          <div>
            <h3>{note.place[language]}</h3>
            <p>{note.meta}</p>
          </div>
          <p>{note.caption[language]}</p>
        </article>
      ))}
    </section>
  );
}
