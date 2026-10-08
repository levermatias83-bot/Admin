/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserProfile, DocumentItem, AcademicUnitId } from './types';
import { INITIAL_USER, INITIAL_DOCUMENTS } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DrawerNav } from './components/DrawerNav';
import { AuthModal } from './components/AuthModal';
import { DocumentUploadModal } from './components/DocumentUploadModal';
import { ProspectoModal } from './components/ProspectoModal';

import { LandingView } from './views/LandingView';
import { DashboardView } from './views/DashboardView';
import { ExpedienteView } from './views/ExpedienteView';
import { ProspectoDigitalView } from './views/ProspectoDigitalView';
import { ComprarProspectoView } from './views/ComprarProspectoView';
import { MisProspectosView } from './views/MisProspectosView';
import { PerfilView } from './views/PerfilView';
import { CuadrosOficialesView } from './views/CuadrosOficialesView';

export default function App() {
  // Local storage persisted state
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('unipol_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_USER;
      }
    }
    return INITIAL_USER;
  });

  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    const saved = localStorage.getItem('unipol_documents');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_DOCUMENTS;
      }
    }
    return INITIAL_DOCUMENTS;
  });

  const [currentView, setCurrentView] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.pathname.includes('expediente')) {
      return 'expediente';
    }
    return 'expediente'; // Default to expediente as requested by user's link
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [uploadDoc, setUploadDoc] = useState<DocumentItem | null>(null);
  const [prospectoSectionId, setProspectoSectionId] = useState<number | null>(null);
  const [isMobileFrame, setIsMobileFrame] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem('unipol_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('unipol_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('unipol_documents', JSON.stringify(documents));
  }, [documents]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleNavigate = (view: string) => {
    if (['expediente', 'dashboard', 'prospecto-digital', 'mis-prospectos', 'perfil'].includes(view) && !user) {
      // Auto-restore demo user if none exists
      setUser(INITIAL_USER);
    }
    setCurrentView(view);
  };

  const handleLogin = (newUser: UserProfile) => {
    setUser(newUser);
    setCurrentView('dashboard');
    showToast(`Sesión iniciada: ${newUser.fullName.split(' ')[0]}`);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
    showToast('Sesión cerrada');
  };

  const handleUpdateUser = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    showToast('Perfil actualizado');
  };

  const handleSaveDocument = (docId: string, fileName: string) => {
    setDocuments((prev) =>
      prev.map((d) => {
        if (d.id === docId) {
          return {
            ...d,
            status: 'APROBADO',
            fileName,
            uploadedAt: new Date().toLocaleDateString('es-BO', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
          };
        }
        return d;
      })
    );
    showToast('Documento guardado y verificado en expediente');
  };

  const handleSuccessPurchase = (unit: AcademicUnitId) => {
    if (user) {
      const updated: UserProfile = {
        ...user,
        unit,
        postulationCode: `2027-${Math.floor(100000 + Math.random() * 900000).toString().slice(0, 6)}-${unit.substring(0, 3)}`,
      };
      setUser(updated);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f6f8] text-slate-800">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#163e2c] text-white px-4 py-2.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 border border-emerald-500 animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container Wrapper (supports mobile frame simulation if active) */}
      <div className={`flex-1 flex flex-col ${isMobileFrame ? 'max-w-[420px] mx-auto my-4 rounded-3xl shadow-2xl border-8 border-slate-900 bg-white overflow-hidden min-h-[850px]' : 'w-full'}`}>
        
        {/* Header */}
        <Header
          user={user}
          onOpenDrawer={() => setIsDrawerOpen(true)}
          onOpenLogin={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
          currentView={currentView}
          onNavigate={handleNavigate}
          isMobileFrame={isMobileFrame}
          onToggleFrame={() => setIsMobileFrame(!isMobileFrame)}
        />

        {/* View Content */}
        <main className="flex-1">
          {currentView === 'landing' && (
            <LandingView
              user={user}
              onNavigate={handleNavigate}
              onOpenLogin={() => setIsAuthModalOpen(true)}
            />
          )}

          {currentView === 'dashboard' && (
            <DashboardView
              user={user || INITIAL_USER}
              documents={documents}
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'expediente' && (
            <ExpedienteView
              user={user || INITIAL_USER}
              documents={documents}
              onUploadClick={(doc) => setUploadDoc(doc)}
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'prospecto-digital' && (
            <ProspectoDigitalView
              user={user || INITIAL_USER}
              onOpenCard={(id) => setProspectoSectionId(id)}
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'comprar-prospecto' && (
            <ComprarProspectoView
              user={user}
              onNavigate={handleNavigate}
              onOpenLogin={() => setIsAuthModalOpen(true)}
              onSuccessPurchase={handleSuccessPurchase}
            />
          )}

          {currentView === 'mis-prospectos' && (
            <MisProspectosView
              user={user || INITIAL_USER}
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'perfil' && (
            <PerfilView
              user={user || INITIAL_USER}
              onUpdateUser={handleUpdateUser}
              onNavigate={handleNavigate}
              onLogout={handleLogout}
            />
          )}

          {currentView === 'cuadros-oficiales' && (
            <CuadrosOficialesView
              user={user}
              onNavigate={handleNavigate}
            />
          )}
        </main>

        {/* Footer */}
        <Footer
          onNavigate={handleNavigate}
          onOpenLogin={() => setIsAuthModalOpen(true)}
        />
      </div>

      {/* Drawer Navigation */}
      <DrawerNav
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        user={user || INITIAL_USER}
        currentView={currentView}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        onOpenLogin={() => setIsAuthModalOpen(true)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        currentUser={user}
      />

      {/* Document Upload Simulator Modal */}
      <DocumentUploadModal
        document={uploadDoc}
        isOpen={Boolean(uploadDoc)}
        onClose={() => setUploadDoc(null)}
        onSave={handleSaveDocument}
      />

      {/* Digital Prospectus Content Modal */}
      <ProspectoModal
        sectionId={prospectoSectionId}
        isOpen={prospectoSectionId !== null}
        onClose={() => setProspectoSectionId(null)}
      />

    </div>
  );
}
