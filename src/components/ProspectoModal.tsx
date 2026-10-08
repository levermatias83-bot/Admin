import React, { useState } from 'react';
import { X, BookOpen, Award, CheckCircle, Shield, AlertTriangle, Users, Play, Volume2, FileText, ChevronRight } from 'lucide-react';
import { PHYSICAL_BAREMO_DATA, PROSPECTO_CARDS, ASSETS } from '../data/mockData';

interface ProspectoModalProps {
  sectionId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProspectoModal: React.FC<ProspectoModalProps> = ({
  sectionId,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'varones' | 'damas'>('varones');

  if (!isOpen || sectionId === null) return null;

  const card = PROSPECTO_CARDS.find((c) => c.id === sectionId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Top Header */}
        <div className="bg-[#143e2b] text-white p-4 flex items-center justify-between shrink-0 border-b border-emerald-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center font-mono shrink-0">
              {sectionId}
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
                SECCIÓN {sectionId} · {card?.category || 'PROSPECTO DIGITAL'}
              </span>
              <h3 className="font-bold text-sm sm:text-base leading-tight">
                {card?.title || 'Información Oficial'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="p-1 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-700 leading-relaxed">
          
          {/* Official Banner Image & Crest */}
          {card && card.image && (
            <div className="relative h-44 sm:h-52 w-full rounded-xl overflow-hidden shadow-xs border border-slate-200 bg-slate-900 shrink-0">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover opacity-85"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              
              {/* Crest Badge */}
              {card.crest && (
                <div className="absolute top-3 right-3 w-12 h-12 rounded-full bg-white/95 backdrop-blur-xs p-1 border border-amber-400/80 shadow-md flex items-center justify-center">
                  <img src={card.crest} alt="Escudo oficial" className="w-full h-full object-contain" />
                </div>
              )}

              {/* Title & Badge Overlay in Banner */}
              <div className="absolute bottom-3 left-3 right-16">
                {card.badge && (
                  <span className="inline-block px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-bold tracking-wider uppercase mb-1 shadow-xs">
                    {card.badge}
                  </span>
                )}
                <h4 className="text-white font-bold text-sm sm:text-base leading-snug drop-shadow-sm uppercase">
                  {card.title}
                </h4>
              </div>
            </div>
          )}

          {/* Historic Quote if available */}
          {card && card.quote && (
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200/80 text-xs italic text-slate-700 space-y-1">
              <p>&quot;{card.quote.text}&quot;</p>
              <span className="block font-bold not-italic text-right text-amber-900 pt-1">
                — {card.quote.author}
              </span>
            </div>
          )}

          {/* Full Description if available */}
          {card && card.fullDescription && (
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>{card.fullDescription}</p>
            </div>
          )}

          {/* Official Articles / Detailed Regulations */}
          {card && card.articles && card.articles.length > 0 && (
            <div className="space-y-3 pt-2">
              <h5 className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-1.5 border-b border-slate-200 pb-2">
                <FileText className="w-4 h-4 text-emerald-800" />
                <span>Artículos y Disposiciones Normativas:</span>
              </h5>
              <div className="space-y-2.5">
                {card.articles.map((art, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5"
                  >
                    <span className="font-bold text-xs text-emerald-950 block">
                      {art.title}
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {art.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Official Points / Details Bullet List */}
          {card && card.details && card.details.length > 0 && (
            <div className="space-y-2.5 pt-1">
              <h5 className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-1.5 border-b border-slate-200 pb-2">
                <Shield className="w-3.5 h-3.5 text-emerald-800" />
                <span>Puntos y Disposiciones Oficiales:</span>
              </h5>

              <div className="space-y-2">
                {card.details.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs flex items-start gap-2.5"
                  >
                    <span className="w-4 h-4 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold">
                      ✓
                    </span>
                    <span className="leading-relaxed text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* SECTION 1: NORMATIVA INSTITUCIONAL */}
          {sectionId === 1 && (
            <div className="space-y-4">
              <div className="text-center p-5 bg-[#fafbf9] rounded-2xl border border-slate-200 shadow-xs">
                <div className="w-24 h-24 mx-auto mb-3 p-1 rounded-full border-2 border-amber-400/80 shadow-md bg-white">
                  <img src={ASSETS.crest} alt="Escudo UNIPOL" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <h4 className="font-black text-xs text-amber-900 uppercase tracking-wider">
                  POLICÍA BOLIVIANA · DIRECCIÓN NACIONAL DE INSTRUCCIÓN Y ENSEÑANZA
                </h4>
                <p className="text-sm font-extrabold text-[#1b4332] mt-0.5 uppercase">
                  UNIVERSIDAD POLICIAL &quot;MCAL. ANTONIO JOSÉ DE SUCRE&quot;
                </p>

                <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-800 uppercase">
                  PROYECTO INSTITUCIONAL: REGLAMENTO DE ADMISIÓN A LAS UNIDADES ACADÉMICAS DE PREGRADO DE LA UNIVERSIDAD POLICIAL &quot;MCAL. ANTONIO JOSÉ DE SUCRE&quot; 2026
                </div>

                <div className="mt-3 p-4 bg-amber-50/70 rounded-xl text-xs italic text-slate-700 border border-amber-200/80 text-left leading-relaxed">
                  &quot;El General Sucre es el padre de Ayacucho; es el redentor de los hijos del Sol; es el que ha roto las cadenas con que envolvió Pizarro al Imperio de los Incas. La posteridad representará a Sucre con un pie en el Pichincha y el otro en el Potosí, llevando en sus manos la cuna de Manco Kapac y contemplando las cadenas del Perú, rotas por su espada&quot;.
                  <span className="block mt-1.5 font-bold not-italic text-right text-amber-950">— Simón Bolívar</span>
                </div>

                <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200 text-left text-[11px] text-slate-600 space-y-1">
                  <p className="font-bold text-slate-800">Dirección Nacional de Instrucción y Enseñanza</p>
                  <p>Universidad Policial &quot;Mcal. Antonio José de Sucre&quot; · Departamento Nacional de Planificación Educativa</p>
                  <p>Av. Iturralde Nº 1122 Miraflores · Teléfono: 591-2-2228291 · www.unipol.edu.bo</p>
                  <p className="font-mono text-emerald-800 font-bold">Abril del 2026 · La Paz — Bolivia</p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: PRESENTACIÓN INSTITUCIONAL */}
          {sectionId === 2 && (
            <div className="space-y-4">
              <div className="p-3 bg-[#163e2c] text-white rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-amber-300 uppercase block">Presentación institucional</span>
                  <h4 className="text-xs sm:text-sm font-bold">
                    Facultad Técnica Superior en Ciencias Policiales (FATESCIPOL) - Mensajes institucionales
                  </h4>
                </div>
              </div>

              <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                CONTENIDO AUDIOVISUAL INSTITUCIONAL · Tres mensajes institucionales de apertura
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Video 1 */}
                <div className="bg-slate-900 text-white rounded-xl overflow-hidden border border-slate-800 flex flex-col justify-between">
                  <div className="p-3 bg-gradient-to-t from-slate-950 to-slate-900">
                    <span className="text-[10px] font-bold text-amber-400 block">POLICÍA BOLIVIANA</span>
                    <h5 className="text-xs font-bold mt-0.5 line-clamp-2">
                      01 Mensaje del Señor Comandante General de la Policía Boliviana
                    </h5>
                  </div>
                  <div className="aspect-video bg-black relative">
                    <iframe
                      src="https://drive.google.com/file/d/1sbW1ymQ-XV2lzJO0r2ExLwhTycQuyJkb/preview"
                      title="Mensaje del Comandante General"
                      className="w-full h-full border-0"
                      allow="autoplay; fullscreen"
                      allowFullScreen
                    />
                  </div>
                </div>

                {/* Video 2 */}
                <div className="bg-slate-900 text-white rounded-xl overflow-hidden border border-slate-800 flex flex-col justify-between">
                  <div className="p-3 bg-gradient-to-t from-slate-950 to-slate-900">
                    <span className="text-[10px] font-bold text-amber-400 block">UNIPOL</span>
                    <h5 className="text-xs font-bold mt-0.5 line-clamp-2">
                      02 Mensaje del Señor Rector de la UNIPOL
                    </h5>
                  </div>
                  <div className="aspect-video bg-black relative">
                    <iframe
                      src="https://drive.google.com/file/d/1whOVWsFeAqNU_9DSumhl6q0NGdh7EJvr/preview"
                      title="Mensaje del Rector de la UNIPOL"
                      className="w-full h-full border-0"
                      allow="autoplay; fullscreen"
                      allowFullScreen
                    />
                  </div>
                </div>

                {/* Video 3 */}
                <div className="bg-slate-900 text-white rounded-xl overflow-hidden border border-slate-800 flex flex-col justify-between">
                  <div className="p-3 bg-gradient-to-t from-slate-950 to-slate-900">
                    <span className="text-[10px] font-bold text-amber-400 block">FATESCIPOL MENSAJE DE LA UNIDAD</span>
                    <h5 className="text-xs font-bold mt-0.5 line-clamp-2">
                      03 Mensaje del Señor Director de la FATESCIPOL
                    </h5>
                  </div>
                  <div className="aspect-video bg-black relative">
                    <iframe
                      src="https://drive.google.com/file/d/1XL9-xPq7_nkSQEz7yUsMr3i6GhIgXopc/preview"
                      title="Mensaje del Director de FATESCIPOL"
                      className="w-full h-full border-0"
                      allow="autoplay; fullscreen"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: QUÉ ES Y QUIÉN PUEDE POSTULAR */}
          {sectionId === 3 && (
            <div className="space-y-6">
              {/* Top video embed matching Screenshot 21 */}
              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-slate-900 text-white">
                <div className="p-3 bg-[#163e2c] border-b border-emerald-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-amber-300 uppercase block">LA ESCUELA EN VIDEO</span>
                    <h4 className="text-xs sm:text-sm font-bold">FATESCIPOL</h4>
                  </div>
                </div>
                <div className="aspect-video bg-black">
                  <iframe
                    src="https://drive.google.com/file/d/1sbW1ymQ-XV2lzJO0r2ExLwhTycQuyJkb/preview"
                    title="FATESCIPOL - La Escuela en Video"
                    className="w-full h-full border-0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Title Header matching Screenshot 21 */}
              <div className="p-4 bg-[#fbfcfb] rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                  FORMACIÓN POLICIAL INTEGRAL
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  Perfil de Ingreso y de Egreso
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Preparación humanística, científica, tecnológica y física para formar sargentos de policía con liderazgo, disciplina, integridad y vocación de servicio.
                </p>
              </div>

              {/* 01 Perfil de Ingreso matching Screenshot 30 */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#1b4332] text-white text-[11px] font-bold font-mono">
                    01
                  </span>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      SEÑORITAS Y JÓVENES BOLIVIANOS
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">Perfil de Ingreso</h4>
                  </div>
                </div>

                <div className="p-3.5 bg-[#1b4332] text-white rounded-xl shadow-xs space-y-1">
                  <h5 className="font-bold text-amber-300 text-xs">
                    Una formación preparada para los retos del servicio
                  </h5>
                  <p className="text-[11px] text-emerald-100 leading-relaxed">
                    Señoritas y jóvenes bolivianos deben asumir una preparación integral conscientes de las exigencias y retos que deberán afrontar durante su formación profesional. Esta preparación responde a las responsabilidades que conlleva ser Sargento de Policía, con el grado académico de Técnico Superior en Ciencias Policiales.
                  </p>
                </div>

                {/* The 9 Cuadros of Perfil de Ingreso matching Screenshot 29 & 30 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  {[
                    {
                      num: '01',
                      title: 'Educación Humanística',
                      desc: 'Parte de la concepción de la persona humana como sujeto y agente dotado de conciencia, libre y racional. Considera que la educación es un proceso intencional que implica la comprensión, afirmación y transformación del mundo y del propio sujeto.',
                    },
                    {
                      num: '02',
                      title: 'Educación Técnica - Tecnológica',
                      desc: 'Desarrolla habilidades, competencias y capacidades para desempeñarse de forma adecuada ante las exigencias de la función policial y el constante avance tecnológico.',
                    },
                    {
                      num: '03',
                      title: 'Formación Integral',
                      desc: 'Comprende el desarrollo de capacidades, valores y habilidades que favorecen la trayectoria académica. Es un proceso continuo, permanente y participativo que busca la realización plena del estudiante y lo prepara para enfrentar con éxito los problemas existentes en la sociedad.',
                    },
                    {
                      num: '04',
                      title: 'Formación Científica',
                      desc: 'Promueve una cultura investigativa y un pensamiento crítico y autónomo, permitiendo que los estudiantes y futuros profesionales accedan al desarrollo y producción del conocimiento.',
                    },
                    {
                      num: '05',
                      title: 'Formación Espiritual',
                      desc: 'Fortalece los valores que permiten a los estudiantes convertirse en líderes con compromiso social, vocación de servicio e integridad.',
                    },
                    {
                      num: '06',
                      title: 'Ética',
                      desc: 'Se refiere al conjunto de valores y principios morales que orientan el comportamiento humano, la toma de decisiones y la convivencia responsable dentro de la sociedad.',
                    },
                    {
                      num: '07',
                      title: 'Moral',
                      desc: 'Comprende los valores, costumbres y tradiciones de nuestra sociedad, los cuales guían una conducta respetuosa, responsable y coherente con la función policial.',
                    },
                    {
                      num: '08',
                      title: 'Formación Artística y Cultural',
                      desc: 'Desarrolla capacidades, competencias y destrezas artísticas, articulando la teoría y la práctica para fortalecer las expresiones culturales y estimular las cualidades creativas.',
                    },
                    {
                      num: '09',
                      title: 'Formación Deportiva',
                      desc: 'Incluye el aprendizaje, la fundamentación, el perfeccionamiento y la especialización en uno o varios deportes, fortaleciendo la formación integral de las personas y deportistas.',
                    },
                  ].map((item) => (
                    <div key={item.num} className="p-3 bg-[#fafbf9] border border-slate-200 rounded-xl space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded bg-emerald-800 text-white text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                          {item.num}
                        </span>
                        <span className="font-bold text-[#143e2b] text-[11px]">{item.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed pl-6.5">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 02 Perfil de Egreso matching Screenshot 28 & 29 */}
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#1b4332] text-white text-[11px] font-bold font-mono">
                    02
                  </span>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      SARGENTO DE LA POLICÍA BOLIVIANA
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">Perfil de Egreso</h4>
                  </div>
                </div>

                <div className="p-3.5 bg-[#1b4332] text-white rounded-xl shadow-xs space-y-1">
                  <h5 className="font-bold text-amber-300 text-xs">
                    Liderazgo al servicio de la misión institucional
                  </h5>
                  <p className="text-[11px] text-emerald-100 leading-relaxed">
                    Luego de dos años de formación profesional, el Sargento de la Policía Boliviana y Técnico Superior en Ciencias Policiales egresa preparado para liderar y conducir al personal subalterno en beneficio de la misión constitucional. Posee capacidad para delegar, trabajar en equipo y manejar conflictos; conocimientos técnico-científicos y tecnológicos policiales; condición física, habilidades comunicativas y preparación para formar e instruir al personal subalterno.
                  </p>
                </div>

                {/* The 9 Cuadros of Perfil de Egreso matching Screenshot 28 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  {[
                    {
                      num: '01',
                      title: 'Dinamismo e Iniciativa',
                      desc: 'Comportamiento activo, motivado por las manifestaciones de interés y orientado a responder oportunamente ante las situaciones propias del servicio policial.',
                    },
                    {
                      num: '02',
                      title: 'Integridad',
                      desc: 'Fortalecimiento de la autoestima, fundamentada en un sistema sólido de virtudes y valores éticos y morales que orientan la conducta profesional.',
                    },
                    {
                      num: '03',
                      title: 'Estabilidad emocional',
                      desc: 'Capacidad para controlar los sentimientos y las emociones, manteniendo serenidad, equilibrio y responsabilidad durante el cumplimiento de sus funciones.',
                    },
                    {
                      num: '04',
                      title: 'Sensibilidad social',
                      desc: 'Actitud receptiva, respetuosa y responsable frente a las necesidades, características y realidades de los diferentes grupos sociales.',
                    },
                    {
                      num: '05',
                      title: 'Compromiso institucional',
                      desc: 'Involucramiento dentro de las políticas institucionales y orientación permanente del trabajo hacia la consolidación de los objetivos y metas propuestas.',
                    },
                    {
                      num: '06',
                      title: 'Liderazgo',
                      desc: 'Capacidad para orientar y dirigir equipos de trabajo y grupos sociales, alcanzar objetivos comunes, tomar decisiones acertadas y generar impacto positivo en los procesos propios del servicio de policía.',
                    },
                    {
                      num: '07',
                      title: 'Trabajo en equipo',
                      desc: 'Capacidad de construir colectivamente, coordinar responsabilidades y sumar esfuerzos para alcanzar un objetivo común en torno a la misión institucional.',
                    },
                    {
                      num: '08',
                      title: 'Efectividad en el servicio',
                      desc: 'Capacidad para orientar el desempeño al logro de resultados, superar los estándares establecidos y cumplir de manera responsable las metas propuestas.',
                    },
                    {
                      num: '09',
                      title: 'Adaptabilidad',
                      desc: 'Capacidad para desempeñarse de manera flexible en contextos culturales, sociales y laborales diversos, de acuerdo con las necesidades y requerimientos del servicio.',
                    },
                  ].map((item) => (
                    <div key={item.num} className="p-3 bg-[#fafbf9] border border-slate-200 rounded-xl space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded bg-emerald-800 text-white text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                          {item.num}
                        </span>
                        <span className="font-bold text-[#143e2b] text-[11px]">{item.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed pl-6.5">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* REQUISITOS DE INSCRIPCIÓN · FATESCIPOL (Artículo 45) matching Screenshots 25, 26, 27 */}
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <div className="p-3 bg-[#1b4332] text-white rounded-xl">
                  <span className="text-[10px] font-bold text-amber-300 uppercase block tracking-wider">
                    FACULTAD TÉCNICA SUPERIOR EN CIENCIAS POLICIALES · FORMACIÓN PROFESIONAL POLICIAL
                  </span>
                  <h4 className="font-black text-sm text-white">
                    Requisitos de inscripción · FATESCIPOL
                  </h4>
                  <span className="text-[11px] text-emerald-200 block">
                    Artículo 45 del Reglamento de Admisión 2026
                  </span>
                </div>

                {/* The 17 Cuadros lettered a to q */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { letter: 'a', title: 'Ser boliviana o boliviano de nacimiento.' },
                    { letter: 'b', title: 'Presentar Cédula de Identidad original vigente, además de una fotocopia a color con la firma de la o el postulante.' },
                    { letter: 'c', title: 'Certificado de Nacimiento original, que acredite que al momento de la inscripción la o el postulante cuenta con la edad entre los diecisiete (17) y veintidós (22) años cumplidos hasta el 31 de diciembre de la gestión en la que se lleve a cabo el Proceso de Admisión.' },
                    { letter: 'd', title: 'Certificado de No Militancia Política.' },
                    { letter: 'e', title: 'Certificado de Soltería (no contar con vínculo matrimonial o unión libre).' },
                    { letter: 'f', title: 'Presentar fotocopia legalizada y original del diploma de bachiller, para fines de verificación. En caso de no contar con el diploma de bachiller, la o el postulante podrá presentar el certificado de notas emitido por la Dirección Departamental de Educación. Excepcionalmente se podrá presentar el certificado de estudiante regular del nivel de sexto de secundaria, emitido por la Unidad Educativa correspondiente, condicionándose la incorporación a la Unidad Académica de Pregrado con la presentación obligatoria del diploma de bachiller.' },
                    { letter: 'g', title: 'Certificado de Registro Judicial de Antecedentes Penales, SIN ANTECEDENTES, para la o el postulante.' },
                    { letter: 'h', title: 'Certificado de Antecedentes de No Violencia en Razón de Género, SIN ANTECEDENTES, para la o el postulante.' },
                    { letter: 'i', title: 'Certificado de Antecedentes Policiales (FELCC, FELCN, TRÁNSITO), SIN ANTECEDENTES, para la o el postulante.' },
                    { letter: 'j', title: 'Certificados de NO haber sido dado de baja por faltas disciplinarias de cualquier Unidad Académica de Pregrado de la Universidad Policial y de los Institutos Militares (Ejército, Fuerza Aérea y Armada Boliviana).' },
                    { letter: 'k', title: 'Compromiso Notariado de autorización expresa y consentimiento de la o el postulante para someterse a las evaluaciones y al Programa Académico Prefacultativo, así como a todas las disposiciones legales y reglamentarias aplicables, incluyendo el consentimiento informado para el uso de sus datos personales.' },
                    { letter: 'l', title: 'Compromiso Notariado de cumplimiento del Reglamento de Admisión a las Unidades Académicas de Pregrado de la Universidad Policial "Mcal. Antonio José de Sucre", que incluirá una Cláusula de Integridad y Transparencia por la cual la o el postulante se compromete a someterse al Proceso de Admisión con estricta sujeción a los principios de honestidad, transparencia y mérito personal; a no valerse de gestiones, contactos, intermediaciones, ofrecimientos ni dádivas de ninguna naturaleza para obtener ventaja en cualquiera de sus fases o etapas; a denunciar ante la Comisión Nacional todo ofrecimiento o requerimiento en ese sentido; y a reconocer que la inobservancia de este compromiso constituye causal de separación del Proceso de Admisión, sin perjuicio de las acciones legales que correspondan. Además, para las y los Postulantes a la FATESCIPOL, el consentimiento para ser asignado a cualquier Unidad Académica de Pregrado del territorio nacional.' },
                    { letter: 'm', title: 'Cuatro (4) fotografías a color (sin editar), de frente, tamaño 4x4 y una (1) tamaño postal de cuerpo entero; todas con traje formal y fondo blanco, en físico y en formato digital (CD).' },
                    { letter: 'n', title: 'Original y fotocopia de la Boleta de Depósito Bancario para el Prospecto de Admisión o transferencia electrónica.' },
                    { letter: 'o', title: 'Contar con domicilio virtual (número de WhatsApp y correo electrónico activo), que será proporcionado por la o el postulante al momento de su inscripción y será utilizado para recibir notificaciones durante el Proceso de Admisión hasta su conclusión.' },
                    { letter: 'p', title: 'Certificado de Registro Judicial de Antecedentes Penales del padre y de la madre o, en su caso, del tutor legal. En caso de fallecimiento o ausencia se adjuntará la documentación que lo acredite. (no excluyente).' },
                    { letter: 'q', title: 'Otras, establecidas de acuerdo a necesidad y expresamente aprobadas por la Comisión Nacional del Proceso de Admisión.' },
                  ].map((req) => (
                    <div key={req.letter} className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#1b4332] text-white font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {req.letter}
                      </div>
                      <p className="text-[11px] text-slate-700 leading-relaxed">{req.title}</p>
                    </div>
                  ))}
                </div>

                {/* Footnotes II, III, IV matching Screenshot 25 */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-[10px] text-slate-600 space-y-1.5 leading-relaxed">
                  <p><strong>II.</strong> Las y los postulantes que tengan diecisiete (17) años de edad y cumplan los demás requisitos exigidos para la inscripción deberán, además, adjuntar una Declaración Jurada debidamente notariada, mediante la cual el padre, madre o tutor autorice su postulación a la Unidad Académica de Pregrado, asumiendo la responsabilidad correspondiente hasta que el postulante alcance la mayoría de edad.</p>
                  <p><strong>III.</strong> Las y los postulantes que soliciten una beca deberán presentar, adicionalmente y dentro del plazo establecido, la documentación específica exigida por el Reglamento de Becas para el tipo de beca al que postulan. La solicitud de beca no sustituye ni exime del cumplimiento de los requisitos establecidos en el parágrafo I del presente artículo.</p>
                  <p><strong>IV.</strong> La documentación requerida deberá presentarse en un folder rotulado, debidamente ordenada y con separadores plásticos transparentes individuales, cuando así se disponga.</p>
                  <span className="block text-[11px] font-mono text-emerald-800 font-semibold pt-1">
                    Esta lista corresponde exclusivamente al prospecto de FATESCIPOL
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: EVALUACIONES Y TABLA BAREMO FÍSICO */}
          {sectionId === 5 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Tabla Oficial de Baremos · Aptitud Física
                  </h4>
                  <p className="text-xs text-slate-500">
                    Marcas ponderadas oficiales según prueba, sexo y puntaje
                  </p>
                </div>
              </div>

              {/* Exact Table from Screenshot 24 */}
              <div className="border border-slate-300 rounded-xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#2c4c36] text-white font-bold text-[10px] uppercase tracking-wider">
                      <th className="py-2.5 px-3">PRUEBA</th>
                      <th className="py-2.5 px-3">CATEGORÍA</th>
                      <th className="py-2.5 px-3 text-emerald-200 font-mono">100 PUNTOS</th>
                      <th className="py-2.5 px-3 text-amber-200 font-mono">51 PUNTOS</th>
                      <th className="py-2.5 px-3 text-amber-100 font-mono">MARCA MÍNIMA REGISTRABLE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white text-[11px]">
                    {[
                      { prueba: 'Velocidad 100 m', cat: 'Varones', p100: '12,00 seg', p51: '15,00 seg', min: '20,00 seg (1 punto)', highlight: false },
                      { prueba: 'Velocidad 100 m', cat: 'Damas', p100: '15,40 seg', p51: '18,30 seg', min: '23,30 seg (1 punto)', highlight: false },
                      { prueba: 'Dominadas', cat: 'Varones', p100: '17 repeticiones', p51: '6 repeticiones', min: '0 rep. (1 punto)', highlight: false },
                      { prueba: 'Dominadas', cat: 'Damas', p100: '4 repeticiones', p51: '2 repeticiones', min: '0 rep. (1 punto)', highlight: true },
                      { prueba: 'Abdominales 1 min', cat: 'Varones', p100: '60 repeticiones', p51: '39 repeticiones', min: '1 rep. (6 puntos)', highlight: false },
                      { prueba: 'Abdominales 1 min', cat: 'Damas', p100: '52 repeticiones', p51: '34 repeticiones', min: '1 rep. (6 puntos)', highlight: false },
                      { prueba: 'Natación 50 m crol', cat: 'Varones', p100: '—', p51: 'Hasta 1 min 00 seg: APTO', min: 'Más de 1 min 00 seg: NO APTO', highlight: false },
                      { prueba: 'Natación 50 m crol', cat: 'Damas', p100: '—', p51: 'Hasta 1 min 10 seg: APTO', min: 'Más de 1 min 10 seg: NO APTO', highlight: false },
                      { prueba: 'Resistencia 2 millas (3.218,69 m)', cat: 'Varones', p100: '11 min 57 seg', p51: '14 min 24 seg', min: '16 min 54 seg (1 punto)', highlight: false },
                      { prueba: 'Resistencia 2 millas (3.218,69 m)', cat: 'Damas', p100: '13 min 41 seg', p51: '16 min 57 seg', min: '20 min 17 seg (1 punto)', highlight: false },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-2.5 px-3 font-semibold text-slate-900">{row.prueba}</td>
                        <td className="py-2.5 px-3 text-slate-600 font-medium">{row.cat}</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-emerald-800">{row.p100}</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-amber-800">{row.p51}</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-slate-700">
                          {row.highlight ? (
                            <span className="inline-block px-2 py-0.5 rounded-full border-2 border-emerald-500 bg-emerald-50 text-emerald-900 font-bold">
                              {row.min}
                            </span>
                          ) : (
                            row.min
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                <span className="font-bold block mb-0.5">Nota importante sobre el Baremo:</span>
                Los postulantes deben alcanzar al menos la marca mínima en cada una de las pruebas para ser calificados como APTOS y promediar la nota en el orden de prelación.
              </div>
            </div>
          )}

          {/* SECTION 4: FASES DEL PROCESO */}
          {sectionId === 4 && (
            <div className="space-y-4">
              <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                Secuencia Cronológica de las 6 Etapas Eliminatorias
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { num: '01', title: 'Prospecto y Expediente Digital', desc: 'Registro, carga biométrica y validación de 16 requisitos documentales.' },
                  { num: '02', title: 'Evaluación Médica Integral', desc: 'Exámenes clínicos, laboratorio, radiografías y control toxicológico.' },
                  { num: '03', title: 'Evaluación Psicológica', desc: 'Batería psicométrica estandarizada y entrevista clínica individual.' },
                  { num: '04', title: 'Aptitud Física', desc: 'Pruebas de velocidad, fuerza en barra, abdominales, natación y 2 millas.' },
                  { num: '05', title: 'Programa Prefacultativo', desc: 'Capacitación presencial/virtual y exámenes ponderados de doctrina y leyes.' },
                  { num: '06', title: 'Cuadro de Honor e Incorporación', desc: 'Asignación de plazas por estricto orden de notas y alta definitiva.' },
                ].map((stage, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg bg-emerald-800 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {stage.num}
                    </span>
                    <div>
                      <span className="font-bold text-xs text-slate-900 block">{stage.title}</span>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{stage.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 6: PLAZAS Y BECAS */}
          {sectionId === 6 && (
            <div className="space-y-4">
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-1">
                <span className="font-bold text-emerald-950 block">Distribución de Plazas por Sedes Departamentales</span>
                <p className="text-emerald-900 leading-relaxed">
                  Las plazas se asignan conforme a la capacidad instalada de internado y las necesidades de seguridad ciudadana en los 9 departamentos del país:
                </p>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 text-center text-xs">
                {['La Paz (El Alto)', 'Cochabamba', 'Santa Cruz', 'Chuquisaca', 'Oruro', 'Potosí', 'Tarija', 'Beni (Trinidad)', 'Pando (Cobija)'].map((dept, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="font-bold text-slate-800 block text-[11px]">{dept}</span>
                    <span className="text-[10px] text-emerald-700 font-medium">Sede Habilitada</span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
                <span className="font-bold block">Régimen Especial de Becas:</span>
                <p className="leading-relaxed">
                  Se reconocen becas completas de estudio para los primeros lugares del Examen Prefacultativo (Excelencia Académica) y deportistas de élite con representación nacional comprobada ante el Viceministerio de Deportes.
                </p>
              </div>
            </div>
          )}

          {/* SECTION 7: COSTOS Y DISPOSICIONES ECONÓMICAS */}
          {sectionId === 7 && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex justify-between items-center">
                <div>
                  <span className="font-bold text-emerald-900 block text-sm">Prospecto Digital de Admisión</span>
                  <span className="text-xs text-slate-600">Incluye formulario, expediente en línea y material digital de estudio</span>
                </div>
                <span className="text-lg font-black text-emerald-800 font-mono">Bs. 500,00</span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                <span className="font-bold text-slate-900 block uppercase">Canales de Recaudación Autorizados:</span>
                <ul className="space-y-1.5 text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>Banco Unión S.A.:</strong> Cuentas fiscales recaudadoras oficiales a nivel nacional.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>Pasarela QR Simple:</strong> Pago instantáneo interbancario desde cualquier aplicación móvil bancaria.</span>
                  </li>
                </ul>
              </div>

              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-900 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong>Política Cero Efectivo:</strong> Ningún funcionario policial, instructor o particular está facultado para recibir dinero en efectivo. Denuncie cobros irregulares ante la Dirección Nacional de Transparencia.
                </span>
              </div>
            </div>
          )}

          {/* SECTION 8: CAUSALES DE SEPARACIÓN */}
          {sectionId === 8 && (
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-900 space-y-2">
                <span className="font-bold block text-sm flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  Régimen Disciplinario e Inhabilitación Inmediata
                </span>
                <p className="leading-relaxed">
                  Constituyen causales de separación sumaria, irrevocable e inapelable del proceso de admisión, con remisión ante el Ministerio Público:
                </p>
                <div className="space-y-1.5 pt-1">
                  {[
                    'Falsedad material o ideológica en certificados de bachiller, nacimiento, REJAP, SIPPASE o médicos.',
                    'Intento de soborno, entrega de dádivas o intermediación política ante el personal evaluador.',
                    'Suplantación de identidad en cualquier examen médico, físico, psicológico o prefacultativo.',
                    'Consumo, posesión o presencia de sustancias controladas, drogas o alcohol en exámenes toxicológicos.',
                    'Inasistencia injustificada o impuntualidad mayor a diez minutos a cualquier llamado oficial.',
                  ].map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-white/70 p-2 rounded border border-red-200">
                      <span className="text-red-700 font-bold shrink-0">✕</span>
                      <span className="text-slate-800">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SECTION 9: FORMACIÓN ACADÉMICA */}
          {sectionId === 9 && (
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 font-medium leading-relaxed">
                El plan curricular técnico-policial de 2 años (FATESCIPOL) y 4 años (ANAPOL) equilibra cuatro áreas formativas articuladas bajo el Sistema Educativo Plurinacional:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="font-bold text-emerald-800 block text-[11px] mb-1">1. Área Jurídica y Normativa</span>
                  <p className="text-slate-600 leading-relaxed">Derecho Constitucional, Penal, Procesal Penal, Ley Orgánica Policial, Ley 348 y Derechos Humanos.</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="font-bold text-emerald-800 block text-[11px] mb-1">2. Área Táctica y Operativa</span>
                  <p className="text-slate-600 leading-relaxed">Patrullaje urbano, técnicas de intervención, uso diferenciado de la fuerza, tiro policial y defensa personal.</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="font-bold text-emerald-800 block text-[11px] mb-1">3. Área Criminalística y Científica</span>
                  <p className="text-slate-600 leading-relaxed">Preservación del lugar del hecho, fotografía forense, dactiloscopía, investigación de accidentes y primeros auxilios.</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="font-bold text-emerald-800 block text-[11px] mb-1">4. Área Humanística y Lenguas</span>
                  <p className="text-slate-600 leading-relaxed">Policía comunitaria, deontología policial, psicología social y aprendizaje obligatorio de idioma originario.</p>
                </div>
              </div>

              <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-xs flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-900 block">Titulación al Egreso:</span>
                  <span className="text-slate-600">Técnico Superior en Ciencias Policiales en Provisión Nacional</span>
                </div>
                <span className="px-2.5 py-1 bg-[#1b4332] text-white font-bold rounded-lg text-xs">
                  Sargento Segundo
                </span>
              </div>
            </div>
          )}

          {/* SECTION 10: VIDA INSTITUCIONAL */}
          {sectionId === 10 && (
            <div className="space-y-4">
              <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
                Rutina Diaria del Régimen de Internado Policial
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { hour: '05:00', task: 'Toque de Diana militar y arreglo riguroso de cuadras y dormitorios.' },
                  { hour: '05:30', task: 'Calistenia matutina, trote doctrinario y acondicionamiento físico.' },
                  { hour: '07:00', task: 'Desayuno de rancho institucional.' },
                  { hour: '07:45', task: 'Formación solemne en el Patio de Honor e izamiento de la bandera tricolor.' },
                  { hour: '08:00 - 12:30', task: 'Cátedra académica teórica en aulas universitarias y laboratorios.' },
                  { hour: '12:45', task: 'Almuerzo de rancho y descanso reglamentario.' },
                  { hour: '14:00 - 18:00', task: 'Instrucción táctica de campo, tiro policial, defensa personal y deportes.' },
                  { hour: '18:30', task: 'Arriamiento solemne de pabellones patrios y honores al pabellón nacional.' },
                  { hour: '20:00 - 21:30', task: 'Estudio obligatorio nocturno y repaso de materias.' },
                  { hour: '22:00', task: 'Lista de retreta y toque de silencio.' },
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-3">
                    <span className="font-mono font-bold text-emerald-800 text-[11px] w-24 shrink-0">
                      {item.hour}
                    </span>
                    <span className="text-slate-700">{item.task}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 11: IDENTIDAD INSTITUCIONAL */}
          {sectionId === 11 && (
            <div className="space-y-4">
              <div className="text-center p-4 bg-emerald-900 text-white rounded-xl shadow-md border border-emerald-800">
                <div className="w-16 h-16 mx-auto mb-2 p-1 bg-white/10 rounded-full border border-amber-400">
                  <img src={ASSETS.crest} alt="Escudo Policía" className="w-full h-full object-contain" />
                </div>
                <h4 className="font-black text-amber-300 text-xs uppercase tracking-wider">
                  «200 AÑOS DE HISTORIA, VOCACIÓN Y SERVICIO A LA PATRIA»
                </h4>
                <p className="text-xs text-emerald-100 font-semibold mt-1">
                  1826 — 2026 · Bicentenario de la Policía Boliviana
                </p>
                <div className="mt-3 p-2.5 bg-white/10 rounded-lg text-amber-200 font-bold text-xs uppercase tracking-wide">
                  Lema: «Contra el mal por la justicia y la ley»
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="font-bold text-emerald-800 block text-[11px] mb-1">Estrella de 8 Puntas</span>
                  <p className="text-slate-600">Simboliza la luz perenne de la ley, la guía moral y la vigilia permanente sobre el pueblo boliviano.</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="font-bold text-emerald-800 block text-[11px] mb-1">Fusiles Remington Cruzados</span>
                  <p className="text-slate-600">Representan la fuerza legal legítima del Estado para resguardar la soberanía interna y la Constitución.</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="font-bold text-emerald-800 block text-[11px] mb-1">Ramas de Laurel y Olivo</span>
                  <p className="text-slate-600">Simbolizan el triunfo pacífico del orden, la reconciliación social y la defensa de la justicia.</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span className="text-[11px] font-mono">UNIPOL ADMISIÓN 2027</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1b4332] text-white rounded-lg font-bold hover:bg-[#143527] transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
