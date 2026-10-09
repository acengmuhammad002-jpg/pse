import React, { useState } from 'react';
import { Users, Sparkles, Heart, School, Users2, Award, Play, ShieldCheck } from 'lucide-react';
import { sounds } from '../sound';

const DEFAULT_NAMES = ['Budi', 'Siti', 'Edo', 'Rani'];

export default function Lobby({ onStartGame }) {
  const [playerCount, setPlayerCount] = useState(4);
  const [playerNames, setPlayerNames] = useState(DEFAULT_NAMES);
  const [isBotMode, setIsBotMode] = useState(false);

  const handlePlayerCountChange = (count) => {
    sounds.playDraw();
    setPlayerCount(count);
    if (playerNames.length < count) {
      const extra = DEFAULT_NAMES.slice(playerNames.length, count);
      setPlayerNames([...playerNames, ...extra]);
    }
  };

  const handleNameChange = (index, value) => {
    const updated = [...playerNames];
    updated[index] = value;
    setPlayerNames(updated);
  };

  const handleSubmit = (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    sounds.playChime();
    const activeNames = Array.from({ length: playerCount }).map((_, i) => {
      const typed = playerNames[i]?.trim();
      if (isBotMode && i > 0) {
        return typed || `${DEFAULT_NAMES[i]} (Teman Bot)`;
      }
      return typed || DEFAULT_NAMES[i] || `Pemain ${i + 1}`;
    });
    onStartGame(activeNames, isBotMode);
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-full h-full w-full px-4 py-4 sm:py-6 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-2xl lg:max-w-4xl xl:max-w-5xl bg-slate-900/95 border-2 border-indigo-500/40 rounded-3xl p-5 sm:p-6 lg:p-7 shadow-2xl text-center backdrop-blur-md transition-all my-auto">
        
        {/* Badge & Title */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs sm:text-sm font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Game 3D Ramah Anak • Fasilitator Otomatis
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-1 drop-shadow-md">
          UNO CERITA
        </h1>
        <p className="text-sm sm:text-base lg:text-lg font-medium text-amber-300 mb-4 sm:mb-5 font-fredoka">
          School Well-being — 4 Dimensi Bahagia di Sekolah
        </p>

        {/* 4 Dimensi Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5 mb-4 sm:mb-5 text-left">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-red-950/40 border border-red-500/30">
            <div className="flex items-center gap-1.5 text-red-400 font-bold text-xs sm:text-sm mb-0.5">
              <Heart className="w-3.5 h-3.5 shrink-0" /> HEALTH
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 leading-tight">Energi tubuh, kebugaran fisik, & rasa nyaman.</p>
          </div>
          <div className="p-2.5 sm:p-3 rounded-2xl bg-amber-950/40 border border-amber-500/30">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs sm:text-sm mb-0.5">
              <School className="w-3.5 h-3.5 shrink-0" /> HAVING
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 leading-tight">Fasilitas kelas, kebersihan, & rasa aman.</p>
          </div>
          <div className="p-2.5 sm:p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs sm:text-sm mb-0.5">
              <Users2 className="w-3.5 h-3.5 shrink-0" /> LOVING
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 leading-tight">Pertemanan hangat & saling tolong menolong.</p>
          </div>
          <div className="p-2.5 sm:p-3 rounded-2xl bg-blue-950/40 border border-blue-500/30">
            <div className="flex items-center gap-1.5 text-blue-400 font-bold text-xs sm:text-sm mb-0.5">
              <Award className="w-3.5 h-3.5 shrink-0" /> BEING
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 leading-tight">Bakat, kreasi bebas, & rasa percaya diri.</p>
          </div>
        </div>

        {/* Form Pemain */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Mode Main & Jumlah Pemain */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="inline-flex gap-1.5 bg-slate-800/80 p-1 rounded-2xl border border-slate-700">
              <button
                type="button"
                onClick={() => setIsBotMode(false)}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  !isBotMode
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                👥 Grup (Gantian Layar)
              </button>
              <button
                type="button"
                onClick={() => setIsBotMode(true)}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isBotMode
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🤖 Solo (Lawan Bot Teman)
              </button>
            </div>

            <div className="inline-flex gap-2 bg-slate-800/80 p-1 rounded-2xl border border-slate-700">
              {[2, 3, 4].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => handlePlayerCountChange(count)}
                  className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    playerCount === count
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40 scale-105'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 inline mr-1" />
                  {count} Pemain
                </button>
              ))}
            </div>
          </div>

          {/* Form Nama Anak */}
          <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-3.5 sm:p-4 text-left">
            <p className="text-[11px] sm:text-xs text-indigo-300 mb-2.5 flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              Nama hanya diisi di awal. Di dalam game, 100% tinggal klik tanpa perlu mengetik lagi!
            </p>
            <div className={`grid gap-2.5 sm:gap-3 ${
              playerCount === 2
                ? 'grid-cols-1 sm:grid-cols-2'
                : playerCount === 3
                ? 'grid-cols-1 sm:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            }`}>
              {Array.from({ length: playerCount }).map((_, idx) => (
                <div key={idx}>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                    Kursi {idx + 1} ({idx === 0 ? 'Merah' : idx === 1 ? 'Biru' : idx === 2 ? 'Hijau' : 'Kuning'}):
                  </label>
                  <input
                    type="text"
                    maxLength={15}
                    value={playerNames[idx] || ''}
                    onChange={(e) => handleNameChange(idx, e.target.value)}
                    placeholder={`Nama Anak ${idx + 1}`}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Tombol Mulai */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full sm:w-auto px-8 sm:px-12 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 text-white font-bold text-base sm:text-lg shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current" />
            Mulai Bermain Sekarang!
          </button>
        </form>

        <p className="text-[11px] sm:text-xs text-slate-400 mt-3 sm:mt-4">
          Dilengkapi Fitur <strong className="text-slate-200">Safe Pass</strong> untuk kenyamanan anak bercerita tanpa tekanan.
        </p>
      </div>
    </div>
  );
}
