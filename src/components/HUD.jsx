import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Music2, HelpCircle, RotateCw, RotateCcw, Home, Sparkles, HeartHandshake, CheckCircle, User } from 'lucide-react';
import { sounds } from '../sound';
import DeveloperModal from './DeveloperModal';

export default function HUD({
  players,
  activePlayerIndex,
  direction,
  wellBeingScore,
  onResetToLobby,
}) {
  const [muted, setMuted] = useState(false);
  const [bgmOn, setBgmOn] = useState(sounds.bgmPlaying);
  const [showRules, setShowRules] = useState(false);
  const [showDeveloperModal, setShowDeveloperModal] = useState(false);

  const handleToggleMute = () => {
    const isMuted = sounds.toggleMute();
    setMuted(isMuted);
  };

  const handleToggleBGM = () => {
    const playing = sounds.toggleBGM();
    setBgmOn(playing);
  };

  return (
    <>
      {/* Top Modern Glassmorphic HUD Bar */}
      <header className="absolute top-0 left-0 right-0 z-20 flex flex-col sm:flex-row items-center justify-between p-3 sm:px-6 gap-2 bg-gradient-to-b from-slate-950/95 via-slate-950/70 to-transparent pointer-events-auto">
        
        {/* Left: Branding & Turn Direction */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 bg-slate-900/90 border border-indigo-500/30 px-3.5 py-1.5 rounded-2xl shadow-xl shadow-indigo-950/50 backdrop-blur-xl">
            <span className="font-fredoka text-lg font-black bg-gradient-to-r from-amber-300 via-rose-300 to-indigo-300 bg-clip-text text-transparent">
              UNO CERITA
            </span>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 text-indigo-300 border border-indigo-400/20">
              3D
            </span>
          </div>

          <div
            title={`Arah Putaran: ${direction === 1 ? 'Searah Jarum Jam' : 'Berlawanan Jarum Jam'}`}
            className="flex items-center gap-1.5 bg-slate-900/85 border border-slate-700/70 px-3 py-1.5 rounded-2xl text-xs font-bold text-slate-200 backdrop-blur-xl shadow-lg"
          >
            {direction === 1 ? (
              <>
                <RotateCw className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Searah Jarum</span>
              </>
            ) : (
              <>
                <RotateCcw className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
                <span>Lawan Jarum</span>
              </>
            )}
          </div>
        </div>

        {/* Center: Team Well-being Meter (0 - 100%) */}
        <div className="flex-1 max-w-md w-full mx-2">
          <div className={`px-4 py-2 rounded-2xl border shadow-xl backdrop-blur-xl transition-all duration-300 ${
            wellBeingScore >= 100
              ? 'bg-amber-950/50 border-amber-400/60 shadow-amber-500/20'
              : 'bg-slate-900/90 border-indigo-500/30 shadow-indigo-950/40'
          }`}>
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
                <span>Team Well-being Meter</span>
              </span>
              <div className="flex items-center gap-1">
                {wellBeingScore >= 100 && (
                  <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-full bg-amber-500/30 text-amber-300 border border-amber-400/40 animate-pulse">
                    MAKSIMAL ✨
                  </span>
                )}
                <span className="text-amber-300 font-black text-sm">{wellBeingScore}%</span>
              </div>
            </div>

            <div className="relative w-full h-3 bg-slate-950/80 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
              <div
                className="h-full rounded-full bg-gradient-to-r from-red-500 via-amber-400 via-emerald-400 to-blue-500 transition-all duration-700 ease-out shadow-lg"
                style={{ width: `${Math.min(100, Math.max(0, wellBeingScore))}%` }}
              />
            </div>
            
            <div className="text-[10px] text-slate-400 mt-1 flex justify-between items-center font-medium">
              <span>Refleksi bersama</span>
              <span className="text-slate-300">Menang saat kartu habis 🃏</span>
            </div>
          </div>
        </div>

        {/* Right: Actions (Music BGM, SFX Mute, Rules, Home) */}
        <div className="flex items-center gap-2">
          {/* BGM Toggle Button */}
          <button
            onClick={handleToggleBGM}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border text-xs font-bold transition-all shadow-md backdrop-blur-xl ${
              bgmOn
                ? 'bg-indigo-600/30 border-indigo-400 text-indigo-200 ring-2 ring-indigo-400/40 shadow-indigo-500/20'
                : 'bg-slate-900/85 border-slate-700/80 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title={bgmOn ? 'Matikan Musik Pengiring' : 'Nyalakan Musik Pengiring'}
          >
            {bgmOn ? (
              <>
                <Music2 className="w-3.5 h-3.5 text-indigo-300 animate-pulse" />
                <span className="hidden sm:inline">Musik ON</span>
              </>
            ) : (
              <>
                <Music className="w-3.5 h-3.5 opacity-60" />
                <span className="hidden sm:inline">Musik OFF</span>
              </>
            )}
          </button>

          {/* SFX Mute Button */}
          <button
            onClick={handleToggleMute}
            className="p-2 rounded-2xl bg-slate-900/85 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-all shadow-md backdrop-blur-xl"
            title={muted ? 'Nyalakan Efek Suara' : 'Matikan Efek Suara'}
          >
            {muted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Developer Info Button */}
          <button
            onClick={() => setShowDeveloperModal(true)}
            className="p-2 rounded-2xl bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 hover:text-white hover:bg-indigo-900/80 transition-all shadow-md backdrop-blur-xl cursor-pointer"
            title="Informasi Pengembang Aceng Muhammad Sirojudin"
          >
            <User className="w-4 h-4 text-indigo-300" />
          </button>

          {/* Rules Button */}
          <button
            onClick={() => setShowRules(true)}
            className="p-2 rounded-2xl bg-slate-900/85 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-all shadow-md backdrop-blur-xl cursor-pointer"
            title="Panduan Bermain"
          >
            <HelpCircle className="w-4 h-4 text-amber-300" />
          </button>

          {/* Lobby Button */}
          <button
            onClick={onResetToLobby}
            className="p-2 rounded-2xl bg-slate-900/85 border border-slate-700/80 text-slate-300 hover:text-rose-400 hover:bg-slate-800 transition-all shadow-md backdrop-blur-xl"
            title="Kembali ke Menu Utama"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Modern Player Indicators List on Left Screen */}
      <div className="absolute top-24 left-4 z-20 hidden md:flex flex-col gap-2.5 pointer-events-none">
        {players.map((p, idx) => {
          const isActive = idx === activePlayerIndex;
          const colors = [
            'border-red-500/70 text-red-300 shadow-red-950/40',
            'border-blue-500/70 text-blue-300 shadow-blue-950/40',
            'border-emerald-500/70 text-emerald-300 shadow-emerald-950/40',
            'border-amber-500/70 text-amber-300 shadow-amber-950/40',
          ];
          const dotColors = ['bg-red-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-400'];

          return (
            <div
              key={idx}
              className={`flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border backdrop-blur-xl transition-all duration-300 shadow-lg ${
                isActive
                  ? `bg-slate-900/95 ${colors[idx % 4]} scale-105 ring-2 ring-indigo-400/50 shadow-xl`
                  : 'bg-slate-950/75 border-slate-800/80 text-slate-400'
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full ${dotColors[idx % 4]} ${
                  isActive ? 'animate-ping ring-4 ring-white/30' : 'opacity-70'
                }`}
              />
              <span className="text-xs font-bold text-white tracking-wide">{p.name}</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-slate-800/90 text-slate-300 border border-slate-700/40">
                {p.hand.length} kartu
              </span>
              {isActive && (
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white ml-auto shadow-md">
                  GILIRAN
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Rules Modal */}
      {showRules && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900/95 border-2 border-indigo-500/40 rounded-3xl max-w-lg w-full p-6 text-left shadow-2xl space-y-4 backdrop-blur-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-xl font-bold text-amber-400 font-fredoka flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" /> Aturan Main UNO CERITA
              </h3>
              <button
                onClick={() => setShowRules(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white font-bold transition-all"
              >
                ✕
              </button>
            </div>
            
            <div className="text-xs sm:text-sm text-slate-300 space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              <div className="p-3 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200">
                <p className="font-bold mb-1 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> Syarat Menang Permainan:
                </p>
                <p className="text-xs text-slate-300">
                  Game selesai ketika <strong>salah satu pemain berhasil menghabiskan seluruh kartu di tangannya</strong>.
                  Skor <em>Team Well-being Meter</em> adalah pencapaian bersama kelas yang terus bertambah setiap kali ada yang merespon cerita.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-800/80 space-y-1.5 border border-slate-700/60">
                <p className="font-semibold text-white">4 Warna Dimensi School Well-being:</p>
                <p><span className="text-red-400 font-bold">🔴 HEALTH:</span> Kesehatan tubuh, energi fisik, relaksasi.</p>
                <p><span className="text-amber-400 font-bold">🟡 HAVING:</span> Fasilitas kelas, kebersihan, rasa aman di sekolah.</p>
                <p><span className="text-emerald-400 font-bold">🟢 LOVING:</span> Pertemanan, kerja sama, saling menolong.</p>
                <p><span className="text-blue-400 font-bold">🔵 BEING:</span> Bakat, kreativitas, keberanian berekspresi.</p>
              </div>

              <p>
                <strong>Aturan Kartu:</strong>
                <br />• Cocokkan kartu berdasarkan <strong>Warna</strong> atau <strong>Angka/Simbol</strong>.
                <br />• <strong>Reverse (🔄):</strong> Membalik arah putaran meja.
                <br />• <strong>Skip (🚫):</strong> Melewati giliran pemain berikutnya.
                <br />• <strong>+2:</strong> Pilih teman mana saja yang ingin kamu beri 2 kartu tambahan!
                <br />• <strong>WILD & +4:</strong> Bebas dimainkan & pilih warna dimensi baru.
              </p>

              <p>
                <strong>Fasilitator Digital Otomatis:</strong>
                <br />Setiap kali pemain melempar kartu, sistem langsung menampilkan dialog refleksi ramah anak tanpa perlu mengetik apapun. Pilih perasaan yang paling cocok, atau pilih <strong>"Safe Pass"</strong> untuk kenyamanan pribadi.
              </p>
            </div>

            <button
              onClick={() => setShowRules(false)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-teal-600 to-emerald-600 hover:scale-[1.01] active:scale-98 text-white font-bold text-sm shadow-lg transition-all"
            >
              Mengerti & Lanjut Main
            </button>
          </div>
        </div>
      )}

      {/* Developer Modal */}
      {showDeveloperModal && (
        <DeveloperModal onClose={() => setShowDeveloperModal(false)} />
      )}
    </>
  );
}
