// ============================================================
// PORTFOLIO CONSTANTS — GREG FERREIRA
// ============================================================

export const PERSONAL = {
  name: 'Greg Ferreira',
  title: 'Software Engineering',
  taglines: ['SOFTWARE', 'ENGINEERING', 'AI', 'SYSTEMS'],
  email: 'jailsonjuniorcom12@gmail.com',
  github: 'github.com/Gregwzx',
  linkedin: 'linkedin.com/in/jailson-ferreira-104352348',
  githubUser: 'Gregwzx',
  location: 'Brazil',
  coordinates: '[-23.5505° S, -46.6333° W]',
  buildHash: 'a3f7d19',
  version: 'v1.0.0',
  systemStatus: 'ONLINE',
  bootTime: new Date().toISOString(),
};

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: string;
  status: 'ACTIVE' | 'IN_DEV' | 'ARCHIVED' | 'CLASSIFIED';
  featured: boolean;
  year: string;
  technologies: string[];
  github?: string;
  demo?: string;
  color: string;
  index: number;
}

export const PROJECTS: Project[] = [
  {
    id: 'devtrack',
    title: 'DevTrack',
    subtitle: 'Mobile productivity system',
    description:
      'Full-stack project management application built for development teams. Features real-time task tracking, JWT authentication, and a React Native mobile client backed by a Spring Boot REST API.',
    longDescription:
      'DevTrack is a production-grade project management system designed around engineering workflows. The mobile-first architecture connects a React Native client to a Spring Boot backend through a secured REST API with JWT authentication. Data persistence is handled by MySQL, with Supabase handling real-time features and file storage.',
    category: 'MOBILE · BACKEND',
    status: 'ACTIVE',
    featured: true,
    year: '2024',
    technologies: ['React Native', 'Expo', 'Java', 'Spring Boot', 'MySQL', 'Supabase', 'JWT'],
    github: 'https://github.com/Gregwzx',
    demo: undefined,
    color: '#00f5c4',
    index: 0,
  },
  {
    id: 'meme-cam',
    title: 'Meme Cam',
    subtitle: 'Visão computacional e gestos em tempo real',
    description:
      'Aplicação de visão computacional desenvolvida em Python que utiliza a câmera para identificar gestos das mãos em tempo real e reagir com imagens e memes na tela.',
    longDescription:
      'O Meme Cam é um projeto de visão computacional desenvolvido em Python que explora reconhecimento de mãos, processamento de imagens e interação em tempo real com OpenCV e MediaPipe. Mapeia pontos de articulação dos dedos em tempo real com visual cyberpunk e associa gestos como joinha, paz e mão aberta a reações visuais dinâmicas.',
    category: 'PYTHON · COMPUTER VISION · AI',
    status: 'IN_DEV',
    featured: false,
    year: '2026',
    technologies: ['Python', 'OpenCV', 'MediaPipe', 'NumPy'],
    github: 'https://github.com/Gregwzx',
    demo: undefined,
    color: '#a855f7',
    index: 1,
  },
  {
    id: 'aura-fit',
    title: 'Aura Fit',
    subtitle: 'Interface web moderna para rotina fitness',
    description:
      'Interface web moderna e responsiva voltada para acompanhamento de treinos, evolução diária e organização de rotina fitness com foco em UI/UX e componentização.',
    longDescription:
      'O Aura Fit é um projeto de front-end focado na construção de uma experiência moderna de acompanhamento e organização de rotinas de treino. Desenvolvido para praticar componentização, responsividade e design de interfaces interativas, transformando dados de evolução fitness em uma aplicação web fluida e estilizada.',
    category: 'FRONT-END · WEB · UI/UX',
    status: 'IN_DEV',
    featured: false,
    year: '2026',
    technologies: ['React', 'JavaScript', 'HTML5', 'CSS3'],
    github: 'https://github.com/Gregwzx',
    demo: undefined,
    color: '#00f59b',
    index: 2,
  },
];

export interface TechItem {
  name: string;
  category: string;
  level: 'proficient' | 'learning' | 'familiar';
  icon?: string;
}

export const TECH_STACK: TechItem[] = [
  // Frontend
  { name: 'React', category: 'Frontend', level: 'proficient' },
  { name: 'TypeScript', category: 'Frontend', level: 'proficient' },
  { name: 'Next.js', category: 'Frontend', level: 'familiar' },
  { name: 'Tailwind CSS', category: 'Frontend', level: 'proficient' },
  { name: 'HTML / CSS', category: 'Frontend', level: 'proficient' },
  // Backend
  { name: 'Java', category: 'Backend', level: 'proficient' },
  { name: 'Spring Boot', category: 'Backend', level: 'proficient' },
  { name: 'REST APIs', category: 'Backend', level: 'proficient' },
  { name: 'JWT / Auth', category: 'Backend', level: 'proficient' },
  { name: 'Node.js', category: 'Backend', level: 'familiar' },
  // Mobile
  { name: 'React Native', category: 'Mobile', level: 'proficient' },
  { name: 'Expo', category: 'Mobile', level: 'proficient' },
  // Database
  { name: 'MySQL', category: 'Database', level: 'proficient' },
  { name: 'Supabase', category: 'Database', level: 'proficient' },
  { name: 'PostgreSQL', category: 'Database', level: 'familiar' },
  // Tools
  { name: 'Git', category: 'Tools', level: 'proficient' },
  { name: 'Docker', category: 'Tools', level: 'familiar' },
  { name: 'Linux', category: 'Tools', level: 'familiar' },
  // Learning & AI
  { name: 'Python', category: 'Learning', level: 'proficient' },
  { name: 'OpenCV', category: 'Learning', level: 'learning' },
  { name: 'MediaPipe', category: 'Learning', level: 'learning' },
  { name: 'Machine Learning', category: 'Learning', level: 'learning' },
  { name: 'WebGL / Three.js', category: 'Learning', level: 'learning' },
];

export const TECH_CATEGORIES = ['Frontend', 'Backend', 'Mobile', 'Database', 'Tools', 'Learning'];

export const ABOUT_PHASES = [
  {
    id: 'aprender',
    label: 'LEARN',
    year: '2025',
    description:
      'Iniciei minha graduação em Análise e Desenvolvimento de Sistemas na UNINASSAU. Foquei nos fundamentos da programação, Java, Python, bancos de dados e princípios do desenvolvimento de software.',
    detail: 'Lógica de Programação · Java · Python · SQL · Ciência da Computação',
  },
  {
    id: 'construir',
    label: 'BUILD',
    year: '2025',
    description:
      'Comecei a desenvolver projetos práticos, explorando APIs, bancos de dados e desenvolvimento de aplicações. Aprendi a transformar conceitos em soluções funcionais.',
    detail: 'React · APIs REST · MySQL · Git · Desenvolvimento de Software',
  },
  {
    id: 'suporte',
    label: 'SUPPORT',
    year: '2025–2026',
    description:
      'Trabalhei na Smartsys LTDA, prestando suporte técnico, auxiliando usuários, realizando treinamentos, trabalhando com consultas SQL e ajudando na organização de processos empresariais.',
    detail: 'Suporte Técnico · SQL/MySQL · Resolução de Problemas · Treinamento de Usuários',
  },
  {
    id: 'engenharia',
    label: 'ENGINEER',
    year: '2026',
    description:
      'Desenvolvo projetos que conectam frontend, backend, bancos de dados e autenticação. Trabalho no DevTrack, uma aplicação para acompanhamento de estudos, e no Arcoverde Conecta, uma plataforma para gerenciar solicitações de serviços públicos.',
    detail: 'React Native · Expo · Java · Spring Boot · Supabase · JWT',
  },
  {
    id: 'inovar',
    label: 'INNOVATE',
    year: '2026',
    description:
      'Ampliando meus conhecimentos em engenharia de software, inteligência artificial e cibersegurança. Meu foco é desenvolver projetos práticos, aprimorar minhas habilidades técnicas e me preparar para a próxima etapa da minha carreira.',
    detail: 'Engenharia de Software · Inteligência Artificial · Cibersegurança',
  },
];

export const TERMINAL_LOGS = [
  { type: 'cmd', text: 'sys.init --env production' },
  { type: 'output', text: '> loading modules...' },
  { type: 'success', text: '✓ portfolio.core loaded' },
  { type: 'success', text: '✓ 3d.engine initialized' },
  { type: 'success', text: '✓ motion.system active' },
  { type: 'output', text: '> version: v1.0.0 · build: a3f7d19' },
  { type: 'output', text: '> status: ONLINE' },
];

export const DEVTRACK_ARCH_NODES = [
  {
    id: 'mobile',
    label: 'MOBILE CLIENT',
    sublabel: 'React Native · Expo',
    description: 'Cross-platform mobile application. Handles UI, state management, and API communication through a clean service layer.',
    color: '#00f5c4',
  },
  {
    id: 'api',
    label: 'API GATEWAY',
    sublabel: 'REST · HTTP · JWT',
    description: 'Secure REST endpoints. JWT middleware validates every request before it reaches business logic.',
    color: '#00c4f5',
  },
  {
    id: 'backend',
    label: 'SPRING BOOT',
    sublabel: 'Java · Business Logic',
    description: 'Core application server. Handles authentication, project management, task routing, and all business rules.',
    color: '#c4f500',
  },
  {
    id: 'database',
    label: 'DATABASE LAYER',
    sublabel: 'MySQL · Supabase',
    description: 'Persistent storage with MySQL for relational data and Supabase for real-time features and file storage.',
    color: '#f500c4',
  },
];

export const MEMECAM_PIPELINE_NODES = [
  {
    id: 'capture',
    label: 'OPENCV FRAME CAPTURE',
    sublabel: 'Webcam · 60 FPS · Frame Preprocessing',
    description: 'Captura contínua de frames via câmera do computador, convertendo canais BGR/RGB e otimizando resoluções para resposta em tempo real.',
    color: '#a855f7',
  },
  {
    id: 'landmarks',
    label: 'MEDIAPIPE HAND TRACKING',
    sublabel: '21 3D Landmarks · Single Hand Isolation',
    description: 'Extração e rastreamento dos 21 pontos de referência das mãos. Isola apenas uma mão dominante para evitar interferências no campo de visão.',
    color: '#c084fc',
  },
  {
    id: 'classifier',
    label: 'GESTURE CLASSIFIER',
    sublabel: 'Vector Geometry · Distance Ratios',
    description: 'Cálculo de ângulos e distâncias euclidianas dos dedos em relação à palma. Identifica joinha, sinal de paz, dedo do meio e mão aberta.',
    color: '#00f5c4',
  },
  {
    id: 'reaction',
    label: 'MEME & HUD OVERLAY',
    sublabel: 'Real-Time Reaction · Cyberpunk Skeleton',
    description: 'Sobrepõe representação visual futurista das articulações e aciona imagens/memes correspondentes dinamicamente na tela.',
    color: '#38bdf8',
  },
];

export const AURAFIT_ARCH_NODES = [
  {
    id: 'components',
    label: 'COMPONENT ARCHITECTURE',
    sublabel: 'React · Modular System',
    description: 'Construção orientada a componentes desacoplados e reutilizáveis, garantindo código limpo, testável e de fácil escalabilidade.',
    color: '#00f59b',
  },
  {
    id: 'metrics',
    label: 'FITNESS TELEMETRY',
    sublabel: 'Calories · Active Time · Streaks',
    description: 'Camada de dados focada em acompanhamento de evolução física, contabilizando metas diárias, calorias e consistência de treinos.',
    color: '#06b6d4',
  },
  {
    id: 'ui-design',
    label: 'MODERN FITNESS UI',
    sublabel: 'Responsive Design · High Contrast',
    description: 'Interface com visual esportivo moderno, paleta de alto contraste, tipografia técnica e layout adaptável a qualquer dispositivo.',
    color: '#3b82f6',
  },
  {
    id: 'ux-interactions',
    label: 'MICRO-INTERACTIONS & FEEDBACK',
    sublabel: 'Fluid Transitions · Visual Rewards',
    description: 'Experiência do usuário aprimorada com animações suaves e reforço positivo a cada conclusão de rotina ou treino diário.',
    color: '#a855f7',
  },
];
