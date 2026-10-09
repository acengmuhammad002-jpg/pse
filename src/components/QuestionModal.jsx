import React, { useState } from 'react';
import { DIMENSIONS } from '../questionsData';
import { Sparkles, Shield, ArrowRight, CheckCircle2, MessageCircleHeart } from 'lucide-react';
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
    onCompleteReflection({
      playerName: player.name,
      dimension: dimensionKey,
      question: questionData.question,
      answer: isSafePass
        ? 'Safe Pass (Menyimpan cerita dengan tenang)'
        : selectedOption?.text,
      recoveryAction: followUpChoice,
      isSafePass,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-slate-900 border-2 border-indigo-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl text-left relative overflow-hidden space-y-5">
        
        {/* Glow Accent Header */}
        <div
          className="absolute -top-24 -left-24 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-40"
          style={{ backgroundColor: dimension.color }}
        />

        {/* Dimension & Player Tag */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-black px-3 py-1 rounded-full text-white shadow-sm flex items-center gap-1.5"
              style={{ backgroundColor: dimension.color }}
            >
              <span>{dimension.icon}</span>
              <span>DIMENSI {dimension.name}</span>
            </span>
            <span className="text-xs font-semibold text-slate-400">
              Cerita {player.name}
            </span>
          </div>

          {/* Safe Pass Button */}
          {!isSafePass && !selectedOption && (
            <button
              onClick={handleSafePass}
              className="text-xs font-semibold text-slate-400 hover:text-emerald-400 px-3 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-all flex items-center gap-1.5"
              title="Lewati tanpa cerita, tanpa penalti atau pengurangan nilai"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              Safe Pass (Lewati)
            </button>
          )}
        </div>

        {/* CASE 1: SAFE PASS CHOSEN */}
        {isSafePass ? (
          <div className="space-y-4 py-2">
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3">
              <span className="text-2xl">🌱</span>
              <div>
                <h4 className="font-bold text-emerald-300 font-fredoka text-lg mb-1">
                  Pilihan yang Sangat Baik, {player.name}!
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Tidak apa-apa sama sekali. Kamu selalu berhak menyimpan ceritamu untuk dirimu sendiri dengan aman dan nyaman. Kehadiranmu di permainan ini sudah sangat berharga! 🤗
                </p>
              </div>
            </div>

            <button
              onClick={handleDone}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-base shadow-lg hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Lanjut Giliran Berikutnya</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : !selectedOption ? (
          /* CASE 2: MAIN QUESTION & CHOICES */
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-indigo-300 mb-1">
                Refleksi Spontan • Sentuh salah satu pilihan yang paling sesuai:
              </p>
              <h3 className="text-lg sm:text-xl font-bold text-white font-fredoka leading-snug">
                "{questionData.question}"
              </h3>
            </div>

            {/* Quick Answer Buttons (NO TYPING) */}
            <div className="grid grid-cols-1 gap-2.5">
              {questionData.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt)}
                  className="w-full text-left p-3.5 sm:p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700/80 hover:border-indigo-400 text-sm font-semibold text-slate-100 transition-all hover:scale-[1.01] active:scale-98 flex items-center justify-between group shadow-md"
                >
                  <span className="flex-1 pr-2">{opt.text}</span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all shrink-0" />
                </button>
              ))}
            </div>

            <p className="text-[11px] text-slate-400 text-center pt-1">
              💡 Jawabanmu menambah Team Well-being Meter kelas!
            </p>
          </div>
        ) : showFollowUp && !followUpChoice ? (
          /* CASE 3: FOLLOW UP SELF-CARE / RECOVERY STEP */
          <div className="space-y-4 py-1">
            {/* Empathetic facilitator feedback */}
            <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 flex items-start gap-3">
              <span className="text-2xl">💙</span>
              <div>
                <p className="text-sm font-semibold text-blue-200 leading-relaxed">
                  {selectedOption.feedback}
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-1">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Pertanyaan Pemulihan Diri:
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
                  className="text-left p-3 rounded-2xl bg-slate-800/90 hover:bg-indigo-950/50 border border-slate-700 hover:border-amber-400 text-xs sm:text-sm font-semibold text-slate-200 transition-all hover:scale-[1.01]"
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* CASE 4: FINAL WARM AFFIRMATION & APPRECIATION */
          <div className="space-y-5 py-2">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-purple-950/40 border border-indigo-400/30 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm font-fredoka">
                <MessageCircleHeart className="w-5 h-5 text-rose-400" />
                Apresiasi Fasilitator Digital
              </div>
              <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                {selectedOption.feedback}
              </p>
              {followUpChoice && (
                <div className="mt-2 pt-2 border-t border-slate-800/80 text-xs text-amber-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Rencana pemulihanmu: <strong>{followUpChoice}</strong></span>
                </div>
              )}
            </div>

            <button
              onClick={handleDone}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-teal-600 to-emerald-600 text-white font-bold text-base shadow-lg shadow-indigo-600/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Lanjut Giliran Berikutnya ✨</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
