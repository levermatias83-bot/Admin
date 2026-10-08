import React from 'react';
import { ASSETS } from '../data/mockData';
import { Award, FileText, CreditCard, Lock, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate?: (view: string) => void;
  onOpenLogin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLogin }) => {
  return (
    <footer className="mt-auto bg-[#0d2a1d] text-white border-t border-emerald-900/60 overflow-hidden">
      {/* Decorative Tricolor Line (Rojo, Amarillo, Verde) */}
      <div className="h-1 w-full flex">
        <div className="h-full w-1/3 bg-[#d90429]"></div>
        <div className="h-full w-1/3 bg-[#ffbe0b]"></div>
        <div className="h-full w-1/3 bg-[#008000]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Institutional Crest and Bicentennial Motto */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left mb-6">
          <div className="w-14 h-14 rounded-full bg-white/10 p-1 border border-amber-400/50 shadow flex items-center justify-center shrink-0">
            <img
              src={ASSETS.crest}
              alt="Escudo Universidad Policial"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h4 className="text-sm font-black tracking-wider text-amber-400 uppercase">
              POLICÍA BOLIVIANA
            </h4>
            <p className="text-sm font-bold text-emerald-100">
              Universidad Policial &quot;Mcal. Antonio José de Sucre&quot;
            </p>
            <p className="text-xs text-amber-300 font-semibold tracking-wide mt-1">
              200 AÑOS DE HISTORIA, VOCACIÓN Y SERVICIO A LA PATRIA
            </p>
          </div>
        </div>

        {/* Quick Links Section matching Screenshot 6 */}
        <div className="pt-4 border-t border-emerald-800/40 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <button
            onClick={() => onNavigate?.('cuadros-oficiales')}
            className="flex items-center gap-1.5 text-emerald-200/90 hover:text-white transition-colors text-left"
          >
            <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Resultados de admisión</span>
          </button>
          
          <button
            onClick={() => onNavigate?.('cuadros-oficiales')}
            className="flex items-center gap-1.5 text-emerald-200/90 hover:text-white transition-colors text-left"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Portal de conceptos</span>
          </button>

          <button
            onClick={() => onNavigate?.('comprar-prospecto')}
            className="flex items-center gap-1.5 text-emerald-200/90 hover:text-white transition-colors text-left"
          >
            <CreditCard className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Pago rápido (Banco Unión)</span>
          </button>

          <button
            onClick={onOpenLogin}
            className="flex items-center gap-1.5 text-emerald-200/90 hover:text-white transition-colors text-left"
          >
            <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Acceso administrativo</span>
          </button>
        </div>

        {/* Address and notice */}
        <div className="mt-6 pt-4 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-emerald-300/70 gap-2">
          <span>Sistema Integrado de Admisiones UNIPOL © 2026-2027</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-amber-400" />
            Plataforma Oficial Verificada · La Paz, Bolivia
          </span>
        </div>
      </div>
    </footer>
  );
};
