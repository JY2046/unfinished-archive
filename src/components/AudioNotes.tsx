import { audioNotes } from '../content';
import type { Language } from '../types';

type AudioNotesProps = {
  language: Language;
};

const headings: Record<Language, string> = {
  en: 'Audio Notes',
  zh: '声音笔记',
};

const linkVerbs: Record<Language, string> = {
  en: 'Listen to',
  zh: '收听',
};

const audioAssets: Record<string, { cover: string; wave: string; duration: string; date: string }> = {
  'ai-news-one': { cover: 'AI\nFRONTIERS', wave: 'assets/reference-crops/wave-ai.png', duration: '52:18', date: 'May 26, 2024' },
  'ai-news-two': { cover: 'MAKER\nDIALOGUES', wave: 'assets/reference-crops/wave-maker.png', duration: '41:27', date: 'Apr 05, 2024' },
  growth: { cover: 'GROWTH\nNOTES', wave: 'assets/reference-crops/wave-growth.png', duration: '48:03', date: 'Apr 18, 2024' },
  'wave-ai': { cover: 'AI\nFRONTIERS', wave: 'assets/reference-crops/wave-ai.png', duration: '52:18', date: 'May 26, 2024' },
  'wave-maker': { cover: 'MAKER\nDIALOGUES', wave: 'assets/reference-crops/wave-maker.png', duration: '41:27', date: 'Apr 05, 2024' },
  'wave-growth': { cover: 'GROWTH\nNOTES', wave: 'assets/reference-crops/wave-growth.png', duration: '48:03', date: 'Apr 18, 2024' },
};

const fallbackAudioAsset = audioAssets['wave-ai'];

export function AudioNotes({ language }: AudioNotesProps) {
  return (
    <section id="audio" className="audio-notes" aria-labelledby="audio-title">
      <div className="section-bar">
        <h2 id="audio-title">{headings[language]}</h2>
        <span>声音笔记</span>
      </div>
      {audioNotes.map((audio) => {
        const title = audio.title[language];
        const linkLabel = `${linkVerbs[language]} ${title}`;
        const asset = audioAssets[audio.waveKey ?? audio.id] ?? audioAssets[audio.id] ?? fallbackAudioAsset;
        const cover = audio.coverLabel?.replaceAll(' ', '\n') ?? asset.cover;
        const appleLink = audio.links?.apple ?? audio.href;
        const spotifyLink = audio.links?.spotify ?? audio.href;

        return (
          <article key={audio.id}>
            <div className="audio-cover">{cover}</div>
            <button type="button" aria-label={linkLabel}>▶</button>
            <div className="audio-main">
              <h3>{title}</h3>
              <p>{audio.positioning[language]}</p>
              <img src={asset.wave} alt="" aria-hidden="true" />
            </div>
            <p className="audio-meta">
              <span>{audio.duration ?? asset.duration}</span>
              <span>{audio.published ?? asset.date}</span>
            </p>
            <div className="audio-links">
              <a href={appleLink} aria-label={linkLabel}>
                Apple Podcasts ↗
              </a>
              <a href={spotifyLink} aria-label={`${linkLabel} on Spotify`}>
                Spotify ↗
              </a>
            </div>
            <p className="visually-hidden">{audio.recommendedEpisode[language]}</p>
          </article>
        );
      })}
    </section>
  );
}
