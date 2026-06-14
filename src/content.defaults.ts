import type {
  AudioNote,
  Capability,
  Feature,
  RoamingNote,
  SelectedFile,
  Signal,
  SocialLink,
} from './types';

export const brand = {
  title: 'Unfinished Archive',
  titleZh: '未完成档案',
  tagline: {
    en: 'An unfinished archive of AI, taste, creation, and becoming.',
    zh: '一份关于 AI、审美、创作与成为自己的未完成档案。',
  },
  identity: {
    en: 'AI product thinker · creator · podcaster · observer',
    zh: 'AI 产品思考者 · 创作者 · 播客主 · 观察者',
  },
  intro: {
    en: 'A personal index for products, media, places, and unfinished thoughts collected while learning how intelligence can feel more human.',
    zh: '这里收藏产品、媒介、地点与仍在形成中的想法，也记录我如何理解更有人味的智能。',
  },
};

export const features: Feature[] = [
  {
    id: 'creation',
    number: '01',
    title: { en: 'Creation', zh: '创作' },
    summary: {
      en: 'Short videos, visual experiments, and public notes.',
      zh: '短视频、视觉实验与公开表达。',
    },
    href: '#files',
  },
  {
    id: 'signals',
    number: '02',
    title: { en: 'AI Signals', zh: 'AI 信号' },
    summary: {
      en: 'Small observations about products, interfaces, and tools.',
      zh: '关于产品、界面与工具的细小观察。',
    },
    href: '#signals',
  },
  {
    id: 'audio',
    number: '03',
    title: { en: 'Audio Notes', zh: '声音笔记' },
    summary: {
      en: 'Podcasts about AI news, personal growth, and becoming.',
      zh: '关于 AI 资讯、个人成长和成为自己的播客。',
    },
    href: '#audio',
  },
];

export const selectedFiles: SelectedFile[] = [
  {
    id: 'short-video',
    number: '001',
    category: 'creation',
    title: { en: 'Short Video Experiments', zh: '短视频创作实验' },
    meaning: {
      en: 'A public practice in rhythm, taste, and storytelling.',
      zh: '关于节奏、审美与表达方式的公开练习。',
    },
    platform: 'Douyin / Xiaohongshu',
    href: '#connect',
  },
  {
    id: 'ai-news-podcast',
    number: '002',
    category: 'audio',
    title: { en: 'AI News Podcast', zh: 'AI 资讯播客' },
    meaning: {
      en: 'A habit of tracking signals before they become obvious.',
      zh: '在趋势变得显而易见之前，先练习捕捉信号。',
    },
    platform: 'Podcast',
    href: '#audio',
  },
  {
    id: 'growth-podcast',
    number: '003',
    category: 'audio',
    title: { en: 'Personal Growth Podcast', zh: '个人成长播客' },
    meaning: {
      en: 'A record of becoming, doubt, momentum, and self-design.',
      zh: '关于成长、怀疑、行动力和自我设计的记录。',
    },
    platform: 'Podcast',
    href: '#audio',
  },
  {
    id: 'product-note',
    number: '004',
    category: 'ai',
    title: { en: 'Product Observation Notes', zh: '产品观察笔记' },
    meaning: {
      en: 'Questions about what makes AI products calm, useful, and humane.',
      zh: '追问什么样的 AI 产品能变得安静、有效且有人味。',
    },
    platform: 'Archive',
    href: '#signals',
  },
  {
    id: 'roaming-note',
    number: '005',
    category: 'roaming',
    title: { en: 'Roaming Field Notes', zh: '漫游田野笔记' },
    meaning: {
      en: 'Travel and life fragments as training data for taste.',
      zh: '把旅行与生活碎片当作审美的训练材料。',
    },
    platform: 'Places',
    href: '#roaming',
  },
];

export const signals: Signal[] = [
  {
    id: 'calm-ai',
    number: 'Signal 01',
    title: { en: 'Helpful, not noisy', zh: '有用，而不是吵闹' },
    body: {
      en: 'What makes an AI product feel helpful instead of loud?',
      zh: '什么样的 AI 产品会让人觉得被帮助，而不是被打扰？',
    },
  },
  {
    id: 'taste-amplifier',
    number: 'Signal 02',
    title: { en: 'Taste amplifier', zh: '审美放大器' },
    body: {
      en: 'The best AI tools may feel less like automation and more like taste amplification.',
      zh: '好的 AI 工具也许不是替你自动化，而是放大你的判断力和审美。',
    },
  },
  {
    id: 'human-interface',
    number: 'Signal 03',
    title: { en: 'Human interface', zh: '有人味的界面' },
    body: {
      en: 'I am collecting interfaces where intelligence becomes calm, legible, and human.',
      zh: '我正在收集那些让智能变得安静、清晰、有人味的界面。',
    },
  },
];

export const audioNotes: AudioNote[] = [
  {
    id: 'ai-news-one',
    title: { en: 'AI Dispatch 01', zh: 'AI 资讯播客 01' },
    positioning: {
      en: 'Fast-moving AI news, distilled into usable context.',
      zh: '把快速变化的 AI 资讯整理成可理解的上下文。',
    },
    recommendedEpisode: {
      en: 'Recommended episode coming soon',
      zh: '推荐单集即将补充',
    },
    href: '#connect',
  },
  {
    id: 'ai-news-two',
    title: { en: 'AI Dispatch 02', zh: 'AI 资讯播客 02' },
    positioning: {
      en: 'Signals, tools, and questions from the AI product frontier.',
      zh: '来自 AI 产品前沿的信号、工具与问题。',
    },
    recommendedEpisode: {
      en: 'Recommended episode coming soon',
      zh: '推荐单集即将补充',
    },
    href: '#connect',
  },
  {
    id: 'growth',
    title: { en: 'Becoming Notes', zh: '个人成长播客' },
    positioning: {
      en: 'A personal audio journal about growth and self-design.',
      zh: '关于成长和自我设计的个人声音日志。',
    },
    recommendedEpisode: {
      en: 'Recommended episode coming soon',
      zh: '推荐单集即将补充',
    },
    href: '#connect',
  },
];

export const capabilities: Capability[] = [
  {
    id: 'product-sense',
    title: { en: 'Product Sense', zh: '产品感' },
    proof: {
      en: 'Framing problems, reading signals, and shaping useful experiences.',
      zh: '定义问题、捕捉信号，并把想法整理成有用体验。',
    },
  },
  {
    id: 'creative-direction',
    title: { en: 'Creative Direction', zh: '创意方向' },
    proof: {
      en: 'Turning fragments into a coherent visual and narrative system.',
      zh: '把碎片整理成有一致性的视觉与叙事系统。',
    },
  },
  {
    id: 'content-systems',
    title: { en: 'Content Systems', zh: '内容系统' },
    proof: {
      en: 'Building repeatable formats for video, audio, and public learning.',
      zh: '为视频、播客和公开学习建立可持续的表达格式。',
    },
  },
  {
    id: 'ai-tooling',
    title: { en: 'AI Tooling', zh: 'AI 工具敏感度' },
    proof: {
      en: 'Testing tools through the lens of workflow, taste, and utility.',
      zh: '从流程、审美和实用性角度测试 AI 工具。',
    },
  },
  {
    id: 'storytelling',
    title: { en: 'Storytelling', zh: '叙事能力' },
    proof: {
      en: 'Making abstract ideas easier to follow, remember, and share.',
      zh: '把抽象想法变得容易理解、记住和分享。',
    },
  },
  {
    id: 'cultural-observation',
    title: { en: 'Cultural Observation', zh: '文化观察' },
    proof: {
      en: 'Using places, media, and everyday details as material for taste.',
      zh: '把地点、媒介和日常细节转化成审美材料。',
    },
  },
];

export const roamingNotes: RoamingNote[] = [
  {
    id: 'kyoto',
    place: { en: 'Kyoto, Japan', zh: '京都，日本' },
    caption: {
      en: 'A quiet street and slow mornings.',
      zh: '安静的街道和缓慢的早晨。',
    },
    meta: 'Apr 2024',
  },
  {
    id: 'osaka',
    place: { en: 'Tadao Ando Museum, Osaka', zh: '安藤忠雄美术馆，大阪' },
    caption: {
      en: 'Light, space, and intention.',
      zh: '光、空间与意图。',
    },
    meta: 'Mar 2024',
  },
  {
    id: 'coast',
    place: { en: 'Setouchi Coast', zh: '濑户内海岸' },
    caption: {
      en: 'Where land meets pause.',
      zh: '陆地与停顿相遇的地方。',
    },
    meta: 'Feb 2024',
  },
  {
    id: 'lisbon',
    place: { en: 'Lisbon, Portugal', zh: '里斯本，葡萄牙' },
    caption: {
      en: 'Small city, big feeling.',
      zh: '小城，大感受。',
    },
    meta: 'Nov 2023',
  },
  {
    id: 'bali',
    place: { en: 'Bali, Indonesia', zh: '巴厘岛，印度尼西亚' },
    caption: {
      en: 'Nature resets what matters.',
      zh: '自然重新校准重要之事。',
    },
    meta: 'Sep 2023',
  },
  {
    id: 'seoul',
    place: { en: 'Seoul, Korea', zh: '首尔，韩国' },
    caption: {
      en: 'Energy, speed, and good people.',
      zh: '能量、速度和好的人。',
    },
    meta: 'Jul 2023',
  },
];

export const socialLinks: SocialLink[] = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/JY2046/unfinished-archive' },
];
