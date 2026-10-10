import React, { useState } from 'react';
import { DIMENSIONS } from '../questionsData';
import { Sparkles, Shield, ArrowRight, CheckCircle2, Heart, Award } from 'lucide-react';
import { sounds } from '../sound';

export default function QuestionModal({
  player,
  dimensionKey,
  questionData,
  onCompleteReflection,
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [followUpChoice, setFollowUpChoice] = useState(null);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [isSafePass, setIsSafePass] = useState(false);

  const dimension = DIMENSIONS[dimensionKey] || DIMENSIONS.health;

  // Handle Main Question Choice
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    if (option.type === 'recovery' && questionData.followUp) {
      sounds.playComfort();
      setShowFollowUp(true);
    } else {
      sounds.playChime();
    }
  };

  // Handle Safe Pass
  const handleSafePass = () => {
    sounds.playComfort();
    setIsSafePass(true);
  };

  // Complete and close modal
  const handleDone = () => {
    const answerText = isSafePass
      ? 'Safe Pass (Menyimpan cerita dengan tenang)'
      : selectedOption?.text;

    onCompleteReflection({
      playerName: player.name,
      dimension: dimensionKey,
      question: questionData.question,
      answer: answerText,
      recoveryAction: followUpChoice,
      isSafePass,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-slate-900/95 border-2 border-indigo-500/40 rounded-3xl p-5 sm:p-7 shadow-2xl text-left relative overflow-hidden space-y-5 my-auto backdrop-blur-xl ring-1 ring-white/10">
        
        {/* Glow Accent Header */}
        <div
          className="absolute -top-20 -left-20 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-30"
          style={{ backgroundColor: dimension.color }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: dimension.color }}
        />

        {/* Dimension & Player Tag */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-black px-3 py-1 rounded-full text-white shadow-sm flex items-center gap-1.5"
              style={{ backgroundColor: dimension.color }}
            >
              <span>{dimension.icon}</span>
              <span>DIMENSI {dimension.name}</span>
            </span>
            <span className="text-xs font-bold text-slate-300">
              Refleksi: <span className="text-amber-300 font-fredoka">{player.name}</span>
            </span>
          </div>

          {/* Safe Pass Button */}
          {!isSafePass && !selectedOption && (
            <button
              onClick={handleSafePass}
              className="text-xs font-semibold text-slate-300 hover:text-emerald-300 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/50 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
              title="Lewati tanpa cerita, tanpa penalti atau pengurangan nilai"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Safe Pass (Lewati)</span>
            </button>
          )}
        </div>

        {/* CASE 1: SAFE PASS CHOSEN */}
        {isSafePass ? (
          <div className="space-y-4 py-2">
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3.5 shadow-lg">
              <span className="text-3xl">🌱</span>
              <div className="space-y-1.5">
                <h4 className="font-bold text-emerald-300 font-fredoka text-lg">
                  Pilihan yang Sangat Bijak, {player.name}!
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Tidak apa-apa sama sekali. Kamu selalu memiliki hak penuh untuk menjaga kenyamanan batinmu dan menyimpan cerita untuk dirimu sendiri.
                </p>
                <p className="text-xs text-emerald-200/90 leading-relaxed pt-1">
                  💡 Dalam pembelajaran sosial emosional, mengenali batasan diri dan merasa aman adalah bagian penting dari kebahagiaan di sekolah. Kehadiranmu dalam permainan ini sudah sangat berharga! 🤗
                </p>
              </div>
            </div>

            <button
              onClick={handleDone}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-base shadow-lg shadow-emerald-700/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Lanjut Giliran Berikutnya ✨</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : !selectedOption ? (
          /* CASE 2: MAIN QUESTION & QUICK CHOICES (NO TYPING) */
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Pilih satu perasaan atau tanggapan yang paling mendekati hatimu:</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white font-fredoka leading-snug">
                "{questionData.question}"
              </h3>
            </div>

            {/* Quick Answer Buttons */}
            <div className="grid grid-cols-1 gap-2.5">
              {questionData.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt)}
                  className="w-full text-left p-3.5 sm:p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700/80 hover:border-indigo-400 text-xs sm:text-sm font-semibold text-slate-100 transition-all hover:scale-[1.01] active:scale-98 flex items-center justify-between group shadow-md"
                >
                  <span className="flex-1 pr-2 leading-snug">{opt.text}</span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all shrink-0" />
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
              <span>⚡ Respon cepat tanpa mengetik</span>
              <span className="text-amber-300 font-semibold">+10% Meter Kebahagiaan Tim</span>
            </div>
          </div>
        ) : showFollowUp && !followUpChoice ? (
          /* CASE 3: FOLLOW UP SELF-CARE / RECOVERY STEP */
          <div className="space-y-4 py-1">
            {/* Empathetic facilitator feedback preview */}
            <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 flex items-start gap-3">
              <span className="text-2xl">💙</span>
              <div className="space-y-1">
                <div className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                  Fasilitator Mendengarkanmu
                </div>
                <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                  {selectedOption.validation || selectedOption.feedback || 'Terima kasih telah berbagi perasaan dengan jujur.'}
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-1">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Pertanyaan Pemulihan Diri (Self-Care):
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white font-fredoka">
                {questionData.followUp.prompt}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {questionData.followUp.choices.map((choice, cIdx) => (
                <button
                  key={cIdx}
                  onClick={() => {
                    sounds.playComfort();
                    setFollowUpChoice(choice);
                  }}
                  className="text-left p-3.5 rounded-2xl bg-slate-800/90 hover:bg-indigo-950/50 border border-slate-700/80 hover:border-amber-400 text-xs sm:text-sm font-semibold text-slate-200 transition-all hover:scale-[1.01] active:scale-95 shadow-md flex items-center gap-2 group"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400 group-hover:scale-125 transition-all shrink-0" />
                  <span className="flex-1 leading-snug">{choice}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* CASE 4: FINAL EXTENDED FACILITATOR RESPONSE (BIMBINGAN & REFLEKSI MENDALAM PSE) */
          <div className="space-y-4 py-1">
            
            {/* Extended Facilitator Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/70 via-slate-900 to-purple-950/50 border border-indigo-400/40 space-y-4 shadow-xl">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-indigo-500/20 pb-2.5">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs sm:text-sm font-fredoka">
                  <span className="text-lg">🦉</span>
                  <span>Bimbingan Fasilitator PSE Digital</span>
                </div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                  <Award className="w-3 h-3 text-emerald-400" />
                  +10% Well-being
                </span>
              </div>

              {/* Player's chosen sentiment highlight */}
              <div className="px-3.5 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                <Heart className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span className="truncate">
                  Cerita {player.name}: <strong>"{selectedOption.text}"</strong>
                </span>
              </div>

              {/* 1. Validation & Empathy */}
              <div className="space-y-1">
                <div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                  <span>✨</span>
                  <span>Apresiasi & Validasi Emosi:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed pl-4 border-l-2 border-cyan-400/50">
                  {selectedOption.validation || selectedOption.feedback}
                </p>
              </div>

              {/* 2. Educational & Psychological Insight */}
              {selectedOption.insight && (
                <div className="space-y-1">
                  <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <span>💡</span>
                    <span>Makna & Pembelajaran Sosial Emosional:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pl-4 border-l-2 border-amber-400/50">
                    {selectedOption.insight}
                  </p>
                </div>
              )}

              {/* 3. Actionable Advice & Self-care */}
              {selectedOption.advice && (
                <div className="space-y-1">
                  <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <span>🌱</span>
                    <span>Langkah Penguat Hari Ini:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pl-4 border-l-2 border-emerald-400/50">
                    {selectedOption.advice}
                  </p>
                </div>
              )}

              {/* Recovery choice recap if selected */}
              {followUpChoice && (
                <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Komitmen pemulihan dirimu: <strong>{followUpChoice}</strong></span>
                </div>
              )}
            </div>

            <button
              onClick={handleDone}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-teal-600 to-emerald-600 text-white font-bold text-base shadow-lg shadow-indigo-600/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Lanjut Giliran Permainan ✨</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
