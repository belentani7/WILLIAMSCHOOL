import React, { useState } from 'react';
import { ParentalSettings } from '../types';
import { ShieldCheck, Lock, Eye, Clock, Heart, Award, CheckCircle2, FileText, Smartphone, AlertTriangle } from 'lucide-react';
import { playSoundSuccess, playSoundError } from '../utils/speech';
import { configurePin, pinConfigured, pinSupported, verifyPin } from '../utils/parentalPin';
import { loadLearningProgress } from '../utils/learningProgress';

interface ParentalShieldProps {
  settings: ParentalSettings;
  onUpdateSettings: (newSettings: ParentalSettings) => void;
}

export const ParentalShield: React.FC<ParentalShieldProps> = ({
  settings,
  onUpdateSettings
}) => {
  const [pinInput, setPinInput] = useState('');
  const [pinConfirm, setPinConfirm] = useState('');
  const [isConfigured, setIsConfigured] = useState(pinConfigured);
  const [pinBusy, setPinBusy] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);

  // Local editable settings
  const [maxMinutes, setMaxMinutes] = useState(settings.maxDailyMinutes);
  const [breakInterval, setBreakInterval] = useState(settings.breakEveryMinutes);
  const [shieldActive, setShieldActive] = useState(settings.safetyShieldEnabled);
  const [autoVoice, setAutoVoice] = useState(settings.autoVoiceEnabled);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pinBusy || failedAttempts >= 5) return;
    if (!pinSupported() || !/^\d{6,12}$/.test(pinInput) ||
        (!isConfigured && pinInput !== pinConfirm)) {
      setPinError(true);
      return;
    }
    setPinBusy(true);
    let accepted = false;
    try {
      accepted = isConfigured ? await verifyPin(pinInput) : await configurePin(pinInput);
    } catch {
      accepted = false;
    } finally {
      setPinBusy(false);
      setPinInput('');
      setPinConfirm('');
    }
    setPinError(!accepted);
    if (accepted) {
      setIsConfigured(true);
      setIsUnlocked(true);
      setFailedAttempts(0);
      playSoundSuccess();
    } else {
      setFailedAttempts(n => n + 1);
      playSoundError();
    }
  };

  const progress = loadLearningProgress();
  const learner = progress.profiles.find(profile => profile.id === progress.activeProfileId);
  const completedCount = learner?.completed.length ?? 0;

  const handleSave = () => {
    onUpdateSettings({
      ...settings,
      maxDailyMinutes: maxMinutes,
      breakEveryMinutes: breakInterval,
      safetyShieldEnabled: shieldActive,
      dataVaultEncrypted: false,
      autoVoiceEnabled: autoVoice
    });
    playSoundSuccess();
    alert('Preferencias de esta sesión actualizadas. No son controles del sistema operativo ni una garantía de seguridad.');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Child Safety & Psychological Foundations */}
      <div className="glass-red p-6 rounded-3xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Preferencias familiares de estudio</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Centro de Control Parental & Fundamentos Pedagógicos
            </h2>
            <p className="text-sm text-zinc-300 mt-1 max-w-3xl leading-relaxed">
              Herramientas orientativas de pausas, tiempo y voz. El control de un navegador no sustituye la supervisión de una persona adulta, los controles del dispositivo, ni una evaluación externa de cumplimiento normativo.
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Controles locales orientativos</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Health, Screen-time & Eye Care */}
        <div className="lg:col-span-6 space-y-6">
          {/* Health & Ergonomics Card */}
          <div className="glass-red-card p-6 rounded-3xl space-y-4">
            <div className="flex items-center gap-2.5 text-base font-black text-white">
              <Heart className="w-5 h-5 text-rose-500" />
              <span>Salud Visual y Tiempo de Pantalla</span>
            </div>

            {/* Daily usage meter */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-300">Pestaña visible en esta sesión (estimación):</span>
                <span className="font-bold text-white">{settings.usedMinutesToday} de {settings.maxDailyMinutes} minutos</span>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-[#ff2d55] rounded-full transition-all"
                  style={{ width: `${Math.min(100, (settings.usedMinutesToday / settings.maxDailyMinutes) * 100)}%` }}
                />
              </div>
              <p className="text-[11px] text-zinc-400">
                Meta configurada por la familia, no límite clínico ni bloqueo automático de acceso.
              </p>
            </div>

            {/* 20-20-20 Rule Alert */}
            <div className="p-4 rounded-2xl bg-sky-950/20 border border-sky-500/30 text-xs text-sky-200 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5 text-sky-300">
                <Eye className="w-4 h-4" />
                <span>Protocolo de Descanso Ocular (Regla 20-20-20):</span>
              </div>
              <p className="text-zinc-300 text-[11px] leading-relaxed">
                Durante el uso visible del sitio se muestran recordatorios periódicos. Son avisos orientativos, no una medida médica ni un sistema que impida seguir utilizando el dispositivo.
              </p>
            </div>
          </div>

          {/* Psychological & Pedagogical Foundations */}
          <div className="glass-red-card p-6 rounded-3xl space-y-3">
            <div className="flex items-center gap-2.5 text-base font-black text-white">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Referencias para explorar · sin acreditación externa</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <strong className="text-[#ffd7de] block">1. Hipótesis del Filtro Afectivo (Stephen Krashen)</strong>
                <p className="text-zinc-300 text-[11px]">
                  El filtro afectivo es una propuesta teórica útil para diseñar actividades con menor presión. Esta aplicación no mide ansiedad ni garantiza eliminarla.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <strong className="text-[#ffd7de] block">2. Transferencia Lingüística Positiva (Lado & Jubran)</strong>
                <p className="text-zinc-300 text-[11px]">
                  El contraste entre portugués, español y catalán permite explicar similitudes y falsos amigos. Las tasas de vocabulario compartido y los plazos de aprendizaje necesitan estudio y medición: no se presentan porcentajes ni resultados garantizados.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <strong className="text-[#ffd7de] block">3. Decret 175/2022 de la Generalitat de Catalunya</strong>
                <p className="text-zinc-300 text-[11px]">
                  Referencia curricular para revisar asignaturas y niveles. La correspondencia detallada con los criterios oficiales y la eficacia educativa requieren validación docente; la aplicación no garantiza aprobar.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: PIN-Protected Parental Dashboard */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-red-card p-6 rounded-3xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-base font-black text-white">
                <Lock className="w-5 h-5 text-[#ff2d55]" />
                <span>Panel de Configuración Parental</span>
              </div>
              <span className="text-xs text-zinc-400">Bloqueo local, sin PIN universal</span>
            </div>

            {!isUnlocked ? (
              <form onSubmit={handleUnlock} className="p-6 rounded-2xl bg-black/40 border border-white/10 text-center space-y-4">
                <Lock className="w-10 h-10 text-[#ff2d55] mx-auto" />
                <div>
                  <h4 className="font-bold text-white text-sm">{isConfigured ? 'Introduce tu PIN local' : 'Configura un PIN local'}</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">{isConfigured ? 'Bloqueo básico de ajustes en este navegador' : 'Define entre 6 y 12 dígitos; no hay PIN predeterminado ni recuperación automática'}</p>
                </div>

                <input
                  type="password"
                  minLength={6}
                  maxLength={12}
                  inputMode="numeric"
                  autoComplete="off"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="PIN de 6–12 dígitos"
                  className="w-40 mx-auto text-center px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-mono text-lg tracking-widest focus:outline-none focus:border-[#ff2d55]"
                />

                {!isConfigured && (
                  <input
                    type="password"
                    minLength={6}
                    maxLength={12}
                    inputMode="numeric"
                    autoComplete="off"
                    value={pinConfirm}
                    onChange={event => setPinConfirm(event.target.value)}
                    placeholder="Repite el PIN"
                    aria-label="Confirmar PIN local"
                    className="w-40 mx-auto block text-center px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-mono tracking-widest"
                  />
                )}
                {!pinSupported() && <p role="status" className="text-xs text-rose-400">Este navegador no permite crear un PIN local seguro (Web Crypto y almacenamiento necesarios).</p>}
                {pinError && <p role="alert" className="text-xs text-rose-400">PIN inválido o no coincidente. Usa 6–12 dígitos.</p>}
                {failedAttempts >= 5 && <p role="alert" className="text-xs text-rose-400">Demasiados intentos en esta sesión. Recarga la página antes de volver a intentar.</p>}
                <p className="text-[11px] text-zinc-400">La barrera local puede eludirse con acceso técnico al dispositivo. Para protección real utiliza también controles del sistema operativo.</p>

                <div>
                  <button
                    type="submit"
                    disabled={pinBusy || !pinSupported() || failedAttempts >= 5}
                    className="px-6 py-2 rounded-xl bg-[#ff2d55] text-white font-bold text-xs shadow-md hover:brightness-110 disabled:opacity-40"
                  >
                    {pinBusy ? 'Comprobando…' : isConfigured ? 'Desbloquear ajustes' : 'Configurar y desbloquear'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300">
                  <span>Ajustes locales desbloqueados</span>
                  <button onClick={() => setIsUnlocked(false)} className="text-[11px] underline">Bloquear</button>
                </div>

                {/* Max Daily Minutes */}
                <div className="space-y-1">
                  <label className="font-bold text-zinc-300">Meta orientativa de minutos en esta sesión:</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={30}
                      max={180}
                      step={15}
                      value={maxMinutes}
                      onChange={(e) => setMaxMinutes(Number(e.target.value))}
                      className="flex-1 accent-[#ff2d55]"
                    />
                    <span className="font-bold text-white w-16 text-right">{maxMinutes} min</span>
                  </div>
                </div>

                {/* Break every */}
                <div className="space-y-1">
                  <label className="font-bold text-zinc-300">Aviso de Descanso Ocular Cada:</label>
                  <select
                    value={breakInterval}
                    onChange={(e) => setBreakInterval(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-black/50 border border-white/10 text-white"
                  >
                    <option value={15}>Cada 15 minutos</option>
                    <option value={20}>Cada 20 minutos (Recomendado)</option>
                    <option value={30}>Cada 30 minutos</option>
                  </select>
                </div>

                {/* Toggles */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer">
                    <div>
                      <div className="font-bold text-white">Preferencia de avisos de seguridad</div>
                      <div className="text-[10px] text-zinc-400">Modifica el indicador local; no activa bloqueo de redes ni filtros del servidor</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={shieldActive}
                      onChange={(e) => setShieldActive(e.target.checked)}
                      className="w-5 h-5 accent-[#ff2d55]"
                    />
                  </label>

                  <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-950/20 text-xs text-amber-100">
                    El progreso se guarda en almacenamiento local sin cifrado extremo a extremo.
                    No se ofrece una «bóveda cifrada» hasta que exista y se pruebe una implementación real.
                  </div>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer">
                    <div>
                      <div className="font-bold text-white">Lectura automática del tutor</div>
                      <div className="text-[10px] text-zinc-400">Activa síntesis de voz del navegador al responder en el chat</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoVoice}
                      onChange={(e) => setAutoVoice(e.target.checked)}
                      className="w-5 h-5 accent-[#ff2d55]"
                    />
                  </label>
                </div>

                <button
                  onClick={handleSave}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#ff2d55] to-[#c8102e] text-white font-bold text-xs hover:brightness-110 shadow-md mt-2"
                >
                  Guardar Configuración
                </button>
              </div>
            )}
          </div>

          {/* Academic Report for Parents/Tutors */}
          <div className="p-5 rounded-3xl bg-black/40 border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#ff2d55]" />
                <span>Informe Pedagógico Resumido para Tutores</span>
              </span>
              <span className="text-[10px] text-zinc-400">Datos locales, no evaluación docente</span>
            </div>
            <div className="text-xs text-zinc-300 space-y-1">
              <div>• <strong>Unidades marcadas como terminadas:</strong> {completedCount} en el perfil local activo.</div>
              <div>• <strong>Tiempo visible aproximado:</strong> {settings.usedMinutesToday} minutos en esta sesión.</div>
              <div>• <strong>Competencias y calificaciones:</strong> No determinadas. Los ejercicios completados no acreditan niveles oficiales.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
