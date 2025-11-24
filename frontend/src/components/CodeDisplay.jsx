import { useState, useEffect } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Copy, Check, TerminalSquare, Code2, Cpu } from "lucide-react";

export default function CodeDisplay({ data }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => setCopied(false), [data]);

  const handleCopy = () => {
    if (!data?.code) return;
    navigator.clipboard.writeText(data.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!data) {
    return (
      <div className="h-full bg-slate-950/50 flex items-center justify-center p-8 md:p-0 min-h-[300px] md:min-h-auto">
        <div className="text-center space-y-6 opacity-40 select-none animate-pulse-slow">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full"></div>
            <Cpu className="w-20 h-20 md:w-24 md:h-24 mx-auto text-slate-400 relative z-10" />
          </div>
          <div className="space-y-2">
            <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-slate-300 to-slate-500 bg-clip-text text-transparent">
              Awaiting Input
            </p>
            <p className="text-sm text-slate-500 hidden md:block">
              Your generated solution will materialize here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="h-full bg-slate-950/50 p-2 md:p-6 flex flex-col overflow-hidden min-w-0">
      <div className="flex-1 flex flex-col rounded-xl overflow-hidden border border-slate-700/50 bg-[#1e222a] shadow-2xl relative group">
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-500/10 rounded-xl pointer-events-none transition-colors duration-500"></div>

        <div className="bg-[#1e222a] px-3 md:px-5 py-3 flex justify-between items-center border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="hidden sm:flex gap-2">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/20 group-hover:bg-red-500/80 transition-colors"></div>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/20 group-hover:bg-yellow-500/80 transition-colors"></div>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/20 group-hover:bg-green-500/80 transition-colors"></div>
            </div>
            <div className="hidden sm:block h-4 w-[1px] bg-slate-700"></div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <TerminalSquare className="w-3.5 h-3.5 text-indigo-400" />
              <span className="truncate max-w-[100px] md:max-w-none text-slate-300">
                solution.{data.language.toLowerCase()}
              </span>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold py-1.5 px-2.5 md:px-3 rounded-lg 
            bg-slate-800 hover:bg-indigo-600 text-slate-400 hover:text-white transition-all border border-slate-700 hover:border-indigo-500"
          >
            {copied ? (
              <Check className="w-3 h-3 md:w-3.5 md:h-3.5" />
            ) : (
              <Copy className="w-3 h-3 md:w-3.5 md:h-3.5" />
            )}
            {copied ? "COPIED" : "COPY"}
          </button>
        </div>

        <div className="flex-1 overflow-auto custom-scrollbar relative bg-[#1e222a]">
          <SyntaxHighlighter
            language={data.language.toLowerCase()}
            style={atomOneDark}
            showLineNumbers={true}
            wrapLines={false}
            customStyle={{
              padding: "20px",
              margin: 0,
              background: "transparent",
              fontSize: "13px",
              lineHeight: "1.6",
              fontFamily: '"Fira Code", monospace',
              height: "100%",
            }}
          >
            {data.code}
          </SyntaxHighlighter>
        </div>
      </div>
    </section>
  );
}
