import React from 'react';
import { canPlayCard } from '../gameLogic';
import { PlusCircle, Sparkles, AlertCircle } from 'lucide-react';
import { sounds } from '../sound';

export default function PlayerHand({
  players,
  activePlayerIndex,
  topCard,
  activeChosenColor,
  onPlayCard,
  onDrawCard,
  disabled = false,
  isBotTurn = false,
}) {
  const activePlayer = players[activePlayerIndex];
  if (!activePlayer) return null;

  const playerColorMap = [
    'from-red-600 to-rose-700 border-red-400',
    'from-blue-600 to-indigo-700 border-blue-400',
    'from-emerald-600 to-teal-700 border-emerald-400',
    'from-amber-600 to-yellow-700 border-amber-400',
  ];

  const cardBgColors = {
    health: 'bg-gradient-to-br from-red-500 via-rose-600 to-red-700 border-red-300 text-white',
    having: 'bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 border-amber-200 text-slate-900',
    loving: 'bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 border-emerald-300 text-white',
    being: 'bg-gradient-to-br from-blue-500 via-sky-600 to-indigo-700 border-blue-300 text-white',
    wild: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 border-amber-400 text-white',
  };

  const dimensionNameMap = {
    health: 'HEALTH',
    having: 'HAVING',
    loving: 'LOVING',
    being: 'BEING',
    wild: 'WILD',
  };

  const playableCardsCount = activePlayer.hand.filter((c) =>
    canPlayCard(c, topCard, activeChosenColor)
  ).length;

  return (
    <div className="absolute bottom-2 sm:bottom-3 left-0 right-0 z-20 flex flex-col items-center px-2 sm:px-4 pointer-events-none">
      
      {/* Player Turn & Status Banner */}
      <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-2.5 px-4 sm:px-6 py-1.5 mb-2 rounded-2xl bg-slate-950/90 border border-slate-700/80 shadow-2xl backdrop-blur-md">
        <div
          className={`w-3.5 h-3.5 rounded-full bg-gradient-to-tr ${playerColorMap[activePlayerIndex % 4]} shadow-md animate-pulse`}
        />
        <span className="text-xs sm:text-sm font-extrabold text-white flex items-center gap-1.5">
          <span>Giliran:</span>
          <span className="text-amber-300 font-fredoka text-sm sm:text-base">{activePlayer.name}</span>
          <span className="text-xs text-slate-400 font-normal">({activePlayer.hand.length} kartu)</span>
          {isBotTurn && <span className="text-xs text-indigo-300 ml-1 animate-pulse">🤖 (Giliran bot...)</span>}
        </span>

        {activePlayer.hand.length === 1 && (
          <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-xs font-black animate-bounce shadow-lg flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> TINGGAL 1 KARTU! (UNO)
          </span>
        )}

        {playableCardsCount === 0 && !disabled && (
          <span className="text-[11px] sm:text-xs text-amber-300/90 font-medium flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Tak ada kartu cocok? Ambil 1 dari Deck!</span>
          </span>
        )}
      </div>

      {/* Cards Dock / Tray */}
      <div className="pointer-events-auto w-full max-w-4xl bg-slate-900/90 border-2 border-white/10 rounded-3xl p-2.5 sm:p-3 shadow-2xl backdrop-blur-xl flex items-center justify-between gap-2.5 sm:gap-3 ring-1 ring-white/10">
        
        {/* Draw Card Button */}
        <button
          onClick={onDrawCard}
          disabled={disabled}
          className="shrink-0 flex flex-col items-center justify-center w-20 sm:w-24 h-28 sm:h-32 rounded-2xl bg-gradient-to-b from-indigo-600 via-indigo-800 to-slate-950 border-2 border-indigo-400/60 text-white shadow-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all group cursor-pointer"
          title="Ambil Kartu dari Deck"
        >
          <div className="w-8 h-8 rounded-full bg-indigo-500/40 flex items-center justify-center mb-1 group-hover:bg-indigo-400/60 transition-all shadow-inner">
            <PlusCircle className="w-5 h-5 text-indigo-200" />
          </div>
          <span className="text-xs font-bold leading-tight">Ambil</span>
          <span className="text-[10px] text-indigo-300 font-medium">Deck (+1)</span>
        </button>

        {/* Hand Cards Horizontal Scroll */}
        <div className="flex-1 flex items-center gap-2 sm:gap-3 overflow-x-auto py-2 px-1 scrollbar-thin scrollbar-thumb-slate-700">
          {activePlayer.hand.map((card, idx) => {
            const isPlayable = canPlayCard(card, topCard, activeChosenColor);
            const cardBg = cardBgColors[card.color] || 'bg-slate-700 text-white';

            return (
              <button
                key={card.id ? `${card.id}-${idx}` : `card-${idx}`}
                disabled={disabled || !isPlayable}
                onClick={() => {
                  sounds.playCard();
                  onPlayCard(card, idx);
                }}
                className={`group relative shrink-0 w-20 sm:w-22 h-28 sm:h-32 rounded-2xl border-2 p-2 flex flex-col justify-between items-center transition-all duration-200 ${cardBg} ${
                  isPlayable && !disabled
                    ? 'hover:-translate-y-3 hover:shadow-2xl cursor-pointer ring-2 ring-white ring-offset-2 ring-offset-slate-900 hover:scale-105'
                    : 'opacity-40 grayscale-[40%] cursor-not-allowed scale-95'
                }`}
                title={
                  isPlayable
                    ? `Mainkan kartu ${card.value} (${dimensionNameMap[card.color]})`
                    : 'Kartu tidak cocok dengan warna atau simbol saat ini'
                }
              >
                {/* Top Corner Value */}
                <div className="w-full flex justify-between items-center text-xs font-extrabold leading-none">
                  <span>{card.value}</span>
                  <span className="text-[9px] opacity-80">{dimensionNameMap[card.color]}</span>
                </div>

                {/* Center Big Symbol */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center shadow-inner my-auto">
                  <span className="text-lg sm:text-xl font-black font-fredoka leading-none drop-shadow">
                    {card.value}
                  </span>
                </div>

                {/* Bottom Corner Value */}
                <div className="w-full flex justify-between items-center text-[10px] font-bold leading-none">
                  <span className="text-[9px] opacity-75">{card.type !== 'number' ? 'AKSI' : 'KARTU'}</span>
                  <span className="rotate-180">{card.value}</span>
                </div>

                {/* Playable badge */}
                {isPlayable && !disabled && (
                  <span className="absolute -top-2 -right-1 px-1.5 py-0.2 text-[9px] font-black rounded-full bg-amber-400 text-slate-950 shadow-md">
                    BISA
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
