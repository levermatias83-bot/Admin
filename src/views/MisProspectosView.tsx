import React from 'react';
import {
  Calendar,
  MapPin,
  BookOpen,
  ArrowRight,
  ShoppingCart,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { UserProfile, AcademicUnitId } from '../types';
import { ASSETS } from '../data/mockData';

interface MisProspectosViewProps {
  user: UserProfile;
  onNavigate: (view: string) => void;
}

export const MisProspectosView: React.FC<MisProspectosViewProps> = ({
  user,
  onNavigate,
}) => {
  const getUnitCrest = (unit: AcademicUnitId) => {
    switch (unit) {
      case 'ANAPOL':
        return ASSETS.escudoAnapol;
      case 'FATESCIPOL':
        return ASSETS.escudoFatescipol;
      case 'ESBAPOLMUS':
        return ASSETS.escudoEsbapolmus;
      default:
        return ASSETS.crest;
    }
  };
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      
      {/* Top Banner Notice matching Screenshot 14 */}
      <div className="space-y-3">
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          Estos son tus prospectos. Activa el que vayas a usar y sigue tu proceso desde ahí.
        </p>

        <button
          onClick={() => onNavigate('comprar-prospecto')}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-xs transition-colors"
        >
          <ShoppingCart className="w-3.5 h-3.5 text-slate-500" />
          <span>Comprar otro prospecto</span>
        </button>
      </div>

      {/* TU INSCRIPCIÓN Card matching Screenshot 14 */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          TU INSCRIPCIÓN
        </h2>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          
          {/* Card Header with Crest and Unit */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 p-1 border border-slate-200 shrink-0">
                <img
                  src={getUnitCrest(user.unit)}
                  alt={`Escudo ${user.unit}`}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-tight">
                  {user.unit}
                </h3>
                <span className="text-xs font-semibold text-slate-500">
                  {user.unit}
                </span>
              </div>
            </div>

            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#1b4332] text-white">
              Inscripción
            </span>
          </div>

          {/* Metadata */}
          <div className="space-y-1.5 text-xs text-slate-600 pt-1">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Comprado el {user.purchasedDate}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-semibold text-slate-700">{user.sede}</span>
            </div>
          </div>

          {/* Postulation code box */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              CÓDIGO DE POSTULACIÓN
            </span>
            <span className="text-sm font-black text-slate-900 font-mono tracking-wide">
              {user.postulationCode}
            </span>
          </div>

          {/* Action Buttons matching Screenshot 14 */}
          <div className="space-y-2 pt-1">
            <button
              onClick={() => onNavigate('prospecto-digital')}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-800 flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <BookOpen className="w-4 h-4 text-emerald-800" />
              <span>Ver el prospecto digital</span>
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Entrar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
