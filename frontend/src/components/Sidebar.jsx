import {
  BrainCircuit,
  PanelLeftClose,
  PanelLeftOpen,
  Loader2,
  Code2,
  X,
  Sparkles,
  Clock,
} from "lucide-react";
import { useState } from "react";

export default function Sidebar({
  isOpen,
  toggle,
  history,
  loading,
  onSelect,
  selectedId,
}) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggle}
      />

      <aside
        className={`
          fixed md:relative z-50 h-full bg-gradient-to-b from-slate-900/98 via-slate-900/95 to-slate-950/98 
          backdrop-blur-2xl border-r border-slate-700/50 flex flex-col transition-all duration-300 ease-in-out
          shadow-2xl shadow-indigo-500/5
          ${
            isOpen
              ? "translate-x-0 w-80"
              : "-translate-x-full md:translate-x-0 md:w-20"
          }
        `}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none animate-gradient" />

        <div className="relative p-6 flex items-center justify-between border-b border-slate-700/50 h-24 bg-slate-900/50">
          <div
            className={`flex items-center gap-3 transition-opacity duration-200 ${
              !isOpen && "md:opacity-0 md:pointer-events-none"
            }`}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl blur-md opacity-50 group-hover:opacity-70 transition-opacity" />
              <div className="relative p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg transform group-hover:scale-105 transition-transform">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-text">
                Bolt
              </span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                AI Assistant
              </span>
            </div>
          </div>

          <button
            onClick={toggle}
            className="relative p-2.5 rounded-xl hover:bg-slate-800/50 text-slate-400 hover:text-white 
            transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/20 group border border-transparent hover:border-slate-700
            active:scale-95"
            title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <span className="md:hidden">
              <X className="w-5 h-5" />
            </span>
            <span className="hidden md:block">
              {isOpen ? (
                <PanelLeftClose className="w-5 h-5 group-hover:scale-110 transition-transform" />
              ) : (
                <PanelLeftOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
              )}
            </span>
          </button>
        </div>

        <div className="relative flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
          <div
            className={`flex items-center gap-2 px-3 py-2 mb-4 transition-opacity duration-200 ${
              !isOpen && "md:opacity-0 md:h-0 md:overflow-hidden"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Recent Prompts
            </h3>
          </div>

          {loading ? (
            <div className="space-y-3 animate-fade-in">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/30 animate-pulse"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="w-8 h-8 bg-slate-700/50 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-slate-700/50 rounded w-3/4" />
                    <div className="h-2 bg-slate-700/30 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : history.length === 0 ? (
            <div
              className={`text-center py-12 animate-fade-in ${
                !isOpen && "md:hidden"
              }`}
            >
              <div className="relative inline-block mb-3">
                <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full animate-pulse" />
                <Code2 className="w-10 h-10 mx-auto text-slate-700 relative" />
              </div>
              <p className="text-sm text-slate-500 font-medium">
                No history yet
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Start generating code!
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {history.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelect(item);
                    if (window.innerWidth < 768) toggle();
                  }}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`group relative flex items-center gap-3 p-3.5 rounded-xl cursor-pointer 
                  transition-all duration-300 border
                  ${
                    selectedId === item.id
                      ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-indigo-500/50 shadow-lg shadow-indigo-500/20"
                      : "border-transparent hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10 hover:border-indigo-500/30"
                  }
                  hover:shadow-lg hover:shadow-indigo-500/10
                  active:scale-[0.98]
                  animate-slide-in
                  ${!isOpen ? "md:justify-center md:p-3" : ""}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  title={item.prompt}
                >
                  <div className="relative shrink-0">
                    <div
                      className={`absolute inset-0 rounded-lg blur-sm transition-opacity ${
                        selectedId === item.id || hoveredId === item.id
                          ? "bg-indigo-500/30 opacity-100"
                          : "bg-indigo-500/20 opacity-0"
                      }`}
                    />
                    <div
                      className={`relative p-2 rounded-lg border transition-all ${
                        selectedId === item.id
                          ? "bg-indigo-500/20 border-indigo-500/50"
                          : "bg-slate-800/50 border-slate-700/50 group-hover:bg-slate-800 group-hover:border-indigo-500/50"
                      }`}
                    >
                      <Code2
                        className={`w-4 h-4 transition-colors ${
                          selectedId === item.id
                            ? "text-indigo-400"
                            : "text-slate-500 group-hover:text-indigo-400"
                        }`}
                      />
                    </div>
                  </div>

                  <div
                    className={`${
                      !isOpen && "md:hidden"
                    } overflow-hidden flex-1 min-w-0`}
                  >
                    <p
                      className={`text-sm truncate font-medium leading-snug transition-colors ${
                        selectedId === item.id
                          ? "text-white"
                          : "text-slate-300 group-hover:text-white"
                      }`}
                    >
                      {item.prompt}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider
                      transition-all ${
                        selectedId === item.id
                          ? "bg-gradient-to-r from-indigo-500/30 to-purple-500/30 text-indigo-200 border border-indigo-400/50"
                          : "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border border-indigo-500/30"
                      }`}
                      >
                        {item.language}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`absolute right-2 transition-all duration-300 ${
                      selectedId === item.id
                        ? "opacity-100 scale-100"
                        : hoveredId === item.id
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-0"
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                  </div>

                  <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                    <div className="ripple" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="h-20 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
      </aside>
    </>
  );
}
