import React, { useState } from 'react';
import { X, UploadCloud, Camera, CheckCircle2, FileText, AlertCircle } from 'lucide-react';
import { DocumentItem } from '../types';

interface DocumentUploadModalProps {
  document: DocumentItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (docId: string, fileName: string) => void;
}

export const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({
  document,
  isOpen,
  onClose,
  onSave,
}) => {
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [isCapturingPhoto, setIsCapturingPhoto] = useState(false);
  const [photoCaptured, setPhotoCaptured] = useState(false);

  if (!isOpen || !document) return null;

  const sampleMockFiles = [
    `escaneo_oficial_${document.letter}_digital.pdf`,
    `documento_legalizado_${document.letter}_2026.jpg`,
    `respaldo_notariado_${document.letter}.pdf`,
  ];

  const handleUploadSubmit = () => {
    const finalName = selectedFile || `${document.title.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 25)}_digital.pdf`;
    onSave(document.id, finalName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#1b4332] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-900 font-bold text-xs flex items-center justify-center font-mono">
              {document.letter}
            </span>
            <h3 className="font-bold text-sm tracking-tight line-clamp-1">
              {document.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="p-1 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Official Instruction Box matching screenshot 31 & 32 */}
          <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 leading-relaxed">
            <p className="font-semibold mb-1">
              Se entrega en original en la unidad de admisiones. Aquí puedes subir un respaldo digital opcional.
            </p>
            <p className="text-[11px] text-amber-800">
              Formatos: <span className="font-mono">pdf, jpg, jpeg, png</span>. Máximo 5 MB por archivo. Conserva el original: debes presentarlo en la unidad de admisiones.
            </p>
          </div>

          {/* Description */}
          <p className="text-xs text-slate-600 leading-normal">
            {document.description}
          </p>

          {/* Camera Simulator or Upload Simulator */}
          {isCapturingPhoto ? (
            <div className="p-4 bg-slate-900 rounded-xl text-center text-white space-y-3">
              <div className="w-full h-44 bg-slate-800 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-emerald-500/50 relative overflow-hidden">
                {photoCaptured ? (
                  <div className="flex flex-col items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-10 h-10" />
                    <span className="text-xs font-semibold">Fotografía de documento capturada con éxito</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-300">
                    <Camera className="w-8 h-8 animate-pulse text-amber-400" />
                    <span className="text-xs">Enfoca el documento completo con buena iluminación</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 justify-center">
                {!photoCaptured ? (
                  <button
                    type="button"
                    onClick={() => {
                      setPhotoCaptured(true);
                      setSelectedFile(`foto_capturada_${document.letter}_camara.jpg`);
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors"
                  >
                    Capturar fotografía ahora
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPhotoCaptured(false)}
                    className="px-3 py-1.5 bg-slate-700 text-slate-200 rounded-lg text-xs hover:bg-slate-600"
                  >
                    Tomar de nuevo
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsCapturingPhoto(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-400 rounded-lg text-xs hover:bg-slate-700"
                >
                  Volver a selector de archivo
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Dropzone */}
              <div
                onClick={() => setSelectedFile(sampleMockFiles[0])}
                className={`p-6 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  selectedFile
                    ? 'border-emerald-600 bg-emerald-50/50'
                    : 'border-slate-300 hover:border-emerald-500 hover:bg-slate-50'
                }`}
              >
                <UploadCloud className={`w-10 h-10 mb-2 ${selectedFile ? 'text-emerald-600' : 'text-slate-400'}`} />
                {selectedFile ? (
                  <div>
                    <span className="text-xs font-bold text-emerald-800 block">
                      Archivo seleccionado:
                    </span>
                    <span className="text-xs font-mono text-slate-700 mt-1 block font-semibold">
                      {selectedFile}
                    </span>
                    <span className="text-[11px] text-emerald-600 mt-1 block">
                      (Listo para subir al expediente)
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="text-xs font-bold text-slate-700 block">
                      Arrastra tu archivo aquí o haz clic para examinar
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      PDF, JPG o PNG hasta 5 MB
                    </span>
                  </div>
                )}
              </div>

              {/* Quick sample pickers */}
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Archivos de prueba sugeridos:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {sampleMockFiles.map((fname, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedFile(fname)}
                      className={`text-[11px] px-2.5 py-1 rounded-md border text-left font-mono transition-colors ${
                        selectedFile === fname
                          ? 'bg-emerald-800 text-white border-emerald-900 font-bold'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                      }`}
                    >
                      {fname}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action buttons matching screenshot: Subir documento / Tomar foto */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCapturingPhoto(true)}
                  className="py-2.5 px-3 border border-emerald-700 text-emerald-800 hover:bg-emerald-50 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Camera className="w-4 h-4 text-emerald-700" />
                  <span>Tomar foto</span>
                </button>

                <button
                  type="button"
                  onClick={handleUploadSubmit}
                  className="py-2.5 px-3 bg-[#1b4332] hover:bg-[#143527] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <UploadCloud className="w-4 h-4 text-amber-300" />
                  <span>Subir documento</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <button
            type="button"
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 font-medium"
          >
            Lo hago después
          </button>
          <span className="text-[11px] text-slate-400">
            Unidad de Admisiones UNIPOL
          </span>
        </div>
      </div>
    </div>
  );
};
