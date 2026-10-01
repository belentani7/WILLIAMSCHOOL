import React, { useEffect, useMemo, useState } from 'react';
import {
  School, ExternalLink, Search, AlertTriangle, ChevronDown, ChevronRight,
  Layers, BookOpen, CheckCircle2,
} from 'lucide-react';
import { CAMPUS_MODULES, CAMPUS_ACCENTS } from '../data/campusData';
import { CampusModule, CurriculumFile, CurriculumModule } from '../types';
import { ModuleDatasets } from './ModuleDatasets';
import { playSoundSuccess } from '../utils/speech';

const BASE = import.meta.env.BASE_URL || '/';
const CURRICULUM_URL = `${BASE}modules/aprende-brasil/curriculum.json`;

function accentOf(id: string) {
  return CAMPUS_ACCENTS[id] ?? CAMPUS_ACCENTS.blue;
}

export const CampusHub: React.FC = () => {
  const [selected, setSelected] = useState<CampusModule | null>(null);
  const [curriculum, setCurriculum] = useState<CurriculumFile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [trackFilter, setTrackFilter] = useState<string>('all');
  const [openModuleId, setOpenModuleId] = useState<string | null>(null);

  // Carga diferida del contenido real solo cuando hace falta (no infla el bundle).
  useEffect(() => {
    if (selected?.id !== 'aprende-brasil' || curriculum || loading) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(CURRICULUM_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<CurriculumFile>;
      })
      .then((data) => {
        if (!cancelled) setCurriculum(data);
      })
      .catch(() => {
        if (!cancelled) setError('No se pudo cargar el contenido de Aprende Brasil.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selected, curriculum, loading]);

  const filteredModules = useMemo(() => {
    if (!curriculum) return [];
    const q = search.trim().toLowerCase();
    return curriculum.modules.filter((m) => {
      if (trackFilter !== 'all' && m.track_id !== trackFilter) return false;
      if (!q) return true;
      return (
        m.title.toLowerCase().includes(q) ||
        m.subtitle.toLowerCase().includes(q) ||
        m.level.toLowerCase().includes(q)
      );
    });
  }, [curriculum, search, trackFilter]);

  const openModule = (mod: CampusModule) => {
    playSoundSuccess();
    setSelected(mod);
    setSearch('');
    setTrackFilter('all');
    setOpenModuleId(null);
  };

  return (
    <div className="space-y-5">
      {/* Encabezado del Campus */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 text-white p-5 shadow-xl border border-slate-700">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 border border-white/20">
            <School className="h-6 w-6 text-sky-300" />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight">Campus Unificado</h2>
            <p className="text-xs text-slate-300">
              Todas las plataformas educativas num só lugar. Português como língua principal.
            </p>
          </div>
        </div>
      </div>

      {/* Tarjetas de módulos */}
      <div className="stagger grid gap-4 sm:grid-cols-2">
        {CAMPUS_MODULES.map((mod) => {
          const a = accentOf(mod.accent);
          const isSel = selected?.id === mod.id;
          return (
            <button
              key={mod.id}
              type="button"
              onClick={() => openModule(mod)}
              className={`text-left rounded-2xl border bg-white p-4 shadow-sm transition-all hover:shadow-md ${
                isSel ? `border-transparent ring-2 ${a.ring}` : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-xl ${a.card}`}>
                  <span>{mod.icon}</span>
                </div>
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${a.chip}`}>
                  {mod.integration === 'embedded' ? 'Integrado' : 'Módulo desplegado'}
                </span>
              </div>
              <h3 className="mt-3 text-sm font-black text-slate-900">{mod.name}</h3>
              <p className="text-[11px] font-semibold text-slate-500">{mod.tagline}</p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-slate-600 line-clamp-3">
                {mod.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {mod.metrics.map((m) => (
                  <span
                    key={m.label}
                    className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-700"
                  >
                    <span className="mono-num">{m.value}</span> {m.label.toLowerCase()}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detalle del módulo seleccionado */}
      {selected && (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">{selected.icon}</span>
              <div>
                <div className="text-sm font-black text-slate-900">{selected.name}</div>
                <div className="text-[10px] text-slate-500">{selected.sourceRepo}</div>
              </div>
            </div>
            <a
              href={selected.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-slate-700"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Abrir módulo completo
            </a>
          </div>

          {/* Aprende Brasil: navegador de contenido real, dentro de la app */}
          {selected.id === 'aprende-brasil' && (
            <div className="p-4 space-y-3">
              {loading && (
                <div className="space-y-2" aria-live="polite" aria-busy="true">
                  <div className="skeleton h-8 w-2/3" />
                  <div className="skeleton h-9 w-full" />
                  <div className="skeleton h-14 w-full" />
                  <div className="skeleton h-14 w-full" />
                  <div className="skeleton h-14 w-5/6" />
                </div>
              )}
              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-800">
                  <AlertTriangle className="h-4 w-4" /> {error}
                </div>
              )}

              {curriculum && (
                <>
                  {/* Trilhas */}
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => setTrackFilter('all')}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-bold border ${
                        trackFilter === 'all'
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-600 border-slate-300'
                      }`}
                    >
                      Todas ({curriculum.modules.length})
                    </button>
                    {curriculum.tracks.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTrackFilter(t.id)}
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold border ${
                          trackFilter === t.id
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-600 border-slate-300'
                        }`}
                      >
                        {t.label} ({t.module_count})
                      </button>
                    ))}
                  </div>

                  {/* Buscador */}
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Buscar módulo, nível ou tema…"
                      className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-xs outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* Lista */}
                  <div className="max-h-[26rem] space-y-1.5 overflow-y-auto pr-1">
                    {filteredModules.length === 0 && (
                      <p className="py-6 text-center text-xs text-slate-500">Nenhum módulo encontrado.</p>
                    )}
                    {filteredModules.map((m: CurriculumModule) => {
                      const isOpen = openModuleId === m.id;
                      return (
                        <div key={m.id} className="rounded-xl border border-slate-200">
                          <button
                            type="button"
                            onClick={() => setOpenModuleId(isOpen ? null : m.id)}
                            className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-slate-50"
                          >
                            {isOpen ? (
                              <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
                            ) : (
                              <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
                            )}
                            <div className="min-w-0 flex-1">
                              <div className="truncate text-xs font-bold text-slate-900">{m.title}</div>
                              <div className="truncate text-[10px] text-slate-500">{m.subtitle}</div>
                            </div>
                            <span className="mono-num flex shrink-0 items-center gap-1 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">
                              <Layers className="h-3 w-3" /> {m.steps.length}
                            </span>
                            <span className="shrink-0 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
                              {m.level}
                            </span>
                          </button>
                          {isOpen && (
                            <div className="space-y-1.5 border-t border-slate-100 bg-slate-50/60 px-3 py-2">
                              {m.objectives?.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 pb-1">
                                  {m.objectives.map((o, i) => (
                                    <span
                                      key={i}
                                      className="flex items-center gap-1 rounded-md bg-white px-1.5 py-0.5 text-[10px] text-slate-600 border border-slate-200"
                                    >
                                      <CheckCircle2 className="h-3 w-3 text-emerald-500" /> {o}
                                    </span>
                                  ))}
                                </div>
                              )}
                              {m.steps.map((s) => (
                                <div key={s.order} className="rounded-lg bg-white border border-slate-200 px-2.5 py-1.5">
                                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                                    <BookOpen className="h-3 w-3" /> {s.type}
                                  </div>
                                  <div className="text-[11px] font-bold text-slate-800">{s.title}</div>
                                  <p className="text-[11px] leading-snug text-slate-600 line-clamp-3">{s.content}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Módulos desplegados aparte: resumen honesto + enlace */}
          {selected.id !== 'aprende-brasil' && (
            <div className="p-4 space-y-3">
              <p className="text-xs leading-relaxed text-slate-600">{selected.description}</p>
              <div className="grid gap-2 sm:grid-cols-3">
                {selected.metrics.map((m) => (
                  <div key={m.label} className="glass-card rounded-xl p-3 text-center">
                    <div className="mono-num text-lg font-black text-slate-900">{m.value}</div>
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-lg bg-blue-50 border border-blue-200 px-3 py-2 text-[11px] text-blue-900">
                Contenido real integrado en la app (cargado desde <span className="mono-num">public/modules/{selected.id}/</span>).
                El módulo completo sigue disponible también en su propio despliegue.
              </div>

              <ModuleDatasets repoId={selected.id} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
