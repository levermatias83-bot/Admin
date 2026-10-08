import React, { useState } from 'react';
import { X, Lock, ShieldCheck, UserCheck, ArrowRight, RefreshCw } from 'lucide-react';
import { UserProfile, AcademicUnitId } from '../types';
import { ASSETS, INITIAL_USER } from '../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserProfile) => void;
  currentUser: UserProfile | null;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  currentUser,
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [ci, setCi] = useState(currentUser?.ci || '10928374');
  const [ciExp, setCiExp] = useState(currentUser?.ciExp || 'CB');
  const [complemento, setComplemento] = useState(currentUser?.complemento || '');
  const [password, setPassword] = useState('••••••••');
  
  // Custom register fields
  const [fullName, setFullName] = useState('POSTULANTE EJEMPLAR DE ADMISIÓN');
  const [unit, setUnit] = useState<AcademicUnitId>('FATESCIPOL');
  const [sede, setSede] = useState('SEDE COCHABAMBA');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserProfile = {
      id: `usr-${Date.now().toString().slice(-8)}`,
      fullName: isRegister ? fullName.toUpperCase().trim() : (currentUser?.fullName || 'POSTULANTE EJEMPLAR DE ADMISIÓN'),
      ci: ci.trim() || '10928374',
      ciExp,
      complemento: complemento.trim(),
      email: `${ci.toLowerCase()}@postulante.unipol.bo`,
      phone: '77981234',
      city: sede.replace('SEDE ', ''),
      birthDate: '2005-04-15',
      unit,
      sede,
      postulationCode: `2027-${Math.floor(100000 + Math.random() * 900000).toString().slice(0, 6)}-${unit.substring(0, 3)}`,
      purchasedDate: '07 de octubre de 2026',
    };
    onLogin(newUser);
    onClose();
  };

  const handleDemoLogin = () => {
    onLogin(INITIAL_USER);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Top Institutional Header */}
        <div className="bg-[#143e2b] text-white p-5 text-center relative border-b border-emerald-800">
          <button
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="absolute top-4 right-4 text-emerald-200 hover:text-white p-1 rounded-full hover:bg-emerald-900/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 mx-auto rounded-full bg-white/10 p-1 border border-amber-400/50 mb-2 flex items-center justify-center">
            <img
              src={ASSETS.crest}
              alt="Escudo UNIPOL"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <h3 className="text-base font-bold tracking-tight text-white">
            Sistema de Admisiones UNIPOL
          </h3>
          <p className="text-xs text-amber-300 font-medium">
            {isRegister ? 'Registro de Nuevo Postulante' : 'Inicio de Sesión de Postulante'}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nombres y Apellidos Completos
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ej. JUAN CARLOS PÉREZ FLORES"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 uppercase"
              />
            </div>
          )}

          {/* CI and Department */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Cédula de Identidad (CI)
            </label>
            <div className="grid grid-cols-12 gap-2">
              <input
                type="text"
                required
                value={ci}
                onChange={(e) => setCi(e.target.value)}
                placeholder="Ej. 10928374"
                className="col-span-6 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
              />
              <input
                type="text"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
                placeholder="Compl."
                maxLength={3}
                className="col-span-3 px-2 py-2 text-sm border border-slate-300 rounded-lg text-center uppercase focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
              />
              <select
                value={ciExp}
                onChange={(e) => setCiExp(e.target.value)}
                className="col-span-3 px-2 py-2 text-xs font-semibold border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >
                <option value="LP">LP</option>
                <option value="CB">CB</option>
                <option value="SC">SC</option>
                <option value="CH">CH</option>
                <option value="OR">OR</option>
                <option value="PT">PT</option>
                <option value="TJ">TJ</option>
                <option value="BN">BN</option>
                <option value="PA">PA</option>
              </select>
            </div>
          </div>

          {isRegister && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Unidad Académica
                </label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as AcademicUnitId)}
                  className="w-full px-2.5 py-2 text-xs font-medium border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="FATESCIPOL">FATESCIPOL</option>
                  <option value="ANAPOL">ANAPOL</option>
                  <option value="ESBAPOLMUS">ESBAPOLMUS</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Sede Departamental
                </label>
                <select
                  value={sede}
                  onChange={(e) => setSede(e.target.value)}
                  className="w-full px-2.5 py-2 text-xs font-medium border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="SEDE COCHABAMBA">Cochabamba</option>
                  <option value="SEDE LA PAZ">La Paz</option>
                  <option value="SEDE SANTA CRUZ">Santa Cruz</option>
                  <option value="SEDE SUCRE">Chuquisaca</option>
                  <option value="SEDE ORURO">Oruro</option>
                  <option value="SEDE POTOSÍ">Potosí</option>
                  <option value="SEDE TARIJA">Tarija</option>
                  <option value="SEDE BENI">Beni</option>
                  <option value="SEDE PANDO">Pando</option>
                </select>
              </div>
            </div>
          )}

          {/* Password field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">
                Contraseña / Código PIN
              </label>
              {!isRegister && (
                <span className="text-[11px] text-emerald-700 hover:underline cursor-pointer">
                  ¿Olvidaste tu contraseña?
                </span>
              )}
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-[#1b4332] hover:bg-[#143527] text-white font-bold text-sm rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 mt-2"
          >
            <span>{isRegister ? 'Registrar y continuar' : 'Ingresar al sistema'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Demo Login Button */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs rounded-lg border border-emerald-200 transition-colors flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4 text-emerald-700" />
            <span>Ingresar con Perfil Sanitizado (Demo 2027)</span>
          </button>

          {/* Toggle between Login and Register */}
          <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100">
            {isRegister ? (
              <p>
                ¿Ya tienes una cuenta registrada?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegister(false)}
                  className="font-bold text-emerald-700 hover:underline"
                >
                  Iniciar sesión
                </button>
              </p>
            ) : (
              <p>
                ¿Primera vez postulando?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegister(true)}
                  className="font-bold text-emerald-700 hover:underline"
                >
                  Crear expediente de postulante
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
