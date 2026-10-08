import React from 'react';
import { Menu, LogOut, User, Sparkles, ChevronRight, Table } from 'lucide-react';
import { UserProfile } from '../types';
import { ASSETS } from '../data/mockData';

interface HeaderProps {
  user: UserProfile | null;
  onOpenDrawer: () => void;
  onOpenLogin: () => void;
  onLogout: () => void;
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onOpenDrawer,
  onOpenLogin,
  onLogout,
  currentView,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#163e2c] text-white shadow-md border-b border-[#245e43]">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between">
        
        {/* Left: Menu & Brand Lockup */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {user ? (
            <button
              onClick={onOpenDrawer}
              aria-label="Abrir menú"
              className="p-1.5 -ml-1 text-white hover:bg-emerald-900/60 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <Menu className="w-6 h-6" />
            </button>
          ) : (
            <button
              onClick={() => onNavigate('landing')}
              className="p-1.5 -ml-1 text-white hover:bg-emerald-900/60 rounded-md transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}

          {/* Logo UNIPOL */}
          <button
            onClick={() => onNavigate(user ? 'dashboard' : 'landing')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 p-0.5 border border-amber-400/40 shadow-inner flex items-center justify-center shrink-0 overflow-hidden">
              <img
                src={ASSETS.crest}
                alt="Escudo Policía Boliviana"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="text-[11px] sm:text-xs font-black tracking-wider text-amber-300 leading-tight">
                POLICÍA BOLIVIANA
              </div>
              <div className="text-xs sm:text-sm font-semibold tracking-tight text-white/95 leading-tight">
                Universidad Policial
              </div>
            </div>
          </button>
        </div>

        {/* Center/Right Nav & Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Direct link to Cuadros Oficiales */}
          <button
            onClick={() => onNavigate('cuadros-oficiales')}
            title="Ver Cuadros Oficiales y Resultados"
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
              currentView === 'cuadros-oficiales'
                ? 'bg-amber-400 text-slate-950 shadow-xs'
                : 'bg-emerald-950/60 hover:bg-emerald-900 text-emerald-200 border border-emerald-800'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Cuadros Oficiales</span>
            <span className="xs:hidden">Cuadros</span>
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              {/* User Identity Pill with Sanitized Name */}
              <button
                onClick={() => onNavigate('perfil')}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/20 hover:bg-black/30 border border-emerald-700/60 text-xs font-medium text-emerald-100 max-w-[200px] truncate transition-colors"
              >
                <User className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{user.fullName.split(' ')[0]} {user.fullName.split(' ')[1] || ''} · {user.ci}</span>
              </button>

              {/* Direct links when on dashboard */}
              {currentView === 'landing' && (
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="px-2.5 py-1 text-xs font-semibold rounded bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
                >
                  Mi Panel
                </button>
              )}

              {/* Exit / Logout button matching the screenshots [-> salir] */}
              <button
                onClick={onLogout}
                title="Cerrar sesión"
                className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded border border-white/20 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="text-[11px] font-semibold">salir</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={onOpenLogin}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-800/80 hover:bg-emerald-700 rounded border border-emerald-600 transition-colors"
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => onNavigate('comprar-prospecto')}
                className="hidden xs:inline-flex px-3 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded shadow-sm transition-colors"
              >
                Adquirir prospecto
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
