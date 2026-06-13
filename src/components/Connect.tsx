import { socialLinks } from '../content';
import type { Language } from '../types';

type ConnectProps = {
  language: Language;
};

const copy: Record<Language, { heading: string; body: string }> = {
  en: {
    heading: 'Connect',
    body: 'Find the public traces of this archive across work, notes, audio, and social spaces.',
  },
  zh: {
    heading: '连接',
    body: '在工作、笔记、声音和社交空间里找到这份档案的公开痕迹。',
  },
};

export function Connect({ language }: ConnectProps) {
  return (
    <footer id="connect" aria-labelledby="connect-title">
      <h2 id="connect-title">{copy[language].heading}</h2>
      <p>{copy[language].body}</p>
      <ul>
        {socialLinks.map((link) => (
          <li key={link.id}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
