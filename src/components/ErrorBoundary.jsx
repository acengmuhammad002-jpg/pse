import React from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950 text-white select-none">
          <div className="w-full max-w-md bg-slate-900 border-2 border-indigo-500/40 rounded-3xl p-6 sm:p-8 text-center shadow-2xl space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 text-amber-400 flex items-center justify-center mx-auto text-3xl shadow-inner">
              <AlertTriangle className="w-8 h-8 text-amber-400" />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-fredoka">
                Aplikasi Mengalami Kendala
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Terjadi kesalahan teknis ringan. Jangan khawatir, kamu bisa langsung memuat ulang permainan dengan tombol di bawah.
              </p>
            </div>

            <button
              onClick={this.handleReset}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Muat Ulang UNO CERITA</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
