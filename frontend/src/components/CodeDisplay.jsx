import { useState, useEffect } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  Copy,
  Check,
  FileCode,
  Download,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function CodeDisplay({ data }) {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setCopied(false);
    setDownloaded(false);
    setIsVisible(false);

    // Trigger fade-in animation when data changes
    if (data) {
      setTimeout(() => setIsVisible(true), 50);
    }
  }, [data]);

  const handleCopy = () => {
    if (!data?.code) return;
    navigator.clipboard.writeText(data.code);
    setCopied(true);
    setShowToast(true);
    setTimeout(() => {
      setCopied(false);
      setShowToast(false);
    }, 3000);
  };

  const handleDownload = () => {
    if (!data?.code) return;
    const ext = getFileExtension(data.language);
    const blob = new Blob([data.code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `solution.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const getFileExtension = (lang) => {
    const extensions = {
      JavaScript: "js",
      Python: "py",
      Java: "java",
      "C++": "cpp",
      Go: "go",
      Rust: "rs",
      SQL: "sql",
      TypeScript: "ts",
      Ruby: "rb",
      PHP: "php",
    };
    return extensions[lang] || "txt";
  };

  if (!data) {
    return (
      <div className="h-full w-full bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-5 animate-float">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, rgb(99 102 241 / 0.1) 1px, transparent 1px),
                               linear-gradient(to bottom, rgb(99 102 241 / 0.1) 1px, transparent 1px)`,
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="particle particle-1" />
          <div className="particle particle-2" />
          <div className="particle particle-3" />
        </div>

        <div className="text-center space-y-4 relative z-10 max-w-md animate-fade-in">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-2xl opacity-30 rounded-full animate-pulse" />
            <div className="relative p-5 bg-slate-900/50 rounded-3xl border border-slate-700/50 backdrop-blur-sm group hover:scale-105 transition-transform duration-300">
              <FileCode className="w-12 h-12 md:w-16 md:h-16 text-slate-400 group-hover:text-slate-300 transition-colors" />
              {/* Blinking cursor */}
              <div className="absolute -right-1 -bottom-1 w-3 h-3 bg-indigo-500 rounded-sm animate-blink" />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 bg-clip-text text-transparent animate-gradient-text">
              Ready to Generate
            </p>
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed px-4">
              Enter your prompt and select a language to see AI-generated code
              appear here
            </p>
          </div>

          {/* Animated sparkles */}
          <div className="flex justify-center gap-2 pt-2">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            <Sparkles
              className="w-4 h-4 text-purple-400 animate-pulse"
              style={{ animationDelay: "0.3s" }}
            />
            <Sparkles
              className="w-4 h-4 text-pink-400 animate-pulse"
              style={{ animationDelay: "0.6s" }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950 p-2 md:p-4 flex flex-col overflow-hidden relative">
      {/* Success Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-[100] animate-slide-in-right">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl shadow-green-500/50 border border-green-400/30 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 animate-bounce" />
            <div>
              <p className="font-bold text-sm">Code Copied!</p>
              <p className="text-xs opacity-90">Ready to paste anywhere</p>
            </div>
          </div>
        </div>
      )}

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none animate-float">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(99 102 241 / 0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div
        className={`relative flex-1 flex flex-col rounded-xl md:rounded-2xl overflow-hidden border-2 border-slate-700/50 bg-[#282c34] shadow-2xl group min-h-0 transition-all duration-500 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Animated border glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/20 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none animate-gradient-rotate" />

        {/* Header Bar */}
        <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-3 md:px-5 py-2.5 md:py-3 flex justify-between items-center border-b-2 border-slate-700/50 shrink-0">
          {/* Left side - Window controls & filename */}
          <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
            {/* macOS-style controls */}
            <div className="hidden sm:flex gap-1.5 shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/50 hover:scale-110 transition-transform cursor-pointer" />
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-lg shadow-yellow-500/50 hover:scale-110 transition-transform cursor-pointer" />
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/50 hover:scale-110 transition-transform cursor-pointer" />
            </div>

            <div className="hidden sm:block h-4 w-[1px] bg-slate-700 shrink-0" />

            {/* Filename with icon */}
            <div className="flex items-center gap-2 px-2 md:px-3 py-1 bg-slate-800/50 rounded-lg border border-slate-700/50 min-w-0 hover:bg-slate-800 hover:border-indigo-500/30 transition-all">
              <FileCode className="w-3 h-3 md:w-3.5 md:h-3.5 text-indigo-400 shrink-0" />
              <span className="text-xs font-mono font-semibold text-slate-300 truncate">
                solution.{getFileExtension(data.language)}
              </span>
              <span
                className="hidden lg:inline-block px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded
              bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border border-indigo-500/30 shrink-0 animate-pulse-subtle"
              >
                {data.language}
              </span>
            </div>
          </div>

          {/* Right side - Action buttons */}
          <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
            <button
              onClick={handleDownload}
              className="hidden md:flex items-center gap-1.5 text-[10px] font-bold py-1.5 px-2.5 rounded-lg 
              bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white 
              transition-all border border-slate-700 hover:border-slate-600 hover:scale-105 active:scale-95
              relative overflow-hidden group"
              title="Download code"
            >
              <Download
                className={`w-3 h-3 transition-transform ${
                  downloaded ? "animate-bounce" : ""
                }`}
              />
              <span className="hidden xl:inline">
                {downloaded ? "DOWNLOADED" : "DOWNLOAD"}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold py-1.5 px-2.5 md:px-3 rounded-lg 
              bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 
              text-white transition-all border border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/50
              active:scale-95 hover:scale-105 relative overflow-hidden group"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 animate-bounce" />
                  <span>COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 group-hover:scale-110 transition-transform" />
                  <span>COPY</span>
                </>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 overflow-auto custom-scrollbar relative bg-[#282c34] min-h-0">
          {/* Line numbers background highlight */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-14 bg-slate-900/30 pointer-events-none" />

          <SyntaxHighlighter
            language={data.language.toLowerCase()}
            style={atomOneDark}
            showLineNumbers={true}
            wrapLines={false}
            lineNumberStyle={{
              minWidth: "2.5em",
              paddingRight: "0.75em",
              color: "#4b5563",
              fontWeight: "600",
              fontSize: "0.75em",
              userSelect: "none",
            }}
            customStyle={{
              padding: "16px 16px 16px 12px",
              margin: 0,
              background: "transparent",
              fontSize: "13px",
              lineHeight: "1.6",
              fontFamily: '"Fira Code", "Consolas", "Monaco", monospace',
              height: "100%",
              minHeight: "100%",
            }}
          >
            {data.code}
          </SyntaxHighlighter>
        </div>

        {/* Footer info bar */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-3 md:px-5 py-2 border-t-2 border-slate-700/50 shrink-0">
          <div className="flex items-center justify-between text-[10px] md:text-xs">
            <div className="flex items-center gap-2 md:gap-3 text-slate-400">
              <span className="font-mono font-semibold">
                {data.code.split("\n").length} lines
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline font-mono font-semibold">
                {data.code.length} chars
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-medium">Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// import { useState, useEffect } from "react";
// import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
// import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
// import { Copy, Check, FileCode, Download } from "lucide-react";

// export default function CodeDisplay({ data }) {
//   const [copied, setCopied] = useState(false);

//   useEffect(() => setCopied(false), [data]);

//   const handleCopy = () => {
//     if (!data?.code) return;
//     navigator.clipboard.writeText(data.code);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleDownload = () => {
//     if (!data?.code) return;
//     const ext = getFileExtension(data.language);
//     const blob = new Blob([data.code], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `solution.${ext}`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   const getFileExtension = (lang) => {
//     const extensions = {
//       JavaScript: "js",
//       Python: "py",
//       Java: "java",
//       "C++": "cpp",
//       Go: "go",
//       Rust: "rs",
//       SQL: "sql",
//       TypeScript: "ts",
//       Ruby: "rb",
//       PHP: "php",
//     };
//     return extensions[lang] || "txt";
//   };

//   if (!data) {
//     return (
//       <div className="h-full w-full bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
//         {/* Animated background grid */}
//         <div className="absolute inset-0 opacity-5">
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `linear-gradient(to right, rgb(99 102 241 / 0.1) 1px, transparent 1px),
//                                linear-gradient(to bottom, rgb(99 102 241 / 0.1) 1px, transparent 1px)`,
//               backgroundSize: "48px 48px",
//             }}
//           />
//         </div>

//         {/* Floating orbs */}
//         <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
//         <div
//           className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
//           style={{ animationDelay: "1s" }}
//         />

//         <div className="text-center space-y-4 relative z-10 max-w-md">
//           <div className="relative inline-block">
//             <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-2xl opacity-30 rounded-full animate-pulse" />
//             <div className="relative p-5 bg-slate-900/50 rounded-3xl border border-slate-700/50 backdrop-blur-sm">
//               <FileCode className="w-12 h-12 md:w-16 md:h-16 text-slate-400" />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 bg-clip-text text-transparent">
//               Ready to Generate
//             </p>
//             <p className="text-xs md:text-sm text-slate-500 leading-relaxed px-4">
//               Enter your prompt and select a language to see AI-generated code
//               appear here
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-full w-full bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950 p-2 md:p-4 flex flex-col overflow-hidden relative">
//       {/* Background pattern */}
//       <div className="absolute inset-0 opacity-5 pointer-events-none">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `radial-gradient(circle at 2px 2px, rgb(99 102 241 / 0.15) 1px, transparent 0)`,
//             backgroundSize: "40px 40px",
//           }}
//         />
//       </div>

//       <div className="relative flex-1 flex flex-col rounded-xl md:rounded-2xl overflow-hidden border-2 border-slate-700/50 bg-[#282c34] shadow-2xl group min-h-0">
//         {/* Animated border glow */}
//         <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/20 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />

//         {/* Header Bar */}
//         <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-3 md:px-5 py-2.5 md:py-3 flex justify-between items-center border-b-2 border-slate-700/50 shrink-0">
//           {/* Left side - Window controls & filename */}
//           <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
//             {/* macOS-style controls */}
//             <div className="hidden sm:flex gap-1.5 shrink-0">
//               <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/50" />
//               <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-lg shadow-yellow-500/50" />
//               <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/50" />
//             </div>

//             <div className="hidden sm:block h-4 w-[1px] bg-slate-700 shrink-0" />

//             {/* Filename with icon */}
//             <div className="flex items-center gap-2 px-2 md:px-3 py-1 bg-slate-800/50 rounded-lg border border-slate-700/50 min-w-0">
//               <FileCode className="w-3 h-3 md:w-3.5 md:h-3.5 text-indigo-400 shrink-0" />
//               <span className="text-xs font-mono font-semibold text-slate-300 truncate">
//                 solution.{getFileExtension(data.language)}
//               </span>
//               <span
//                 className="hidden lg:inline-block px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded
//               bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border border-indigo-500/30 shrink-0"
//               >
//                 {data.language}
//               </span>
//             </div>
//           </div>

//           {/* Right side - Action buttons */}
//           <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
//             <button
//               onClick={handleDownload}
//               className="hidden md:flex items-center gap-1.5 text-[10px] font-bold py-1.5 px-2.5 rounded-lg
//               bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white
//               transition-all border border-slate-700 hover:border-slate-600"
//               title="Download code"
//             >
//               <Download className="w-3 h-3" />
//               <span className="hidden xl:inline">DOWNLOAD</span>
//             </button>

//             <button
//               onClick={handleCopy}
//               className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold py-1.5 px-2.5 md:px-3 rounded-lg
//               bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500
//               text-white transition-all border border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/50
//               active:scale-95"
//             >
//               {copied ? (
//                 <>
//                   <Check className="w-3 h-3" />
//                   <span>COPIED</span>
//                 </>
//               ) : (
//                 <>
//                   <Copy className="w-3 h-3" />
//                   <span>COPY</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Code Editor */}
//         <div className="flex-1 overflow-auto custom-scrollbar relative bg-[#282c34] min-h-0">
//           {/* Line numbers background highlight */}
//           <div className="absolute left-0 top-0 bottom-0 w-12 md:w-14 bg-slate-900/30 pointer-events-none" />

//           <SyntaxHighlighter
//             language={data.language.toLowerCase()}
//             style={atomOneDark}
//             showLineNumbers={true}
//             wrapLines={false}
//             lineNumberStyle={{
//               minWidth: "2.5em",
//               paddingRight: "0.75em",
//               color: "#4b5563",
//               fontWeight: "600",
//               fontSize: "0.75em",
//               userSelect: "none",
//             }}
//             customStyle={{
//               padding: "16px 16px 16px 12px",
//               margin: 0,
//               background: "transparent",
//               fontSize: "13px",
//               lineHeight: "1.6",
//               fontFamily: '"Fira Code", "Consolas", "Monaco", monospace',
//               height: "100%",
//               minHeight: "100%",
//             }}
//           >
//             {data.code}
//           </SyntaxHighlighter>
//         </div>

//         {/* Footer info bar */}
//         <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-3 md:px-5 py-2 border-t-2 border-slate-700/50 shrink-0">
//           <div className="flex items-center justify-between text-[10px] md:text-xs">
//             <div className="flex items-center gap-2 md:gap-3 text-slate-400">
//               <span className="font-mono">
//                 {data.code.split("\n").length} lines
//               </span>
//               <span className="hidden sm:inline">•</span>
//               <span className="hidden sm:inline font-mono">
//                 {data.code.length} chars
//               </span>
//             </div>
//             <div className="flex items-center gap-1.5 text-slate-500">
//               <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
//               <span className="text-[10px] font-medium">Ready</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
// import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
// import {
//   Copy,
//   Check,
//   FileCode,
//   Download,
//   Share2,
//   Sparkles,
// } from "lucide-react";

// export default function CodeDisplay({ data }) {
//   const [copied, setCopied] = useState(false);

//   useEffect(() => setCopied(false), [data]);

//   const handleCopy = () => {
//     if (!data?.code) return;
//     navigator.clipboard.writeText(data.code);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleDownload = () => {
//     if (!data?.code) return;
//     const ext = getFileExtension(data.language);
//     const blob = new Blob([data.code], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `solution.${ext}`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   const getFileExtension = (lang) => {
//     const extensions = {
//       JavaScript: "js",
//       Python: "py",
//       Java: "java",
//       "C++": "cpp",
//       Go: "go",
//       Rust: "rs",
//       SQL: "sql",
//       TypeScript: "ts",
//       Ruby: "rb",
//       PHP: "php",
//     };
//     return extensions[lang] || "txt";
//   };

//   if (!data) {
//     return (
//       <div className="h-full bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950 flex items-center justify-center p-8 md:p-0 min-h-[300px] md:min-h-auto relative overflow-hidden">
//         {/* Animated background grid */}
//         <div className="absolute inset-0 opacity-5">
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `linear-gradient(to right, rgb(99 102 241 / 0.1) 1px, transparent 1px),
//                                linear-gradient(to bottom, rgb(99 102 241 / 0.1) 1px, transparent 1px)`,
//               backgroundSize: "48px 48px",
//             }}
//           />
//         </div>

//         {/* Floating orbs */}
//         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
//         <div
//           className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
//           style={{ animationDelay: "1s" }}
//         />

//         <div className="text-center space-y-6 relative z-10">
//           <div className="relative inline-block">
//             <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-2xl opacity-30 rounded-full animate-pulse" />
//             <div className="relative p-6 bg-slate-900/50 rounded-3xl border border-slate-700/50 backdrop-blur-sm">
//               <FileCode className="w-16 h-16 md:w-20 md:h-20 text-slate-400" />
//             </div>
//           </div>

//           <div className="space-y-3">
//             <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 bg-clip-text text-transparent">
//               Ready to Generate
//             </p>
//             <p className="text-sm md:text-base text-slate-500 max-w-md mx-auto leading-relaxed">
//               Enter your prompt and select a language to see AI-generated code
//               appear here
//             </p>
//           </div>

//           {/* Animated sparkles */}
//           <div className="flex justify-center gap-2 pt-4">
//             <Sparkles
//               className="w-4 h-4 text-indigo-400 animate-pulse"
//               style={{ animationDelay: "0s" }}
//             />
//             <Sparkles
//               className="w-4 h-4 text-purple-400 animate-pulse"
//               style={{ animationDelay: "0.3s" }}
//             />
//             <Sparkles
//               className="w-4 h-4 text-pink-400 animate-pulse"
//               style={{ animationDelay: "0.6s" }}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <section className="h-full bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950 p-3 md:p-6 flex flex-col overflow-hidden min-w-0 relative">
//       {/* Background pattern */}
//       <div className="absolute inset-0 opacity-5 pointer-events-none">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `radial-gradient(circle at 2px 2px, rgb(99 102 241 / 0.15) 1px, transparent 0)`,
//             backgroundSize: "40px 40px",
//           }}
//         />
//       </div>

//       <div className="relative flex-1 flex flex-col rounded-2xl overflow-hidden border-2 border-slate-700/50 bg-[#282c34] shadow-2xl group">
//         {/* Animated border glow */}
//         <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/20 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />

//         {/* Header Bar */}
//         <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-4 md:px-6 py-4 flex justify-between items-center border-b-2 border-slate-700/50 shrink-0">
//           {/* Left side - Window controls & filename */}
//           <div className="flex items-center gap-4">
//             {/* macOS-style controls */}
//             <div className="hidden sm:flex gap-2">
//               <div
//                 className="w-3 h-3 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/50
//               hover:shadow-red-500/80 transition-shadow cursor-pointer"
//               />
//               <div
//                 className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-lg shadow-yellow-500/50
//               hover:shadow-yellow-500/80 transition-shadow cursor-pointer"
//               />
//               <div
//                 className="w-3 h-3 rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/50
//               hover:shadow-green-500/80 transition-shadow cursor-pointer"
//               />
//             </div>

//             <div className="hidden sm:block h-5 w-[1px] bg-slate-700" />

//             {/* Filename with icon */}
//             <div className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700/50">
//               <FileCode className="w-4 h-4 text-indigo-400" />
//               <span className="text-xs md:text-sm font-mono font-semibold text-slate-300 truncate max-w-[120px] md:max-w-none">
//                 solution.{getFileExtension(data.language)}
//               </span>
//               <span
//                 className="hidden md:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md
//               bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border border-indigo-500/30"
//               >
//                 {data.language}
//               </span>
//             </div>
//           </div>

//           {/* Right side - Action buttons */}
//           <div className="flex items-center gap-2">
//             <button
//               onClick={handleDownload}
//               className="hidden md:flex items-center gap-2 text-xs font-bold py-2 px-3 rounded-lg
//               bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white
//               transition-all border border-slate-700 hover:border-slate-600 hover:shadow-lg hover:shadow-indigo-500/20"
//               title="Download code"
//             >
//               <Download className="w-3.5 h-3.5" />
//               <span className="hidden lg:inline">DOWNLOAD</span>
//             </button>

//             <button
//               onClick={handleCopy}
//               className="flex items-center gap-2 text-xs font-bold py-2 px-3 md:px-4 rounded-lg
//               bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500
//               text-white transition-all border border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/50
//               active:scale-95"
//             >
//               {copied ? (
//                 <>
//                   <Check className="w-3.5 h-3.5" />
//                   <span>COPIED</span>
//                 </>
//               ) : (
//                 <>
//                   <Copy className="w-3.5 h-3.5" />
//                   <span>COPY</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Code Editor */}
//         <div className="flex-1 overflow-auto custom-scrollbar relative bg-[#282c34]">
//           {/* Line numbers background highlight */}
//           <div className="absolute left-0 top-0 bottom-0 w-16 bg-slate-900/30 pointer-events-none" />

//           <SyntaxHighlighter
//             language={data.language.toLowerCase()}
//             style={atomOneDark}
//             showLineNumbers={true}
//             wrapLines={false}
//             lineNumberStyle={{
//               minWidth: "3.5em",
//               paddingRight: "1em",
//               color: "#4b5563",
//               fontWeight: "600",
//               fontSize: "0.8em",
//               userSelect: "none",
//             }}
//             customStyle={{
//               padding: "24px 24px 24px 16px",
//               margin: 0,
//               background: "transparent",
//               fontSize: "14px",
//               lineHeight: "1.7",
//               fontFamily: '"Fira Code", "Consolas", "Monaco", monospace',
//               height: "100%",
//             }}
//           >
//             {data.code}
//           </SyntaxHighlighter>
//         </div>

//         {/* Footer info bar */}
//         <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-4 md:px-6 py-2.5 border-t-2 border-slate-700/50 shrink-0">
//           <div className="flex items-center justify-between text-xs">
//             <div className="flex items-center gap-3 text-slate-400">
//               <span className="font-mono">
//                 {data.code.split("\n").length} lines
//               </span>
//               <span className="hidden sm:inline">•</span>
//               <span className="hidden sm:inline font-mono">
//                 {data.code.length} chars
//               </span>
//             </div>
//             <div className="flex items-center gap-2 text-slate-500">
//               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//               <span className="text-xs font-medium">Ready</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// import { useState, useEffect } from "react";
// import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
// import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
// import { Copy, Check, TerminalSquare, Code2, Cpu } from "lucide-react";

// export default function CodeDisplay({ data }) {
//   const [copied, setCopied] = useState(false);

//   useEffect(() => setCopied(false), [data]);

//   const handleCopy = () => {
//     if (!data?.code) return;
//     navigator.clipboard.writeText(data.code);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   if (!data) {
//     return (
//       <div className="h-full bg-slate-950/50 flex items-center justify-center p-8 md:p-0 min-h-[300px] md:min-h-auto">
//         <div className="text-center space-y-6 opacity-40 select-none animate-pulse-slow">
//           <div className="relative inline-block">
//             <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full"></div>
//             <Cpu className="w-20 h-20 md:w-24 md:h-24 mx-auto text-slate-400 relative z-10" />
//           </div>
//           <div className="space-y-2">
//             <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-slate-300 to-slate-500 bg-clip-text text-transparent">
//               Awaiting Input
//             </p>
//             <p className="text-sm text-slate-500 hidden md:block">
//               Your generated solution will materialize here.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <section className="h-full bg-slate-950/50 p-2 md:p-6 flex flex-col overflow-hidden min-w-0">
//       <div className="flex-1 flex flex-col rounded-xl overflow-hidden border border-slate-700/50 bg-[#1e222a] shadow-2xl relative group">
//         <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-500/10 rounded-xl pointer-events-none transition-colors duration-500"></div>

//         <div className="bg-[#1e222a] px-3 md:px-5 py-3 flex justify-between items-center border-b border-slate-800 shrink-0">
//           <div className="flex items-center gap-3 md:gap-4">
//             <div className="hidden sm:flex gap-2">
//               <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/20 group-hover:bg-red-500/80 transition-colors"></div>
//               <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/20 group-hover:bg-yellow-500/80 transition-colors"></div>
//               <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/20 group-hover:bg-green-500/80 transition-colors"></div>
//             </div>
//             <div className="hidden sm:block h-4 w-[1px] bg-slate-700"></div>
//             <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
//               <TerminalSquare className="w-3.5 h-3.5 text-indigo-400" />
//               <span className="truncate max-w-[100px] md:max-w-none text-slate-300">
//                 solution.{data.language.toLowerCase()}
//               </span>
//             </div>
//           </div>

//           <button
//             onClick={handleCopy}
//             className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold py-1.5 px-2.5 md:px-3 rounded-lg
//             bg-slate-800 hover:bg-indigo-600 text-slate-400 hover:text-white transition-all border border-slate-700 hover:border-indigo-500"
//           >
//             {copied ? (
//               <Check className="w-3 h-3 md:w-3.5 md:h-3.5" />
//             ) : (
//               <Copy className="w-3 h-3 md:w-3.5 md:h-3.5" />
//             )}
//             {copied ? "COPIED" : "COPY"}
//           </button>
//         </div>

//         <div className="flex-1 overflow-auto custom-scrollbar relative bg-[#1e222a]">
//           <SyntaxHighlighter
//             language={data.language.toLowerCase()}
//             style={atomOneDark}
//             showLineNumbers={true}
//             wrapLines={false}
//             customStyle={{
//               padding: "20px",
//               margin: 0,
//               background: "transparent",
//               fontSize: "13px",
//               lineHeight: "1.6",
//               fontFamily: '"Fira Code", monospace',
//               height: "100%",
//             }}
//           >
//             {data.code}
//           </SyntaxHighlighter>
//         </div>
//       </div>
//     </section>
//   );
// }
