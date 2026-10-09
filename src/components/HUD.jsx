import React, { useState } from 'react';
import { Volume2, VolumeX, HelpCircle, RotateCw, RotateCcw, Home, Sparkles, HeartHandshake } from 'lucide-react';
import { sounds } from '../sound';

export default function HUD({
  players,
  activePlayerIndex,
  direction,
  wellBeingScore,
  onResetToLobby,
}) {
  const [muted, setMuted] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const handleToggleMute = () => {
    const isMuted = sounds.toggleMute();
    setMuted(isMuted);
  };

  return (
    <>
      {/* Top HUD Bar */}
      <header className="absolute top-0 left-0 right-0 z-20 flex flex-col sm:flex-row items-center justify-between p-3 sm:px-6 gap-2 bg-gradient-to-b from-slate-950/90 to-transparent pointer-events-auto">
        
        {/* Left: Branding & Turn Direction */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-700/80 px-3.5 py-1.5 rounded-2xl shadow-lg backdrop-blur-md">
            <span className="font-fredoka text-lg font-bold text-amber-400">UNO CERITA</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
              3D
            </span>
          </div>

          <div
            title={`Arah Putaran: ${direction === 1 ? 'Searah Jarum Jam' : 'Berlawanan Jarum Jam'}`}
            className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-700/80 px-3 py-1.5 rounded-2xl text-xs font-bold text-slate-300 backdrop-blur-md"
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
          <div className="bg-slate-900/90 border border-indigo-500/30 px-3.5 py-1.5 rounded-2xl shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span className="flex items-center gap-1 text-emerald-400">
                <HeartHandshake className="w-3.5 h-3.5" /> Team Well-being Meter
              </span>
              <span className="text-amber-300 font-extrabold">{wellBeingScore}%</span>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
              <div
                className="h-full rounded-full bg-gradient-to-r from-red-500 via-amber-400 via-emerald-400 to-blue-500 transition-all duration-700 ease-out shadow-inner"
                style={{ width: `${Math.min(100, Math.max(0, wellBeingScore))}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRules(true)}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
            title="Cara Bermain"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
          <button
            onClick={handleToggleMute}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
            title={muted ? 'Nyalakan Suara' : 'Matikan Suara'}
          >
            {muted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
          <button
            onClick={onResetToLobby}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-rose-400 hover:bg-slate-800 transition-all"
            title="Kembali ke Menu Utama"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Player Indicators List on Left Screen */}
      <div className="absolute top-20 left-4 z-20 hidden md:flex flex-col gap-2 pointer-events-none">
        {players.map((p, idx) => {
          const isActive = idx === activePlayerIndex;
          const colors = [
            'border-red-500/70 text-red-400',
            'border-blue-500/70 text-blue-400',
            'border-emerald-500/70 text-emerald-400',
            'border-amber-500/70 text-amber-400',
          ];
          return (
            <div
              key={idx}
              className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl border backdrop-blur-md transition-all ${
                isActive
                  ? `bg-slate-900/95 ${colors[idx % 4]} scale-105 shadow-lg ring-2 ring-indigo-400/50`
                  : 'bg-slate-950/60 border-slate-800 text-slate-400'
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full ${
                  idx === 0
                    ? 'bg-red-500'
                    : idx === 1
                    ? 'bg-blue-500'
                    : idx === 2
                    ? 'bg-emerald-500'
                    : 'bg-amber-400'
                } ${isActive ? 'animate-ping' : ''}`}
              />
              <span className="text-xs font-bold text-white">{p.name}</span>
              <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-300">
                {p.hand.length} kartu
              </span>
              {isActive && (
                <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-indigo-600 text-white ml-auto">
                  GILIRAN
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Rules Modal */}
      {showRules && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border-2 border-indigo-500/40 rounded-3xl max-w-lg w-full p-6 text-left shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-xl font-bold text-amber-400 font-fredoka flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" /> Aturan Main UNO CERITA
              </h3>
              <button
                onClick={() => setShowRules(false)}
                className="text-slate-400 hover:text-white font-bold text-lg px-2"
              >
                ✕
              </button>
            </div>
            
            <div className="text-xs sm:text-sm text-slate-300 space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              <p>
                <strong>Tujuan:</strong> Bermain kartu sambil mengeksplorasi perasaan dan kebahagiaan di sekolah melalui 4 Dimensi School Well-being!
              </p>
              <div className="p-2.5 rounded-xl bg-slate-800/80 space-y-1">
                <p className="font-semibold text-white">4 Warna Dimensi:</p>
                <p><span className="text-red-400 font-bold">🔴 HEALTH:</span> Kesehatan tubuh, energi fisik, istirahat nyaman.</p>
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
                <strong>Respon Fasilitator Digital (Tanpa Mengetik):</strong>
                <br />Setiap kali melempar kartu, pilih salah satu tombol jawaban perasaan. Pilihan jawabanmu akan diapresiasi oleh fasilitator digital. Kamu juga selalu bisa memilih <strong>"Safe Pass"</strong> jika ingin menyimpan ceritamu.
              </p>
            </div>

            <button
              onClick={() => setShowRules(false)}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md transition-all"
            >
              Mengerti & Lanjut Main
            </button>
          </div>
        </div>
      )}
    </>
  );
}
