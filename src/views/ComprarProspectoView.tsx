import React, { useState } from 'react';
import { Check, ShieldCheck, ArrowRight, QrCode, CreditCard, ChevronLeft } from 'lucide-react';
import { AcademicUnitId, UserProfile } from '../types';
import { ASSETS } from '../data/mockData';

interface ComprarProspectoViewProps {
  user: UserProfile | null;
  onNavigate: (view: string) => void;
  onOpenLogin: () => void;
  onSuccessPurchase?: (unit: AcademicUnitId) => void;
}

export const ComprarProspectoView: React.FC<ComprarProspectoViewProps> = ({
  user,
  onNavigate,
  onOpenLogin,
  onSuccessPurchase,
}) => {
  const [selectedUnit, setSelectedUnit] = useState<AcademicUnitId>('FATESCIPOL');
  const [step, setStep] = useState<1 | 2>(1);
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'banco'>('qr');
  const [isSuccess, setIsSuccess] = useState(false);

  const getProgramCrest = (id: AcademicUnitId) => {
    switch (id) {
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

  const programs = [
    {
      id: 'ANAPOL' as AcademicUnitId,
      name: 'ANAPOL',
      desc: 'Academia Nacional de Policías',
      status: 'No disponible',
      available: false,
    },
    {
      id: 'ESBAPOLMUS' as AcademicUnitId,
      name: 'ESBAPOLMUS',
      desc: 'Escuela básica policial de música',
      status: 'No disponible',
      available: false,
    },
    {
      id: 'FATESCIPOL' as AcademicUnitId,
      name: 'FATESCIPOL',
      desc: 'Facultad Técnica y Superior en Ciencias Policiales',
      status: user?.unit === 'FATESCIPOL' ? 'Adquirido' : 'Disponible',
      available: true,
    },
  ];

  const handleConfirmPayment = () => {
    setIsSuccess(true);
    if (onSuccessPurchase) {
      onSuccessPurchase(selectedUnit);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      
      {/* Top Banner matching Screenshot 11 */}
      <div className="bg-[#1b4332] text-white p-5 rounded-2xl shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/10 p-1 border border-amber-400/40">
              <img src={ASSETS.crest} alt="Escudo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-300 uppercase block">POLICÍA BOLIVIANA</span>
              <span className="text-xs font-semibold text-white/90">Universidad Policial</span>
            </div>
          </div>
          <button
            onClick={() => onNavigate(user ? 'dashboard' : 'landing')}
            className="text-xs font-semibold text-emerald-200 hover:text-white underline"
          >
            Inicio
          </button>
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-white pt-1">
          Adquirir prospecto
        </h1>
        <p className="text-xs text-emerald-100">
          Ya tenemos tus datos: elige el programa y paga. El prospecto queda en tu cuenta.
        </p>

        <div className="p-2.5 bg-black/25 rounded-lg border border-emerald-500/30 text-xs text-amber-300 font-medium">
          Adquirir el prospecto no otorga el derecho de inscripción ni asegura el ingreso.
        </div>
      </div>

      {/* Steps Indicator */}
      <div className="flex items-center justify-between px-4 text-xs font-bold border-b border-slate-200 pb-2">
        <span className={step === 1 ? 'text-emerald-800' : 'text-slate-400'}>
          1. Programa
        </span>
        <span className={step === 2 ? 'text-emerald-800' : 'text-slate-400'}>
          2. Pagar
        </span>
      </div>

      {/* STEP 1: Elige el programa matching Screenshot 10 & 11 */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              Elige el programa
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {user
                ? 'Ya te inscribiste (subiste tu carnet al expediente), por eso no puedes adquirir otros prospectos sin cambiar de sede.'
                : 'Selecciona la unidad académica para la cual deseas postularte en esta gestión.'}
            </p>
          </div>

          <div className="space-y-3">
            {programs.map((prog) => (
              <div
                key={prog.id}
                onClick={() => prog.available && setSelectedUnit(prog.id)}
                className={`p-4 rounded-2xl border transition-all ${
                  prog.available
                    ? selectedUnit === prog.id
                      ? 'border-emerald-700 bg-emerald-50/40 shadow-xs cursor-pointer ring-1 ring-emerald-700/30'
                      : 'border-slate-200 bg-white hover:border-slate-300 cursor-pointer'
                    : 'border-slate-200 bg-slate-50/80 opacity-70 cursor-not-allowed'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 p-1 border border-slate-200 shrink-0">
                      <img src={getProgramCrest(prog.id)} alt={`Escudo ${prog.name}`} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{prog.name}</h3>
                      <p className="text-xs text-slate-500">{prog.desc}</p>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                      prog.status === 'Adquirido'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : prog.status === 'Disponible'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {prog.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3">
            <button
              type="button"
              onClick={() => {
                if (!user) {
                  onOpenLogin();
                } else {
                  setStep(2);
                }
              }}
              className="w-full py-3 px-4 bg-[#1b4332] hover:bg-[#143527] text-white font-bold text-sm rounded-xl transition-colors text-center shadow-xs"
            >
              Continuar al pago (Bs 500)
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('mis-prospectos')}
              className="text-xs font-semibold text-emerald-800 hover:underline"
            >
              Ir a mis prospectos
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Pagar */}
      {step === 2 && !isSuccess && (
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStep(1)}
              className="p-1 rounded-full text-slate-500 hover:bg-slate-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Detalle de Pago y Facturación
              </h2>
              <span className="text-xs text-slate-500">
                Programa seleccionado: {selectedUnit}
              </span>
            </div>
          </div>

          {/* Amount Box */}
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-900 block">
                Arancel Oficial UNIPOL
              </span>
              <span className="text-xs text-emerald-700">
                Prospecto Digital y Apertura de Expediente
              </span>
            </div>
            <span className="text-xl font-black text-emerald-950 font-mono">
              Bs. 500,00
            </span>
          </div>

          {/* Payment Method Selectors */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 block">
              Selecciona método de pago:
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('qr')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  paymentMethod === 'qr'
                    ? 'border-emerald-700 bg-emerald-50/50 ring-1 ring-emerald-700 font-bold'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <QrCode className="w-5 h-5 text-emerald-800 mb-1" />
                <span className="text-xs">Pago QR Simple</span>
                <span className="text-[10px] text-slate-500">Instantáneo Banco Unión</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('banco')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  paymentMethod === 'banco'
                    ? 'border-emerald-700 bg-emerald-50/50 ring-1 ring-emerald-700 font-bold'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <CreditCard className="w-5 h-5 text-emerald-800 mb-1" />
                <span className="text-xs">Depósito en Ventanilla</span>
                <span className="text-[10px] text-slate-500">Cta. Cte. Banco Unión</span>
              </button>
            </div>
          </div>

          {paymentMethod === 'qr' && (
            <div className="p-4 bg-white rounded-xl border border-slate-200 text-center space-y-2">
              <div className="w-36 h-36 mx-auto bg-slate-900 p-2 rounded-lg flex items-center justify-center text-white font-mono text-xs">
                <QrCode className="w-28 h-28 text-white" />
              </div>
              <p className="text-xs text-slate-600">
                Escanea desde la app de tu entidad bancaria (Banco Unión u otros)
              </p>
            </div>
          )}

          {paymentMethod === 'banco' && (
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1 font-mono">
              <p><span className="font-bold">Banco:</span> Banco Unión S.A.</p>
              <p><span className="font-bold">Cuenta:</span> 1-00000-29384729</p>
              <p><span className="font-bold">Beneficiario:</span> UNIPOL RECAUDACIONES</p>
            </div>
          )}

          <button
            type="button"
            onClick={handleConfirmPayment}
            className="w-full py-3 bg-[#1b4332] hover:bg-[#143527] text-white font-bold text-sm rounded-xl transition-colors shadow-xs"
          >
            Confirmar y registrar comprobante
          </button>
        </div>
      )}

      {/* Success View */}
      {isSuccess && (
        <div className="p-6 bg-white rounded-2xl border border-emerald-300 shadow-sm text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Check className="w-6 h-6 stroke-[3]" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">
              ¡Pago procesado con éxito!
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Tu prospecto para {selectedUnit} ha sido habilitado inmediatamente.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="w-full py-2.5 bg-[#1b4332] text-white font-bold text-xs rounded-xl"
          >
            Ir a mi panel y expediente
          </button>
        </div>
      )}

    </div>
  );
};
