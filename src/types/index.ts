export type AcademicUnitId = 'FATESCIPOL' | 'ANAPOL' | 'ESBAPOLMUS';

export interface UserProfile {
  id: string;
  fullName: string;
  ci: string;
  ciExp: string;
  complemento?: string;
  email: string;
  phone: string;
  city: string;
  birthDate: string;
  unit: AcademicUnitId;
  sede: string;
  postulationCode: string;
  purchasedDate: string;
}

export type DocumentStatus = 'APROBADO' | 'PENDIENTE' | 'OBSERVADO' | 'NO_SUBIDO';

export interface DocumentItem {
  id: string;
  letter: string;
  stepNumber: number;
  title: string;
  description: string;
  status: DocumentStatus;
  fileUrl?: string;
  fileName?: string;
  uploadedAt?: string;
  isReviewedByUnipol?: boolean;
  requiredForMinors?: boolean;
  observationNote?: string;
}

export interface PhysicalBaremo {
  testName: string;
  category: 'Varones' | 'Damas';
  pts100: string;
  pts51: string;
  minScore: string;
}

export interface ProspectoCard {
  id: number;
  title: string;
  category: string;
  image?: string;
  crest?: string;
  badge?: string;
  summary: string;
  fullDescription?: string;
  details?: string[];
  quote?: { text: string; author: string };
  articles?: { title: string; content: string }[];
}
