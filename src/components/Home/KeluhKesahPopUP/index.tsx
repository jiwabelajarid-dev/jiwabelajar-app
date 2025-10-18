"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface KeluhKesahPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, content: string) => void;
  storyToEdit?: any;
}

const KeluhKesahPopup: React.FC<KeluhKesahPopupProps> = ({
  isOpen,
  onClose,
  onSave,
  storyToEdit,
}) => {
  // State untuk alur 2 langkah
  const [step, setStep] = useState<"terms" | "editor">("terms");
  
  // State untuk form editor
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  // State untuk melacak 5 checkbox terpisah
  const [agreements, setAgreements] = useState({
    term1: false, term2: false, term3: false, term4: false, term5: false,
  });

  // Helper untuk memeriksa apakah SEMUA checkbox sudah dicentang
  const allAgreed = Object.values(agreements).every(value => value === true);

  const isContentEmpty = (text: string) => {
    if (!text) return true;
    const plainText = text.replace(/<[^>]*>/g, "").trim();
    return plainText.length === 0;
  };
  
  const handleAgreementChange = (term: keyof typeof agreements) => {
    setAgreements(prev => ({ ...prev, [term]: !prev[term] }));
  };

  // Reset semua state saat popup dibuka
  useEffect(() => {
    if (isOpen) {
      if (storyToEdit) {
        setTitle(storyToEdit.title);
        setContent(storyToEdit.content);
      } else {
        // Jika tidak, kosongkan form (untuk cerita baru)
        setTitle("");
        setContent("");
        setTitle("");
        setContent("");
        setAgreements({ term1: false, term2: false, term3: false, term4: false, term5: false });
        setStep("terms");
      }
    }
  }, [isOpen, storyToEdit]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title.trim() || isContentEmpty(content)) return;
    onSave(title, content);
    onClose();
  };
  
  const modules = {
    toolbar: [['bold', 'italic', 'underline'], [{ 'list': 'ordered'}, { 'list': 'bullet' }]],
  };
  const formats = ['bold', 'italic', 'underline', 'list', 'bullet'];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 flex flex-col transition-all duration-300">
        
        {step === "terms" ? (
          // Tampilan Langkah 1: Syarat & Ketentuan dengan Checkbox Interaktif
          <>
            <h2 className="text-xl font-bold mb-4 text-center">Ketentuan Mading Suara</h2>
            <div className="my-4 p-4 border rounded-lg bg-gray-50 text-left text-sm text-gray-700 space-y-3 max-h-[60vh] overflow-y-auto">
                <p className="font-semibold text-gray-800 mb-2">Sebelum melanjutkan, mohon setujui semua poin berikut:</p>
                <label htmlFor="term1" className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" id="term1" checked={agreements.term1} onChange={() => handleAgreementChange('term1')} className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                    <span>1. Saya akan menulis dengan bahasa yang sopan dan menghargai orang lain...</span>
                </label>
                <label htmlFor="term2" className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" id="term2" checked={agreements.term2} onChange={() => handleAgreementChange('term2')} className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                    <span>2. Saya tidak akan menyebut atau menyinggung individu, lembaga, atau pihak tertentu secara negatif...</span>
                </label>
                <label htmlFor="term3" className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" id="term3" checked={agreements.term3} onChange={() => handleAgreementChange('term3')} className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                    <span>3. Saya akan menjaga agar tulisan saya bebas dari unsur SARA, pornografi, kekerasan, dan ujaran kebencian...</span>
                </label>
                <label htmlFor="term4" className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" id="term4" checked={agreements.term4} onChange={() => handleAgreementChange('term4')} className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                    <span>4. Saya tidak akan membagikan informasi pribadi milik saya atau orang lain...</span>
                </label>
                <label htmlFor="term5" className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" id="term5" checked={agreements.term5} onChange={() => handleAgreementChange('term5')} className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                    <span>5. Saya berkomitmen menciptakan komunitas yang positif... dan menerima bahwa tim jiwabelajar.id berhak meninjau atau menghapus postingan yang melanggar.</span>
                </label>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Batal</button>
              <button 
                onClick={() => setStep("editor")}
                disabled={!allAgreed} // Tombol nonaktif jika belum semua dicentang
                className={`px-4 py-2 rounded-lg text-white transition ${!allAgreed ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
              >
                Saya Mengerti & Lanjutkan
              </button>
            </div>
          </>
        ) : (
          // Tampilan Langkah 2: Editor Teks
          <>
            <h2 className="text-xl font-bold mb-4">Tulis Keluh Kesahmu</h2>
            <input
              type="text"
              placeholder="Judul ceritamu"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500 text-lg font-semibold mb-4 p-2"
              autoFocus
            />
            <div className="prose prose-sm max-w-none flex-grow min-h-[200px] mb-4">
              <ReactQuill
                value={content}
                onChange={setContent}
                className="h-full"
                placeholder="Tulis ceritamu di sini..."
                modules={modules}
                formats={formats}
              />
            </div>
            <div className="flex justify-end gap-3 mt-12">
              <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Batal</button>
              <button
                onClick={handleSave}
                disabled={!title.trim() || isContentEmpty(content)}
                className={`px-4 py-2 rounded-lg text-white transition ${!title.trim() || isContentEmpty(content) ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
              >
                Simpan
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default KeluhKesahPopup;
