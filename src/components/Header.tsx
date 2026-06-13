import type { Language } from '../types';

type HeaderProps = {
  language: Language;
  onToggleLanguage: () => void;
};

const navItems = [
  { label: 'Files', href: '#files' },
  { label: 'Signals', href: '#signals' },
  { label: 'Audio', href: '#audio' },
  { label: 'Roaming', href: '#roaming' },
  { label: 'Connect', href: '#connect' },
];

export function Header({ language, onToggleLanguage }: HeaderProps) {
  return (
    <header id="top">
      <a href="#top" aria-label="Unfinished Archive home">
        UA
      </a>
      <nav aria-label="Primary">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <button type="button" onClick={onToggleLanguage}>
        {language === 'en' ? '中文' : 'EN'}
      </button>
    </header>
  );
}
