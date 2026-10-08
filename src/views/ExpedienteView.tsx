import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  Camera,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  FileText,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Check,
  ArrowRight,
  Shield,
  Download,
  Printer,
  Table,
  Layers,
} from 'lucide-react';
import { UserProfile, DocumentItem, AcademicUnitId } from '../types';
import { ASSETS } from '../data/mockData';

interface ExpedienteViewProps {
  user: UserProfile;
  documents: DocumentItem[];
  onUploadClick: (doc: DocumentItem) => void;
  onNavigate: (view: string) => void;
}

export const ExpedienteView: React.FC<ExpedienteViewProps> = ({
  user,
  documents,
  onUploadClick,
  onNavigate,
}) => {
  const [activeExpandedId, setActiveExpandedId] = useState<string>('doc-nacimiento-cert');
  const itemsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

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

  const getUnitImage = (unit: AcademicUnitId) => {
    switch (unit) {
      case 'ANAPOL':
        return ASSETS.anapol;
      case 'FATESCIPOL':
        return ASSETS.fatescipol;
      case 'ESBAPOLMUS':
        return ASSETS.esbapolmus;
      default:
        return ASSETS.heroBanner;
    }
  };

  const reviewedByUnipol = documents.filter((d) => d.isReviewedByUnipol);
  const applicantTasks = documents.filter((d) => !d.isReviewedByUnipol);
  const [docFilter, setDocFilter] = useState<'todos' | 'pendientes' | 'completados'>('todos');

  // Compute progress:
  const completedApplicantCount = applicantTasks.filter((d) => d.status === 'APROBADO' || d.fileName).length;
  const totalTasks = applicantTasks.length;
  const progressPercent = Math.round((completedApplicantCount / totalTasks) * 100);

  const filteredApplicantTasks = applicantTasks.filter((d) => {
    const isCompleted = d.status === 'APROBADO' || Boolean(d.fileName);
    if (docFilter === 'pendientes') return !isCompleted;
    if (docFilter === 'completados') return isCompleted;
    return true;
  });

  const firstPending = applicantTasks.find((d) => d.status !== 'APROBADO' && !d.fileName);

  const toggleExpand = (id: string) => {
    setActiveExpandedId(activeExpandedId === id ? '' : id);
  };

  const scrollToFirstPending = () => {
    if (firstPending) {
      setActiveExpandedId(firstPending.id);
      const el = itemsRef.current[firstPending.id];
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      
      {/* Top Breadcrumb Header matching Screenshot 31 & 32 */}
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
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-800 uppercase">
                {user.unit}
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">
                {user.sede}
              </span>
            </div>
            <span className="text-[11px] text-slate-500 block font-mono">
              Prospecto {user.postulationCode}
            </span>
          </div>
        </div>

        <button
          onClick={() => onNavigate('dashboard')}
          className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline"
        >
          Volver al panel
        </button>
      </div>

      {/* Program Summary Hero Banner with Official Cadets Image and Crest */}
      <div className="relative rounded-2xl overflow-hidden border border-emerald-800/60 shadow-md bg-[#143e2b] text-white">
        <div className="absolute inset-0">
          <img
            src={getUnitImage(user.unit)}
            alt={`Unidad ${user.unit}`}
            className="w-full h-full object-cover opacity-30 object-top"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#143e2b] via-[#143e2b]/85 to-transparent" />
        </div>

        <div className="relative p-4 sm:p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-white/10 p-1 border border-amber-400/60 shadow-inner shrink-0 flex items-center justify-center">
              <img
                src={getUnitCrest(user.unit)}
                alt={`Escudo ${user.unit}`}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
                EXPEDIENTE DIGITAL OFICIAL · {user.sede}
              </span>
              <h2 className="text-base sm:text-lg font-black text-white leading-tight">
                {user.unit === 'ANAPOL' ? 'Academia Nacional de Policías' : user.unit === 'FATESCIPOL' ? 'Facultad Técnica Superior en Ciencias Policiales' : 'Escuela Básica Policial de Música'}
              </h2>
              <span className="text-xs text-emerald-200 font-mono">
                Postulación #{user.postulationCode}
              </span>
            </div>
          </div>

          <div className="hidden sm:block text-right shrink-0">
            <span className="text-[10px] uppercase font-bold text-emerald-300 block">Convocatoria Nacional</span>
            <span className="text-xs font-mono font-bold text-white">Gestión 2027</span>
          </div>
        </div>
      </div>

      {/* Main Title Section */}
      <div className="space-y-3">
        <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold uppercase tracking-wider">
          Etapa 1 de 6 · En curso
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
          Tu etapa actual: Inscripción — Prospecto de Admisión
        </h1>
        <p className="text-xs text-slate-600 leading-relaxed">
          En esta etapa te toca resolver <strong className="text-slate-900 font-bold">{totalTasks} cosas</strong>, en el orden de la lista. {firstPending ? `Completa tu ${firstPending.title}.` : 'Has completado todos los requisitos de esta etapa.'}
        </p>

        {/* Progress Bar matching Screenshot 31 & 32 */}
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-700">Avance de esta etapa</span>
            <span className="text-emerald-800 font-mono">
              {progressPercent}% avance ({completedApplicantCount} de {totalTasks})
            </span>
          </div>

          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className="h-full bg-[#1b4332] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            />
          </div>

          {/* Quick jump to pending action button (Screenshot 31) */}
          {firstPending && (
            <div className="pt-1">
              <button
                type="button"
                onClick={scrollToFirstPending}
                className="w-full py-2 px-3 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 rounded-lg text-xs font-bold flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-amber-700">Saltar al primer pendiente:</span>
                  <span className="truncate">{firstPending.title}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 ml-1 text-amber-700" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Informative single-delivery pill found in official bundle */}
      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/80 text-xs text-emerald-900 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Validez nacional unificada: </span>
          <span>Entregas esto una vez y sirve para todas tus postulaciones a las unidades académicas de pregrado. No tienes que volver a gestionarlo.</span>
        </div>
      </div>

      {/* LO QUE TE TOCA HACER Section */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              LO QUE TE TOCA HACER ({filteredApplicantTasks.length} de {totalTasks})
            </h2>
            <span className="text-[11px] text-slate-400">
              Haz clic en un requisito para cargar respaldo digital o tomar fotografía
            </span>
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto text-[11px]">
            <button
              onClick={() => setDocFilter('todos')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                docFilter === 'todos'
                  ? 'bg-slate-800 text-white'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              Todos ({totalTasks})
            </button>
            <button
              onClick={() => setDocFilter('pendientes')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                docFilter === 'pendientes'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              Pendientes ({totalTasks - completedApplicantCount})
            </button>
            <button
              onClick={() => setDocFilter('completados')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-colors ${
                docFilter === 'completados'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              Completados ({completedApplicantCount})
            </button>
          </div>
        </div>

        <div className="space-y-2.5">
          {filteredApplicantTasks.map((doc, idx) => {
            const isCompleted = doc.status === 'APROBADO' || Boolean(doc.fileName);
            const isExpanded = activeExpandedId === doc.id;
            const originalIndex = applicantTasks.findIndex((d) => d.id === doc.id);
            const stepNum = originalIndex >= 0 ? originalIndex + 1 : idx + 1;

            return (
              <div
                key={doc.id}
                ref={(el) => { itemsRef.current[doc.id] = el; }}
                className={`bg-white rounded-xl border transition-all overflow-hidden ${
                  isExpanded
                    ? 'border-emerald-600 shadow-sm ring-1 ring-emerald-600/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Collapsed Bar / Header */}
                <div
                  onClick={() => toggleExpand(doc.id)}
                  className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-50/60 transition-colors"
                >
                  <div className="flex items-start gap-2.5">
                    {/* Check or Radio Circle */}
                    <div className="mt-0.5 shrink-0">
                      {isCompleted ? (
                        <div className="w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                      )}
                    </div>

                    <div>
                      {/* Step index badge */}
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        PASO {stepNum} DE {totalTasks} {isCompleted && '· COMPLETADO'}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {doc.letter ? `${doc.letter}) ` : ''}{doc.title}
                      </h3>
                      {doc.fileName && (
                        <span className="text-[11px] font-mono text-emerald-700 font-medium block mt-0.5">
                          ✓ Archivo cargado: {doc.fileName}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center gap-2 shrink-0">
                    {isCompleted ? (
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {doc.status === 'APROBADO' ? 'Aprobado' : 'Subido'}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600">
                        Pendiente
                      </span>
                    )}
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Details matching Screenshot 32 */}
                {isExpanded && (
                  <div className="px-3.5 pb-4 pt-1 border-t border-slate-100 bg-slate-50/40 space-y-3">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {doc.description}
                    </p>

                    {/* Official format note */}
                    <div className="p-2.5 bg-amber-50/70 rounded-lg border border-amber-200/60 text-[11px] text-amber-900 leading-normal">
                      Se entrega en original en la unidad de admisiones. Aquí puedes subir un respaldo digital opcional. Formatos: pdf, jpg, jpeg, png. Máximo 5 MB por archivo. Conserva el original: debes presentarlo en la unidad de admisiones.
                    </div>

                    {/* Upload Buttons */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => onUploadClick(doc)}
                        className="py-2 px-3 bg-[#1b4332] hover:bg-[#143527] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                      >
                        <UploadCloud className="w-3.5 h-3.5 text-amber-300" />
                        <span>Subir documento</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onUploadClick(doc)}
                        className="py-2 px-3 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Camera className="w-3.5 h-3.5 text-slate-600" />
                        <span>Tomar foto</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleExpand(doc.id)}
                        className="py-2 px-3 text-xs text-slate-500 hover:text-slate-800 font-medium"
                      >
                        Lo hago después
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* LO QUE REVISA LA UNIDAD DE ADMISIONES Section matching Screenshot 31 */}
      <div className="space-y-3 pt-2">
        <div>
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            LO QUE REVISA LA UNIDAD DE ADMISIONES
          </h2>
          <p className="text-[11px] text-slate-400">
            No tienes que hacer nada con estos requisitos: lo resuelve el sistema o la comisión
          </p>
        </div>

        <div className="space-y-2">
          {reviewedByUnipol.map((item) => (
            <div
              key={item.id}
              className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-start justify-between gap-3"
            >
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                  {item.letter}) {item.title}
                </h4>
                <p className="text-xs text-slate-500">
                  {item.description}
                </p>
                {item.observationNote && (
                  <p className="text-[11px] text-emerald-800 font-medium italic">
                    Observación: {item.observationNote}
                  </p>
                )}
              </div>

              <span className="shrink-0 px-2.5 py-1 rounded text-xs font-bold bg-[#143e2b] text-white flex items-center gap-1 shadow-xs">
                <Check className="w-3 h-3 text-amber-300" />
                <span>Aprobado</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CUADROS OFICIALES Y DOCUMENTOS ORIGINALES (Matching Official UNIPOL System) */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Presentación Física en Ventanilla Oficial
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Recuerda que todos los documentos cargados en el expediente digital deben ser presentados en original en la sede de la unidad académica para su respectivo cotejo y foliación.
            </p>
          </div>
          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px] shrink-0">
            Foliación Obligatoria
          </span>
        </div>

        <div className="pt-2 flex flex-wrap gap-2.5">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center gap-1.5 border border-slate-300"
          >
            <Download className="w-3.5 h-3.5 text-emerald-800" />
            <span>Descargar lista de documentos en PDF</span>
          </button>

          <button
            onClick={() => onNavigate('cuadros-oficiales')}
            className="px-3.5 py-2 rounded-xl bg-[#1b4332] hover:bg-[#143527] text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Table className="w-3.5 h-3.5 text-amber-300" />
            <span>Ver mi posición en el Cuadro de Prelación Oficial</span>
          </button>
        </div>
      </div>

    </div>
  );
};
