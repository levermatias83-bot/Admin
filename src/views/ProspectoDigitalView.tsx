import React, { useState } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Info,
  ChevronRight,
  Shield,
  BookOpen,
  Table,
  Award,
} from 'lucide-react';
import { PROSPECTO_CARDS, ASSETS } from '../data/mockData';
import { UserProfile } from '../types';

interface ProspectoDigitalViewProps {
  user: UserProfile;
  onOpenCard: (cardId: number) => void;
  onNavigate: (view: string) => void;
}

export const ProspectoDigitalView: React.FC<ProspectoDigitalViewProps> = ({
  user,
  onOpenCard,
  onNavigate,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Map images to cards
  const getCardImage = (id: number) => {
    switch (id) {
      case 1:
        return ASSETS.heroBanner;
      case 2:
        return ASSETS.heroBanner;
      case 3:
        return ASSETS.anapol;
      case 4:
        return ASSETS.heroBanner;
      case 5:
        return ASSETS.fatescipol;
      case 6:
        return ASSETS.anapol;
      case 7:
        return ASSETS.crest;
      case 8:
        return ASSETS.heroBanner;
      case 9:
        return ASSETS.fatescipol;
      case 10:
        return ASSETS.esbapolmus;
      case 11:
        return ASSETS.crest;
      default:
        return ASSETS.fatescipol;
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded bg-emerald-800 text-white font-bold text-[10px] flex items-center justify-center font-mono">
            PD
          </span>
          <div>
            <span className="text-xs font-bold text-slate-800 uppercase">
              {user.unit}
            </span>
            <span className="text-[11px] text-slate-500 block font-mono">
              Prospecto {user.postulationCode}
            </span>
          </div>
        </div>

        <button
          onClick={() => onNavigate('dashboard')}
          className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline"
        >
          Ir a mi panel
        </button>
      </div>

      {/* Hero Green Card matching Screenshot 13 */}
      <div className="p-6 bg-gradient-to-br from-[#163e2c] to-[#0e2a1e] text-white rounded-2xl shadow-md border border-emerald-800/80 relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-full bg-white/10 p-1 border border-amber-400/50 shrink-0">
            <img
              src={ASSETS.crest}
              alt="Escudo UNIPOL"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="text-[10px] font-bold text-amber-300 tracking-wider uppercase block">
              UNIVERSIDAD POLICIAL
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Prospecto Digital · {user.unit}
            </h1>
            <span className="text-xs font-mono text-emerald-200 font-semibold">
              {user.unit}
            </span>
          </div>
        </div>
      </div>

      {/* Warning Box matching Screenshot 13 */}
      <div className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center gap-3 text-xs text-slate-700">
        <Info className="w-4 h-4 text-emerald-800 shrink-0" />
        <span className="font-semibold text-slate-800">
          Adquirir el prospecto no otorga el derecho de inscripción ni asegura el ingreso.
        </span>
      </div>

      {/* Video Player Card matching Screenshot 12 & 13 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
              MIRA ESTO PRIMERO
            </span>
            <h2 className="text-sm font-bold text-slate-900">
              Bienvenida · {user.unit}
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium font-mono">
            Duración: 59 segundos
          </span>
        </div>

        {/* Video simulation container */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
          {isPlaying ? (
            <div className="absolute inset-0 w-full h-full bg-black z-10">
              <iframe
                src="https://drive.google.com/file/d/1sbW1ymQ-XV2lzJO0r2ExLwhTycQuyJkb/preview"
                title="FATESCIPOL - Video Institucional"
                className="w-full h-full border-0"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute top-2 right-2 z-20 px-2 py-1 bg-black/70 hover:bg-black text-white text-[11px] rounded flex items-center gap-1"
              >
                Cerrar video
              </button>
            </div>
          ) : (
            <>
              <img
                src={ASSETS.fatescipol}
                alt="Bienvenida institucional"
                className="w-full h-full object-cover opacity-75"
                referrerPolicy="no-referrer"
              />

              {/* Slogan Overlay */}
              <div className="absolute right-4 bottom-14 text-right pointer-events-none">
                <span className="text-[10px] font-bold text-amber-300 uppercase block tracking-wider drop-shadow-md">
                  ES EL CAMINO QUE
                </span>
                <span className="text-base sm:text-xl font-black text-amber-400 uppercase tracking-tight drop-shadow-md">
                  MARCARÁ TU VIDA
                </span>
              </div>

              {/* Centered big play button */}
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-emerald-800/90 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 z-10"
                aria-label="Reproducir video"
              >
                <Play className="w-7 h-7 ml-1 fill-white" />
              </button>

              {/* Video Controls Bar */}
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between text-white text-xs z-10">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  >
                    <Play className="w-4 h-4 ml-0.5 fill-current" />
                  </button>
                  <span className="font-mono text-[11px] text-slate-300">
                    0:00 / 0:58 · Video oficial UNIPOL
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    className="px-2.5 py-1 rounded bg-amber-400 text-slate-950 font-bold text-[11px] flex items-center gap-1 hover:bg-amber-300 transition-colors shadow-xs"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Ver video</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Quick link to official admission tables */}
      <div className="p-3.5 bg-gradient-to-r from-emerald-50 via-white to-amber-50 rounded-xl border border-emerald-200/90 shadow-2xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#1b4332] text-amber-300 flex items-center justify-center shrink-0">
            <Table className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900">
              Cuadros Oficiales y Estadísticas en Vivo
            </h3>
            <p className="text-[11px] text-slate-500">
              Ranking de prelación, cortes de cupo, baremos de aptitud física y aranceles
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('cuadros-oficiales')}
          className="px-3 py-1.5 bg-[#1b4332] hover:bg-[#143527] text-white rounded-lg text-xs font-bold transition-colors shrink-0 flex items-center gap-1 shadow-xs"
        >
          <span>Abrir cuadros</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Información del proceso Section matching Screenshot 12 */}
      <div className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Información del proceso
          </h2>
          <span className="text-xs text-slate-500 block">
            · selecciona una tarjeta para leerla
          </span>
        </div>

        {/* 11 Cards Grid matching Screenshots 12, 15, 16, 17, 19, 20 */}
        <div className="space-y-4">
          {PROSPECTO_CARDS.map((card) => (
            <div
              key={card.id}
              onClick={() => onOpenCard(card.id)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-600/40 transition-all cursor-pointer group"
            >
              {/* Card Image Banner */}
              <div className="h-44 sm:h-52 w-full bg-slate-900 relative overflow-hidden">
                <img
                  src={card.image || getCardImage(card.id)}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300 opacity-90"
                  referrerPolicy="no-referrer"
                />
                
                {/* Number Badge matching Screenshot 12 */}
                <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-emerald-950/85 backdrop-blur-xs text-white font-mono font-bold text-xs flex items-center justify-center border border-white/20 shadow-xs">
                  {card.id}
                </div>

                {/* Crest Badge matching authentic institution */}
                {card.crest && (
                  <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs p-1 border border-amber-400/60 shadow-md flex items-center justify-center">
                    <img
                      src={card.crest}
                      alt="Escudo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                {/* Badge text pill at bottom of image */}
                {card.badge && (
                  <div className="absolute bottom-3 left-3 z-10">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 backdrop-blur-xs text-amber-300 text-[10px] font-bold tracking-wider uppercase border border-amber-400/30">
                      {card.badge}
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              </div>

              {/* Card Content */}
              <div className="p-4 sm:p-5 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                    {card.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-tight group-hover:text-emerald-800 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {card.summary}
                  </p>
                  {card.details && card.details.length > 0 && (
                    <div className="pt-1 flex items-center gap-2 text-[11px] font-semibold text-emerald-800">
                      <span>✓ {card.details.length} puntos oficiales</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-500 font-normal">Toca para abrir detalle</span>
                    </div>
                  )}
                </div>
                <div className="mt-1 shrink-0 w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#1b4332] group-hover:text-white flex items-center justify-center transition-colors">
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
