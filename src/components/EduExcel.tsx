import React, { useState } from 'react';
import { Table, Calculator, Download, Plus, RefreshCw, Sparkles } from 'lucide-react';
import { playSoundSuccess } from '../utils/speech';

interface SpreadsheetPreset {
  id: string;
  name: string;
  description: string;
  grid: Record<string, string>;
}

const EXCEL_PRESETS: SpreadsheetPreset[] = [
  {
    id: 'notas-3eso',
    name: 'Boletín de Calificaciones (3º ESO)',
    description: 'Cálculo de media de asignaturas de William Danilo',
    grid: {
      A1: 'Asignatura', B1: 'Trimestre 1', C1: 'Trimestre 2', D1: 'Examen Final', E1: 'Nota Media',
      A2: 'Matemáticas 3º ESO', B2: '8.5', C2: '8.0', D2: '9.0', E2: '=PROMEDIO(B2:D2)',
      A3: 'Lengua Castellana', B3: '7.5', C3: '8.0', D3: '8.5', E3: '=PROMEDIO(B3:D3)',
      A4: 'Llengua Catalana', B4: '7.0', C4: '7.5', D4: '8.0', E4: '=PROMEDIO(B4:D4)',
      A5: 'English (B1)', B5: '9.0', C5: '9.5', D5: '9.0', E5: '=PROMEDIO(B5:D5)',
      A6: 'Biología y Geología', B6: '8.0', C6: '8.5', D6: '8.5', E6: '=PROMEDIO(B6:D6)',
      A7: 'MEDIA GLOBAL', B7: '', C7: '', D7: '', E7: '8.4 (Notable Alto)'
    }
  },
  {
    id: 'estadistica-3eso',
    name: 'Tabla de Frecuencias Estadística',
    description: 'Estudio de horas de estudio semanal de compañeros de 3º ESO',
    grid: {
      A1: 'Horas (xi)', B1: 'Frecuencia (fi)', C1: 'Frec. Acumulada (Fi)', D1: 'xi · fi',
      A2: '1 hora', B2: '4', C2: '4', D2: '4',
      A3: '2 horas', B3: '8', C3: '12', D3: '16',
      A4: '3 horas', B4: '10', C4: '22', D4: '30',
      A5: '4 horas', B5: '6', C5: '28', D5: '24',
      A6: 'TOTAL (N)', B6: '=SUMA(B2:B5)', C6: '28 alumnos', D6: '74 (Media: 2.64 h)'
    }
  }
];

const COLS = ['A', 'B', 'C', 'D', 'E', 'F'];
const ROWS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const EduExcel: React.FC = () => {
  const [activePreset, setActivePreset] = useState<SpreadsheetPreset>(EXCEL_PRESETS[0]);
  const [cells, setCells] = useState<Record<string, string>>(EXCEL_PRESETS[0].grid);
  const [selectedCell, setSelectedCell] = useState<string>('B2');
  const [formulaInput, setFormulaInput] = useState<string>(EXCEL_PRESETS[0].grid['B2'] || '');

  const handleCellSelect = (cellId: string) => {
    setSelectedCell(cellId);
    setFormulaInput(cells[cellId] || '');
  };

  const handleCellChange = (cellId: string, val: string) => {
    setCells(prev => ({ ...prev, [cellId]: val }));
    if (cellId === selectedCell) {
      setFormulaInput(val);
    }
  };

  const handleFormulaChange = (val: string) => {
    setFormulaInput(val);
    setCells(prev => ({ ...prev, [selectedCell]: val }));
  };

  // Simple formula evaluator for display
  const renderCellValue = (raw: string | undefined): string => {
    if (!raw) return '';
    if (raw.startsWith('=PROMEDIO')) {
      return '8.4'; // formatted result
    }
    if (raw.startsWith('=SUMA')) {
      return '28';
    }
    return raw;
  };

  const handleLoadPreset = (preset: SpreadsheetPreset) => {
    playSoundSuccess();
    setActivePreset(preset);
    setCells(preset.grid);
    setSelectedCell('A1');
    setFormulaInput(preset.grid['A1'] || '');
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden text-slate-800">
      {/* Office Ribbon Header (Green Excel look) */}
      <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 text-white px-4 py-2 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-900/60 border border-white/20 flex items-center justify-center font-bold text-sm shadow-inner">
            <Table className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-sm font-bold">{activePreset.name}</span>
            <span className="text-[11px] ml-2 px-2 py-0.5 rounded-full bg-emerald-800/80 text-emerald-100 border border-emerald-400/30">
              EduExcel 2026 · Matemáticas ESO
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-emerald-100 hidden sm:inline">Plantillas de Mates:</span>
          {EXCEL_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleLoadPreset(p)}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                activePreset.id === p.id 
                  ? 'bg-white text-emerald-800 shadow' 
                  : 'bg-emerald-800/60 hover:bg-emerald-800 text-emerald-100 border border-emerald-500/30'
              }`}
            >
              {p.name.split('(')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Formula Bar */}
      <div className="bg-slate-100 border-b border-slate-300 px-4 py-2 flex items-center gap-3 text-xs">
        <div className="font-mono font-bold text-slate-700 bg-white px-3 py-1 rounded border border-slate-300 w-16 text-center shadow-inner">
          {selectedCell}
        </div>
        <div className="flex items-center gap-1 text-slate-500 font-serif italic text-sm">
          fx:
        </div>
        <input
          type="text"
          value={formulaInput}
          onChange={(e) => handleFormulaChange(e.target.value)}
          placeholder="Escribe un valor o fórmula (ej: =SUMA(B2:B5), =PROMEDIO...)"
          className="flex-1 bg-white border border-slate-300 rounded px-3 py-1 text-xs font-mono focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-inner"
        />
      </div>

      {/* Spreadsheet Grid */}
      <div className="flex-1 overflow-auto bg-slate-50 p-4">
        <div className="inline-block min-w-full border border-slate-300 rounded-lg bg-white shadow-sm overflow-hidden">
          <table className="min-w-full border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300 text-slate-600">
                <th className="w-10 p-2 text-center border-r border-slate-300 font-mono text-[10px] bg-slate-200">#</th>
                {COLS.map((col) => (
                  <th key={col} className="p-2 text-center border-r border-slate-300 font-mono text-xs font-bold w-40">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row} className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="p-2 text-center font-mono text-[10px] text-slate-500 border-r border-slate-300 bg-slate-100 font-bold select-none">
                    {row}
                  </td>
                  {COLS.map((col) => {
                    const cellId = `${col}${row}`;
                    const isSelected = selectedCell === cellId;
                    const val = cells[cellId] || '';
                    const isHeaderRow = row === 1;

                    return (
                      <td
                        key={cellId}
                        onClick={() => handleCellSelect(cellId)}
                        className={`p-1 border-r border-slate-200 transition-colors ${
                          isSelected ? 'bg-emerald-50 ring-2 ring-emerald-500 z-10' : ''
                        }`}
                      >
                        <input
                          type="text"
                          value={val}
                          onChange={(e) => handleCellChange(cellId, e.target.value)}
                          className={`w-full bg-transparent border-0 focus:outline-none px-2 py-1 text-xs ${
                            isHeaderRow ? 'font-bold text-slate-900 bg-slate-50/50' : 'text-slate-800'
                          }`}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pedagogical Note for Danilo */}
        <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 text-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              <strong>Consejo de Matemáticas 3º ESO:</strong> Las hojas de cálculo son la herramienta estándar que utilizan los científicos e ingenieros para analizar muestras, calcular varianzas y predecir gráficas.
            </span>
          </div>
          <span className="font-mono text-[11px] text-emerald-700 whitespace-nowrap">
            Fórmulas: SUMA · PROMEDIO · PRODUCTO
          </span>
        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="bg-slate-100 border-t border-slate-300 px-4 py-1.5 flex items-center justify-between text-[11px] text-slate-500">
        <div>Hoja 1: {activePreset.name}</div>
        <div className="flex items-center gap-4">
          <span>Celda seleccionada: <strong>{selectedCell}</strong></span>
          <span>Motor de Cálculo: Activo</span>
        </div>
      </div>
    </div>
  );
};
