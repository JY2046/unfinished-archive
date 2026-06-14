export type Language = 'en' | 'zh';

export type LocalizedText = Record<Language, string>;

export type Feature = {
  id: string;
  number: string;
  title: LocalizedText;
  summary: LocalizedText;
  href: string;
};

export type FileCategory = 'creation' | 'ai' | 'audio' | 'roaming' | 'work';

export type SelectedFile = {
  id: string;
  number: string;
  category: FileCategory;
  title: LocalizedText;
  meaning: LocalizedText;
  platform: string;
  href: string;
  imageKey?: string;
};

export type Signal = {
  id: string;
  number: string;
  title: LocalizedText;
  body: LocalizedText;
};

export type AudioNote = {
  id: string;
  title: LocalizedText;
  positioning: LocalizedText;
  recommendedEpisode: LocalizedText;
  href: string;
  episode?: string;
  duration?: string;
  published?: string;
  coverLabel?: string;
  waveKey?: string;
  links?: {
    apple?: string;
    spotify?: string;
  };
};

export type Capability = {
  id: string;
  title: LocalizedText;
  proof: LocalizedText;
};

export type RoamingNote = {
  id: string;
  place: LocalizedText;
  caption: LocalizedText;
  meta: string;
  imageKey?: string;
};

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  caption?: LocalizedText;
  kind?: string;
};

export type BrandContent = {
  title: string;
  titleZh: string;
  tagline: LocalizedText;
  identity: LocalizedText;
  intro: LocalizedText;
};

export type SiteContent = {
  brand: BrandContent;
  features: Feature[];
  selectedFiles: SelectedFile[];
  signals: Signal[];
  audioNotes: AudioNote[];
  capabilities: Capability[];
  roamingNotes: RoamingNote[];
  socialLinks: SocialLink[];
};
