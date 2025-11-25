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

        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />

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
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/20 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none animate-gradient-rotate" />

        <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-3 md:px-5 py-2.5 md:py-3 flex justify-between items-center border-b-2 border-slate-700/50 shrink-0">
          <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
            <div className="hidden sm:flex gap-1.5 shrink-0">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/50 hover:scale-110 transition-transform cursor-pointer" />
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-lg shadow-yellow-500/50 hover:scale-110 transition-transform cursor-pointer" />
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/50 hover:scale-110 transition-transform cursor-pointer" />
            </div>

            <div className="hidden sm:block h-4 w-[1px] bg-slate-700 shrink-0" />

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

        <div className="flex-1 overflow-auto custom-scrollbar relative bg-[#282c34] min-h-0">
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
