import React, { useEffect, useMemo, useState } from 'react';
import { Play, ShieldCheck, CheckCircle, Search, Loader2, AlertTriangle, ExternalLink } from 'lucide-react';
import { EDUTUBE_VIDEOS } from '../data/curriculumData';
import { EduTubeVideo, VerifiedVideo, VerifiedVideoFile } from '../types';
import { speakBelentani, playSoundSuccess } from '../utils/speech';

const BASE = import.meta.env.BASE_URL || '/';
const VIDEOS_URL = `${BASE}modules/edutube/videos.json`;

export const EduTube: React.FC = () => {
  const [videos, setVideos] = useState<VerifiedVideo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<boolean>(false);
  const [selected, setSelected] = useState<VerifiedVideo | null>(null);
  const [fallbackVideo, setFallbackVideo] = useState<EduTubeVideo | null>(null);
  const [subject, setSubject] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch(VIDEOS_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<VerifiedVideoFile>;
      })
      .then((data) => {
        if (cancelled) return;
        setVideos(data.videos ?? []);
        setSelected((data.videos ?? [])[0] ?? null);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const subjects = useMemo(
    () => Array.from(new Set(videos.map((v) => v.subject))).sort(),
    [videos]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return videos.filter((v) => {
      if (subject !== 'all' && v.subject !== subject) return false;
      if (!q) return true;
      return (
        v.title.toLowerCase().includes(q) ||
        v.channel.toLowerCase().includes(q) ||
        v.topics.join(' ').toLowerCase().includes(q)
      );
    });
  }, [videos, subject, search]);

  const pick = (v: VerifiedVideo) => {
    playSoundSuccess();
    setSelected(v);
    setFallbackVideo(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const markDone = (id: string) => {
    playSoundSuccess();
    setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden text-slate-800">
      {/* Header bar */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white px-4 py-2.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white text-red-600 flex items-center justify-center font-black shadow">
            <Play className="w-4 h-4 fill-red-600 ml-0.5" />
          </div>
          <div>
            <span className="text-base font-black tracking-tight">EduTube · Aula Segura</span>
            <span className="text-[11px] ml-2 px-2 py-0.5 rounded-full bg-red-800/80 text-white border border-red-400/40">
              {videos.length > 0 ? `${videos.length} vídeos verificados` : 'Vídeos verificados'}
            </span>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-800/60 border border-white/20 text-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
          <span>Canales educativos de confianza</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row bg-slate-100 overflow-hidden p-4 gap-4">
        {/* Player */}
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
          <div className="w-full aspect-[16/9] bg-black rounded-xl shadow-lg border border-slate-700 overflow-hidden relative">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center text-slate-300 text-xs gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Cargando vídeos…
              </div>
            )}
            {!loading && selected && (
              <iframe
                key={selected.id}
                src={selected.embedUrl}
                title={selected.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            )}
            {!loading && !selected && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center text-slate-300">
                <AlertTriangle className="h-6 w-6 text-amber-400" />
                <p className="text-xs">
                  {loadError
                    ? 'No se pudo cargar la lista verificada. Ejecuta scripts/build-edutube.mjs para regenerarla.'
                    : 'Elige un vídeo de la lista.'}
                </p>
              </div>
            )}
          </div>

          {/* Detalles del vídeo */}
          <div className="bg-white rounded-xl shadow border border-slate-200 p-4 space-y-2">
            {selected ? (
              <>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-sm font-black text-slate-900">{selected.title}</h2>
                  <button
                    type="button"
                    onClick={() => markDone(selected.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      completed.includes(selected.id)
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    {completed.includes(selected.id) ? 'Visto' : 'Marcar como visto'}
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                  <span className="rounded-md bg-red-50 px-2 py-0.5 font-bold text-red-700">{selected.subject}</span>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 font-semibold">{selected.course}</span>
                  <span className="text-slate-600">{selected.channel}</span>
                  <a
                    href={selected.watchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto flex items-center gap-1 font-bold text-blue-700 hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Ver en YouTube
                  </a>
                </div>
              </>
            ) : (
              <p className="text-xs text-slate-500">Selecciona una lección para verla aquí.</p>
            )}
          </div>

          {/* Lecciones estáticas de refuerzo (contenido propio, sin vídeo externo) */}
          <div className="bg-white rounded-xl shadow border border-slate-200 p-4 space-y-2">
            <div className="text-xs font-bold text-slate-900">Micro-lecciones de refuerzo (texto + voz)</div>
            <div className="flex flex-wrap gap-2">
              {EDUTUBE_VIDEOS.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => {
                    playSoundSuccess();
                    setFallbackVideo(v);
                    speakBelentani(`${v.title}. ${v.keyTakeaway}`, { lang: 'es' });
                  }}
                  className={`rounded-lg border px-2.5 py-1.5 text-left text-[11px] transition-all ${
                    fallbackVideo?.id === v.id
                      ? 'border-red-500 bg-red-50 text-red-900 ring-1 ring-red-400/40'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="font-bold">{v.title}</span>
                </button>
              ))}
            </div>
            {fallbackVideo && (
              <div className="rounded-lg bg-sky-50 border border-sky-200 px-3 py-2 text-[11px] text-sky-950">
                <strong>{fallbackVideo.subject}:</strong> {fallbackVideo.keyTakeaway}
              </div>
            )}
          </div>
        </div>

        {/* Playlist */}
        <div className="w-full lg:w-96 bg-white rounded-xl shadow border border-slate-200 p-4 flex flex-col gap-3 overflow-hidden">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="font-bold text-sm text-slate-900">Lecciones de vídeo</span>
            <span className="text-xs text-slate-500">
              {completed.length}/{videos.length || EDUTUBE_VIDEOS.length} vistas
            </span>
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por título, canal o tema…"
              className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-xs outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {subjects.length > 1 && (
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setSubject('all')}
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold border ${
                  subject === 'all' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-slate-600 border-slate-300'
                }`}
              >
                Todas
              </button>
              {subjects.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSubject(s)}
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold border ${
                    subject === s ? 'bg-red-600 text-white border-red-600' : 'bg-white text-slate-600 border-slate-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="flex-1 space-y-2 overflow-y-auto">
            {filtered.length === 0 && !loading && (
              <p className="py-6 text-center text-xs text-slate-500">
                {videos.length === 0 ? 'Sin vídeos verificados cargados.' : 'Ningún vídeo coincide.'}
              </p>
            )}
            {filtered.map((v) => {
              const isSelected = selected?.id === v.id;
              const isDone = completed.includes(v.id);
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => pick(v)}
                  className={`w-full text-left rounded-xl border overflow-hidden transition-all flex gap-2 p-2 ${
                    isSelected ? 'border-red-500 bg-red-50/70 ring-2 ring-red-400/40' : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <img
                    src={v.thumbnail}
                    alt=""
                    loading="lazy"
                    className="h-12 w-20 shrink-0 rounded-md object-cover bg-slate-200"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span className="font-bold uppercase tracking-wider text-red-700">{v.subject}</span>
                      {isDone && <CheckCircle className="w-3 h-3 text-emerald-600" />}
                    </div>
                    <div className="line-clamp-2 text-[11px] font-bold leading-snug text-slate-900">{v.title}</div>
                    <div className="truncate text-[10px] text-slate-500">{v.channel}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
