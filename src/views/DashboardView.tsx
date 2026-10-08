import React, { useState } from 'react';
import {
  Copy,
  Check,
  AlertTriangle,
  ArrowRight,
  Clock,
  Shield,
  FileCheck2,
  Lock,
  ChevronRight,
  User,
  Table,
  Award,
} from 'lucide-react';
import { UserProfile, DocumentItem, AcademicUnitId } from '../types';
import { ASSETS } from '../data/mockData';

interface DashboardViewProps {
  user: UserProfile;
  documents: DocumentItem[];
  onNavigate: (view: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  documents,
  onNavigate,
}) => {
  const [copied, setCopied] = useState(false);

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

  const completedCount = documents.filter((d) => d.status === 'APROBADO').length;
  const missingCount = documents.length - completedCount;
  const missingDocs = documents.filter((d) => d.status !== 'APROBADO');

  const handleCopyCode = () => {
    navigator.clipboard.writeText(user.postulationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stages = [
    {
      num: 1,
      title: '1. Inscripción — Prospecto de Admisión',
      status: completedCount >= documents.length ? 'Completado' : 'Por completar',
      isCurrent: true,
      available: true,
    },
    {
      num: 2,
      title: '2. Evaluación Médica',
      status: 'Aún no disponible',
      isCurrent: false,
      available: false,
    },
    {
      num: 3,
      title: '3. Evaluación Psicológica',
      status: 'Aún no disponible',
      isCurrent: false,
      available: false,
    },
    {
      num: 4,
      title: '4. Evaluación de Aptitud Física',
      status: 'Aún no disponible',
      isCurrent: false,
      available: false,
    },
    {
      num: 5,
      title: '5. Programa Académico Prefacultativo',
      status: 'Aún no disponible',
      isCurrent: false,
      available: false,
    },
    {
      num: 6,
      title: '6. Incorporación',
      status: 'Aún no disponible',
      isCurrent: false,
      available: false,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      
      {/* Top Banner postulation unit info matching Screenshot 33 */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-100 p-0.5 border border-slate-200 shrink-0">
            <img
              src={getUnitCrest(user.unit)}
              alt={`Escudo ${user.unit}`}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              {user.unit}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Prospecto {user.postulationCode}
            </span>
          </div>
        </div>
        <div className="px-2.5 py-1 rounded bg-emerald-100 text-[#163e2c] text-xs font-bold">
          {user.sede}
        </div>
      </div>

      {/* Title & Postulation Code Section matching Screenshot 33 */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Estado de tu postulación
        </h1>
        <div className="text-xs font-semibold text-slate-500 mt-0.5">
          {user.unit}
        </div>

        {/* Postulation code box */}
        <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 shadow-xs inline-flex items-center gap-3">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              CÓDIGO DE POSTULACIÓN
            </span>
            <span className="text-base font-black text-slate-900 font-mono tracking-wide">
              {user.postulationCode}
            </span>
          </div>

          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors border border-slate-200"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copiado</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Alert Card: Tu Etapa Actual matching Screenshot 33 */}
      <div className="bg-white rounded-2xl border-2 border-amber-300 shadow-xs overflow-hidden">
        {/* Card Header */}
        <div className="p-4 bg-amber-50/50 border-b border-amber-200/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
              TU ETAPA ACTUAL
            </span>
            <h3 className="text-sm font-bold text-slate-900">
              1. Inscripción — Prospecto de Admisión
            </h3>
          </div>
          <span className="px-2.5 py-0.5 text-xs font-bold rounded bg-amber-200/80 text-amber-900 border border-amber-300">
            Por completar
          </span>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-3">
          <p className="text-xs text-slate-700 font-medium">
            Tu expediente de inscripción todavía no está completo. Complétalo para que la unidad de admisiones pueda evaluarlo.
          </p>

          {/* Missing items paragraph matching Screenshot 33 */}
          <div className="p-3 bg-amber-50/70 border border-amber-200/90 rounded-xl text-xs text-amber-950 leading-relaxed font-sans">
            <span className="font-bold">Tu expediente de inscripción está incompleto. </span>
            <span>Falta: </span>
            <span className="text-amber-900">
              {missingDocs.map((d) => d.title).join(', ')}.
            </span>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={() => onNavigate('expediente')}
              className="py-2.5 px-6 bg-[#2d5038] hover:bg-[#203a28] active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <span>Completar mi expediente</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Stages List matching Screenshot 33 */}
      <div className="space-y-2 pt-2">
        {stages.slice(1).map((stage) => (
          <div
            key={stage.num}
            className="p-3.5 bg-white/70 rounded-xl border border-slate-200 flex items-center justify-between opacity-70"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-slate-300" />
              <span className="text-xs font-semibold text-slate-700">
                {stage.title}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              {stage.status}
            </span>
          </div>
        ))}
      </div>

      {/* Cuadros Oficiales y Prelación Widget */}
      <div className="p-4 bg-gradient-to-r from-emerald-900 to-[#143e2b] text-white border border-emerald-700/60 rounded-2xl flex items-center justify-between shadow-sm">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide">
              Cuadro General de Prelación en Vivo
            </h4>
          </div>
          <p className="text-[11px] text-emerald-200">
            Revisa tu posición actual, puntajes ponderados y asignación de cupos de admisión
          </p>
        </div>
        <button
          onClick={() => onNavigate('cuadros-oficiales')}
          className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg text-xs font-bold transition-colors shrink-0 flex items-center gap-1 shadow-xs ml-3"
        >
          <Table className="w-3.5 h-3.5" />
          <span>Ver cuadro</span>
        </button>
      </div>

      {/* Quick shortcuts to Digital Prospectus */}
      <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between">
        <div className="space-y-0.5">
          <h4 className="text-xs font-bold text-emerald-950">
            Prospecto Digital FATESCIPOL
          </h4>
          <p className="text-[11px] text-emerald-800">
            Consulta reglamentos, baremo de aptitud física y guías institucionales
          </p>
        </div>
        <button
          onClick={() => onNavigate('prospecto-digital')}
          className="px-3 py-1.5 bg-[#1b4332] text-white rounded-lg text-xs font-bold hover:bg-[#143527] transition-colors shrink-0 flex items-center gap-1"
        >
          <span>Ver guía</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
