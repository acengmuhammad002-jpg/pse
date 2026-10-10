import React, { useState } from 'react';
import {
  Users,
  Sparkles,
  Heart,
  School,
  Users2,
  Award,
  Play,
  ShieldCheck,
  Music,
  Music2,
  Bot,
  UserCheck,
  HelpCircle,
  X,
  Flame,
  CheckCircle2,
  User,
} from 'lucide-react';
import { sounds } from '../sound';
import DeveloperModal from './DeveloperModal';

const DEFAULT_NAMES = ['Budi', 'Siti', 'Edo', 'Rani'];
const AVATARS = ['🦊', '🐼', '🦁', '🐬', '🐨', '🦄', '🚀', '⭐'];

export default function Lobby({ onStartGame }) {
  const [playerCount, setPlayerCount] = useState(4);
  const [playerNames, setPlayerNames] = useState(DEFAULT_NAMES);
  const [playerAvatars, setPlayerAvatars] = useState(['🦊', '🐼', '🦁', '🐬']);
  const [isBotMode, setIsBotMode] = useState(false);
  const [bgmEnabled, setBgmEnabled] = useState(true);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showDeveloperModal, setShowDeveloperModal] = useState(false);

  const handlePlayerCountChange = (count) => {
    sounds.playDraw();
    setPlayerCount(count);
    if (playerNames.length < count) {
      const extra = DEFAULT_NAMES.slice(playerNames.length, count);
      setPlayerNames([...playerNames, ...extra]);
      const extraAvatars = AVATARS.slice(playerAvatars.length, count);
      setPlayerAvatars([...playerAvatars, ...extraAvatars]);
    }
  };

  const handleNameChange = (index, value) => {
    const updated = [...playerNames];
    updated[index] = value;
    setPlayerNames(updated);
  };

  const handleAvatarCycle = (index) => {
    sounds.playDraw();
    const updated = [...playerAvatars];
    const currentIdx = AVATARS.indexOf(updated[index] || AVATARS[0]);
    const nextIdx = (currentIdx + 1) % AVATARS.length;
    updated[index] = AVATARS[nextIdx];
    setPlayerAvatars(updated);
  };

  const handleToggleBGM = () => {
    const nextState = !bgmEnabled;
    setBgmEnabled(nextState);
    if (nextState) {
      sounds.startBGM();
    } else {
      sounds.stopBGM();
    }
  };

  const handleSubmit = (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    sounds.playChime();
    if (bgmEnabled && !sounds.bgmPlaying) {
      sounds.startBGM();
    }
    const activeNames = Array.from({ length: playerCount }).map((_, i) => {
      const typed = playerNames[i]?.trim();
      const avatar = playerAvatars[i] || AVATARS[i % AVATARS.length];
      if (isBotMode && i > 0) {
        return typed ? `${typed} 🤖` : `${DEFAULT_NAMES[i]} ${avatar} 🤖`;
      }
      return typed ? `${typed}` : `${DEFAULT_NAMES[i]} ${avatar}`;
    });
    onStartGame(activeNames, isBotMode);
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-full h-full w-full px-3 sm:px-6 py-4 sm:py-6 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
      
      {/* Background Decorative Radial Mesh Blurs */}
      <div className="absolute top-12 left-10 w-80 h-80 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-12 right-10 w-96 h-96 rounded-full bg-rose-600/15 blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />

      {/* Main Glassmorphic Container */}
      <div className="w-full max-w-2xl lg:max-w-4xl xl:max-w-5xl bg-slate-900/90 border border-white/15 rounded-3xl p-5 sm:p-7 lg:p-8 shadow-2xl text-center backdrop-blur-2xl transition-all my-auto relative overflow-hidden ring-1 ring-white/10">
        
        {/* Subtle Top Glowing Rainbow Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-amber-400 via-emerald-400 via-sky-400 to-indigo-500" />

        {/* Top Floating Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 text-xs font-bold tracking-wide shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '5s' }} />
            <span>UNO CERITA • 3D School Well-being</span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Audio Pengiring BGM Toggle */}
            <button
              type="button"
              onClick={handleToggleBGM}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all shadow-md ${
                bgmEnabled
                  ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-200 ring-2 ring-emerald-400/30 shadow-emerald-500/20'
                  : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
              }`}
              title="Putar musik latar yang menenangkan dan ceria"
            >
              {bgmEnabled ? (
                <>
                  <Music2 className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
                  <span className="hidden sm:inline">Audio Pengiring:</span>
                  <span className="text-emerald-300 font-extrabold">Aktif 🎵</span>
                  {/* Equalizer animation bars */}
                  <span className="flex items-end gap-0.5 h-3 ml-0.5">
                    <span className="w-0.5 h-2 bg-emerald-400 animate-pulse" />
                    <span className="w-0.5 h-3 bg-emerald-300 animate-pulse" style={{ animationDelay: '0.15s' }} />
                    <span className="w-0.5 h-1.5 bg-emerald-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
                  </span>
                </>
              ) : (
                <>
                  <Music className="w-3.5 h-3.5 opacity-60" />
                  <span>Audio Pengiring: Nonaktif</span>
                </>
              )}
            </button>

            {/* Quick Guide Button */}
            <button
              type="button"
              onClick={() => setShowRulesModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-750 border border-slate-700/80 text-xs font-bold text-amber-300 transition-all shadow-sm cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Panduan</span>
            </button>

            {/* Developer Info Button */}
            <button
              type="button"
              onClick={() => setShowDeveloperModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-400/40 text-xs font-bold text-indigo-300 transition-all shadow-sm cursor-pointer"
              title="Informasi Pengembang Aceng Muhammad Sirojudin"
            >
              <User className="w-3.5 h-3.5 text-indigo-400" />
              <span>Pengembang</span>
            </button>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-1 font-fredoka drop-shadow-lg">
          UNO CERITA
        </h1>
        <p className="text-sm sm:text-base lg:text-lg font-semibold bg-gradient-to-r from-amber-300 via-emerald-300 to-sky-300 bg-clip-text text-transparent mb-5 tracking-wide max-w-2xl mx-auto">
          Eksplorasi 4 Dimensi Kebahagiaan Sekolah • Menang Saat Kartu Habis!
        </p>

        {/* 4 Dimensi Cards Grid (Modern Frosted Cards) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mb-6 text-left">
          {/* Health */}
          <div className="group relative p-3 sm:p-3.5 rounded-2xl bg-gradient-to-b from-red-950/40 to-slate-900/60 border border-red-500/30 hover:border-red-400/60 transition-all hover:scale-[1.02] shadow-lg">
            <div className="flex items-center gap-1.5 text-red-400 font-extrabold text-xs sm:text-sm mb-1 font-fredoka">
              <span className="p-1 rounded-lg bg-red-500/20 text-red-300"><Heart className="w-3.5 h-3.5" /></span>
              <span>HEALTH (Merah)</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 leading-snug">
              Energi tubuh, kebugaran fisik, pola tidur, & rasa rileks saat belajar.
            </p>
          </div>

          {/* Having */}
          <div className="group relative p-3 sm:p-3.5 rounded-2xl bg-gradient-to-b from-amber-950/40 to-slate-900/60 border border-amber-500/30 hover:border-amber-400/60 transition-all hover:scale-[1.02] shadow-lg">
            <div className="flex items-center gap-1.5 text-amber-400 font-extrabold text-xs sm:text-sm mb-1 font-fredoka">
              <span className="p-1 rounded-lg bg-amber-500/20 text-amber-300"><School className="w-3.5 h-3.5" /></span>
              <span>HAVING (Kuning)</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 leading-snug">
              Kenyamanan kelas, kebersihan, fasilitas sekolah, & lingkungan aman.
            </p>
          </div>

          {/* Loving */}
          <div className="group relative p-3 sm:p-3.5 rounded-2xl bg-gradient-to-b from-emerald-950/40 to-slate-900/60 border border-emerald-500/30 hover:border-emerald-400/60 transition-all hover:scale-[1.02] shadow-lg">
            <div className="flex items-center gap-1.5 text-emerald-400 font-extrabold text-xs sm:text-sm mb-1 font-fredoka">
              <span className="p-1 rounded-lg bg-emerald-500/20 text-emerald-300"><Users2 className="w-3.5 h-3.5" /></span>
              <span>LOVING (Hijau)</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 leading-snug">
              Persahabatan hangat, empati kawan, saling tolong, & rasa diterima.
            </p>
          </div>

          {/* Being */}
          <div className="group relative p-3 sm:p-3.5 rounded-2xl bg-gradient-to-b from-blue-950/40 to-slate-900/60 border border-blue-500/30 hover:border-blue-400/60 transition-all hover:scale-[1.02] shadow-lg">
            <div className="flex items-center gap-1.5 text-blue-400 font-extrabold text-xs sm:text-sm mb-1 font-fredoka">
              <span className="p-1 rounded-lg bg-blue-500/20 text-blue-300"><Award className="w-3.5 h-3.5" /></span>
              <span>BEING (Biru)</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 leading-snug">
              Bakat kreatif, percaya diri, berani berpendapat, & impian masa depan.
            </p>
          </div>
        </div>

        {/* Player Form and Settings */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Controls: Mode Switcher & Player Count */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Mode Switcher */}
            <div className="inline-flex gap-1.5 bg-slate-950/80 p-1.5 rounded-2xl border border-white/10 shadow-inner">
              <button
                type="button"
                onClick={() => setIsBotMode(false)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  !isBotMode
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Grup Teman Sekelas</span>
              </button>
              <button
                type="button"
                onClick={() => setIsBotMode(true)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isBotMode
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Solo vs Bot Komputer</span>
              </button>
            </div>

            {/* Player Count Buttons */}
            <div className="inline-flex gap-1.5 bg-slate-950/80 p-1.5 rounded-2xl border border-white/10 shadow-inner">
              {[2, 3, 4].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => handlePlayerCountChange(count)}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    playerCount === count
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-600/30 scale-105'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 inline mr-1" />
                  <span>{count} Pemain</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form Nama Anak & Avatar */}
          <div className="bg-slate-950/60 border border-white/10 rounded-2xl p-4 sm:p-5 text-left shadow-inner space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
              <p className="text-xs text-indigo-300 flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Klik avatar untuk berganti ikon lucu • Di dalam game, 100% bebas mengetik!</span>
              </p>
              <span className="text-[11px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                🏆 Menang saat kartu habis
              </span>
            </div>

            <div className={`grid gap-3 ${
              playerCount === 2
                ? 'grid-cols-1 sm:grid-cols-2'
                : playerCount === 3
                ? 'grid-cols-1 sm:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            }`}>
              {Array.from({ length: playerCount }).map((_, idx) => {
                const chairColors = [
                  'border-red-500/40 text-red-400 bg-red-950/20',
                  'border-blue-500/40 text-blue-400 bg-blue-950/20',
                  'border-emerald-500/40 text-emerald-400 bg-emerald-950/20',
                  'border-amber-500/40 text-amber-400 bg-amber-950/20',
                ];
                const chairLabels = ['Kursi 1 (Merah)', 'Kursi 2 (Biru)', 'Kursi 3 (Hijau)', 'Kursi 4 (Kuning)'];

                return (
                  <div key={idx} className={`p-2.5 rounded-xl border ${chairColors[idx % 4]} space-y-1.5 transition-all`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black">{chairLabels[idx]}</span>
                      {isBotMode && idx > 0 ? (
                        <span className="text-[10px] text-slate-400 font-bold">🤖 Bot AI</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleAvatarCycle(idx)}
                          className="text-base px-1.5 py-0.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 transition-all cursor-pointer shadow-sm"
                          title="Klik untuk ganti avatar"
                        >
                          {playerAvatars[idx] || AVATARS[idx % AVATARS.length]}
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      maxLength={15}
                      value={playerNames[idx] || ''}
                      onChange={(e) => handleNameChange(idx, e.target.value)}
                      placeholder={isBotMode && idx > 0 ? `${DEFAULT_NAMES[idx]} (Bot)` : `Nama Pemain ${idx + 1}`}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/25 transition-all shadow-sm"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tombol Mulai */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full sm:w-auto px-10 sm:px-14 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 text-white font-black text-base sm:text-lg shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5 mx-auto cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Mulai Petualangan Bermain! 🚀</span>
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5 text-[11px] text-slate-400">
          <div className="flex flex-wrap items-center gap-1.5 text-left">
            <span className="text-slate-300 font-semibold">Pengembang Media:</span>
            <button
              type="button"
              onClick={() => setShowDeveloperModal(true)}
              className="text-amber-300 hover:text-amber-200 underline underline-offset-2 font-bold cursor-pointer transition-colors"
            >
              Aceng Muhammad Sirojudin
            </button>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">Mahasiswa PPG Prajabatan 2026, Universitas Terbuka</span>
          </div>

          <button
            type="button"
            onClick={() => setShowDeveloperModal(true)}
            className="inline-flex items-center gap-1 text-indigo-300 hover:text-white px-3 py-1 rounded-xl bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-500/30 transition-all font-bold cursor-pointer text-[11px]"
          >
            <span>Info Pengembang</span>
            <span>👨‍🏫</span>
          </button>
        </div>

        <p className="text-[10px] sm:text-[11px] text-slate-500 mt-2">
          Dilengkapi Fitur <strong className="text-emerald-300">Safe Pass</strong> untuk melindungi kenyamanan anak bercerita tanpa tekanan atau sanksi apa pun.
        </p>
      </div>

      {/* Developer Profile Modal */}
      {showDeveloperModal && (
        <DeveloperModal onClose={() => setShowDeveloperModal(false)} />
      )}

      {/* Rules Modal */}
      {showRulesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="w-full max-w-lg bg-slate-900 border-2 border-indigo-500/40 rounded-3xl p-6 shadow-2xl text-left space-y-4 relative">
            <button
              onClick={() => setShowRulesModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-amber-300 font-bold text-lg font-fredoka">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Panduan Bermain UNO CERITA</span>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-slate-200 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-orange-400" />
                  1. Cara Bermain & Mencocokkan Kartu:
                </div>
                <p>Keluarkan kartu yang cocok warna (dimensi) atau nomor/simbolnya dengan kartu di tengah meja.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  2. Refleksi Otomatis (Tanpa Mengetik):
                </div>
                <p>Setiap melempar kartu, muncul refleksi 4 Dimensi. Pilih 1 perasaan secara cepat. Fasilitator digital akan memberikan bimbingan dan apresiasi PSE mendalam!</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  3. Fitur Safe Pass:
                </div>
                <p>Anak selalu boleh menekan "Safe Pass" jika ingin menyimpan ceritanya sendiri tanpa penalti atau pengurangan poin.</p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
                <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  4. Kemenangan Game:
                </div>
                <p>Permainan berakhir ketika salah satu pemain berhasil menghabiskan seluruh kartu di tangannya!</p>
              </div>
            </div>
            <button
              onClick={() => setShowRulesModal(false)}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm"
            >
              Mengerti & Siap Main!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
