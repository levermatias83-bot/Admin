import React from 'react';
import {
  X,
  LayoutDashboard,
  Ticket,
  FileText,
  Activity,
  BookOpen,
  FolderArchive,
  Megaphone,
  User,
  LogOut,
  ChevronRight,
  ShieldAlert,
  Table,
} from 'lucide-react';
import { UserProfile } from '../types';

interface DrawerNavProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
  onOpenLogin: () => void;
}

export const DrawerNav: React.FC<DrawerNavProps> = ({
  isOpen,
  onClose,
  user,
  currentView,
  onNavigate,
  onLogout,
  onOpenLogin,
}) => {
  if (!isOpen) return null;

  const handleItemClick = (view: string) => {
    onNavigate(view);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-72 sm:w-80 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
        {/* Header with Close */}
        <div className="p-4 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Navegación
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar menú"
            className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="p-4 space-y-6 text-sm flex-1">
          {/* INICIO */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              INICIO
            </div>
            <div className="space-y-1">
              <button
                onClick={() => handleItemClick('dashboard')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors text-left ${
                  currentView === 'dashboard'
                    ? 'bg-[#3b5e43] text-white font-semibold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 shrink-0" />
                <span>Panel</span>
              </button>

              <button
                onClick={() => handleItemClick('mis-prospectos')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors text-left ${
                  currentView === 'mis-prospectos'
                    ? 'bg-[#3b5e43] text-white font-semibold shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Ticket className="w-4 h-4 shrink-0" />
                <span>Mis prospectos</span>
              </button>
            </div>
          </div>

          {/* MIS PROSPECTOS CARD (like screenshot 9) */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              MIS PROSPECTOS
            </div>
            <button
              onClick={() => handleItemClick('expediente')}
              className="w-full text-left p-3 rounded-xl border border-emerald-700/20 bg-emerald-50/50 hover:bg-emerald-50 transition-colors flex items-center justify-between group"
            >
              <div>
                <div className="font-bold text-xs text-slate-900 group-hover:text-emerald-900">
                  {user?.unit || 'FATESCIPOL'}
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  {user?.sede || 'SEDE COCHABAMBA'}
                </div>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-[#204e35] text-white tracking-wider">
                INSCRIPCIÓN
              </span>
            </button>
          </div>

          {/* MI POSTULACIÓN */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              MI POSTULACIÓN
            </div>
            <div className="px-3 py-1.5 mb-1 text-xs text-slate-500 font-medium border-b border-slate-100">
              <span className="font-bold text-slate-800">{user?.unit || 'FATESCIPOL'}</span>
              <span className="block text-[11px] text-slate-400 font-mono">
                {user?.postulationCode || '2027-000072-FAT'}
              </span>
            </div>
            <div className="space-y-1">
              <button
                onClick={() => handleItemClick('expediente')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors text-left ${
                  currentView === 'expediente'
                    ? 'bg-[#3b5e43] text-white font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-4 h-4 shrink-0" />
                <span>Expediente</span>
              </button>

              <button
                onClick={() => handleItemClick('dashboard')}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-slate-700 hover:bg-slate-100 transition-colors text-left"
              >
                <Activity className="w-4 h-4 shrink-0" />
                <span>Seguimiento</span>
              </button>
            </div>
          </div>

          {/* INFORMACIÓN */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              INFORMACIÓN
            </div>
            <div className="space-y-1">
              <button
                onClick={() => handleItemClick('cuadros-oficiales')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors text-left ${
                  currentView === 'cuadros-oficiales'
                    ? 'bg-[#3b5e43] text-white font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Table className="w-4 h-4 shrink-0 text-amber-500" />
                <span>Cuadros y Resultados</span>
              </button>

              <button
                onClick={() => handleItemClick('prospecto-digital')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors text-left ${
                  currentView === 'prospecto-digital'
                    ? 'bg-[#3b5e43] text-white font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>Prospecto Digital</span>
              </button>

              <button
                onClick={() => handleItemClick('expediente')}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-slate-700 hover:bg-slate-100 transition-colors text-left"
              >
                <FolderArchive className="w-4 h-4 shrink-0" />
                <span>Documentos</span>
              </button>

              <button
                onClick={() => handleItemClick('landing')}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-slate-700 hover:bg-slate-100 transition-colors text-left"
              >
                <Megaphone className="w-4 h-4 shrink-0" />
                <span>Comunicados</span>
              </button>
            </div>
          </div>

          {/* CUENTA */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              CUENTA
            </div>
            <div className="space-y-1">
              <button
                onClick={() => handleItemClick('perfil')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors text-left ${
                  currentView === 'perfil'
                    ? 'bg-[#3b5e43] text-white font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <User className="w-4 h-4 shrink-0" />
                <span>Mi perfil</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenLogin();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-slate-700 hover:bg-slate-100 transition-colors text-left"
              >
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Cambiar de cuenta</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onLogout();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom indicator */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-500 text-center">
          Convocatoria Admisión UNIPOL 2027
        </div>
      </div>
    </div>
  );
};
