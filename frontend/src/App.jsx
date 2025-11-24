import { useState, useEffect, useRef } from "react";
import { useCodeGenerator } from "./hooks/useCodeGenerator";
import Sidebar from "./components/Sidebar";
import InputPanel from "./components/InputPanel";
import CodeDisplay from "./components/CodeDisplay";
import { Menu, BrainCircuit } from "lucide-react";

function App() {
  const {
    userId,
    history,
    currentResult,
    isGenerating,
    isLoadingHistory,
    generateCode,
    selectHistoryItem,
  } = useCodeGenerator();

  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (currentResult && window.innerWidth < 768) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentResult]);

  return (
    <div className="flex h-screen w-screen bg-slate-950 text-slate-200 font-sans overflow-hidden selection:bg-indigo-500/30">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[120px]"></div>
      </div>

      <Sidebar
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
        history={history}
        loading={isLoadingHistory}
        onSelect={selectHistoryItem}
      />

      <main className="flex-1 flex flex-col md:flex-row relative z-10 h-full overflow-hidden backdrop-blur-[1px]">
        <div className="md:hidden flex items-center justify-between p-4 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2 font-bold text-lg">
            <BrainCircuit className="w-6 h-6 text-indigo-400" />
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              DevMind
            </span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
          <InputPanel
            onGenerate={generateCode}
            isGenerating={isGenerating}
            disabled={!userId}
          />

          <div
            ref={bottomRef}
            className="flex-1 flex flex-col min-h-[500px] md:min-h-0"
          >
            <CodeDisplay data={currentResult} />
          </div>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>
    </div>
  );
}

export default App;
