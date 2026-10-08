import { UserProfile, DocumentItem, PhysicalBaremo, ProspectoCard } from '../types';

import logoUnipol from '../assets/official/logo-unipol.png';
import heroPoliceBanner from '../assets/official/portada-admision@2x.jpg';
import cadetsAnapol from '../assets/official/programa-anapol@2x.jpg';
import fatescipolCadets from '../assets/official/programa-fatescipol@2x.jpg';
import esbapolmusCadets from '../assets/official/esbapolmus-unidad.png';
import escudoAnapol from '../assets/official/escudo-anapol.png';
import escudoFatescipol from '../assets/official/escudo-fatescipol.png';
import escudoEsbapolmus from '../assets/official/escudo-esbapolmus.png';

export const ASSETS = {
  heroBanner: heroPoliceBanner,
  anapol: cadetsAnapol,
  fatescipol: fatescipolCadets,
  esbapolmus: esbapolmusCadets,
  crest: logoUnipol,
  logoUnipol,
  escudoAnapol,
  escudoFatescipol,
  escudoEsbapolmus,
};

export const INITIAL_USER: UserProfile = {
  id: 'usr-95806866',
  fullName: 'POSTULANTE EJEMPLAR DE ADMISIÓN',
  ci: '10928374',
  ciExp: 'CB',
  complemento: '',
  email: 'postulante.unipol@admisiones.bo',
  phone: '77981234',
  city: 'Cochabamba',
  birthDate: '2005-04-15',
  unit: 'FATESCIPOL',
  sede: 'SEDE COCHABAMBA',
  postulationCode: '2027-000072-FAT',
  purchasedDate: '07 de octubre de 2026',
};

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-ci',
    letter: 'b',
    stepNumber: 1,
    title: 'Cédula de Identidad original vigente (anverso y reverso)',
    description: 'Presentar Cédula de Identidad original vigente, además de una fotocopia a color con la firma de la o el postulante.',
    status: 'APROBADO',
    fileName: 'cedula_identidad_vigente.pdf',
    uploadedAt: '07/10/2026 14:15',
  },
  {
    id: 'doc-nacimiento-cert',
    letter: 'c',
    stepNumber: 2,
    title: 'Certificado de Nacimiento original',
    description: 'Certificado de Nacimiento original, que acredite que al momento de la inscripción la o el postulante cuenta con la edad entre los diecisiete (17) y veintidós (22) años cumplidos hasta el 31 de diciembre de la gestión en la que se lleve a cabo el Proceso de Admisión.',
    status: 'PENDIENTE',
    observationNote: 'Se entrega en original en la unidad de admisiones. Aquí puedes subir un respaldo digital opcional. Formatos: pdf, jpg, jpeg, png. Máximo 5 MB por archivo. Conserva el original: debes presentarlo en la unidad de admisiones.',
  },
  {
    id: 'doc-militancia',
    letter: 'd',
    stepNumber: 3,
    title: 'Certificado de No Militancia Política',
    description: 'Certificado de No Militancia Política emitido por el Tribunal Supremo Electoral (Órgano Electoral Plurinacional).',
    status: 'NO_SUBIDO',
  },
  {
    id: 'doc-solteria',
    letter: 'e',
    stepNumber: 4,
    title: 'Certificado de Soltería',
    description: 'Certificado de Soltería (no contar con vínculo matrimonial o unión libre) emitido por el Servicio de Registro Cívico (SERECÍ).',
    status: 'NO_SUBIDO',
  },
  {
    id: 'doc-bachiller',
    letter: 'f',
    stepNumber: 5,
    title: 'Acreditación de bachillerato',
    description: 'Presentar fotocopia legalizada y original del diploma de bachiller para fines de verificación. En caso de no contar con el diploma, presentar certificado de notas o certificado de estudiante regular de 6to de secundaria.',
    status: 'NO_SUBIDO',
  },
  {
    id: 'doc-libreta-militar',
    letter: '',
    stepNumber: 6,
    title: 'Servicio de libreta militar',
    description: 'Para postulantes varones: fotocopia y original de la libreta de servicio militar o constancia oficial correspondiente.',
    status: 'NO_SUBIDO',
  },
  {
    id: 'doc-rejap',
    letter: 'g',
    stepNumber: 7,
    title: 'Registro Judicial de Antecedentes Penales — SIN ANTECEDENTES',
    description: 'Certificado de Registro Judicial de Antecedentes Penales (REJAP) del postulante, sin registros.',
    status: 'NO_SUBIDO',
  },
  {
    id: 'doc-sippase',
    letter: 'h',
    stepNumber: 8,
    title: 'Antecedentes de No Violencia en Razón de Género — SIN ANTECEDENTES',
    description: 'Certificado de Antecedentes de No Violencia en Razón de Género (SIPPASE) emitido por el Ministerio de Justicia.',
    status: 'NO_SUBIDO',
  },
  {
    id: 'doc-policiales',
    letter: 'i',
    stepNumber: 9,
    title: 'Antecedentes Policiales — SIN ANTECEDENTES',
    description: 'Certificados de antecedentes policiales de la FELCC, FELCN y Dirección Departamental de Tránsito.',
    status: 'NO_SUBIDO',
  },
  {
    id: 'doc-disciplinario',
    letter: 'j',
    stepNumber: 10,
    title: 'Certificados de no haber sido dado de baja por faltas disciplinarias',
    description: 'Certificados de NO haber sido dado de baja por faltas disciplinarias de cualquier Unidad Académica de Pregrado de la Universidad Policial y de los Institutos Militares (Ejército, Fuerza Aérea y Armada Boliviana).',
    status: 'NO_SUBIDO',
  },
  {
    id: 'doc-compromiso-eval',
    letter: 'k',
    stepNumber: 11,
    title: 'Compromiso Notariado de sometimiento a evaluaciones y Prefacultativo',
    description: 'Compromiso Notariado de autorización expresa y consentimiento de la o el postulante para someterse a las evaluaciones y al Programa Académico Prefacultativo, así como a todas las disposiciones legales y reglamentarias aplicables.',
    status: 'NO_SUBIDO',
  },
  {
    id: 'doc-compromiso-reglamento',
    letter: 'l',
    stepNumber: 12,
    title: 'Compromiso Notariado de cumplimiento del Reglamento de Admisión',
    description: 'Compromiso Notariado de cumplimiento del Reglamento de Admisión a las Unidades Académicas de Pregrado de la UNIPOL con estricta Cláusula de Integridad y Transparencia.',
    status: 'NO_SUBIDO',
  },
  {
    id: 'doc-consentimiento-sede',
    letter: 'll',
    stepNumber: 13,
    title: 'Consentimiento de asignación a cualquier unidad académica del territorio nacional',
    description: 'Consentimiento expreso para ser asignado a cualquier Unidad Académica de Pregrado del territorio nacional.',
    status: 'NO_SUBIDO',
  },
  {
    id: 'doc-fotos',
    letter: 'm',
    stepNumber: 14,
    title: 'Cuatro fotografías 4x4 y una postal de cuerpo entero, con traje formal y fondo blanco',
    description: 'Cuatro (4) fotografías a color (sin editar), de frente, tamaño 4x4 y una (1) tamaño postal de cuerpo entero; todas con traje formal y fondo blanco, en físico y en formato digital (CD o archivo adjunto).',
    status: 'NO_SUBIDO',
  },
  {
    id: 'doc-padres-penales',
    letter: 'p',
    stepNumber: 15,
    title: 'Antecedentes penales del padre y de la madre (no excluyente)',
    description: 'Certificado de Registro Judicial de Antecedentes Penales del padre y de la madre de la o el postulante. En caso de fallecimiento o ausencia se adjuntará la documentación que lo acredite.',
    status: 'NO_SUBIDO',
  },
  {
    id: 'doc-menor-declaracion',
    letter: 'll',
    stepNumber: 16,
    title: 'Declaración jurada notariada del padre, la madre o el tutor (postulantes de 17 años)',
    description: 'Aplica únicamente a postulantes que tengan 17 años al momento de postulación asumiendo la responsabilidad correspondiente hasta la mayoría de edad.',
    status: 'NO_SUBIDO',
    requiredForMinors: true,
  },
  {
    id: 'doc-nacimiento-requisito',
    letter: 'a',
    stepNumber: 0,
    title: 'Ser boliviana o boliviano de nacimiento',
    description: 'Ser boliviana o boliviano de nacimiento.',
    status: 'APROBADO',
    isReviewedByUnipol: true,
  },
  {
    id: 'doc-boleta-pago',
    letter: 'n',
    stepNumber: 0,
    title: 'Boleta de depósito bancario o transferencia del Prospecto de Admisión',
    description: 'Original y fotocopia de la Boleta de Depósito Bancario para el Prospecto de Admisión o transferencia electrónica.',
    status: 'APROBADO',
    fileName: 'comprobante_banco_union_pago_500bs.pdf',
    uploadedAt: '07/10/2026 10:14',
    isReviewedByUnipol: true,
    observationNote: 'Satisfecho automáticamente por el pago registrado',
  },
];

export const PHYSICAL_BAREMO_DATA: PhysicalBaremo[] = [
  {
    testName: 'Velocidad 100 m',
    category: 'Varones',
    pts100: '12,00 seg',
    pts51: '15,00 seg',
    minScore: '20,00 seg (1 punto)',
  },
  {
    testName: 'Velocidad 100 m',
    category: 'Damas',
    pts100: '15,40 seg',
    pts51: '18,30 seg',
    minScore: '23,30 seg (1 punto)',
  },
  {
    testName: 'Dominadas',
    category: 'Varones',
    pts100: '17 repeticiones',
    pts51: '6 repeticiones',
    minScore: '0 rep. (1 punto)',
  },
  {
    testName: 'Dominadas',
    category: 'Damas',
    pts100: '4 repeticiones',
    pts51: '2 repeticiones',
    minScore: '0 rep. (1 punto)',
  },
  {
    testName: 'Abdominales 1 min',
    category: 'Varones',
    pts100: '60 repeticiones',
    pts51: '39 repeticiones',
    minScore: '1 rep. (6 puntos)',
  },
  {
    testName: 'Abdominales 1 min',
    category: 'Damas',
    pts100: '52 repeticiones',
    pts51: '34 repeticiones',
    minScore: '1 rep. (6 puntos)',
  },
  {
    testName: 'Natación 50 m crol',
    category: 'Varones',
    pts100: '—',
    pts51: 'Hasta 1 min 00 seg: APTO',
    minScore: 'Más de 1 min 00 seg: NO APTO',
  },
  {
    testName: 'Natación 50 m crol',
    category: 'Damas',
    pts100: '—',
    pts51: 'Hasta 1 min 10 seg: APTO',
    minScore: 'Más de 1 min 10 seg: NO APTO',
  },
  {
    testName: 'Resistencia 2 millas (3.218,69 m)',
    category: 'Varones',
    pts100: '11 min 57 seg',
    pts51: '14 min 24 seg',
    minScore: '16 min 54 seg (1 punto)',
  },
  {
    testName: 'Resistencia 2 millas (3.218,69 m)',
    category: 'Damas',
    pts100: '13 min 41 seg',
    pts51: '16 min 57 seg',
    minScore: '20 min 17 seg (1 punto)',
  },
];

export const PROSPECTO_CARDS: ProspectoCard[] = [
  {
    id: 1,
    title: 'NORMATIVA INSTITUCIONAL',
    category: 'LEGISLACIÓN Y REGLAMENTOS',
    image: ASSETS.heroBanner,
    crest: ASSETS.crest,
    badge: 'LEGISLACIÓN Y REGLAMENTOS',
    summary: 'Reglamentos vigentes del Proceso de Admisión 2026/2027, Proyecto Institucional de la Universidad Policial Mcal. Antonio José de Sucre.',
    fullDescription: 'Marco jurídico, constitucional y reglamentario que norma el Proceso de Admisión 2026/2027 a la Universidad Policial «Mcal. Antonio José de Sucre» (UNIPOL) y sus Unidades Académicas de Pregrado en todo el territorio del Estado Plurinacional de Bolivia, sustentado en los principios de igualdad, objetividad, transparencia y meritocracia.',
    quote: {
      text: 'El General Sucre es el padre de Ayacucho; es el redentor de los hijos del Sol; es el que ha roto las cadenas con que envolvió Pizarro al Imperio de los Incas. La posteridad representará a Sucre con un pie en el Pichincha y el otro en el Potosí, llevando en sus manos la cuna de Manco Kapac y contemplando las cadenas del Perú, rotas por su espada.',
      author: 'Simón Bolívar · Libertador',
    },
    articles: [
      {
        title: 'Constitución Política del Estado Plurinacional de Bolivia (Art. 251)',
        content: 'La Policía Boliviana, como fuerza pública, tiene la misión específica de la defensa de la sociedad y la conservación del orden público, y el cumplimiento de las leyes en todo el territorio boliviano. Ejerce la función policial de manera integral, indivisible y bajo mando único, en conformidad con la Ley Orgánica de la Policía Boliviana y las demás leyes del Estado.',
      },
      {
        title: 'Ley Orgánica de la Policía Boliviana y Ley N° 070 «Avelino Siñani - Elizardo Pérez»',
        content: 'Establece la naturaleza de la Universidad Policial «Mcal. Antonio José de Sucre» como máxima casa superior de estudios policiales, articulada al Sistema Educativo Plurinacional bajo régimen especial universitario para otorgar grados académicos con validez y certificación en Provisión Nacional.',
      },
      {
        title: 'Proyecto Institucional de la UNIPOL',
        content: 'Define el modelo pedagógico sociocomunitario productivo, la doctrina de policía comunitaria, la defensa incondicional de los Derechos Humanos y los estándares de excelencia académica exigidos a cadetes de la ANAPOL y alumnos de las Facultades Técnicas Superiores (FATESCIPOL y ESBAPOLMUS).',
      },
      {
        title: 'Reglamento de Admisión a las Unidades Académicas de Pregrado 2026/2027',
        content: 'Aprobado mediante Resolución del Comando General y la Dirección Nacional de Instrucción y Enseñanza (DNIE). Regula las convocatorias, plazos, evaluaciones excluyentes, tribunal calificador y el orden estricto de prelación de notas.',
      },
      {
        title: 'Cláusula de Transparencia y Régimen Disciplinario «Cero Tolerancia a la Corrupción»',
        content: 'Disposición vinculante que sanciona con la separación inmediata e inapelable del proceso, y remisión directa al Ministerio Público, a cualquier persona, postulante o funcionario que intente vulnerar la transparencia o incurrir en dádivas o intermediaciones.',
      },
    ],
    details: [
      'Constitución Política del Estado Plurinacional de Bolivia (Arts. 251 y concordantes).',
      'Ley Orgánica de la Policía Boliviana (Decreto Ley N° 14883).',
      'Ley N° 070 de la Educación «Avelino Siñani - Elizardo Pérez».',
      'Estatuto Orgánico y Régimen Académico de la Universidad Policial.',
      'Resolución Administrativa de Convocatoria Pública Nacional de Admisión 2026/2027.',
      'Código de Ética y Deontología Policial y Ley N° 101 del Régimen Disciplinario Policial.',
    ],
  },
  {
    id: 2,
    title: 'PRESENTACIÓN INSTITUCIONAL',
    category: 'MENSAJES DE AUTORIDADES',
    image: ASSETS.heroBanner,
    crest: ASSETS.crest,
    badge: 'MENSAJES DE AUTORIDADES',
    summary: 'Mensaje de apertura del Sr. Comandante General de la Policía Boliviana, Sr. Rector de la UNIPOL y Director de la Unidad.',
    fullDescription: 'Mensajes oficiales de bienvenida y directrices institucionales emitidos por el Mando Policial y las máximas autoridades académicas, orientados a inspirar la vocación cívica, el patriotismo y el compromiso con la seguridad ciudadana.',
    quote: {
      text: 'Ser policía no es una profesión cualquiera: es un sacerdocio cívico donde se entrega la vida por la seguridad, la libertad y la tranquilidad de cada familia boliviana en cada rincón de nuestra amada patria.',
      author: 'Mando Institucional · Comando General de la Policía Boliviana',
    },
    articles: [
      {
        title: 'Mensaje del Señor Comandante General de la Policía Boliviana',
        content: 'A las jóvenes y los jóvenes postulantes: la Policía Boliviana abre sus brazos a quienes sienten en lo más profundo del corazón el llamado del deber y la justicia. Nuestra misión no tolera vacilaciones; requiere hombres y mujeres valientes, con solvencia moral inquebrantable, dispuestos a proteger al prójimo incluso a costa de su propia vida.',
      },
      {
        title: 'Mensaje del Señor Rector de la Universidad Policial «Mcal. Antonio José de Sucre»',
        content: 'En la UNIPOL forjamos el carácter y el intelecto de los defensores de la sociedad. Ponemos a su disposición un cuerpo docente de primer nivel, tecnología formativa moderna y un régimen de formación integral basado en la disciplina, el respeto a los Derechos Humanos y la lealtad a la patria. Este proceso de selección garantiza que ingresen los mejores.',
      },
      {
        title: 'Mensaje del Señor Director de la Unidad Académica',
        content: 'Bienvenidos a las puertas del honor y la gloria. La vida en el internado transformará su disciplina, templará su espíritu y les otorgará la hermandad más pura. Confiamos en su esfuerzo personal, en su estudio consciente y en su rendimiento atlético.',
      },
      {
        title: 'Misión y Visión Institucional',
        content: 'Misión: Formar, capacitar y perfeccionar servidores públicos policiales con sólida preparación científica, táctica y humanística para garantizar la paz social. Visión: Consolidarse como una universidad policial referente en Sudamérica, caracterizada por la transparencia, modernidad y confianza ciudadana.',
      },
    ],
    details: [
      'Apertura solemne del Proceso Nacional de Admisión Gestión 2026 - 2027.',
      'Directrices estratégicas del Comando General de la Policía Boliviana.',
      'Garantía plena de auditoría informática y veeduría social en cada etapa.',
      'Valores institucionales: Honor, Lealtad, Disciplina, Honestidad, Justicia, Valor y Solidaridad.',
    ],
  },
  {
    id: 3,
    title: 'QUÉ ES Y QUIÉN PUEDE POSTULAR',
    category: 'REQUISITOS Y PERFILES',
    image: ASSETS.anapol,
    crest: ASSETS.escudoAnapol,
    badge: 'REQUISITOS Y PERFILES',
    summary: 'Perfil de ingreso integral (9 pilares de formación), perfil de egreso profesional y requisitos del Artículo 45 del Reglamento.',
    fullDescription: 'Condiciones de elegibilidad, perfil biopsicosocial exigido, los 9 pilares del perfil de ingreso integral, perfil de egreso profesional y los requisitos formales indispensables previstos en el Artículo 45 del Reglamento de Admisión.',
    articles: [
      {
        title: 'Los 9 Pilares de Formación del Perfil de Ingreso Integral',
        content: '1. Educación Humanística: Valoración del ser humano como sujeto activo, racional y portador de derechos inviolables. 2. Educación Técnica - Tecnológica: Habilidades operativas ante los desafíos de la sociedad digital. 3. Formación Integral: Armonía biopsicosocial, intelectual y física. 4. Formación Científica: Pensamiento crítico, investigación y análisis criminalístico. 5. Formación Espiritual: Fortaleza cívica y vocación de servicio desinteresado. 6. Ética y Deontología: Comportamiento probo sin tacha moral. 7. Compromiso Social y Vocación Patriótica: Conciencia de protección ciudadana. 8. Salud Física y Psicomotriz: Capacidad atlética y resistencia. 9. Conducta Cívica y Solvencia Moral: Respeto cívico comprobado.',
      },
      {
        title: 'Perfil de Egreso Profesional (Sargento / Subteniente de Policía)',
        content: 'El egresado de la UNIPOL posee competencias sólidas en: Dinamismo e Iniciativa, Integridad Inquebrantable, Estabilidad Emocional, Sensibilidad Social, Liderazgo Operativo, Trabajo en Equipo, Uso Proporcional de la Fuerza, Preservación del Lugar del Hecho y Adaptabilidad Táctica.',
      },
      {
        title: 'Requisitos Esenciales del Artículo 45 del Reglamento',
        content: 'a) Ser boliviana o boliviano de nacimiento acreditado con Certificado SERECÍ computarizado. b) Edad: Tener entre 17 y 22 años de edad cumplidos hasta el 31 de diciembre de 2026. c) Estado civil: Soltero(a), sin descendencia ni cargas conyugales para el régimen de internado. d) Estatura mínima descalzos: Varones 1,68 m / Damas 1,60 m. e) Índice de Masa Corporal (IMC): Proporcional según tabla médica oficial (18.5 a 24.9 kg/m²). f) Título de Bachiller en Humanidades debidamente acreditado. g) Inexistencia de antecedentes penales (REJAP), policiales (FELCC, FELCN, Tránsito) ni de violencia en razón de género (SIPPASE). h) No tener tatuajes visibles con uniforme ni perforaciones corporales incompatibles con la doctrina.',
      },
    ],
    details: [
      'Nacionalidad: Ser boliviana o boliviano de origen (Art. 45 Inciso a).',
      'Edad reglamentaria: Entre 17 y 22 años computados al 31 de diciembre de la gestión de ingreso.',
      'Estatura mínima obligatoria: Varones 1,68 metros / Damas 1,60 metros (medición descalzos).',
      'Estado civil: Soltero(a) sin hijos ni responsabilidades de manutención.',
      'Sin antecedentes penales (REJAP) ni de violencia intrafamiliar (SIPPASE).',
      'Sin antecedentes policiales en FELCC, FELCN ni Dirección General de Tránsito.',
      'Aptitud física y médica certificada por los tribunales de Sanidad Policial.',
    ],
  },
  {
    id: 4,
    title: 'FASES DEL PROCESO DE ADMISIÓN',
    category: 'CRONOGRAMA Y ETAPAS',
    image: ASSETS.heroBanner,
    crest: ASSETS.escudoFatescipol,
    badge: 'CRONOGRAMA Y ETAPAS',
    summary: 'Detalle de las 6 etapas obligatorias: Prospecto, Examen Médico, Psicológico, Aptitud Física, Prefacultativo e Incorporación.',
    fullDescription: 'Estructura sistemática, secuencial y de carácter eliminatorio conformada por 6 fases obligatorias donde la reprobación o inasistencia en una etapa inabilita de forma inmediata y automática al postulante para las fases posteriores.',
    articles: [
      {
        title: 'Fase 1: Prospecto y Apertura de Expediente Digital',
        content: 'Adquisición del prospecto digital mediante canales autorizados de Banco Unión, validación en la plataforma web de admisiones, registro de datos personales y carga de los 16 requisitos y certificados obligatorios.',
      },
      {
        title: 'Fase 2: Evaluación Médica Integral',
        content: 'Revisión exhaustiva por especialistas de Sanidad Policial: medicina general, traumatología, cardiología con electrocardiograma, oftalmología (agudeza visual 20/20 bilateral), otorrinolaringología, odontología completa, radiografías de tórax/columna y análisis de laboratorio clínico y toxicológico.',
      },
      {
        title: 'Fase 3: Evaluación Psicológica y Psicométrica',
        content: 'Batería estandarizada de pruebas psicotécnicas (MMPI-2, test de matrices progresivas, inventarios de personalidad) y entrevista clínica individual para determinar estabilidad emocional, control de impulsos y adaptación al régimen militarizado.',
      },
      {
        title: 'Fase 4: Evaluación de Aptitud Física',
        content: 'Pruebas atléticas de velocidad (100 m), fuerza en barra fija / flexiones de brazo, abdominales en 1 minuto, natación 50 m estilo crol y resistencia de 2 millas (3.218 m), evaluadas estrictamente según baremo oficial cronometrado.',
      },
      {
        title: 'Fase 5: Programa Académico Prefacultativo',
        content: 'Impartición de módulos académicos teóricos: Historia de la Policía Boliviana, Constitución Política del Estado, Ley Orgánica y Ley 070, Doctrina y Ética Policial, Lenguaje y Redacción, con exámenes ponderados de opción múltiple.',
      },
      {
        title: 'Fase 6: Cuadro de Prelación e Incorporación Oficial',
        content: 'Cálculo del promedio ponderado final acumulado, publicación del Cuadro de Honor por riguroso orden de prelación, verificación de cupos departamentales, entrega de carpeta física original y alta definitiva como cadete o alumno.',
      },
    ],
    details: [
      'Etapas correlativas y excluyentes: No se permite avanzar sin haber aprobado la etapa anterior.',
      'Supervisión y control mediante veedores institucionales y actas notariales.',
      'Publicación de resultados en el Portal Oficial del Expediente Digital.',
      'Convocatoria nacional con cronogramas por sedes departamentales.',
    ],
  },
  {
    id: 5,
    title: 'EVALUACIONES',
    category: 'BAREMO Y PARÁMETROS',
    image: ASSETS.fatescipol,
    crest: ASSETS.escudoFatescipol,
    badge: 'BAREMO Y PARÁMETROS',
    summary: 'Baremo oficial de pruebas de aptitud física (100m, dominadas, abdominales, natación 50m y resistencia 2 millas) para damas y varones.',
    fullDescription: 'Tabla de calificación matemática oficial para las pruebas físicas de admisión. Establece las marcas precisas para obtener 100 puntos, la nota mínima aprobatoria de 51 puntos y los umbrales de inhabilitación por rendimiento insuficiente.',
    articles: [
      {
        title: 'Prueba 1: Velocidad 100 metros planos',
        content: 'Mide la velocidad de reacción y aceleración anaeróbica en pista de tartán. Varones: 100 pts en 12,00 s; 51 pts en 15,00 s; marca mínima 20,00 s (1 punto). Damas: 100 pts en 15,40 s; 51 pts en 18,30 s; marca mínima 23,30 s (1 punto).',
      },
      {
        title: 'Prueba 2: Fuerza en Barra / Flexiones de Brazos',
        content: 'Varones: Dominadas con agarre prono estricto, barbilla sobre la barra sin impulso de piernas. 100 pts = 17 repeticiones; 51 pts = 6 repeticiones; mínima 0 repeticiones (1 punto). Damas: Dominadas / flexiones en barra sostenida. 100 pts = 4 repeticiones; 51 pts = 2 repeticiones; mínima 0 reps (1 punto).',
      },
      {
        title: 'Prueba 3: Abdominales en 1 minuto',
        content: 'Fuerza de la faja muscular abdominal con rodillas flexionadas a 90° y pies sujetos. Varones: 100 pts = 60 repeticiones; 51 pts = 39 repeticiones; mínima 1 repetición (6 puntos). Damas: 100 pts = 52 repeticiones; 51 pts = 34 repeticiones; mínima 1 repetición (6 puntos).',
      },
      {
        title: 'Prueba 4: Natación 50 metros estilo crol (Prueba Excluyente)',
        content: 'Prueba de aptitud acuática obligatoria en piscina olímpica o semiolímpica. Varones: hasta 1 min 00 s = APTO; más de 1 min 00 s = NO APTO. Damas: hasta 1 min 10 s = APTO; más de 1 min 10 s = NO APTO. La calificación de NO APTO causa inhabilitación inmediata del proceso.',
      },
      {
        title: 'Prueba 5: Resistencia Aeróbica 2 Millas (3.218,69 m)',
        content: 'Evaluación cardiorrespiratoria de fondo continuo. Varones: 100 pts = 11 min 57 s; 51 pts = 14 min 24 s; mínima 16 min 54 s (1 punto). Damas: 100 pts = 13 min 41 s; 51 pts = 16 min 57 s; mínima 20 min 17 s (1 punto).',
      },
    ],
    details: [
      'Puntaje mínimo aprobatorio en cada prueba: 51 puntos sobre 100.',
      'Uso obligatorio de indumentaria deportiva: polera blanca de algodón lisa, short o calza negra y zapatillas running.',
      'Comisión de cronometraje con soporte digital y supervisión de docentes de educación física de la UNIPOL.',
      'Todas las pruebas se rinden en una sola jornada continua conforme a rol departamental.',
    ],
  },
  {
    id: 6,
    title: 'PLAZAS Y BECAS',
    category: 'DISTRIBUCIÓN Y BENEFICIOS',
    image: ASSETS.anapol,
    crest: ASSETS.escudoAnapol,
    badge: 'DISTRIBUCIÓN Y BENEFICIOS',
    summary: 'Distribución nacional de plazas por sedes departamentales y disposiciones especiales de becas por excelencia académica y deportiva.',
    fullDescription: 'Distribución equitativa y transparente del cupo numérico de plazas convocadas para los 9 departamentos de Bolivia, junto a los regímenes especiales de becas otorgadas a los mejores bachilleres y deportistas destacados.',
    articles: [
      {
        title: 'Distribución de Plazas por Sedes Departamentales',
        content: 'Las plazas para la Facultad Técnica Superior en Ciencias Policiales (FATESCIPOL) se distribuyen proporcionalmente en las sedes de: La Paz (El Alto), Cochabamba (Quillacollo/Caramarca), Santa Cruz (Palmasola), Chuquisaca (Sucre), Oruro, Potosí, Tarija, Beni (Trinidad) y Pando (Cobija). La Academia Nacional de Policías (ANAPOL) cuenta con cupo nacional único centralizado en La Paz.',
      },
      {
        title: 'Becas por Excelencia Académica',
        content: 'Los mejores promedios generales que alcancen las calificaciones más altas en el Programa Académico Prefacultativo y postulantes con bachillerato de excelencia comprobado gozarán de beca completa de formación académica, uniformes y manutención.',
      },
      {
        title: 'Becas al Mérito Deportivo Nacional',
        content: 'Reserva especial de cupos para atletas de alto rendimiento con medallas acreditadas por el Viceministerio de Deportes en disciplinas olímpicas, artes marciales, tiro o atletismo, que hayan representado oficialmente a Bolivia en competencias internacionales o nacionales.',
      },
      {
        title: 'Criterios de Equidad e Inclusión Constitucional',
        content: 'Aplicación de cupos de incentivo para postulantes procedentes de municipios rurales alejados y naciones y pueblos indígena originario campesinos, fomentando la diversidad cultural del Estado Plurinacional.',
      },
    ],
    details: [
      'Asignación estricta de cupos según orden decreciente de notas del cuadro de prelación.',
      'Publicación de la nómina de admitidos con firma del Tribunal Superior de Admisiones.',
      'Plazas sujetas a la capacidad de infraestructura de internado de cada filial policial.',
      'Transparencia total: Cero cupos especiales fuera de la lista oficial de méritos.',
    ],
  },
  {
    id: 7,
    title: 'COSTOS Y DISPOSICIONES ECONÓMICAS',
    category: 'ARANCELES',
    image: ASSETS.crest,
    crest: ASSETS.crest,
    badge: 'ARANCELES',
    summary: 'Disposiciones arancelarias aprobadas, costo del prospecto digital (Bs 500) y canales de recaudación autorizados en Banco Unión.',
    fullDescription: 'Disposiciones económicas oficiales aprobadas por Resolución Administrativa del Comando General de la Policía Boliviana, tarifas de derecho de admisión y advertencias determinantes contra estafas y cobros indebidos.',
    articles: [
      {
        title: 'Costo del Prospecto Digital de Admisión',
        content: 'El Prospecto Digital tiene un valor oficial de Bs 500,00 (Quinientos bolivianos 00/100). Es de pago único e indispensable para habilitar el expediente en línea, los derechos de postulación y el acceso a la plataforma de estudio.',
      },
      {
        title: 'Canales de Recaudación Autorizados: Banco Unión S.A.',
        content: 'Todos los pagos se realizan exclusivamente a la cuenta fiscal oficial de la Universidad Policial en el Banco Unión S.A. Se puede cancelar mediante: a) Ventanilla bancaria con cédula de identidad y código de trámite UNIPOL. b) Banca digital UNINet / UNIMóvil. c) Pasarela de pago QR Simple interbancario generada por el sistema.',
      },
      {
        title: 'Aranceles Médicos y de Laboratorio',
        content: 'Los exámenes médicos complementarios se cancelan según tarifario institucional social directamente en los centros de salud policial autorizados, emitiéndose la factura o recibo oficial de ley.',
      },
      {
        title: 'Prohibición Absoluta de Cobros en Efectivo o Gestores',
        content: 'Está terminantemente prohibido realizar entregas de dinero en efectivo a personas particulares, instructores, oficiales o supuestos tramitadores. Cualquier intento de cobro irregular debe denunciarse de inmediato ante la Dirección Nacional de Transparencia de la Policía Boliviana.',
      },
    ],
    details: [
      'Prospecto Digital de Admisión: Bs 500,00 (pago único reglamentario).',
      'Cuenta recaudadora fiscal en Banco Unión S.A. a nombre de UNIPOL.',
      'Comprobante bancario con número de transacción y código alfanumérico de validación.',
      'Canales de denuncia anticorrupción las 24 horas a través de la línea gratuita nacional.',
    ],
  },
  {
    id: 8,
    title: 'CAUSALES DE SEPARACIÓN',
    category: 'RÉGIMEN DISCIPLINARIO',
    image: ASSETS.heroBanner,
    crest: ASSETS.crest,
    badge: 'RÉGIMEN DISCIPLINARIO',
    summary: 'Faltas éticas, falsificación de documentos, inasistencias o reprobación que conllevan la separación inmediata e inapelable del proceso.',
    fullDescription: 'Régimen de disciplina estricto aplicable durante todo el proceso de selección. Cualquier transgresión ética, alteración de documentos o conducta incompatible acarrea la separación irrevocable del postulante y la activación de acciones penales correspondientes.',
    articles: [
      {
        title: 'Falsedad Material e Ideológica en Documentación',
        content: 'La presentación de certificados de bachiller, actas de nacimiento, certificados de antecedentes (REJAP, SIPPASE, FELCC, FELCN) o documentos médicos adulterados o falsificados constituirá causal de separación inmediata y remisión de antecedentes ante el Ministerio Público bajo el Código Penal.',
      },
      {
        title: 'Intento de Soborno, Dádivas o Tráfico de Influencias',
        content: 'Cualquier postulante o familiar que intente ofrecer dádivas, dinero o favores a miembros de las comisiones evaluadoras o personal policial será separado de forma sumaria y denunciado bajo la Ley N° 004 de Lucha Contra la Corrupción «Marcelo Quiroga Santa Cruz».',
      },
      {
        title: 'Suplantación de Identidad y Fraude en Evaluaciones',
        content: 'Hacerse sustituir por otra persona en los exámenes médicos, físicos o psicotécnicos, o emplear dispositivos electrónicos o apuntes no autorizados en los exámenes teóricos causará la inhabilitación definitiva y perpetua para ingresar a la UNIPOL.',
      },
      {
        title: 'Inasistencia Injustificada o Impuntualidad',
        content: 'No presentarse a la hora y fecha fijada para cualquiera de las evaluaciones programadas, o presentarse con un retraso superior a diez (10) minutos, determinará la condición de NO PRESENTADO y la consiguiente exclusión del proceso.',
      },
      {
        title: 'Posesión o Consumo de Bebidas Alcohólicas o Estupefacientes',
        content: 'Ser sorprendido en estado de ebriedad, con aliento alcohólico o dar positivo en los reactivos toxicológicos para sustancias controladas durante cualquier etapa del proceso implicará la inhabilitación inmediata e inapelable.',
      },
    ],
    details: [
      'Separación sumaria, definitiva e inapelable en caso de falta grave.',
      'Remisión obligatoria del caso ante la Fiscalía Departamental correspondiente.',
      'Inhabilitación permanente en el sistema central de postulaciones de la UNIPOL.',
      'Sanción disciplinaria para cualquier funcionario policial que actúe en complicidad.',
    ],
  },
  {
    id: 9,
    title: 'FORMACIÓN ACADÉMICA',
    category: 'PLAN CURRICULAR',
    image: ASSETS.fatescipol,
    crest: ASSETS.escudoFatescipol,
    badge: 'PLAN CURRICULAR',
    summary: 'Malla curricular y formación técnico-policial durante los dos años de estudio con grado académico reconocido por el Ministerio de Educación.',
    fullDescription: 'Estructura curricular de 2 años lectivos (4 semestres académicos) en la Facultad Técnica Superior en Ciencias Policiales (FATESCIPOL) y 4 años en la Academia Nacional de Policías (ANAPOL), combinando la rigurosidad jurídica con la táctica y la formación humanística comunitaria.',
    articles: [
      {
        title: 'Área de Ciencias Jurídicas y Normativas',
        content: 'Comprende el estudio profundo de: Derecho Constitucional, Derecho Penal, Derecho Procesal Penal, Legislación Policial Orgánica, Ley N° 348 (Garantizar a las mujeres una vida libre de violencia), Ley N° 101 del Régimen Disciplinario y Derechos Humanos aplicados a la función policial.',
      },
      {
        title: 'Área Táctica Policial y Operativa',
        content: 'Formación especializada en: Instrucción y orden cerrado, técnicas de patrullaje preventivo urbano y rural, intervención policial en crisis, uso proporcional y diferenciado de la fuerza, defensa personal policial y manejo seguro de armas de fuego reglamentarias con tiro de precisión.',
      },
      {
        title: 'Área Técnico-Científica e Investigación Criminal',
        content: 'Materias de especialidad: Criminalística de campo, preservación y cadena de custodia del lugar del hecho, fotografía forense, investigación técnica de accidentes de tránsito, seguridad vial y primeros auxilios tácticos de urgencia.',
      },
      {
        title: 'Área Humanística, Ética y Lingüística Originaria',
        content: 'Formación en doctrina sociocomunitaria, deontología policial, psicología aplicada, resolución pacífica de conflictos vecinales y aprendizaje obligatorio de una lengua originaria (Aymara, Quechua o Guaraní).',
      },
      {
        title: 'Titulación Profesional en Provisión Nacional',
        content: 'Al culminar satisfactoriamente el plan de estudios de dos años, los alumnos de la FATESCIPOL obtienen el Título Profesional como Técnico Superior en Ciencias Policiales avalado por el Ministerio de Educación, y egresan con el grado de Sargento Segundo de la Policía Boliviana.',
      },
    ],
    details: [
      '2 años lectivos bajo estricto régimen de internado con dedicación exclusiva.',
      'Prácticas profesionales supervisadas en Estaciones Policiales Integrales (EPI).',
      'Certificación académica oficial con validez nacional e internacional.',
      'Continuidad académica hacia licenciaturas, maestrías y diplomados en la Escuela Superior de Policías.',
    ],
  },
  {
    id: 10,
    title: 'VIDA INSTITUCIONAL',
    category: 'RÉGIMEN INTERNO',
    image: ASSETS.esbapolmus,
    crest: ASSETS.escudoEsbapolmus,
    badge: 'RÉGIMEN INTERNO',
    summary: 'Régimen de internado, disciplina militar-policial, valores cívicos, doctrina y actividades extracurriculares de los cadetes y cursantes.',
    fullDescription: 'El régimen de internado policial constituye la forja de la templanza, la disciplina, el compañerismo y el amor a la patria. Desarrolla la lealtad cívica y la capacidad de actuar bajo presión para servir a la ciudadanía en cualquier momento y lugar.',
    articles: [
      {
        title: 'Rutina Diaria del Régimen de Internado',
        content: '05:00 Toque de Diana militar y arreglo riguroso de cuadras y literas. 05:30 Calistenia matutina, trote y preparación física. 06:30 Aseo personal e inspección de uniforme de aula. 07:00 Desayuno de rancho. 07:45 Formación solemne en el Patio de Honor, izamiento de la tricolor boliviana y parte de novedades. 08:00 a 12:30 Sesiones académicas universitarias en aulas y laboratorios. 12:45 Almuerzo y descanso de rancho. 14:00 a 18:00 Instrucción táctica de campo, tiro, defensa personal y deportes. 18:30 Arriamiento solemne de los pabellones patrios. 19:00 Cena de rancho. 20:00 a 21:30 Estudio obligatorio nocturno. 21:45 Lista de retreta. 22:00 Toque de silencio.',
      },
      {
        title: 'Servicios de Guardia y Mando Interior',
        content: 'Guardias de prevención, centinelas e imaginarias nocturnas que desarrollan el sentido del deber, la vigilancia permanente y la custodia celosa de las instalaciones y de la integridad de los camaradas.',
      },
      {
        title: 'Régimen de Francos y Visitas Familiares',
        content: 'Salidas de franco semanales o quincenales supeditadas al rendimiento académico aprobatorio y a la conducta ejemplar sin sanciones disciplinarias. Domingos de visita familiar programados en las instalaciones de la unidad.',
      },
      {
        title: 'Actividades Cívicas, Culturales y Deportivas',
        content: 'Participación en desfiles cívicos patrios en honor a la independencia de Bolivia, competencias interacadémicas de pentatlón policial, natación, artes marciales y olimpiadas del saber policial.',
      },
    ],
    details: [
      'Internado completo con dormitorios, comedores de rancho, biblioteca y polígono de tiro.',
      'Atención médica, dental y psicológica permanente en el servicio de sanidad de la unidad.',
      'Valores de compañerismo, honor y disciplina inculcados en el patio de armas.',
      'Formación patriótica orientada al servicio incondicional al pueblo boliviano.',
    ],
  },
  {
    id: 11,
    title: 'IDENTIDAD INSTITUCIONAL',
    category: 'DOCTRINA Y SÍMBOLOS',
    image: ASSETS.crest,
    crest: ASSETS.crest,
    badge: 'DOCTRINA Y SÍMBOLOS',
    summary: 'Emblemas patrios, heráldica de la Policía Boliviana, lemas institucionales: "200 años de historia, vocación y servicio a la patria".',
    fullDescription: 'Símbolos heráldicos, doctrina histórica, principios de identidad y mística institucional que unen a las generaciones policiales a lo largo de 200 años de vocación de servicio ininterrumpido a la nación boliviana.',
    articles: [
      {
        title: 'Heráldica del Escudo de la Policía Boliviana',
        content: 'El Escudo Institucional encierra profundos significados heráldicos: La Estrella Dorada de Ocho Puntas simboliza la guía inmutable de la ley y la vigilia permanente sobre el pueblo; los Fusiles Remington Cruzados representan la fuerza legítima puesta al servicio de la Constitución y el orden interno; las Ramas de Laurel y Olivo simbolizan el triunfo de la justicia y la paz social; y el lema superior consagra la consagración perenne a Bolivia.',
      },
      {
        title: 'Lema Institucional Histórico',
        content: '«Contra el mal por la justicia y la ley» — El grito de honor que resume la razón de ser de la institución del orden: oponerse a la delincuencia y al crimen para garantizar la vigencia de los derechos de todas y todos los bolivianos.',
      },
      {
        title: 'Bicentenario de la Policía Boliviana (1826 - 2026)',
        content: '«200 Años de Historia, Vocación y Servicio a la Patria». Creada en los albores mismos del nacimiento de la República por los libertadores Simón Bolívar y Antonio José de Sucre, la Policía Boliviana ha sido guardiana insustituible de la integridad social y territorial de la nación.',
      },
      {
        title: 'Himno al Policía Boliviana',
        content: 'Canto marcial que eleva el patriotismo: «Policía serás en la vida / el baluarte del orden y el bien / con el alma de fe sostenida / y la frente que altiva se ve...». Entonado en cada ceremonia y formación cívica con la máxima emoción patriótica.',
      },
      {
        title: 'Doctrina de Policía Comunitaria y Respeto a los Derechos Humanos',
        content: 'Filosofía institucional contemporánea que vincula indisolublemente al policía con su comunidad vecinal, priorizando la prevención situacional, el trato digno, la empatía y la protección integral a los sectores más vulnerables de la sociedad.',
      },
    ],
    details: [
      '200 años de historia, vocación y servicio incondicional a la patria boliviana.',
      'Culto reverente a los mártires y héroes caídos en el cumplimiento del deber supremo.',
      'Uso honroso y reglamentario de uniformes, distintivos y condecoraciones oficiales.',
      'Fidelidad absoluta a los sagrados colores de la bandera nacional: Rojo, Amarillo y Verde.',
    ],
  },
];

