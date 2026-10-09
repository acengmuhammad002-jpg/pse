import React from 'react';
import { Heart, School, Users2, Award } from 'lucide-react';
import { sounds } from '../sound';

export default function SpecialActionModal({
  type, // 'targetDraw2' or 'chooseColor'
  activePlayer,
  otherPlayers, // for targetDraw2: array of { index, name, count }
  onSelectTarget,
  onSelectColor,
}) {
  if (type === 'targetDraw2') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
        <div className="w-full max-w-md bg-slate-900 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-7 shadow-2xl text-center space-y-4">
          
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center mx-auto text-2xl font-black">
            +2
          </div>

          <div>
            <h3 className="text-xl font-bold text-white font-fredoka">
              Lempar Kartu +2! 🎯
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              {activePlayer.name}, pilih teman yang mau kamu kirimi 2 kartu bonus:
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2.5 pt-1">
            {otherPlayers.map((player) => (
              <button
                key={player.index}
                onClick={() => {
                  sounds.playPlusTwo();
                  onSelectTarget(player.index);
                }}
                className="w-full p-3.5 rounded-2xl bg-slate-800 hover:bg-amber-950/50 border border-slate-700 hover:border-amber-400 text-left flex items-center justify-between group transition-all hover:scale-[1.02]"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-sm text-white">
                    {player.name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-white text-sm block">{player.name}</span>
                    <span className="text-[11px] text-slate-400">{player.count} kartu tersisa</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-all">
                  Kirim +2 →
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'chooseColor') {
    const dimensionOptions = [
      { key: 'health', name: 'HEALTH', icon: Heart, color: 'bg-red-500 hover:bg-red-600', text: 'Kesehatan & Energi' },
      { key: 'having', name: 'HAVING', icon: School, color: 'bg-amber-500 hover:bg-amber-600', text: 'Kondisi & Fasilitas' },
      { key: 'loving', name: 'LOVING', icon: Users2, color: 'bg-emerald-500 hover:bg-emerald-600', text: 'Pertemanan' },
      { key: 'being', name: 'BEING', icon: Award, color: 'bg-blue-500 hover:bg-blue-600', text: 'Potensi & Percaya Diri' },
    ];

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
        <div className="w-full max-w-md bg-slate-900 border-2 border-indigo-500/50 rounded-3xl p-6 sm:p-7 shadow-2xl text-center space-y-4">
          
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 text-indigo-400 flex items-center justify-center mx-auto text-2xl">
            🌈
          </div>

          <div>
            <h3 className="text-xl font-bold text-white font-fredoka">
              Pilih Dimensi Warna Baru!
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              {activePlayer.name}, tentukan tema cerita untuk putaran selanjutnya:
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            {dimensionOptions.map((dim) => {
              const Icon = dim.icon;
              return (
                <button
                  key={dim.key}
                  onClick={() => {
                    sounds.playChime();
                    onSelectColor(dim.key);
                  }}
                  className={`p-4 rounded-2xl ${dim.color} text-white font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center gap-1.5`}
                >
                  <Icon className="w-6 h-6" />
                  <span>{dim.name}</span>
                  <span className="text-[10px] font-normal opacity-90">{dim.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
