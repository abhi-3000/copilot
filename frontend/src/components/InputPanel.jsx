import { useState } from "react";
import { Loader2, Sparkles, Wand2 } from "lucide-react";

export default function InputPanel({ onGenerate, isGenerating, disabled }) {
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("JavaScript");

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(prompt, language);
    setPrompt("");
  };

  return (
    <section className="w-full md:w-[40%] border-b md:border-b-0 md:border-r border-slate-800 bg-slate-950/50 flex flex-col relative z-10 shrink-0">
      <div className="p-6 md:p-8 flex-1 flex flex-col max-w-2xl mx-auto w-full justify-center">
        <header className="mb-8 md:mb-12 mt-4 md:mt-0">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              What are we building?
            </span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base font-light">
            Select your stack. Describe your logic. Let AI handle the syntax.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5 md:space-y-8">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
              Target Language
            </label>
            <div className="relative group">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full appearance-none bg-slate-900/50 border border-slate-700 text-white rounded-xl p-3 md:p-4 pl-5 
                focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all font-medium 
                hover:border-slate-600 hover:bg-slate-900 cursor-pointer shadow-inner"
              >
                {[
                  "JavaScript",
                  "Python",
                  "Java",
                  "C++",
                  "Go",
                  "Rust",
                  "SQL",
                  "TypeScript",
                ].map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-2 flex-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
              Prompt
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Write a secured Express.js middleware for JWT authentication..."
              className="w-full h-32 md:h-56 bg-slate-900/50 border border-slate-700 text-white rounded-xl p-4 md:p-6 
              focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none resize-none transition-all 
              placeholder:text-slate-600 leading-relaxed text-sm md:text-base shadow-inner"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isGenerating || disabled}
            className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-[position:right_center] 
            disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 md:py-4 rounded-xl transition-all duration-500 
            flex justify-center items-center gap-3 shadow-lg shadow-indigo-500/20 active:scale-[0.98] border border-white/10"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Neural
                Processing...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" /> Generate Solution
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
