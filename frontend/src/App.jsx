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
  const [selectedId, setSelectedId] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (currentResult && window.innerWidth < 768) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentResult]);

  const handleSelectHistoryItem = (item) => {
    setSelectedId(item.id);
    selectHistoryItem(item);
  };

  return (
    <div className="flex h-screen w-screen bg-slate-950 text-slate-200 font-sans overflow-hidden selection:bg-indigo-500/30 selection:text-white">
      {/* Progress bar when generating */}
      {isGenerating && (
        <div className="fixed top-0 left-0 right-0 z-[999] h-1 bg-slate-800">
          <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-progress-bar origin-left shadow-lg shadow-indigo-500/50" />
        </div>
      )}

      {/* Enhanced animated background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Primary gradient orbs */}
        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-indigo-600/15 to-purple-600/10 blur-[120px] animate-pulse-slow" />
        <div
          className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl from-purple-600/15 to-pink-600/10 blur-[120px] animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />

        {/* Secondary accent orbs */}
        <div
          className="absolute top-[40%] right-[20%] w-[30%] h-[30%] rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/5 blur-[100px] animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] animate-float"
          style={{
            backgroundImage: `linear-gradient(to right, rgb(99 102 241) 1px, transparent 1px),
                           linear-gradient(to bottom, rgb(99 102 241) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
        history={history}
        loading={isLoadingHistory}
        onSelect={handleSelectHistoryItem}
        selectedId={selectedId}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-10 h-full overflow-hidden min-w-0">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between px-5 py-4 bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shrink-0 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg blur-md opacity-50 group-hover:opacity-70 transition-opacity" />
              <div className="relative p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg transform group-hover:scale-105 transition-transform">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-text">
                Bolt
              </span>
              <span className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider">
                AI Assistant
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all border border-transparent hover:border-slate-700 active:scale-95"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area - Properly constrained flex layout */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0 min-w-0">
          <InputPanel
            onGenerate={generateCode}
            isGenerating={isGenerating}
            disabled={!userId}
          />

          <div
            ref={bottomRef}
            className="flex-1 flex flex-col min-h-0 min-w-0 overflow-hidden"
          >
            <CodeDisplay data={currentResult} />
          </div>
        </div>
      </main>

      {/* Global Styles with ALL animations */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&display=swap");

        * {
          scrollbar-width: thin;
          scrollbar-color: #334155 transparent;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #334155, #475569);
          border-radius: 4px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #475569, #64748b);
          background-clip: padding-box;
        }

        /* Enhanced Animations */
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes gradient-rotate {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes gradient-text {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes blink {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.05);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }

        @keyframes progress-bar {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }

        @keyframes pulse-subtle {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        /* Particle animation */
        @keyframes particle-float {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translate(100px, -100px) rotate(360deg);
            opacity: 0;
          }
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(45deg, #6366f1, #a855f7);
          border-radius: 50%;
          pointer-events: none;
          animation: particle-float 8s infinite;
        }

        .particle-1 {
          top: 20%;
          left: 20%;
          animation-delay: 0s;
        }

        .particle-2 {
          top: 60%;
          left: 40%;
          animation-delay: 2s;
        }

        .particle-3 {
          top: 40%;
          left: 70%;
          animation-delay: 4s;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        .animate-slide-in {
          animation: slide-in 0.5s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.5s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out forwards;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-rotate 3s ease infinite;
        }

        .animate-gradient-rotate {
          background-size: 400% 400%;
          animation: gradient-rotate 3s ease infinite;
        }

        .animate-gradient-text {
          background-size: 200% auto;
          animation: gradient-text 3s linear infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-blink {
          animation: blink 1s step-end infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-progress-bar {
          animation: progress-bar 2s ease-in-out infinite;
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }

        /* Ripple effect */
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }

        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(99, 102, 241, 0.4);
          width: 20px;
          height: 20px;
          animation: ripple 0.6s ease-out;
        }

        /* Code syntax highlighting enhancements */
        .hljs {
          background: transparent !important;
        }

        /* Prevent text selection on UI elements */
        button,
        label {
          user-select: none;
        }

        /* Enhanced focus indicators */
        *:focus-visible {
          outline: 2px solid rgb(99 102 241 / 0.6);
          outline-offset: 2px;
          border-radius: 4px;
        }

        /* Smooth transitions for all interactive elements */
        button,
        a,
        input,
        select,
        textarea {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}

export default App;

// import { useState, useEffect, useRef } from "react";
// import { useCodeGenerator } from "./hooks/useCodeGenerator";
// import Sidebar from "./components/Sidebar";
// import InputPanel from "./components/InputPanel";
// import CodeDisplay from "./components/CodeDisplay";
// import { Menu, BrainCircuit } from "lucide-react";

// function App() {
//   const {
//     userId,
//     history,
//     currentResult,
//     isGenerating,
//     isLoadingHistory,
//     generateCode,
//     selectHistoryItem,
//   } = useCodeGenerator();

//   const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
//   const bottomRef = useRef(null);

//   useEffect(() => {
//     if (currentResult && window.innerWidth < 768) {
//       bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [currentResult]);

//   return (
//     <div className="flex h-screen w-screen bg-slate-950 text-slate-200 font-sans overflow-hidden selection:bg-indigo-500/30 selection:text-white">
//       {/* Enhanced animated background */}
//       <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
//         {/* Primary gradient orbs */}
//         <div
//           className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-indigo-600/15 to-purple-600/10 blur-[120px] animate-pulse"
//           style={{ animationDuration: "4s" }}
//         />
//         <div
//           className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl from-purple-600/15 to-pink-600/10 blur-[120px] animate-pulse"
//           style={{ animationDuration: "5s", animationDelay: "1s" }}
//         />

//         {/* Secondary accent orbs */}
//         <div
//           className="absolute top-[40%] right-[20%] w-[30%] h-[30%] rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/5 blur-[100px] animate-pulse"
//           style={{ animationDuration: "6s", animationDelay: "2s" }}
//         />

//         {/* Subtle grid pattern */}
//         <div
//           className="absolute inset-0 opacity-[0.02]"
//           style={{
//             backgroundImage: `linear-gradient(to right, rgb(99 102 241) 1px, transparent 1px),
//                            linear-gradient(to bottom, rgb(99 102 241) 1px, transparent 1px)`,
//             backgroundSize: "64px 64px",
//           }}
//         />
//       </div>

//       {/* Sidebar */}
//       <Sidebar
//         isOpen={isSidebarOpen}
//         toggle={() => setIsSidebarOpen(!isSidebarOpen)}
//         history={history}
//         loading={isLoadingHistory}
//         onSelect={selectHistoryItem}
//       />

//       {/* Main Content */}
//       <main className="flex-1 flex flex-col relative z-10 h-full overflow-hidden min-w-0">
//         {/* Mobile Header */}
//         <div className="md:hidden flex items-center justify-between px-5 py-4 bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shrink-0 shadow-lg">
//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg blur-md opacity-50" />
//               <div className="relative p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
//                 <BrainCircuit className="w-5 h-5 text-white" />
//               </div>
//             </div>
//             <div className="flex flex-col">
//               <span className="font-black text-lg tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//                 Bolt
//               </span>
//               <span className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider">
//                 AI Assistant
//               </span>
//             </div>
//           </div>

//           <button
//             onClick={() => setIsSidebarOpen(true)}
//             className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all border border-transparent hover:border-slate-700"
//           >
//             <Menu className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Content Area - Properly constrained flex layout */}
//         <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0 min-w-0">
//           <InputPanel
//             onGenerate={generateCode}
//             isGenerating={isGenerating}
//             disabled={!userId}
//           />

//           <div
//             ref={bottomRef}
//             className="flex-1 flex flex-col min-h-0 min-w-0 overflow-hidden"
//           >
//             <CodeDisplay data={currentResult} />
//           </div>
//         </div>
//       </main>

//       {/* Global Styles */}
//       <style jsx global>{`
//         @import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&display=swap");

//         * {
//           scrollbar-width: thin;
//           scrollbar-color: #334155 transparent;
//         }

//         .custom-scrollbar::-webkit-scrollbar {
//           width: 8px;
//           height: 8px;
//         }

//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: transparent;
//         }

//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: linear-gradient(to bottom, #334155, #475569);
//           border-radius: 4px;
//           border: 2px solid transparent;
//           background-clip: padding-box;
//         }

//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(to bottom, #475569, #64748b);
//           background-clip: padding-box;
//         }

//         /* Smooth animations */
//         @keyframes pulse-slow {
//           0%,
//           100% {
//             opacity: 0.3;
//           }
//           50% {
//             opacity: 0.6;
//           }
//         }

//         .animate-pulse-slow {
//           animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//         }

//         /* Code syntax highlighting enhancements */
//         .hljs {
//           background: transparent !important;
//         }

//         /* Prevent text selection on UI elements */
//         button,
//         label {
//           user-select: none;
//         }

//         /* Focus visible for accessibility */
//         *:focus-visible {
//           outline: 2px solid rgb(99 102 241 / 0.5);
//           outline-offset: 2px;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default App;

// import { useState, useEffect, useRef } from "react";
// import { useCodeGenerator } from "./hooks/useCodeGenerator";
// import Sidebar from "./components/Sidebar";
// import InputPanel from "./components/InputPanel";
// import CodeDisplay from "./components/CodeDisplay";
// import { Menu, BrainCircuit } from "lucide-react";

// function App() {
//   const {
//     userId,
//     history,
//     currentResult,
//     isGenerating,
//     isLoadingHistory,
//     generateCode,
//     selectHistoryItem,
//   } = useCodeGenerator();

//   const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
//   const bottomRef = useRef(null);

//   useEffect(() => {
//     if (currentResult && window.innerWidth < 768) {
//       bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [currentResult]);

//   return (
//     <div className="flex h-screen w-screen bg-slate-950 text-slate-200 font-sans overflow-hidden selection:bg-indigo-500/30 selection:text-white">
//       {/* Enhanced animated background */}
//       <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
//         {/* Primary gradient orbs */}
//         <div
//           className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-indigo-600/15 to-purple-600/10 blur-[120px] animate-pulse"
//           style={{ animationDuration: "4s" }}
//         />
//         <div
//           className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl from-purple-600/15 to-pink-600/10 blur-[120px] animate-pulse"
//           style={{ animationDuration: "5s", animationDelay: "1s" }}
//         />

//         {/* Secondary accent orbs */}
//         <div
//           className="absolute top-[40%] right-[20%] w-[30%] h-[30%] rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/5 blur-[100px] animate-pulse"
//           style={{ animationDuration: "6s", animationDelay: "2s" }}
//         />

//         {/* Subtle grid pattern */}
//         <div
//           className="absolute inset-0 opacity-[0.02]"
//           style={{
//             backgroundImage: `linear-gradient(to right, rgb(99 102 241) 1px, transparent 1px),
//                            linear-gradient(to bottom, rgb(99 102 241) 1px, transparent 1px)`,
//             backgroundSize: "64px 64px",
//           }}
//         />
//       </div>

//       {/* Sidebar */}
//       <Sidebar
//         isOpen={isSidebarOpen}
//         toggle={() => setIsSidebarOpen(!isSidebarOpen)}
//         history={history}
//         loading={isLoadingHistory}
//         onSelect={selectHistoryItem}
//       />

//       {/* Main Content */}
//       <main className="flex-1 flex flex-col relative z-10 h-full overflow-hidden">
//         {/* Mobile Header */}
//         <div className="md:hidden flex items-center justify-between px-5 py-4 bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shrink-0 shadow-lg">
//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg blur-md opacity-50" />
//               <div className="relative p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
//                 <BrainCircuit className="w-5 h-5 text-white" />
//               </div>
//             </div>
//             <div className="flex flex-col">
//               <span className="font-black text-lg tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//                 Bolt
//               </span>
//               <span className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider">
//                 AI Assistant
//               </span>
//             </div>
//           </div>

//           <button
//             onClick={() => setIsSidebarOpen(true)}
//             className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all border border-transparent hover:border-slate-700"
//           >
//             <Menu className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Content Area - Fixed flex layout */}
//         <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
//           <InputPanel
//             onGenerate={generateCode}
//             isGenerating={isGenerating}
//             disabled={!userId}
//           />

//           <div
//             ref={bottomRef}
//             className="flex-1 flex flex-col min-h-0 overflow-hidden"
//           >
//             <CodeDisplay data={currentResult} />
//           </div>
//         </div>
//       </main>

//       {/* Global Styles */}
//       <style jsx global>{`
//         @import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&display=swap");

//         * {
//           scrollbar-width: thin;
//           scrollbar-color: #334155 transparent;
//         }

//         .custom-scrollbar::-webkit-scrollbar {
//           width: 8px;
//           height: 8px;
//         }

//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: transparent;
//         }

//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: linear-gradient(to bottom, #334155, #475569);
//           border-radius: 4px;
//           border: 2px solid transparent;
//           background-clip: padding-box;
//         }

//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(to bottom, #475569, #64748b);
//           background-clip: padding-box;
//         }

//         /* Smooth animations */
//         @keyframes pulse-slow {
//           0%,
//           100% {
//             opacity: 0.3;
//           }
//           50% {
//             opacity: 0.6;
//           }
//         }

//         .animate-pulse-slow {
//           animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//         }

//         /* Code syntax highlighting enhancements */
//         .hljs {
//           background: transparent !important;
//         }

//         /* Prevent text selection on UI elements */
//         button,
//         label {
//           user-select: none;
//         }

//         /* Focus visible for accessibility */
//         *:focus-visible {
//           outline: 2px solid rgb(99 102 241 / 0.5);
//           outline-offset: 2px;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default App;

// import { useState, useEffect, useRef } from "react";
// import { useCodeGenerator } from "./hooks/useCodeGenerator";
// import Sidebar from "./components/Sidebar";
// import InputPanel from "./components/InputPanel";
// import CodeDisplay from "./components/CodeDisplay";
// import { Menu, BrainCircuit } from "lucide-react";

// function App() {
//   const {
//     userId,
//     history,
//     currentResult,
//     isGenerating,
//     isLoadingHistory,
//     generateCode,
//     selectHistoryItem,
//   } = useCodeGenerator();

//   const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
//   const bottomRef = useRef(null);

//   useEffect(() => {
//     if (currentResult && window.innerWidth < 768) {
//       bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [currentResult]);

//   return (
//     <div className="flex h-screen w-screen bg-slate-950 text-slate-200 font-sans overflow-hidden selection:bg-indigo-500/30">
//       <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
//         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/10 blur-[120px]"></div>
//         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[120px]"></div>
//       </div>

//       <Sidebar
//         isOpen={isSidebarOpen}
//         toggle={() => setIsSidebarOpen(!isSidebarOpen)}
//         history={history}
//         loading={isLoadingHistory}
//         onSelect={selectHistoryItem}
//       />

//       <main className="flex-1 flex flex-col md:flex-row relative z-10 h-full overflow-hidden backdrop-blur-[1px]">
//         <div className="md:hidden flex items-center justify-between p-4 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 shrink-0">
//           <div className="flex items-center gap-2 font-bold text-lg">
//             <BrainCircuit className="w-6 h-6 text-indigo-400" />
//             <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
//               DevMind
//             </span>
//           </div>
//           <button
//             onClick={() => setIsSidebarOpen(true)}
//             className="p-2 text-slate-400 hover:text-white transition-colors"
//           >
//             <Menu className="w-6 h-6" />
//           </button>
//         </div>

//         <div className="flex-1 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
//           <InputPanel
//             onGenerate={generateCode}
//             isGenerating={isGenerating}
//             disabled={!userId}
//           />

//           <div
//             ref={bottomRef}
//             className="flex-1 flex flex-col min-h-[500px] md:min-h-0"
//           >
//             <CodeDisplay data={currentResult} />
//           </div>
//         </div>
//       </main>

//       <style jsx global>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//           height: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: transparent;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #334155;
//           border-radius: 3px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #475569;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default App;
