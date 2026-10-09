import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { DIMENSIONS } from '../questionsData';
import { Trophy, RotateCcw, Star, CheckCircle } from 'lucide-react';
import { sounds } from '../sound';

export default function SummaryModal({
  players,
  winner,
  reflections = [],
  wellBeingScore,
  onPlayAgain,
}) {
  useEffect(() => {
    sounds.playVictory();
    // Launch festive confetti
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        confetti({
          particleCount: 70,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 70,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
        });
      }, 350);
    } catch {
      // ignore
    }
  }, []);

  // Compute dimension statistics from reflections
  const counts = { health: 0, having: 0, loving: 0, being: 0 };
  reflections.forEach((r) => {
    if (counts[r.dimension] !== undefined) {
      counts[r.dimension]++;
    }
  });

  const total = reflections.length || 1;
  const sortedDimensions = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
  const topDimensionKey = sortedDimensions[0] || 'loving';
  const topDimension = DIMENSIONS[topDimensionKey];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
      <div className="w-full max-w-2xl bg-slate-900 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6 my-auto">
        
        {/* Header Ribbon */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-sm font-bold">
          <Trophy className="w-4 h-4 text-amber-400" />
          Rangkuman Refleksi School Well-being
        </div>

        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-fredoka">
            {winner ? `Hore! ${winner.name} Berhasil Menuntaskan Kartu!` : 'Hebat! Team Well-being Meter Mencapai 100%!'}
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Terima kasih semuanya sudah saling berbagi cerita dan mendengarkan dengan penuh empati! 🌈
          </p>
        </div>

        {/* 1. Profil Tim (Dimensi yang Paling Banyak Dieksplorasi) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-left space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400" />
              Profil Tim: Fokus Terbesar Hari Ini
            </h4>
            <span className="text-xs font-bold text-indigo-300">
              Skor Well-being: {wellBeingScore}%
            </span>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-700">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
              style={{ backgroundColor: `${topDimension.color}25`, border: `1px solid ${topDimension.color}` }}
            >
              {topDimension.icon}
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                Dimensi {topDimension.name} ({topDimension.label})
              </div>
              <p className="text-xs text-slate-300">
                Kelompok kalian paling banyak mendiskusikan topik seputar {topDimension.description.toLowerCase()}
              </p>
            </div>
          </div>

          {/* Breakdown bars */}
          <div className="grid grid-cols-4 gap-2 pt-1 text-center">
            {Object.entries(DIMENSIONS).map(([key, dim]) => {
              const c = counts[key] || 0;
              const pct = Math.round((c / total) * 100);
              return (
                <div key={key} className="p-2 rounded-xl bg-slate-900/50 border border-slate-800">
                  <span className="text-[10px] font-bold block" style={{ color: dim.color }}>
                    {dim.name}
                  </span>
                  <span className="text-sm font-black text-white">{c} cerita</span>
                  <span className="text-[9px] text-slate-400 block">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Kartu Catatan Anak (Ringkasan Positif Tanpa Penghakiman) */}
        <div className="text-left space-y-2">
          <h4 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            Kartu Catatan Positif Setiap Anak:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {players.map((p, idx) => {
              const pReflections = reflections.filter((r) => r.playerName === p.name);
              const safePassCount = pReflections.filter((r) => r.isSafePass).length;
              const storyCount = pReflections.length - safePassCount;

              let summaryNote = 'Aktif berpartisipasi dan menjaga suasana bermain yang hangat!';
              if (storyCount >= 2) {
                summaryNote = 'Sangat terbuka berbagi perasaan dan mendengarkan teman dengan penuh rasa hormat. ✨';
              } else if (safePassCount > 0) {
                summaryNote = 'Mampu mengenali kenyamanan diri dan menghargai batasan pribadinya dengan bijak. 🌿';
              }

              return (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-800/70 border border-slate-700/80">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white text-sm">{p.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                      {pReflections.length} kontribusi
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-snug">
                    {summaryNote}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Pesan Afirmasi Akhir untuk Kelas */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-teal-950/40 to-indigo-950/40 border border-emerald-500/30 text-left flex items-start gap-3">
          <span className="text-2xl">🌟</span>
          <div>
            <h5 className="font-bold text-emerald-300 font-fredoka text-sm mb-1">
              Pesan Afirmasi untuk Kelas
            </h5>
            <p className="text-xs text-slate-200 leading-relaxed">
              "Kelas adalah tempat kita saling mendukung, bertumbuh, dan merasa aman bersama. Perasaan apa pun yang kalian rasakan hari ini adalah hal yang wajar. Tetaplah menjadi sahabat yang saling peduli dan saling menyemangati!"
            </p>
          </div>
        </div>

        {/* Tombol Main Lagi */}
        <button
          onClick={onPlayAgain}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-slate-950 font-black text-base shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 mx-auto"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Mainkan Lagi Bersama Kelas</span>
        </button>

      </div>
    </div>
  );
}
