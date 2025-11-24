import {
  BrainCircuit,
  PanelLeftClose,
  PanelLeftOpen,
  Loader2,
  Code2,
  X,
} from "lucide-react";

export default function Sidebar({
  isOpen,
  toggle,
  history,
  loading,
  onSelect,
}) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggle}
      />

      <aside
        className={`
          fixed md:relative z-50 h-full bg-slate-900/95 backdrop-blur-xl border-r border-slate-800 flex flex-col transition-all duration-300 ease-in-out
          ${
            isOpen
              ? "translate-x-0 w-72"
              : "-translate-x-full md:translate-x-0 md:w-20"
          }
        `}
      >
        <div className="p-5 flex items-center justify-between border-b border-slate-800/50 h-20">
          <div
            className={`flex items-center gap-3 font-bold text-xl ${
              !isOpen && "md:hidden"
            }`}
          >
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <BrainCircuit className="w-6 h-6 text-indigo-400" />
            </div>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
              Bolt
            </span>
          </div>

          <button
            onClick={toggle}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <span className="md:hidden">
              <X className="w-5 h-5" />
            </span>
            <span className="hidden md:block">
              {isOpen ? (
                <PanelLeftClose className="w-5 h-5" />
              ) : (
                <PanelLeftOpen className="w-5 h-5" />
              )}
            </span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
          <h3
            className={`text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-3 mt-4 ${
              !isOpen && "md:hidden"
            }`}
          >
            Recent History
          </h3>

          {loading ? (
            <div className="text-center py-4">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-indigo-500" />
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelect(item);
                  if (window.innerWidth < 768) toggle();
                }}
                className={`group flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-white/5 border border-transparent hover:border-indigo-500/30 transition-all ${
                  !isOpen ? "md:justify-center" : ""
                }`}
              >
                <Code2 className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 shrink-0 transition-colors" />
                <div className={`${!isOpen && "md:hidden"} overflow-hidden`}>
                  <p className="text-sm text-slate-300 truncate font-medium group-hover:text-white transition-colors">
                    {item.prompt}
                  </p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold mt-0.5">
                    {item.language}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  );
}
