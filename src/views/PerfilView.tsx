import React, { useState } from 'react';
import { User, Shield, Check, RefreshCw, LogOut, ArrowLeft } from 'lucide-react';
import { UserProfile, AcademicUnitId } from '../types';
import { INITIAL_USER } from '../data/mockData';

interface PerfilViewProps {
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export const PerfilView: React.FC<PerfilViewProps> = ({
  user,
  onUpdateUser,
  onNavigate,
  onLogout,
}) => {
  const [formData, setFormData] = useState<UserProfile>({ ...user });
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleResetSanitized = () => {
    setFormData({ ...INITIAL_USER });
    onUpdateUser({ ...INITIAL_USER });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-1 rounded-full text-slate-500 hover:bg-slate-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-black text-slate-900">
              Perfil del Postulante
            </h1>
            <span className="text-xs text-slate-500 font-mono">
              Expediente: {user.postulationCode}
            </span>
          </div>
        </div>

        <button
          onClick={handleResetSanitized}
          title="Restablecer datos sanitizados de muestra"
          className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Datos Sanitizados</span>
        </button>
      </div>

      {isSaved && (
        <div className="p-3 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-700" />
          <span>¡Datos del postulante actualizados con éxito!</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Nombres y Apellidos Completos
          </label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value.toUpperCase() })}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 uppercase font-semibold text-slate-800"
          />
        </div>

        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-6">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Cédula de Identidad (CI)
            </label>
            <input
              type="text"
              required
              value={formData.ci}
              onChange={(e) => setFormData({ ...formData, ci: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
            />
          </div>

          <div className="col-span-3">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Compl.
            </label>
            <input
              type="text"
              value={formData.complemento || ''}
              onChange={(e) => setFormData({ ...formData, complemento: e.target.value.toUpperCase() })}
              placeholder="Ej. 1A"
              maxLength={3}
              className="w-full px-2 py-2 text-sm border border-slate-300 rounded-lg text-center uppercase focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
            />
          </div>

          <div className="col-span-3">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Expedido
            </label>
            <select
              value={formData.ciExp}
              onChange={(e) => setFormData({ ...formData, ciExp: e.target.value })}
              className="w-full px-2 py-2 text-xs font-bold border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            >
              <option value="LP">LP (La Paz)</option>
              <option value="CB">CB (Cochabamba)</option>
              <option value="SC">SC (Santa Cruz)</option>
              <option value="CH">CH (Chuquisaca)</option>
              <option value="OR">OR (Oruro)</option>
              <option value="PT">PT (Potosí)</option>
              <option value="TJ">TJ (Tarija)</option>
              <option value="BN">BN (Beni)</option>
              <option value="PA">PA (Pando)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Unidad Académica Postulada
            </label>
            <select
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value as AcademicUnitId })}
              className="w-full px-3 py-2 text-xs font-medium border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
            >
              <option value="FATESCIPOL">FATESCIPOL</option>
              <option value="ANAPOL">ANAPOL</option>
              <option value="ESBAPOLMUS">ESBAPOLMUS</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Sede Departamental
            </label>
            <select
              value={formData.sede}
              onChange={(e) => setFormData({ ...formData, sede: e.target.value })}
              className="w-full px-3 py-2 text-xs font-medium border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
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

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Teléfono Celular / WhatsApp
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-2.5 bg-[#1b4332] hover:bg-[#143527] text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            Guardar cambios del perfil
          </button>
        </div>
      </form>

      {/* Logout button */}
      <div className="text-center pt-2">
        <button
          onClick={onLogout}
          className="text-xs text-red-600 hover:text-red-800 font-bold inline-flex items-center gap-1.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Cerrar sesión actual</span>
        </button>
      </div>

    </div>
  );
};
