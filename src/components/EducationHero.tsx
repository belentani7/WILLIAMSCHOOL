import { useState } from 'react';

type PathId = 'fundamentos' | 'lenguas' | 'practica';
type Route = { label: string; title: string; description: string; takeaway: string };
const ROUTES: Record<PathId, Route> = {
  fundamentos: {
    label: 'Currículo y competencias',
    title: 'Construye una base sólida.',
    description: 'Matemáticas, lectura, ciencias y competencias escolares conectadas con objetivos comprensibles. Explora el plan académico antes de empezar.',
    takeaway: 'Comprender, practicar y volver a explicar.',
  },
  lenguas: {
    label: 'Puentes lingüísticos',
    title: 'Aprende entre culturas.',
    description: 'Reconoce situaciones reales de lectura y comunicación entre portugués, español y catalán. Los materiales y sus idiomas deben comprobarse dentro de cada módulo.',
    takeaway: 'Comunicación relevante en la vida diaria.',
  },
  practica: {
    label: 'Práctica y progreso',
    title: 'Demuestra lo aprendido.',
    description: 'Selecciona un perfil local, estudia lecciones disponibles y registra el avance dentro de la herramienta existente. No se generan notas oficiales.',
    takeaway: 'Evidencia de trabajo, no solo tiempo en pantalla.',
  },
};
const ids: PathId[] = ['fundamentos', 'lenguas', 'practica'];

export function EducationHero({ onAcademic, onPractice }: { onAcademic: () => void; onPractice: () => void }) {
  const [selected, setSelected] = useState<PathId>('fundamentos');
  const current = ROUTES[selected];
  return (
    <section className="edu-hero" id="inicio" aria-labelledby="edu-hero-title">
      <div className="edu-hero-grid">
        <div className="edu-hero-copy">
          <p className="edu-eyebrow">WILLIAMSCHOOL · Educación abierta</p>
          <h1 id="edu-hero-title">Aprender con método.<br /><em>Avanzar con autonomía.</em></h1>
          <p className="edu-lead">Una escuela de estudio personal que une contenidos escolares, competencias prácticas y acompañamiento cultural. Un lugar para aprender, practicar y volver a intentarlo con claridad.</p>
          <div className="edu-actions">
            <button type="button" className="edu-button edu-button-primary" onClick={onAcademic}>Explorar plan académico</button>
            <button type="button" className="edu-button edu-button-secondary" onClick={onPractice}>Ir a práctica y progreso</button>
          </div>
          <p className="edu-disclosure">Acceso libre · Progreso guardado en el dispositivo cuando la función lo admite · Sin títulos oficiales</p>
        </div>
        <div className="edu-art" aria-label="Símbolo editorial de caminos de aprendizaje" role="img">
          <div className="edu-art-rings" aria-hidden="true" />
          <p>Conocimiento<br />que se convierte<br /><i>en posibilidad.</i></p>
          <span className="edu-art-credit">ESCUELA · LENGUAS · PRÁCTICA</span>
        </div>
      </div>
      <div className="edu-paths" aria-label="Explorar tres vías de aprendizaje">
        <div className="edu-path-heading">
          <p className="edu-eyebrow">Una orientación clara</p>
          <h2>Elige tu punto de partida.</h2>
        </div>
        <div className="edu-path-controls" role="group" aria-label="Elegir itinerario">
          {ids.map(id => (
            <button key={id} type="button" aria-pressed={selected === id} onClick={() => setSelected(id)}>
              {ROUTES[id].label}
            </button>
          ))}
        </div>
        <div className="edu-path-detail" aria-live="polite" aria-atomic="true">
          <div><h3>{current.title}</h3><p>{current.description}</p></div>
          <div><span>Objetivo del itinerario</span><strong>{current.takeaway}</strong></div>
        </div>
      </div>
    </section>
  );
}
