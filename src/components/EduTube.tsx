import React, { useState } from 'react';
import { Play, Volume2, ShieldCheck, CheckCircle, Sparkles, BookOpen, Clock, Award } from 'lucide-react';
import { EDUTUBE_VIDEOS } from '../data/curriculumData';
import { EduTubeVideo } from '../types';
import { speakBelentani, playSoundSuccess } from '../utils/speech';

export const EduTube: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<EduTubeVideo>(EDUTUBE_VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);

  const handleSelectVideo = (video: EduTubeVideo) => {
    playSoundSuccess();
    setSelectedVideo(video);
    setIsPlaying(false);
  };

  const handleStartLesson = () => {
    playSoundSuccess();
    setIsPlaying(true);
    speakBelentani(`Lección educativa: ${selectedVideo.title}. ${selectedVideo.description}`, { lang: 'es' });
  };

  const handleMarkComplete = () => {
    playSoundSuccess();
    if (!completedVideos.includes(selectedVideo.id)) {
      setCompletedVideos([...completedVideos, selectedVideo.id]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden text-slate-800">
      {/* Header bar (YouTube Kids / EduTube clean style) */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white px-4 py-2.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white text-red-600 flex items-center justify-center font-black shadow">
            <Play className="w-4 h-4 fill-red-600 ml-0.5" />
          </div>
          <div>
            <span className="text-base font-black tracking-tight">EduTube Kids & Aula Segura</span>
            <span className="text-[11px] ml-2 px-2 py-0.5 rounded-full bg-red-800/80 text-white border border-red-400/40">
              100% Sin Anuncios · Material Verificado ESO
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-800/60 border border-white/20 text-white">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>Entorno Protegido para Menor</span>
          </div>
        </div>
      </div>

      {/* Main View: Player on left, playlist on right */}
      <div className="flex-1 flex flex-col lg:flex-row bg-slate-100 overflow-hidden p-4 gap-4">
        {/* Interactive Lesson Player */}
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
          {/* Simulated Video Stage (Aero clean visual) */}
          <div className="w-full aspect-[16/9] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl shadow-lg border border-slate-700 relative overflow-hidden flex flex-col justify-between p-6 text-white">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold shadow">
                {selectedVideo.badge}
              </span>
              <span className="text-xs text-slate-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedVideo.duration}
              </span>
            </div>

            <div className="text-center my-auto space-y-3">
              <div className="w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center mx-auto shadow-2xl hover:scale-105 transition-transform cursor-pointer border-2 border-white/40"
                   onClick={handleStartLesson}>
                <Play className="w-7 h-7 fill-white ml-1" />
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white max-w-lg mx-auto">
                {selectedVideo.title}
              </h2>
              <p className="text-xs text-slate-300 max-w-md mx-auto line-clamp-2">
                {selectedVideo.description}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 border-t border-white/10 pt-3">
              <span>Curso: <strong>{selectedVideo.course}</strong></span>
              <span>Asignatura: <strong>{selectedVideo.subject}</strong></span>
            </div>
          </div>

          {/* Lesson Notes & Key Takeaways Card */}
          <div className="bg-white rounded-xl shadow border border-slate-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Idea Clave para el Cuaderno de Danilo:</span>
              </div>
              <button
                onClick={handleMarkComplete}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  completedVideos.includes(selectedVideo.id)
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{completedVideos.includes(selectedVideo.id) ? 'Lección Completada' : 'Marcar como Vista'}</span>
              </button>
            </div>

            <div className="p-3.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-950 text-xs leading-relaxed font-medium">
              "{selectedVideo.keyTakeaway}"
            </div>

            <div className="flex items-center gap-3 pt-2 text-xs text-slate-500">
              <span>💡 Las explicaciones didácticas de EduTube están alineadas con la normativa oficial LOMLOE y los contenidos evaluables de la ESO.</span>
            </div>
          </div>
        </div>

        {/* Video Playlist Sidebar */}
        <div className="w-full lg:w-96 bg-white rounded-xl shadow border border-slate-200 p-4 flex flex-col gap-3 overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="font-bold text-sm text-slate-900">Lecciones del Curso ESO</span>
            <span className="text-xs text-slate-500">{completedVideos.length}/{EDUTUBE_VIDEOS.length} vistas</span>
          </div>

          <div className="space-y-2.5">
            {EDUTUBE_VIDEOS.map((v) => {
              const isSelected = selectedVideo.id === v.id;
              const isDone = completedVideos.includes(v.id);

              return (
                <div
                  key={v.id}
                  onClick={() => handleSelectVideo(v)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex flex-col gap-1.5 ${
                    isSelected
                      ? 'border-red-500 bg-red-50/70 ring-2 ring-red-400/40 shadow-sm'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span className="font-bold uppercase tracking-wider text-red-700">{v.subject}</span>
                    <span className="flex items-center gap-1">
                      {isDone && <CheckCircle className="w-3 h-3 text-emerald-600" />}
                      {v.duration}
                    </span>
                  </div>
                  <div className="font-bold text-xs text-slate-900 leading-snug">{v.title}</div>
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
