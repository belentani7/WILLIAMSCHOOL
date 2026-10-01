import React, { useEffect, useMemo, useState } from 'react';
import { Loader2, Search, AlertTriangle, ChevronDown, ChevronRight, Database } from 'lucide-react';

/**
 * Visor genérico de los datasets reales portados desde los otros repos.
 * No conoce cada esquema: extrae un título/subtítulo razonable y permite
 * expandir el JSON original. Honesto: muestra exactamente lo que hay.
 */
const BASE = import.meta.env.BASE_URL || '/';

type Dataset = { id: string; label: string; kind: 'array' | 'object'; count: number; file: string };
type IndexFile = { repo: string; generatedAt: string; datasets: Dataset[]; skipped?: string[] };

const TITLE_KEYS = ['title', 'name', 'nombre', 'word', 'abrev', 'label', 'headline', 'fecha', 'id', 'code'];
const SUB_KEYS = ['subtitle', 'description', 'desc', 'significado', 'claim', 'summary', 'trapMeaning', 'objective', 'level'];

function asString(v: unknown): string | undefined {
  if (typeof v === 'string' && v.trim()) return v;
  if (typeof v === 'number') return String(v);
  if (v && typeof v === 'object') {
    const o = v as Record<string, unknown>;
    for (const k of ['es', 'pt', 'en', 'ca', 'ar']) if (typeof o[k] === 'string') return o[k] as string;
    const first = Object.values(o).find((x) => typeof x === 'string');
    if (typeof first === 'string') return first;
  }
  return undefined;
}

function pick(o: Record<string, unknown>, keys: string[]): string | undefined {
  for (const k of keys) {
    const s = asString(o[k]);
    if (s) return s;
  }
  return undefined;
}

export const ModuleDatasets: React.FC<{ repoId: string }> = ({ repoId }) => {
  const [index, setIndex] = useState<IndexFile | null>(null);
  const [indexError, setIndexError] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [data, setData] = useState<unknown>(null);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [openKey, setOpenKey] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIndex(null);
    setIndexError(false);
    setActiveId(null);
    setData(null);
    fetch(`${BASE}modules/${repoId}/index.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<IndexFile>;
      })
      .then((j) => {
        if (cancelled) return;
        setIndex(j);
        if (j.datasets?.length) setActiveId(j.datasets[0].id);
      })
      .catch(() => {
        if (!cancelled) setIndexError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [repoId]);

  useEffect(() => {
    if (!index || !activeId) return;
    const ds = index.datasets.find((d) => d.id === activeId);
    if (!ds) return;
    let cancelled = false;
    setLoadingData(true);
    setData(null);
    setOpenKey(null);
    fetch(`${BASE}modules/${repoId}/${ds.file}`)
      .then((r) => r.json())
      .then((val) => {
        if (!cancelled) setData(val);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      })
      .finally(() => {
        if (!cancelled) setLoadingData(false);
      });
    return () => {
      cancelled = true;
    };
  }, [index, activeId, repoId]);

  const entries = useMemo(() => {
    if (data == null) return [] as { key: string; item: unknown }[];
    const q = search.trim().toLowerCase();
    const raw: { key: string; item: unknown }[] = Array.isArray(data)
      ? data.map((item, i) => ({ key: String(i), item }))
      : typeof data === 'object'
        ? Object.entries(data as Record<string, unknown>).map(([key, item]) => ({ key, item }))
        : [{ key: 'valor', item: data }];
    if (!q) return raw;
    return raw.filter(({ key, item }) => {
      try {
        return `${key} ${JSON.stringify(item)}`.toLowerCase().includes(q);
      } catch {
        return false;
      }
    });
  }, [data, search]);

  if (indexError) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-800">
        <AlertTriangle className="h-4 w-4" /> Contenido local no encontrado para este módulo.
      </div>
    );
  }

  if (!index) {
    return (
      <div className="space-y-2" aria-live="polite" aria-busy="true">
        <div className="skeleton h-7 w-1/3" />
        <div className="skeleton h-12 w-full" />
        <div className="skeleton h-12 w-full" />
      </div>
    );
  }

  const active = index.datasets.find((d) => d.id === activeId);
  const shown = entries.slice(0, 150);
  const totalItems = index.datasets.reduce((n, d) => n + d.count, 0);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
        <Database className="h-3.5 w-3.5" />
        <span>
          <strong className="mono-num text-slate-800">{index.datasets.length}</strong> conjuntos ·{' '}
          <strong className="mono-num text-slate-800">{totalItems}</strong> registros reales
        </span>
      </div>

      {/* Selector de datasets */}
      <div className="flex flex-wrap gap-1.5">
        {index.datasets.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => setActiveId(d.id)}
            className={`rounded-full border px-2.5 py-1 text-[10px] font-bold transition-colors ${
              activeId === d.id
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400'
            }`}
          >
            {d.label} <span className="mono-num opacity-70">{d.count}</span>
          </button>
        ))}
      </div>

      {/* Buscador */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={active ? `Buscar en «${active.label}»…` : 'Buscar…'}
          className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-xs outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Lista */}
      <div className="max-h-[26rem] space-y-1.5 overflow-y-auto pr-1">
        {loadingData && (
          <div className="flex items-center gap-2 py-4 text-xs text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" /> Cargando…
          </div>
        )}
        {!loadingData && shown.length === 0 && (
          <p className="py-6 text-center text-xs text-slate-500">Sin resultados.</p>
        )}
        {shown.map(({ key, item }) => {
          const isObj = item != null && typeof item === 'object';
          const title = (isObj ? pick(item as Record<string, unknown>, TITLE_KEYS) : asString(item)) ?? `#${key}`;
          const subtitle = isObj ? pick(item as Record<string, unknown>, SUB_KEYS) : undefined;
          const isOpen = openKey === key;
          return (
            <div key={key} className="rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setOpenKey(isOpen ? null : key)}
                className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-slate-50"
              >
                {isOpen ? (
                  <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
                )}
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-bold text-slate-900">{title}</div>
                  {subtitle && <div className="truncate text-[10px] text-slate-500">{subtitle}</div>}
                </div>
              </button>
              {isOpen && (
                <pre className="max-h-64 overflow-auto border-t border-slate-100 bg-slate-50/70 px-3 py-2 text-[10px] leading-snug text-slate-700">
                  {JSON.stringify(item, null, 1).slice(0, 4000)}
                </pre>
              )}
            </div>
          );
        })}
        {entries.length > shown.length && (
          <p className="py-2 text-center text-[10px] text-slate-500">
            Mostrando {shown.length} de {entries.length}. Usa el buscador para afinar.
          </p>
        )}
      </div>
    </div>
  );
};
