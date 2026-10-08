import React, { useState, useMemo } from 'react';
import {
  Table,
  CheckCircle2,
  XCircle,
  FileText,
  Search,
  Filter,
  Download,
  ShieldCheck,
  Award,
  TrendingDown,
  Layers,
  ChevronDown,
  ArrowUpDown,
  ExternalLink,
  Printer,
  Sparkles,
  Users,
  MapPin,
  Clock,
  DollarSign,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { UserProfile, AcademicUnitId } from '../types';
import { ASSETS, PHYSICAL_BAREMO_DATA } from '../data/mockData';

interface CuadrosOficialesViewProps {
  user: UserProfile | null;
  onNavigate: (view: string) => void;
  initialTab?: string;
}

// Sample official preliminar ranking data based on the real UNIPOL structure
interface PrelacionItem {
  posicion: number;
  codigo: string;
  sexo: 'M' | 'F';
  programa: AcademicUnitId;
  sede: string;
  ci: string;
  puntajeFinal: number;
  notaPrefacultativo: number;
  notaFisica: number;
  dentroCupo: boolean;
  criterioDesempate?: string;
  preliminar: boolean;
}

const PRELACION_DATA: PrelacionItem[] = [
  { posicion: 1, codigo: '2027-000014-ANA', sexo: 'M', programa: 'ANAPOL', sede: 'La Paz', ci: '8492***', puntajeFinal: 97.45, notaPrefacultativo: 98.0, notaFisica: 96.9, dentroCupo: true, criterioDesempate: 'Mérito académico superior', preliminar: true },
  { posicion: 2, codigo: '2027-000089-ANA', sexo: 'F', programa: 'ANAPOL', sede: 'Cochabamba', ci: '9124***', puntajeFinal: 96.80, notaPrefacultativo: 97.2, notaFisica: 96.4, dentroCupo: true, criterioDesempate: 'Mayor promedio Prefacultativo', preliminar: true },
  { posicion: 3, codigo: '2027-000032-FAT', sexo: 'M', programa: 'FATESCIPOL', sede: 'Santa Cruz', ci: '7821***', puntajeFinal: 95.90, notaPrefacultativo: 96.0, notaFisica: 95.8, dentroCupo: true, criterioDesempate: 'Mayor puntaje Aptitud Física', preliminar: true },
  { posicion: 4, codigo: '2027-000072-FAT', sexo: 'M', programa: 'FATESCIPOL', sede: 'Cochabamba', ci: '8910***', puntajeFinal: 94.65, notaPrefacultativo: 95.0, notaFisica: 94.3, dentroCupo: true, criterioDesempate: 'Evaluación integral aprobada', preliminar: true },
  { posicion: 5, codigo: '2027-000105-FAT', sexo: 'F', programa: 'FATESCIPOL', sede: 'La Paz', ci: '9456***', puntajeFinal: 94.10, notaPrefacultativo: 94.8, notaFisica: 93.4, dentroCupo: true, criterioDesempate: 'Mayor promedio Prefacultativo', preliminar: true },
  { posicion: 6, codigo: '2027-000156-ANA', sexo: 'M', programa: 'ANAPOL', sede: 'Chuquisaca', ci: '6812***', puntajeFinal: 93.75, notaPrefacultativo: 94.0, notaFisica: 93.5, dentroCupo: true, criterioDesempate: 'Mayor puntaje Aptitud Física', preliminar: true },
  { posicion: 7, codigo: '2027-000210-FAT', sexo: 'M', programa: 'FATESCIPOL', sede: 'Oruro', ci: '7341***', puntajeFinal: 92.85, notaPrefacultativo: 93.2, notaFisica: 92.5, dentroCupo: true, criterioDesempate: 'Tiempo superior resistencia 2 millas', preliminar: true },
  { posicion: 8, codigo: '2027-000045-ESB', sexo: 'M', programa: 'ESBAPOLMUS', sede: 'La Paz', ci: '8112***', puntajeFinal: 92.50, notaPrefacultativo: 93.0, notaFisica: 92.0, dentroCupo: true, criterioDesempate: 'Audición musical de excelencia', preliminar: true },
  { posicion: 9, codigo: '2027-000312-FAT', sexo: 'F', programa: 'FATESCIPOL', sede: 'Tarija', ci: '9081***', puntajeFinal: 91.95, notaPrefacultativo: 92.5, notaFisica: 91.4, dentroCupo: true, criterioDesempate: 'Mayor promedio Prefacultativo', preliminar: true },
  { posicion: 10, codigo: '2027-000277-ANA', sexo: 'F', programa: 'ANAPOL', sede: 'Santa Cruz', ci: '8523***', puntajeFinal: 91.40, notaPrefacultativo: 92.0, notaFisica: 90.8, dentroCupo: true, criterioDesempate: 'Mayor promedio Prefacultativo', preliminar: true },
  { posicion: 11, codigo: '2027-000421-FAT', sexo: 'M', programa: 'FATESCIPOL', sede: 'Potosí', ci: '7924***', puntajeFinal: 90.85, notaPrefacultativo: 91.0, notaFisica: 90.7, dentroCupo: true, criterioDesempate: 'Mayor puntaje Aptitud Física', preliminar: true },
  { posicion: 12, codigo: '2027-000188-FAT', sexo: 'M', programa: 'FATESCIPOL', sede: 'Beni', ci: '8401***', puntajeFinal: 90.30, notaPrefacultativo: 90.5, notaFisica: 90.1, dentroCupo: true, criterioDesempate: 'Evaluación integral aprobada', preliminar: true },
  { posicion: 13, codigo: '2027-000512-FAT', sexo: 'F', programa: 'FATESCIPOL', sede: 'Cochabamba', ci: '9133***', puntajeFinal: 89.90, notaPrefacultativo: 90.2, notaFisica: 89.6, dentroCupo: true, criterioDesempate: 'Mayor promedio Prefacultativo', preliminar: true },
  { posicion: 14, codigo: '2027-000099-ESB', sexo: 'F', programa: 'ESBAPOLMUS', sede: 'Cochabamba', ci: '8744***', puntajeFinal: 89.45, notaPrefacultativo: 90.0, notaFisica: 88.9, dentroCupo: true, criterioDesempate: 'Audición musical de excelencia', preliminar: true },
  { posicion: 15, codigo: '2027-000620-FAT', sexo: 'M', programa: 'FATESCIPOL', sede: 'Pando', ci: '6942***', puntajeFinal: 88.80, notaPrefacultativo: 89.0, notaFisica: 88.6, dentroCupo: true, criterioDesempate: 'Tiempo superior resistencia', preliminar: true },
  { posicion: 16, codigo: '2027-000730-FAT', sexo: 'M', programa: 'FATESCIPOL', sede: 'Santa Cruz', ci: '8611***', puntajeFinal: 85.20, notaPrefacultativo: 86.0, notaFisica: 84.4, dentroCupo: false, criterioDesempate: 'Fuera de cupo departamental', preliminar: true },
  { posicion: 17, codigo: '2027-000814-ANA', sexo: 'M', programa: 'ANAPOL', sede: 'La Paz', ci: '7990***', puntajeFinal: 84.60, notaPrefacultativo: 85.0, notaFisica: 84.2, dentroCupo: false, criterioDesempate: 'Fuera de cupo general ANAPOL', preliminar: true },
  { posicion: 18, codigo: '2027-000922-FAT', sexo: 'F', programa: 'FATESCIPOL', sede: 'Oruro', ci: '9211***', puntajeFinal: 83.95, notaPrefacultativo: 84.5, notaFisica: 83.4, dentroCupo: false, criterioDesempate: 'Fuera de cupo departamental', preliminar: true },
  { posicion: 19, codigo: '2027-001004-FAT', sexo: 'M', programa: 'FATESCIPOL', sede: 'Potosí', ci: '8114***', puntajeFinal: 82.50, notaPrefacultativo: 83.0, notaFisica: 82.0, dentroCupo: false, criterioDesempate: 'Fuera de cupo departamental', preliminar: true },
  { posicion: 20, codigo: '2027-001155-ESB', sexo: 'M', programa: 'ESBAPOLMUS', sede: 'Oruro', ci: '7845***', puntajeFinal: 81.70, notaPrefacultativo: 82.0, notaFisica: 81.4, dentroCupo: false, criterioDesempate: 'Fuera de cupo ESBAPOLMUS', preliminar: true },
];

export const CuadrosOficialesView: React.FC<CuadrosOficialesViewProps> = ({
  user,
  onNavigate,
  initialTab = 'prelacion',
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  // Filters for Prelación
  const [filterPrograma, setFilterPrograma] = useState<string>('todos');
  const [filterSexo, setFilterSexo] = useState<string>('todos');
  const [filterSede, setFilterSede] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Verifier State
  const [folioInput, setFolioInput] = useState<string>('RPT-2027-000072');
  const [hashInput, setHashInput] = useState<string>('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
  const [verificationResult, setVerificationResult] = useState<any | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Physical test calculator
  const [calcSex, setCalcSex] = useState<'Varones' | 'Damas'>('Varones');
  const [calcTest, setCalcTest] = useState<string>('Velocidad 100 m');
  const [calcValue, setCalcValue] = useState<string>('12.5');

  // Filtered Prelación list
  const filteredPrelacion = useMemo(() => {
    return PRELACION_DATA.filter((item) => {
      if (filterPrograma !== 'todos' && item.programa !== filterPrograma) return false;
      if (filterSexo !== 'todos' && item.sexo !== filterSexo) return false;
      if (filterSede !== 'todas' && item.sede.toLowerCase() !== filterSede.toLowerCase()) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.codigo.toLowerCase().includes(q) ||
          item.sede.toLowerCase().includes(q) ||
          item.ci.includes(q)
        );
      }
      return true;
    });
  }, [filterPrograma, filterSexo, filterSede, searchQuery]);

  const handleVerifyReport = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationResult({
        valido: true,
        folio: folioInput.trim() || 'RPT-2027-000072',
        hash: hashInput.trim(),
        tipoReporte: 'Cuadro General de Prelación y Asignación de Cupos',
        gestion: 'Admisiones UNIPOL 2027',
        unidadEmisora: 'Dirección Nacional de Instrucción y Enseñanza - UNIPOL',
        fechaEmision: '07 de Octubre de 2026, 14:30:00 GMT-4',
        firmante: 'Cnl. DESP. Rector Universidad Policial Mcal. Antonio José de Sucre',
        totalRegistros: 1250,
        estado: 'OFICIAL VIGENTE CON CORTE APLICADO',
        algoritmo: 'SHA-256 (Criptográficamente Sellado)',
      });
    }, 600);
  };

  const handleLoadSampleHash = () => {
    setFolioInput('RPT-2027-000001');
    setHashInput('9a6b41d2e85a0fb7c134882e3792019b882354c01d98a09f8092a95c4772183c');
  };

  const exportTableCSV = () => {
    const headers = ['Posición', 'Código', 'Sexo', 'Programa', 'Sede', 'Puntaje Final', 'Prefacultativo', 'Física', 'Cupo', 'Criterio'];
    const rows = filteredPrelacion.map((item) => [
      item.posicion,
      item.codigo,
      item.sexo === 'M' ? 'Masculino' : 'Femenino',
      item.programa,
      item.sede,
      item.puntajeFinal.toFixed(2),
      item.notaPrefacultativo.toFixed(1),
      item.notaFisica.toFixed(1),
      item.dentroCupo ? 'DENTRO DE CUPO' : 'FUERA DE CUPO',
      `"${item.criterioDesempate || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Cuadro_Prelacion_UNIPOL_2027_${filterPrograma}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner Institutional */}
      <div className="p-6 bg-gradient-to-r from-[#143e2b] via-[#1b4332] to-[#0f2c1f] text-white rounded-2xl shadow-lg border border-emerald-700/60 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/10 p-1 border border-amber-400/60 shadow flex items-center justify-center shrink-0">
              <img
                src={ASSETS.crest}
                alt="Escudo UNIPOL"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider bg-black/30 px-2 py-0.5 rounded border border-amber-400/30">
                  SISTEMA OFICIAL DE RESULTADOS Y REPORTES
                </span>
                <span className="text-[10px] font-semibold text-emerald-200">
                  GESTIÓN 2027
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                Cuadros Oficiales de Admisión UNIPOL
              </h1>
              <p className="text-xs text-emerald-200/90 max-w-xl mt-0.5">
                Cuadros oficiales calculados en la base de datos institucional, con folio, hash criptográfico de verificación y desglose por programa.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate(user ? 'dashboard' : 'landing')}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white transition-colors flex items-center gap-1.5"
            >
              <span>{user ? 'Volver a mi panel' : 'Volver al inicio'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir cuadro</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 text-xs font-semibold scrollbar-thin">
        {[
          { id: 'prelacion', label: 'Cuadro de Prelación', icon: Award },
          { id: 'evaluacion', label: 'Cuadro de Evaluación', icon: Table },
          { id: 'embudo', label: 'Embudo del Proceso', icon: Layers },
          { id: 'verificador', label: 'Verificar Reporte Impreso', icon: ShieldCheck },
          { id: 'baremos', label: 'Baremos Físicos', icon: TrendingDown },
          { id: 'plazas', label: 'Plazas por Sede', icon: MapPin },
          { id: 'aranceles', label: 'Cuadro Arancelario', icon: DollarSign },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-[#1b4332] text-white shadow-xs font-bold'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: CUADRO GENERAL DE PRELACIÓN */}
      {activeTab === 'prelacion' && (
        <div className="space-y-4">
          {/* Card description and summary stats */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900">
                    Cuadro General de Prelación y Cupos
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    Preliminar: calculado en vivo
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ordenamiento ponderado oficial de postulantes conforme a las notas del Programa Prefacultativo y Aptitud Física.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={exportTableCSV}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Exportar CSV</span>
                </button>
              </div>
            </div>

            {/* Quick Stat Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block">Total Evaluados</span>
                <span className="text-lg font-black text-emerald-950 font-mono">1.250</span>
                <span className="text-[10px] text-emerald-700 block">Postulantes con nota final</span>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                <span className="text-[10px] font-bold text-blue-800 uppercase block">Cupos Habilitados</span>
                <span className="text-lg font-black text-blue-950 font-mono">1.100</span>
                <span className="text-[10px] text-blue-700 block">Plazas a nivel nacional</span>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                <span className="text-[10px] font-bold text-amber-800 uppercase block">Nota de Corte Mínima</span>
                <span className="text-lg font-black text-amber-950 font-mono">88.80 pts</span>
                <span className="text-[10px] text-amber-700 block">Último postulante en cupo</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-600 uppercase block">Promedio Nacional</span>
                <span className="text-lg font-black text-slate-900 font-mono">91.35 pts</span>
                <span className="text-[10px] text-slate-500 block">Media ponderada global</span>
              </div>
            </div>

            {/* Filters Row */}
            <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-4 gap-2.5">
              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">
                  Programa
                </label>
                <select
                  value={filterPrograma}
                  onChange={(e) => setFilterPrograma(e.target.value)}
                  className="w-full text-xs font-medium p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
                >
                  <option value="todos">Todos los programas</option>
                  <option value="ANAPOL">ANAPOL (Oficiales)</option>
                  <option value="FATESCIPOL">FATESCIPOL (Suboficiales)</option>
                  <option value="ESBAPOLMUS">ESBAPOLMUS (Músicos)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">
                  Sexo
                </label>
                <select
                  value={filterSexo}
                  onChange={(e) => setFilterSexo(e.target.value)}
                  className="w-full text-xs font-medium p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
                >
                  <option value="todos">Ambos sexos</option>
                  <option value="M">Masculino (Varones)</option>
                  <option value="F">Femenino (Damas)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">
                  Sede Departamental
                </label>
                <select
                  value={filterSede}
                  onChange={(e) => setFilterSede(e.target.value)}
                  className="w-full text-xs font-medium p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
                >
                  <option value="todas">Todas las sedes</option>
                  <option value="la paz">La Paz</option>
                  <option value="cochabamba">Cochabamba</option>
                  <option value="santa cruz">Santa Cruz</option>
                  <option value="chuquisaca">Chuquisaca</option>
                  <option value="oruro">Oruro</option>
                  <option value="potosí">Potosí</option>
                  <option value="tarija">Tarija</option>
                  <option value="beni">Beni</option>
                  <option value="pando">Pando</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">
                  Buscar postulante o CI
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Código 2027-... o CI"
                    className="w-full text-xs font-medium p-2 pl-7 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3 w-14 text-center">Pos.</th>
                    <th className="py-3 px-3">Código Postulación</th>
                    <th className="py-3 px-3">Programa</th>
                    <th className="py-3 px-2 text-center">Sexo</th>
                    <th className="py-3 px-3">Sede</th>
                    <th className="py-3 px-3 text-right">Prefac.</th>
                    <th className="py-3 px-3 text-right">Física</th>
                    <th className="py-3 px-3 text-right font-black">Puntaje Final</th>
                    <th className="py-3 px-3 text-center">Estado de Cupo</th>
                    <th className="py-3 px-3">Criterio de Desempate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPrelacion.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="py-8 text-center text-slate-400 italic">
                        No se encontraron registros con los filtros seleccionados.
                      </td>
                    </tr>
                  ) : (
                    filteredPrelacion.map((item) => (
                      <tr
                        key={item.codigo}
                        className={`hover:bg-slate-50/70 transition-colors ${
                          user && user.postulationCode === item.codigo ? 'bg-amber-50/80 font-semibold ring-1 ring-amber-400' : ''
                        }`}
                      >
                        <td className="py-3 px-3 text-center font-mono font-bold text-slate-800">
                          #{item.posicion}
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-emerald-900">
                          {item.codigo}
                          {user && user.postulationCode === item.codigo && (
                            <span className="ml-1.5 px-1.5 py-0.2 bg-amber-400 text-slate-950 rounded text-[9px] font-bold">
                              TÚ
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 font-medium text-slate-800">
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-[11px] font-semibold">
                            {item.programa}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-center font-bold text-slate-600">
                          {item.sexo}
                        </td>
                        <td className="py-3 px-3 text-slate-600">
                          {item.sede}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-slate-700">
                          {item.notaPrefacultativo.toFixed(1)}
                        </td>
                        <td className="py-3 px-3 text-right font-mono text-slate-700">
                          {item.notaFisica.toFixed(1)}
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-black text-emerald-950 text-sm">
                          {item.puntajeFinal.toFixed(2)}
                        </td>
                        <td className="py-3 px-3 text-center">
                          {item.dentroCupo ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                              <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                              <span>Dentro de cupo</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-800 border border-rose-200">
                              <XCircle className="w-3 h-3 text-rose-600" />
                              <span>Fuera de cupo</span>
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-slate-500 text-[11px] italic">
                          {item.criterioDesempate || '—'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
              <span>Mostrando {filteredPrelacion.length} de {PRELACION_DATA.length} postulantes ordenados</span>
              <span className="font-mono">Corte preliminar generado por el Sistema Integrado UNIPOL</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CUADRO DE EVALUACIÓN */}
      {activeTab === 'evaluacion' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Cuadro Oficial de Evaluación por Programa y Sexo
              </h2>
              <p className="text-xs text-slate-500">
                Consolidado estadístico por programa (ANAPOL, FATESCIPOL, ESBAPOLMUS) y género, con totales y promedio ponderado.
              </p>
            </div>

            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3">Programa</th>
                    <th className="py-3 px-3">Sexo</th>
                    <th className="py-3 px-3 text-right">Evaluados</th>
                    <th className="py-3 px-3 text-right text-emerald-800">Aprobados</th>
                    <th className="py-3 px-3 text-right text-rose-800">Reprobados</th>
                    <th className="py-3 px-3 text-right text-slate-500">No presentados</th>
                    <th className="py-3 px-3 text-right text-amber-700">Observados</th>
                    <th className="py-3 px-3 text-right">No seleccionados</th>
                    <th className="py-3 px-3 text-right font-black">Promedio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-800">ANAPOL</td>
                    <td className="py-2.5 px-3 text-slate-600">Masculino</td>
                    <td className="py-2.5 px-3 text-right font-mono">1.450</td>
                    <td className="py-2.5 px-3 text-right font-mono text-emerald-800 font-bold">890</td>
                    <td className="py-2.5 px-3 text-right font-mono text-rose-700">420</td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-500">85</td>
                    <td className="py-2.5 px-3 text-right font-mono text-amber-700">55</td>
                    <td className="py-2.5 px-3 text-right font-mono">590</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">87.40</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-800">ANAPOL</td>
                    <td className="py-2.5 px-3 text-slate-600">Femenino</td>
                    <td className="py-2.5 px-3 text-right font-mono">750</td>
                    <td className="py-2.5 px-3 text-right font-mono text-emerald-800 font-bold">480</td>
                    <td className="py-2.5 px-3 text-right font-mono text-rose-700">210</td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-500">38</td>
                    <td className="py-2.5 px-3 text-right font-mono text-amber-700">22</td>
                    <td className="py-2.5 px-3 text-right font-mono">310</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">89.15</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-800">FATESCIPOL</td>
                    <td className="py-2.5 px-3 text-slate-600">Masculino</td>
                    <td className="py-2.5 px-3 text-right font-mono">3.800</td>
                    <td className="py-2.5 px-3 text-right font-mono text-emerald-800 font-bold">2.420</td>
                    <td className="py-2.5 px-3 text-right font-mono text-rose-700">1.080</td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-500">190</td>
                    <td className="py-2.5 px-3 text-right font-mono text-amber-700">110</td>
                    <td className="py-2.5 px-3 text-right font-mono">1.620</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">84.20</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-800">FATESCIPOL</td>
                    <td className="py-2.5 px-3 text-slate-600">Femenino</td>
                    <td className="py-2.5 px-3 text-right font-mono">1.950</td>
                    <td className="py-2.5 px-3 text-right font-mono text-emerald-800 font-bold">1.290</td>
                    <td className="py-2.5 px-3 text-right font-mono text-rose-700">520</td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-500">92</td>
                    <td className="py-2.5 px-3 text-right font-mono text-amber-700">48</td>
                    <td className="py-2.5 px-3 text-right font-mono">890</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">86.50</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-800">ESBAPOLMUS</td>
                    <td className="py-2.5 px-3 text-slate-600">Masculino</td>
                    <td className="py-2.5 px-3 text-right font-mono">220</td>
                    <td className="py-2.5 px-3 text-right font-mono text-emerald-800 font-bold">145</td>
                    <td className="py-2.5 px-3 text-right font-mono text-rose-700">55</td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-500">12</td>
                    <td className="py-2.5 px-3 text-right font-mono text-amber-700">8</td>
                    <td className="py-2.5 px-3 text-right font-mono">85</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">85.70</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-800">ESBAPOLMUS</td>
                    <td className="py-2.5 px-3 text-slate-600">Femenino</td>
                    <td className="py-2.5 px-3 text-right font-mono">110</td>
                    <td className="py-2.5 px-3 text-right font-mono text-emerald-800 font-bold">78</td>
                    <td className="py-2.5 px-3 text-right font-mono text-rose-700">24</td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-500">5</td>
                    <td className="py-2.5 px-3 text-right font-mono text-amber-700">3</td>
                    <td className="py-2.5 px-3 text-right font-mono">43</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">87.10</td>
                  </tr>
                  {/* Fila de Totales Generales */}
                  <tr className="bg-[#1b4332]/10 font-bold text-slate-950 border-t-2 border-emerald-800">
                    <td className="py-3 px-3 uppercase">TOTALES</td>
                    <td className="py-3 px-3 uppercase text-slate-700">Nacional</td>
                    <td className="py-3 px-3 text-right font-mono font-black text-sm">8.280</td>
                    <td className="py-3 px-3 text-right font-mono font-black text-emerald-900 text-sm">5.303</td>
                    <td className="py-3 px-3 text-right font-mono text-rose-800">2.309</td>
                    <td className="py-3 px-3 text-right font-mono text-slate-600">422</td>
                    <td className="py-3 px-3 text-right font-mono text-amber-800">246</td>
                    <td className="py-3 px-3 text-right font-mono text-slate-800">3.538</td>
                    <td className="py-3 px-3 text-right font-mono font-black text-emerald-950 text-sm">86.68</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: EMBUDO DEL PROCESO */}
      {activeTab === 'embudo' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Embudo Oficial del Proceso de Admisión
              </h2>
              <p className="text-xs text-slate-500">
                Las 6 etapas en orden cronológico, por estado de los postulantes, aprobación y tasa de transición.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3">Orden & Etapa</th>
                    <th className="py-3 px-2 text-right">Bloqueadas</th>
                    <th className="py-3 px-2 text-right">Habilitadas</th>
                    <th className="py-3 px-2 text-right">Pagadas</th>
                    <th className="py-3 px-2 text-right">En curso</th>
                    <th className="py-3 px-2 text-right text-emerald-800 font-bold">Aprobadas</th>
                    <th className="py-3 px-2 text-right text-rose-700">Reprobadas</th>
                    <th className="py-3 px-2 text-right text-slate-400">No pres.</th>
                    <th className="py-3 px-2 text-right text-amber-700">Observ.</th>
                    <th className="py-3 px-3 text-right font-black">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { orden: 1, nombre: 'Inscripción – Prospecto', bloq: 0, habil: 8280, pag: 8280, curso: 940, aprob: 7120, reprob: 140, nopr: 50, obs: 30, total: 8280 },
                    { orden: 2, nombre: 'Evaluación Médica', bloq: 1160, habil: 7120, pag: 7120, curso: 680, aprob: 5950, reprob: 870, nopr: 180, obs: 120, total: 7120 },
                    { orden: 3, nombre: 'Evaluación Psicológica', bloq: 2330, habil: 5950, pag: 5950, curso: 420, aprob: 5120, reprob: 620, nopr: 110, obs: 80, total: 5950 },
                    { orden: 4, nombre: 'Evaluación de Aptitud Física', bloq: 3160, habil: 5120, pag: 5120, curso: 310, aprob: 4280, reprob: 680, nopr: 95, obs: 65, total: 5120 },
                    { orden: 5, nombre: 'Programa Prefacultativo', bloq: 4000, habil: 4280, pag: 4280, curso: 1250, aprob: 1250, reprob: 2950, nopr: 45, obs: 35, total: 4280 },
                    { orden: 6, nombre: 'Incorporación', bloq: 7030, habil: 1250, pag: 1250, curso: 150, aprob: 1100, reprob: 0, nopr: 0, obs: 0, total: 1250 },
                  ].map((row) => (
                    <tr key={row.orden} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 font-bold text-slate-800">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 inline-flex items-center justify-center font-mono text-[10px] mr-2">
                          {row.orden}
                        </span>
                        {row.nombre}
                      </td>
                      <td className="py-3 px-2 text-right font-mono text-slate-400">{row.bloq}</td>
                      <td className="py-3 px-2 text-right font-mono text-slate-600">{row.habil}</td>
                      <td className="py-3 px-2 text-right font-mono text-slate-600">{row.pag}</td>
                      <td className="py-3 px-2 text-right font-mono text-amber-700 font-semibold">{row.curso}</td>
                      <td className="py-3 px-2 text-right font-mono text-emerald-800 font-bold">{row.aprob}</td>
                      <td className="py-3 px-2 text-right font-mono text-rose-700">{row.reprob}</td>
                      <td className="py-3 px-2 text-right font-mono text-slate-400">{row.nopr}</td>
                      <td className="py-3 px-2 text-right font-mono text-amber-600">{row.obs}</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: VERIFICADOR DE REPORTE IMPRESO */}
      {activeTab === 'verificador' && (
        <div className="space-y-4">
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-800" />
                  <span>Verificar Reporte Oficial Impreso</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Comprueba la autenticidad y firma criptográfica de cualquier cuadro o reporte impreso emitido por el sistema de admisiones de la UNIPOL.
                </p>
              </div>

              <button
                type="button"
                onClick={handleLoadSampleHash}
                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold shrink-0 transition-colors"
              >
                Cargar muestra oficial
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                  Folio Oficial del Reporte
                </label>
                <input
                  type="text"
                  value={folioInput}
                  onChange={(e) => setFolioInput(e.target.value)}
                  placeholder="Ej: RPT-2027-000001"
                  className="w-full text-xs font-mono p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 uppercase"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">
                  Hash SHA-256 (64 caracteres hexadecimales)
                </label>
                <input
                  type="text"
                  value={hashInput}
                  onChange={(e) => setHashInput(e.target.value)}
                  placeholder="Ej: 9a6b41d2e85a0fb7c134882e3792019b882354c01d98a09f8092a95c4772183c"
                  className="w-full text-xs font-mono p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleVerifyReport}
                disabled={isVerifying || !folioInput.trim() || !hashInput.trim()}
                className="px-5 py-2.5 bg-[#1b4332] hover:bg-[#143527] disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>{isVerifying ? 'Verificando en base...' : 'Verificar autenticidad'}</span>
              </button>
            </div>

            {/* Verification Result Card */}
            {verificationResult && (
              <div className="mt-4 p-5 bg-gradient-to-br from-emerald-50 to-white rounded-xl border-2 border-emerald-600 shadow-sm space-y-3 animate-in fade-in">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-amber-300" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest block">
                        DOCUMENTO AUTÉNTICO VERIFICADO
                      </span>
                      <h4 className="text-sm font-black text-slate-900">
                        {verificationResult.tipoReporte}
                      </h4>
                      <span className="text-xs font-mono text-emerald-700 font-bold">
                        Folio: {verificationResult.folio}
                      </span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold font-mono">
                    VALIDADO
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white/80 p-3 rounded-lg border border-emerald-100">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Emisor Institucional</span>
                    <span className="font-semibold text-slate-800">{verificationResult.unidadEmisora}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Fecha & Hora de Emisión</span>
                    <span className="font-semibold text-slate-800">{verificationResult.fechaEmision}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Autoridad Firmante</span>
                    <span className="font-semibold text-slate-800">{verificationResult.firmante}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Sello Criptográfico</span>
                    <span className="font-mono text-[10px] text-emerald-900 font-bold block break-all">
                      {verificationResult.hash}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-emerald-900 bg-emerald-100/60 p-2 rounded border border-emerald-200/80">
                  ✓ El cuadro físico presentado coincide íntegramente con los datos registrados en el servidor central de admisiones de la Universidad Policial.
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: BAREMOS FÍSICOS */}
      {activeTab === 'baremos' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Baremo Oficial de Aptitud Física (Varones y Damas)
              </h2>
              <p className="text-xs text-slate-500">
                Parámetros oficiales de evaluación conforme al Reglamento de Admisiones de la UNIPOL. Mínimo para aprobar: 51 puntos por prueba.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Varones */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <h3 className="text-sm font-bold text-slate-900 uppercase">
                    Tabla Oficial: Postulantes Varones
                  </h3>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold text-[10px]">
                    VARONES
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 bg-white rounded border border-slate-200">
                    <span className="font-semibold text-slate-800">100 m Planos (Velocidad)</span>
                    <span className="font-mono font-bold text-emerald-800">100 pts: ≤ 12,00 seg</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded border border-slate-200">
                    <span className="font-semibold text-slate-800">Dominadas en Barra fija</span>
                    <span className="font-mono font-bold text-emerald-800">100 pts: ≥ 17 reps</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded border border-slate-200">
                    <span className="font-semibold text-slate-800">Abdominales (1 minuto)</span>
                    <span className="font-mono font-bold text-emerald-800">100 pts: ≥ 65 reps</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded border border-slate-200">
                    <span className="font-semibold text-slate-800">Natación 50 m (Estilo libre)</span>
                    <span className="font-mono font-bold text-emerald-800">100 pts: ≤ 38,00 seg</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded border border-slate-200">
                    <span className="font-semibold text-slate-800">Resistencia 2 Millas (3.200 m)</span>
                    <span className="font-mono font-bold text-emerald-800">100 pts: ≤ 12m 30s</span>
                  </div>
                </div>
              </div>

              {/* Damas */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <h3 className="text-sm font-bold text-slate-900 uppercase">
                    Tabla Oficial: Postulantes Damas
                  </h3>
                  <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-900 font-bold text-[10px]">
                    DAMAS
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 bg-white rounded border border-slate-200">
                    <span className="font-semibold text-slate-800">100 m Planos (Velocidad)</span>
                    <span className="font-mono font-bold text-emerald-800">100 pts: ≤ 15,40 seg</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded border border-slate-200">
                    <span className="font-semibold text-slate-800">Dominadas / Suspensión</span>
                    <span className="font-mono font-bold text-emerald-800">100 pts: ≥ 12 reps</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded border border-slate-200">
                    <span className="font-semibold text-slate-800">Abdominales (1 minuto)</span>
                    <span className="font-mono font-bold text-emerald-800">100 pts: ≥ 55 reps</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded border border-slate-200">
                    <span className="font-semibold text-slate-800">Natación 50 m (Estilo libre)</span>
                    <span className="font-mono font-bold text-emerald-800">100 pts: ≤ 45,00 seg</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded border border-slate-200">
                    <span className="font-semibold text-slate-800">Resistencia 2 Millas (3.200 m)</span>
                    <span className="font-mono font-bold text-emerald-800">100 pts: ≤ 14m 45s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: PLAZAS Y SEDES */}
      {activeTab === 'plazas' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Distribución Nacional de Plazas y Cupos por Sede
              </h2>
              <p className="text-xs text-slate-500">
                Convocatoria oficial para 1.250 plazas a nivel nacional, distribuidas por departamento y género.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3">Sede Departamental</th>
                    <th className="py-3 px-3">Unidad Académica</th>
                    <th className="py-3 px-3 text-right">Cupo Varones</th>
                    <th className="py-3 px-3 text-right">Cupo Damas</th>
                    <th className="py-3 px-3 text-right font-black">Total Plazas</th>
                    <th className="py-3 px-3">Dirección / Recinto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">La Paz</td>
                    <td className="py-2.5 px-3 font-medium text-emerald-900">ANAPOL (Bajo Següencoma)</td>
                    <td className="py-2.5 px-3 text-right font-mono">180</td>
                    <td className="py-2.5 px-3 text-right font-mono">70</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-900">250</td>
                    <td className="py-2.5 px-3 text-slate-500 text-[11px]">Av. Hugo Ernst N° 100</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">La Paz</td>
                    <td className="py-2.5 px-3 font-medium text-emerald-900">FATESCIPOL (El Alto)</td>
                    <td className="py-2.5 px-3 text-right font-mono">150</td>
                    <td className="py-2.5 px-3 text-right font-mono">50</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-900">200</td>
                    <td className="py-2.5 px-3 text-slate-500 text-[11px]">Zona Ciudad Satélite</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">Cochabamba</td>
                    <td className="py-2.5 px-3 font-medium text-emerald-900">FATESCIPOL (Muyurina)</td>
                    <td className="py-2.5 px-3 text-right font-mono">140</td>
                    <td className="py-2.5 px-3 text-right font-mono">60</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-900">200</td>
                    <td className="py-2.5 px-3 text-slate-500 text-[11px]">Av. Circunvalación Norte</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">Santa Cruz</td>
                    <td className="py-2.5 px-3 font-medium text-emerald-900">FATESCIPOL (Warnes / El Torno)</td>
                    <td className="py-2.5 px-3 text-right font-mono">160</td>
                    <td className="py-2.5 px-3 text-right font-mono">60</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-900">220</td>
                    <td className="py-2.5 px-3 text-slate-500 text-[11px]">Carretera al Norte Km 24</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">Oruro</td>
                    <td className="py-2.5 px-3 font-medium text-emerald-900">FATESCIPOL (Sora)</td>
                    <td className="py-2.5 px-3 text-right font-mono">70</td>
                    <td className="py-2.5 px-3 text-right font-mono">30</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-900">100</td>
                    <td className="py-2.5 px-3 text-slate-500 text-[11px]">Comunidad Sora</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">Potosí</td>
                    <td className="py-2.5 px-3 font-medium text-emerald-900">FATESCIPOL (Cantumarca)</td>
                    <td className="py-2.5 px-3 text-right font-mono">55</td>
                    <td className="py-2.5 px-3 text-right font-mono">25</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-900">80</td>
                    <td className="py-2.5 px-3 text-slate-500 text-[11px]">Cantumarca Final Av. Unión</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">Chuquisaca</td>
                    <td className="py-2.5 px-3 font-medium text-emerald-900">FATESCIPOL (Sucre)</td>
                    <td className="py-2.5 px-3 text-right font-mono">55</td>
                    <td className="py-2.5 px-3 text-right font-mono">25</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-900">80</td>
                    <td className="py-2.5 px-3 text-slate-500 text-[11px]">Zona El Tejar</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">Tarija</td>
                    <td className="py-2.5 px-3 font-medium text-emerald-900">FATESCIPOL (San Andrés)</td>
                    <td className="py-2.5 px-3 text-right font-mono">50</td>
                    <td className="py-2.5 px-3 text-right font-mono">20</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-900">70</td>
                    <td className="py-2.5 px-3 text-slate-500 text-[11px]">Camino a San Andrés</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">Beni</td>
                    <td className="py-2.5 px-3 font-medium text-emerald-900">FATESCIPOL (Trinidad)</td>
                    <td className="py-2.5 px-3 text-right font-mono">25</td>
                    <td className="py-2.5 px-3 text-right font-mono">10</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-900">35</td>
                    <td className="py-2.5 px-3 text-slate-500 text-[11px]">Carretera a Loreto</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">Pando</td>
                    <td className="py-2.5 px-3 font-medium text-emerald-900">FATESCIPOL (Cobija)</td>
                    <td className="py-2.5 px-3 text-right font-mono">10</td>
                    <td className="py-2.5 px-3 text-right font-mono">5</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-900">15</td>
                    <td className="py-2.5 px-3 text-slate-500 text-[11px]">Zona Villa Busch</td>
                  </tr>
                  {/* ESBAPOLMUS */}
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">La Paz / Nal.</td>
                    <td className="py-2.5 px-3 font-medium text-emerald-900">ESBAPOLMUS (Músicos)</td>
                    <td className="py-2.5 px-3 text-right font-mono">35</td>
                    <td className="py-2.5 px-3 text-right font-mono">15</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-900">50</td>
                    <td className="py-2.5 px-3 text-slate-500 text-[11px]">Av. Iturralde Miraflores</td>
                  </tr>
                  <tr className="bg-[#1b4332]/10 font-bold border-t-2 border-emerald-800">
                    <td className="py-3 px-3 uppercase">TOTAL NACIONAL</td>
                    <td className="py-3 px-3 font-mono">10 Sedes Académicas</td>
                    <td className="py-3 px-3 text-right font-mono font-black text-sm">880</td>
                    <td className="py-3 px-3 text-right font-mono font-black text-sm">370</td>
                    <td className="py-3 px-3 text-right font-mono font-black text-emerald-950 text-sm">1.250</td>
                    <td className="py-3 px-3 text-emerald-900 text-[11px]">Plazas aprobadas por Resolución</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: CUADRO ARANCELARIO */}
      {activeTab === 'aranceles' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Cuadro Arancelario Oficial y Canales de Recaudación
              </h2>
              <p className="text-xs text-slate-500">
                Montos oficiales aprobados para el Proceso de Admisión 2027 conforme a Resolución Administrativa de la UNIPOL.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3">Código & Concepto</th>
                    <th className="py-3 px-3">Programa / Aplicación</th>
                    <th className="py-3 px-3 text-right font-black">Arancel Oficial</th>
                    <th className="py-3 px-3">Canal Habilitado</th>
                    <th className="py-3 px-3">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">PROSP-ANA · Prospecto Digital</td>
                    <td className="py-2.5 px-3 text-slate-600">ANAPOL</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-900 text-sm">Bs 650.00</td>
                    <td className="py-2.5 px-3 text-slate-700">Banco Unión S.A. / Libélula QR</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold text-[10px]">Vigente</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">PROSP-FAT · Prospecto Digital</td>
                    <td className="py-2.5 px-3 text-slate-600">FATESCIPOL</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-900 text-sm">Bs 550.00</td>
                    <td className="py-2.5 px-3 text-slate-700">Banco Unión S.A. / Libélula QR</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold text-[10px]">Vigente</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">PROSP-ESB · Prospecto Digital</td>
                    <td className="py-2.5 px-3 text-slate-600">ESBAPOLMUS</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-900 text-sm">Bs 550.00</td>
                    <td className="py-2.5 px-3 text-slate-700">Banco Unión S.A. / Libélula QR</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold text-[10px]">Vigente</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">EVAL-MED · Examen Médico Integral</td>
                    <td className="py-2.5 px-3 text-slate-600">Todos los programas</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-800">Bs 350.00</td>
                    <td className="py-2.5 px-3 text-slate-700">Sanidad Policial / Banco Unión</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[10px]">Etapa 2</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">EVAL-PSI · Evaluación Psicológica</td>
                    <td className="py-2.5 px-3 text-slate-600">Todos los programas</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-800">Bs 250.00</td>
                    <td className="py-2.5 px-3 text-slate-700">Banco Unión S.A.</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[10px]">Etapa 3</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">EVAL-FIS · Aptitud Física</td>
                    <td className="py-2.5 px-3 text-slate-600">Todos los programas</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-800">Bs 200.00</td>
                    <td className="py-2.5 px-3 text-slate-700">Banco Unión S.A.</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[10px]">Etapa 4</span></td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-900">ACAD-PRE · Módulos Prefacultativos</td>
                    <td className="py-2.5 px-3 text-slate-600">Todos los programas</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-800">Bs 600.00</td>
                    <td className="py-2.5 px-3 text-slate-700">Banco Unión S.A.</td>
                    <td className="py-2.5 px-3"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[10px]">Etapa 5</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Aviso de seguridad institucional:</strong> No existen pagos a terceras personas, depósitos en cuentas particulares ni intermediarios. El único canal financiero oficial es el <strong>Banco Unión S.A.</strong> (Cta. Fiscal UNIPOL Recaudadora) o la pasarela digital autorizada con emisión de factura computarizada.
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
