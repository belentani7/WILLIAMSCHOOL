import { CampusModule } from '../types';

/**
 * Módulos reales unificados en el Campus.
 * Las cifras proceden de los archivos de cada repositorio (no son estimaciones).
 * 'embedded' = el contenido real vive dentro de esta app (public/modules).
 */
export const CAMPUS_MODULES: CampusModule[] = [
  {
    id: 'biblia',
    name: 'Biblia de Términos',
    tagline: 'Vocabulario técnico universal',
    description:
      'Glosario universal de desarrollo de software: 673 términos en 23 categorías. Cada plataforma tiene definidos los suyos (secure-t, UX Academy, Manos Abiertas, Lingua Aberta y más).',
    sourceRepo: 'belentani7/open-school',
    liveUrl: 'https://open-school-gamma.vercel.app/biblia',
    integration: 'embedded',
    metrics: [
      { label: 'Términos', value: '673' },
      { label: 'Categorías', value: '23' },
      { label: 'Plataformas', value: '6' },
    ],
    accent: 'amber',
    icon: '📖',
  },
  {
    id: 'aprende-brasil',
    name: 'Aprende Brasil',
    tagline: 'Educação para o Brasil',
    description:
      'Trilhas completas em português do Brasil: alfabetização, idiomas, informática e matemática, com 1025 passos de estudo.',
    sourceRepo: 'belentani7/aprende-brasil',
    liveUrl: 'https://aprende-brasil.vercel.app/',
    integration: 'embedded',
    metrics: [
      { label: 'Módulos', value: '205' },
      { label: 'Passos', value: '1025' },
      { label: 'Trilhas', value: '4' },
    ],
    accent: 'emerald',
    icon: '🇧🇷',
  },
  {
    id: 'open-school',
    name: 'Open School',
    tagline: 'Instituto digital universal',
    description:
      'Catálogo de rutas de aprendizaje, la Bíblia de 219 términos de desarrollo, 23 cápsulas diarias y bancos de datos abiertos.',
    sourceRepo: 'belentani7/open-school',
    liveUrl: 'https://open-school-gamma.vercel.app',
    integration: 'embedded',
    metrics: [
      { label: 'Términos bíblia', value: '219' },
      { label: 'Cápsulas', value: '23' },
      { label: 'Rutas', value: '6' },
    ],
    accent: 'sky',
    icon: '🏛️',
  },
  {
    id: 'manos-abiertas',
    name: 'Manos Abiertas',
    tagline: 'IA e ofimática para recién llegados',
    description:
      'Currículo de 26 lecciones de IA, 15 nodos de contenido, ofimática, derechos, finanzas, empleo y preparación DELE.',
    sourceRepo: 'belentani7/ManosAbiertas',
    liveUrl: 'https://belentani7.github.io/ManosAbiertas/',
    integration: 'embedded',
    metrics: [
      { label: 'Lecciones IA', value: '26' },
      { label: 'Nodos', value: '15' },
      { label: 'Conjuntos', value: '18' },
    ],
    accent: 'violet',
    icon: '🤝',
  },
  {
    id: 'belentani',
    name: 'Belentani School',
    tagline: 'ESO · 365 días · 500 juegos',
    description:
      'Esta misma app: plan ESO/Bachillerato, 365 clases diarias, catálogo de 500 minijuegos, falsos amigos PT-ES y bancos open data.',
    sourceRepo: 'belentani7/WILLIAMSCHOOL',
    liveUrl: 'https://williamschool.vercel.app',
    integration: 'embedded',
    metrics: [
      { label: 'Clases', value: '365' },
      { label: 'Minijuegos', value: '500' },
      { label: 'Módulos ESO', value: '14' },
    ],
    accent: 'blue',
    icon: '🎓',
  },
];

export const CAMPUS_ACCENTS: Record<string, { card: string; chip: string; ring: string }> = {
  emerald: {
    card: 'from-emerald-500 to-green-600',
    chip: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    ring: 'ring-emerald-400/50',
  },
  sky: {
    card: 'from-sky-500 to-blue-600',
    chip: 'bg-sky-100 text-sky-800 border-sky-300',
    ring: 'ring-sky-400/50',
  },
  violet: {
    card: 'from-violet-500 to-purple-600',
    chip: 'bg-violet-100 text-violet-800 border-violet-300',
    ring: 'ring-violet-400/50',
  },
  blue: {
    card: 'from-blue-600 to-indigo-700',
    chip: 'bg-blue-100 text-blue-800 border-blue-300',
    ring: 'ring-blue-400/50',
  },
  amber: {
    card: 'from-amber-500 to-orange-600',
    chip: 'bg-amber-100 text-amber-900 border-amber-300',
    ring: 'ring-amber-400/50',
  },
};
