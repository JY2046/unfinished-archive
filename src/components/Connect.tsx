import {
  EnvelopeSimple,
  FileText,
  GithubLogo,
  Icon,
  InstagramLogo,
  LinkedinLogo,
  MicrophoneStage,
  TiktokLogo,
} from '@phosphor-icons/react';
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

const contactItems: Array<{
  id: string;
  label: string;
  caption: Record<Language, string>;
  icon: Icon;
  href?: string;
}> = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    caption: { en: 'Coming soon', zh: '稍后补充' },
    icon: LinkedinLogo,
  },
  {
    id: 'github',
    label: 'GitHub',
    caption: { en: 'See my work', zh: '查看作品' },
    icon: GithubLogo,
    href: socialLinks.find((link) => link.id === 'github')?.href,
  },
  {
    id: 'xiaohongshu',
    label: '小红书',
    caption: { en: 'Creator notes', zh: '创作笔记' },
    icon: InstagramLogo,
  },
  {
    id: 'douyin',
    label: '抖音',
    caption: { en: 'Short video archive', zh: '短视频档案' },
    icon: TiktokLogo,
  },
  {
    id: 'podcast',
    label: 'Podcast',
    caption: { en: 'Listen in', zh: '收听节目' },
    icon: MicrophoneStage,
  },
  {
    id: 'email',
    label: 'Email',
    caption: { en: 'Coming soon', zh: '稍后补充' },
    icon: EnvelopeSimple,
  },
  {
    id: 'resume',
    label: 'Resume',
    caption: { en: 'Coming soon', zh: '稍后补充' },
    icon: FileText,
  },
];

export function Connect({ language }: ConnectProps) {
  return (
    <footer id="connect" className="connect" aria-labelledby="connect-title">
      <div className="section-bar">
        <h2 id="connect-title">{copy[language].heading}</h2>
        <span>联系</span>
      </div>
      <p className="connect__intro">{copy[language].body}</p>
      <ul>
        {contactItems.map((item) => {
          const IconComponent = item.icon;
          const content = (
            <>
              <IconComponent size={32} weight="fill" aria-hidden="true" />
              <span>
                <strong>{item.label}</strong>
                <small>{item.caption[language]}</small>
              </span>
            </>
          );

          return (
            <li key={item.id}>
              {item.href ? <a href={item.href}>{content}</a> : <span aria-disabled="true">{content}</span>}
          </li>
          );
        })}
      </ul>
    </footer>
  );
}
