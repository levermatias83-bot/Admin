import React, { useState } from 'react';
import {
  Calendar,
  ChevronRight,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  AlertCircle,
  FileText,
  UserCheck,
  Check,
  Sparkles,
  Table,
  Award,
  Layers,
  TrendingDown,
  ArrowRight,
} from 'lucide-react';
import { ASSETS } from '../data/mockData';
import { UserProfile } from '../types';

interface LandingViewProps {
  user: UserProfile | null;
  onNavigate: (view: string) => void;
  onOpenLogin: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  user,
  onNavigate,
  onOpenLogin,
}) => {
  const [selectedUnitTab, setSelectedUnitTab] = useState<'anapol' | 'fatescipol' | 'esbapolmus'>('anapol');
  const [landingCuadroTab, setLandingCuadroTab] = useState<'prelacion' | 'baremos' | 'plazas' | 'aranceles'>('prelacion');

  const admissionSteps = [
    {
      num: 1,
      title: 'Prospecto',
      desc: 'Llenas tu formulario y cargas tu expediente de inscripción.',
    },
    {
      num: 2,
      title: 'Evaluación médica',
      desc: 'Valoración médica de aptitud realizada por sanidad policial.',
    },
    {
      num: 3,
      title: 'Evaluación psicológica',
      desc: 'Batería de pruebas psicológicas para determinar habilitación.',
    },
    {
      num: 4,
      title: 'Aptitud física',
      desc: 'Pruebas de aptitud física calificadas por baremo según sexo y edad.',
    },
    {
      num: 5,
      title: 'Prefacultativo',
      desc: 'Programa Académico Prefacultativo, con notas ponderadas que definen el orden de prelación.',
    },
    {
      num: 6,
      title: 'Incorporación',
      desc: 'Presentación de originales, matrícula y alta como cadete o cursante.',
    },
  ];

  const generalRequirements = [
    'Tener entre 17 y 22 años al 31 de diciembre de 2027.',
    'Ser boliviana o boliviano de nacimiento.',
    'Cédula de identidad vigente y certificado de nacimiento original.',
    'Diploma de bachiller o certificado de estudios (puede quedar condicional).',
    'Certificado de antecedentes penales (REJAP) del postulante, sin registros.',
    'Certificado de antecedentes penales (REJAP) del padre y de la madre o, en su caso, del tutor legal.',
    'Certificado de soltería (estado civil).',
    'Pago del prospecto y aprobación de cada etapa del proceso.',
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section matching Screenshot 1 */}
      <section className="relative overflow-hidden bg-[#163a2a] text-white">
        {/* Background image with overlay scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={ASSETS.heroBanner}
            alt="Ceremonia Policía Boliviana"
            className="w-full h-full object-cover opacity-35 object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#163a2a] via-[#163a2a]/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto px-4 pt-10 pb-12 text-center sm:text-left">
          {/* Header badge */}
          <div className="flex items-center justify-center sm:justify-start gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-full bg-white/10 p-1 border border-amber-400/40 shrink-0">
              <img
                src={ASSETS.crest}
                alt="Escudo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="text-xs font-black tracking-wider text-amber-300 uppercase block">
                POLICÍA BOLIVIANA
              </span>
              <span className="text-xs font-semibold text-white/90">
                Universidad Policial
              </span>
            </div>
          </div>

          <span className="text-xs font-bold text-amber-400 tracking-wider uppercase block mb-1">
            CONVOCATORIA NACIONAL
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-4">
            Proceso de Admisión <br className="hidden xs:inline" />
            <span className="text-amber-300">2027</span>
          </h1>

          {/* Dates box matching Screenshot 1 */}
          <div className="inline-flex items-center gap-2 p-2.5 rounded-lg bg-black/40 border border-emerald-600/40 text-xs text-white/95 mb-6 max-w-md backdrop-blur-xs">
            <Calendar className="w-4 h-4 text-amber-300 shrink-0" />
            <span>Inscripciones del 30 de septiembre de 2026 al 30 de octubre de 2026</span>
          </div>

          {/* Action Buttons matching Screenshot 1 */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-sm">
            <button
              onClick={() => {
                if (user) {
                  onNavigate('dashboard');
                } else {
                  onOpenLogin();
                }
              }}
              className="w-full py-3 px-6 bg-[#1f5c38] hover:bg-[#1a4e2f] active:scale-[0.99] text-white font-bold text-sm rounded-lg shadow-md border border-emerald-400/40 transition-all text-center flex items-center justify-center gap-2"
            >
              <span>Ir a mi panel</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('comprar-prospecto')}
              className="w-full py-3 px-6 bg-transparent hover:bg-white/10 text-emerald-100 font-semibold text-sm rounded-lg border border-emerald-300/30 transition-colors text-center"
            >
              Adquirir prospecto
            </button>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-2xl mx-auto px-4 space-y-10">

        {/* Proceso de Admisión (6 Steps) matching Screenshot 1 & 2 */}
        <section className="space-y-4">
          <h2 className="text-xl font-black text-slate-900 tracking-tight text-center sm:text-left">
            Proceso de Admisión
          </h2>

          <div className="space-y-4 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-slate-200 before:z-0">
            {admissionSteps.map((step) => (
              <div key={step.num} className="relative z-10 flex items-start gap-3.5 group">
                <div className="w-8 h-8 rounded-full bg-[#1b4332] text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors font-mono">
                  {step.num}
                </div>
                <div className="pt-0.5">
                  <h3 className="font-bold text-slate-900 text-sm">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dónde postular - Unidades académicas matching Screenshots 2, 3, 4, 5 */}
        <section className="space-y-4">
          <div className="text-left">
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
              DÓNDE POSTULAR
            </span>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Unidades académicas
            </h2>
          </div>

          <div className="space-y-6">
            {/* ANAPOL Card */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
              <div className="h-64 sm:h-72 w-full bg-slate-100 relative overflow-hidden">
                <img
                  src={ASSETS.anapol}
                  alt="Academia Nacional de Policías"
                  className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-emerald-950/80 backdrop-blur-xs text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-400/40">
                  OFICIALES · 4 AÑOS
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Academia Nacional de Policías
                    </h3>
                    <span className="text-xs font-mono font-semibold text-emerald-800 tracking-wider">
                      ANAPOL · LA PAZ
                    </span>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-slate-50 border border-slate-200 p-1 shrink-0 shadow-xs">
                    <img src={ASSETS.escudoAnapol} alt="Escudo ANAPOL" className="w-full h-full object-contain" />
                  </div>
                </div>
                
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Formación integral de oficiales de policía en el grado de <strong>Subteniente</strong>, con grado académico de <strong>Licenciatura en Ciencias Policiales y Seguridad Pública</strong> (reconocido por el Ministerio de Educación y el CEUB). Régimen de internado militarizado policial en el Campus Bajo Següencoma, La Paz.
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Grado al egreso</span>
                    <span className="font-bold text-emerald-900">Subteniente</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Tiempo de estudio</span>
                    <span className="font-bold text-emerald-900">4 Años (8 Semestres)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Modalidad</span>
                    <span className="font-bold text-slate-800">Internado Completo</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Especialidades</span>
                    <span className="font-bold text-slate-800">FELCC, FELCN, Tránsito</span>
                  </div>
                </div>

                <div className="mt-3.5 flex items-center justify-between">
                  <button
                    onClick={() => onNavigate('comprar-prospecto')}
                    className="text-xs font-bold text-[#1b4332] hover:text-[#123023] flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-100 transition-colors"
                  >
                    <span>Postular a ANAPOL</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] text-slate-400 font-medium">Bajo Següencoma</span>
                </div>
              </div>
            </div>

            {/* FATESCIPOL Card */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
              <div className="h-64 sm:h-72 w-full bg-slate-100 relative overflow-hidden">
                <img
                  src={ASSETS.fatescipol}
                  alt="Facultad Técnica Superior en Ciencias Policiales"
                  className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-emerald-950/80 backdrop-blur-xs text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-400/40">
                  SARGENTOS · 2 AÑOS
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Facultad Técnica Superior en Ciencias Policiales
                    </h3>
                    <span className="text-xs font-mono font-semibold text-emerald-800 tracking-wider">
                      FATESCIPOL · SEDES NACIONALES
                    </span>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-slate-50 border border-slate-200 p-1 shrink-0 shadow-xs">
                    <img src={ASSETS.escudoFatescipol} alt="Escudo FATESCIPOL" className="w-full h-full object-contain" />
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Formación profesional de dos años de sargentos de policía con título en Provisión Nacional de <strong>Técnico Superior en Ciencias Policiales</strong>. Formación técnico-operativa en seguridad ciudadana, orden público, derechos fundamentales y policía comunitaria.
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Grado al egreso</span>
                    <span className="font-bold text-emerald-900">Sargento Segundo</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Tiempo de estudio</span>
                    <span className="font-bold text-emerald-900">2 Años (4 Semestres)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Sedes departamentales</span>
                    <span className="font-bold text-slate-800">9 Departamentos</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Régimen</span>
                    <span className="font-bold text-slate-800">Internado Académico</span>
                  </div>
                </div>

                <div className="mt-3.5 flex items-center justify-between">
                  <button
                    onClick={() => onNavigate('comprar-prospecto')}
                    className="text-xs font-bold text-[#1b4332] hover:text-[#123023] flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-100 transition-colors"
                  >
                    <span>Postular a FATESCIPOL</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] text-emerald-700 font-semibold">Inscripciones Abiertas</span>
                </div>
              </div>
            </div>

            {/* ESBAPOLMUS Card */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
              <div className="h-64 sm:h-72 w-full bg-slate-100 relative overflow-hidden">
                <img
                  src={ASSETS.esbapolmus}
                  alt="Escuela Básica Policial de Música"
                  className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-emerald-950/80 backdrop-blur-xs text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-400/40">
                  MÚSICOS · 2 AÑOS
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Escuela Básica Policial de Música
                    </h3>
                    <span className="text-xs font-mono font-semibold text-emerald-800 tracking-wider">
                      ESBAPOLMUS · ESPECIALIDAD TÉCNICA
                    </span>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-slate-50 border border-slate-200 p-1 shrink-0 shadow-xs">
                    <img src={ASSETS.escudoEsbapolmus} alt="Escudo ESBAPOLMUS" className="w-full h-full object-contain" />
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Formación técnica policial especializada para músicos instrumentistas integrados a las bandas de música de la Policía Boliviana a nivel nacional. Otorga el título de <strong>Técnico Superior en Música Policial</strong> en vientos de metal, madera y percusión militar.
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Grado al egreso</span>
                    <span className="font-bold text-emerald-900">Sargento Músico</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Tiempo de estudio</span>
                    <span className="font-bold text-emerald-900">2 Años de Formación</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Instrumentos</span>
                    <span className="font-bold text-slate-800">Metales, Maderas, Percusión</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Destino</span>
                    <span className="font-bold text-slate-800">Bandas Oficiales</span>
                  </div>
                </div>

                <div className="mt-3.5 flex items-center justify-between">
                  <button
                    onClick={() => onNavigate('comprar-prospecto')}
                    className="text-xs font-bold text-[#1b4332] hover:text-[#123023] flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-100 transition-colors"
                  >
                    <span>Postular a ESBAPOLMUS</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] text-slate-400 font-medium">Banda Sinfónica Policial</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN OFICIAL: CUADROS Y REPORTES DE ADMISIÓN 2027 */}
        <section className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                SISTEMA INTEGRADO DE REPORTES
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Cuadros Oficiales y Estadísticas 2027
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Datos oficiales procesados en base de datos: ranking en vivo, baremo de aptitud física, cupos departamentales y aranceles.
              </p>
            </div>

            <button
              onClick={() => onNavigate('cuadros-oficiales')}
              className="px-4 py-2 bg-[#1b4332] hover:bg-[#143527] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
            >
              <span>Ver todos los cuadros</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Cuadro Switcher Sub-Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setLandingCuadroTab('prelacion')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors whitespace-nowrap ${
                landingCuadroTab === 'prelacion'
                  ? 'bg-emerald-900 text-white'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              Cuadro de Prelación (En Vivo)
            </button>
            <button
              onClick={() => setLandingCuadroTab('baremos')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors whitespace-nowrap ${
                landingCuadroTab === 'baremos'
                  ? 'bg-emerald-900 text-white'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              Baremo Aptitud Física
            </button>
            <button
              onClick={() => setLandingCuadroTab('plazas')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors whitespace-nowrap ${
                landingCuadroTab === 'plazas'
                  ? 'bg-emerald-900 text-white'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              Distribución de 1.250 Cupos
            </button>
            <button
              onClick={() => setLandingCuadroTab('aranceles')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors whitespace-nowrap ${
                landingCuadroTab === 'aranceles'
                  ? 'bg-emerald-900 text-white'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              Cuadro Arancelario Oficial
            </button>
          </div>

          {/* Preview Content based on selected landingCuadroTab */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
            {landingCuadroTab === 'prelacion' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Puestos de Vanguardia y Corte de Cupo Nacional
                    </h3>
                    <span className="text-[11px] text-slate-500">
                      Top postulantes según ponderación de evaluaciones y orden de mérito
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                    Corte preliminar activo
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                        <th className="p-2 text-center w-10">#</th>
                        <th className="p-2">Código</th>
                        <th className="p-2">Programa</th>
                        <th className="p-2">Sede</th>
                        <th className="p-2 text-right">Puntaje</th>
                        <th className="p-2 text-center">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { pos: 1, cod: '2027-000014-ANA', prog: 'ANAPOL', sede: 'La Paz', pts: 97.45, cupo: true },
                        { pos: 2, cod: '2027-000089-ANA', prog: 'ANAPOL', sede: 'Cochabamba', pts: 96.80, cupo: true },
                        { pos: 3, cod: '2027-000032-FAT', prog: 'FATESCIPOL', sede: 'Santa Cruz', pts: 95.90, cupo: true },
                        { pos: 4, cod: '2027-000072-FAT', prog: 'FATESCIPOL', sede: 'Cochabamba', pts: 94.65, cupo: true },
                        { pos: 5, cod: '2027-000105-FAT', prog: 'FATESCIPOL', sede: 'La Paz', pts: 94.10, cupo: true },
                      ].map((r) => (
                        <tr key={r.cod} className="hover:bg-slate-50">
                          <td className="p-2 text-center font-bold font-mono">#{r.pos}</td>
                          <td className="p-2 font-mono font-bold text-emerald-900">{r.cod}</td>
                          <td className="p-2 font-semibold text-slate-700">{r.prog}</td>
                          <td className="p-2 text-slate-600">{r.sede}</td>
                          <td className="p-2 text-right font-mono font-black text-slate-900">{r.pts.toFixed(2)}</td>
                          <td className="p-2 text-center">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              Dentro de cupo
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
                  <span className="text-slate-500 text-[11px]">
                    Mostrando top 5 de 1.250 postulantes
                  </span>
                  <button
                    onClick={() => onNavigate('cuadros-oficiales')}
                    className="text-emerald-800 hover:text-emerald-950 font-bold underline flex items-center gap-1"
                  >
                    <span>Ver cuadro completo con filtros</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {landingCuadroTab === 'baremos' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">
                    Resumen de Pruebas Físicas Obligatorias (100 Puntos)
                  </h3>
                  <span className="text-[11px] font-semibold text-amber-700">
                    Aprobación mínima: 51 puntos
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className="font-bold text-blue-900 block text-[11px] uppercase">Varones</span>
                    <div className="flex justify-between text-slate-700">
                      <span>100m Planos:</span>
                      <strong className="font-mono">≤ 12,00 seg</strong>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Dominadas en barra:</span>
                      <strong className="font-mono">≥ 17 repeticiones</strong>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Abdominales (1 min):</span>
                      <strong className="font-mono">≥ 65 repeticiones</strong>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Natación 50m:</span>
                      <strong className="font-mono">≤ 38,00 seg</strong>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Resistencia 2 Millas:</span>
                      <strong className="font-mono">≤ 12m 30s</strong>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className="font-bold text-purple-900 block text-[11px] uppercase">Damas</span>
                    <div className="flex justify-between text-slate-700">
                      <span>100m Planos:</span>
                      <strong className="font-mono">≤ 15,40 seg</strong>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Suspensión / Dominadas:</span>
                      <strong className="font-mono">≥ 12 repeticiones</strong>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Abdominales (1 min):</span>
                      <strong className="font-mono">≥ 55 repeticiones</strong>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Natación 50m:</span>
                      <strong className="font-mono">≤ 45,00 seg</strong>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Resistencia 2 Millas:</span>
                      <strong className="font-mono">≤ 14m 45s</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-1 text-right">
                  <button
                    onClick={() => onNavigate('cuadros-oficiales')}
                    className="text-xs text-emerald-800 hover:text-emerald-950 font-bold underline"
                  >
                    Abrir calculadora interactiva de baremo físico →
                  </button>
                </div>
              </div>
            )}

            {landingCuadroTab === 'plazas' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">
                    Distribución de Plazas por Sede Departamental
                  </h3>
                  <span className="text-xs font-mono font-bold text-emerald-900">
                    Total: 1.250 Plazas
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-800 block">La Paz (ANAPOL/FATES)</span>
                    <span className="text-emerald-900 font-mono font-black text-sm">450 Plazas</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-800 block">Santa Cruz</span>
                    <span className="text-emerald-900 font-mono font-black text-sm">220 Plazas</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-800 block">Cochabamba</span>
                    <span className="text-emerald-900 font-mono font-black text-sm">200 Plazas</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-800 block">Oruro</span>
                    <span className="text-emerald-900 font-mono font-black text-sm">100 Plazas</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-800 block">Potosí & Chuquisaca</span>
                    <span className="text-emerald-900 font-mono font-black text-sm">160 Plazas</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-800 block">Tarija, Beni & Pando</span>
                    <span className="text-emerald-900 font-mono font-black text-sm">120 Plazas</span>
                  </div>
                </div>

                <div className="pt-1 text-right">
                  <button
                    onClick={() => onNavigate('cuadros-oficiales')}
                    className="text-xs text-emerald-800 hover:text-emerald-950 font-bold underline"
                  >
                    Ver cuadro de cupos detallado por género y recinto →
                  </button>
                </div>
              </div>
            )}

            {landingCuadroTab === 'aranceles' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">
                    Aranceles Oficiales Aprobados para Admisiones
                  </h3>
                  <span className="text-xs font-semibold text-emerald-800">
                    Banco Unión S.A.
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                    <span className="font-semibold text-slate-800">Prospecto Digital ANAPOL</span>
                    <strong className="font-mono text-emerald-900 text-sm">Bs 650.00</strong>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                    <span className="font-semibold text-slate-800">Prospecto Digital FATESCIPOL</span>
                    <strong className="font-mono text-emerald-900 text-sm">Bs 550.00</strong>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                    <span className="font-semibold text-slate-800">Prospecto Digital ESBAPOLMUS</span>
                    <strong className="font-mono text-emerald-900 text-sm">Bs 550.00</strong>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                    <span className="font-semibold text-slate-800">Examen Médico Integral</span>
                    <strong className="font-mono text-slate-700">Bs 350.00</strong>
                  </div>
                </div>

                <div className="pt-1 text-right">
                  <button
                    onClick={() => onNavigate('cuadros-oficiales')}
                    className="text-xs text-emerald-800 hover:text-emerald-950 font-bold underline"
                  >
                    Ver cuadro arancelario completo y cuentas bancarias →
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
        <section className="space-y-4">
          <div>
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
              ANTES DE EMPEZAR
            </span>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Condición de edad
            </h2>
          </div>

          <div className="p-3.5 bg-[#fbfcfb] rounded-lg border border-slate-200/90 border-l-4 border-l-[#1b4332] shadow-2xs">
            <h4 className="text-xs font-bold text-slate-900 mb-0.5">
              Tener entre 17 y 22 años al 31 de diciembre de 2027.
            </h4>
            <p className="text-xs text-slate-600">
              Es el motivo de rechazo más frecuente: verifícalo antes de iniciar tu inscripción.
            </p>
          </div>
        </section>

        {/* Requisitos Generales matching Screenshots 7 & 8 */}
        <section className="space-y-4">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Requisitos generales
          </h2>

          <div className="space-y-2.5">
            {generalRequirements.map((req, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-[#fbfcfb] rounded-lg border border-slate-200/90 border-l-4 border-l-[#1b4332] shadow-2xs"
              >
                <span className="text-xs text-slate-800 font-medium leading-relaxed block">
                  {req}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-500 leading-relaxed pt-2">
            La lista completa de documentos se muestra en tu expediente, etapa por etapa, una vez inscrito. Cargar un documento no equivale a su aprobación: cada requisito lo revisa la Unidad de Admisiones y los originales se presentan en ventanilla.
          </p>
        </section>

        {/* Contacto — Unidad de Admisiones matching Screenshot 6 */}
        <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-slate-900">
            Contacto — Unidad de Admisiones
          </h3>

          <div className="space-y-2.5 text-xs text-slate-600">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                Av. Abel Iturralde, entre calles Haití y Guatemala Nº 1122, Zona Miraflores — La Paz, Bolivia
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>(2) 220 0000</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>admisiones@unipol.edu.bo</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
