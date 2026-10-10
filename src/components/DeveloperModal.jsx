import React, { useState } from 'react';
import { X, GraduationCap, School, User, Sparkles, ShieldCheck } from 'lucide-react';

export default function DeveloperModal({ onClose }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-slate-900 border-2 border-indigo-500/40 rounded-3xl p-5 sm:p-7 shadow-2xl text-left relative overflow-hidden space-y-5 my-auto backdrop-blur-xl ring-1 ring-white/10">
        
        {/* Glow Accent */}
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-red-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-all cursor-pointer shadow-md"
          title="Tutup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Tag */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-black px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-sm flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span>PROFIL PENGEMBANG</span>
          </span>
          <span className="text-[11px] font-bold text-amber-300">
            Karya Inovasi PPG Prajabatan
          </span>
        </div>

        {/* Profile Card Main Area */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 shadow-inner">
          
          {/* Photo Container */}
          <div className="relative shrink-0">
            <div className="w-28 h-36 sm:w-32 sm:h-40 rounded-2xl overflow-hidden border-2 border-red-500/60 shadow-xl bg-red-600 flex items-center justify-center relative group">
              {!imgError ? (
                <img
                  src="Foto-Aceng Muhammad Sirojudin.jpg"
                  alt="Aceng Muhammad Sirojudin"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  onError={() => setImgError(true)}
                />
              ) : (
                /* Fallback stylized portrait matching the red background photo */
                <div className="w-full h-full bg-gradient-to-b from-red-600 to-red-700 flex flex-col items-center justify-center text-white p-2 text-center">
                  <div className="w-16 h-16 rounded-full bg-black/40 border-2 border-white/30 flex items-center justify-center text-2xl mb-1 shadow-inner">
                    👨‍🏫
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider">Aceng M. S.</span>
                  <span className="text-[9px] opacity-80">PPG 2026</span>
                </div>
              )}
              {/* Badge Overlay */}
              <span className="absolute bottom-1 right-1 p-1 rounded-lg bg-slate-950/80 text-amber-300 shadow">
                <GraduationCap className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 text-center sm:text-left space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-black text-white font-fredoka leading-snug">
              Aceng Muhammad Sirojudin
            </h3>
            
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-bold">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>Mahasiswa PPG Prajabatan 2026</span>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-amber-300 font-semibold pt-0.5">
              <School className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Universitas Terbuka</span>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed pt-1">
              Pengembang media pembelajaran edukatif inovatif berbasis <em>School Well-being</em> dan Pembelajaran Sosial-Emosional (PSE).
            </p>
          </div>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-2 gap-2.5 text-left text-xs">
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
            <div className="font-bold text-emerald-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tujuan Inovasi:</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              Membangun atmosfer kelas yang suportif, membahagiakan, dan empatik lewat game kartu ramah anak.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Prinsip Utama:</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              Eksplorasi 4 Dimensi Well-being & proteksi kenyamanan psikologis anak dengan fitur <em>Safe Pass</em>.
            </p>
          </div>
        </div>

        {/* Footer Dedication */}
        <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-[11px] sm:text-xs text-slate-300 leading-relaxed text-center">
          💡 Dikembangkan untuk mendukung implementasi <strong>Pembelajaran Sosial-Emosional (PSE)</strong> yang bermakna, kontekstual, dan menyenangkan di sekolah.
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-lg cursor-pointer transition-all active:scale-98"
        >
          Tutup Informasi Pengembang
        </button>
      </div>
    </div>
  );
}
