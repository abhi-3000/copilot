import { useState } from "react";
import { Loader2, Sparkles, Zap, ChevronDown, Info } from "lucide-react";

export default function InputPanel({ onGenerate, isGenerating, disabled }) {
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [showTooltip, setShowTooltip] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(prompt, language);
    setPrompt("");
  };

  return (
    <section className="w-full md:w-[40%] border-b md:border-b-0 md:border-r border-slate-700/50 bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950 flex flex-col relative z-10 shrink-0 overflow-y-auto">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0 animate-float"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(99 102 241 / 0.15) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particle particle-1" />
        <div className="particle particle-2" />
        <div className="particle particle-3" />
      </div>

      <div className="relative p-6 md:p-8 w-full max-w-2xl mx-auto animate-fade-in">
        {/* Header Section */}
        <header className="mb-6 md:mb-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 w-fit animate-slide-in-left">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
              AI-Powered
            </span>
          </div>

          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight animate-slide-in-left"
            style={{ animationDelay: "100ms" }}
          >
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-text">
              Describe Your Logic
            </span>
          </h1>

          <p
            className="text-slate-400 text-sm md:text-base leading-relaxed animate-slide-in-left"
            style={{ animationDelay: "200ms" }}
          >
            Choose your language, explain what you need, and watch AI craft
            production-ready code instantly.
          </p>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
          {/* Language Selector */}
          <div
            className="space-y-2.5 animate-slide-in-left"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                <div className="w-1 h-4 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full animate-pulse" />
                Target Language
              </label>
              <div
                className="relative"
                onMouseEnter={() => setShowTooltip("language")}
                onMouseLeave={() => setShowTooltip("")}
              >
                <Info className="w-3.5 h-3.5 text-slate-500 hover:text-slate-400 cursor-help transition-colors" />
                {showTooltip === "language" && (
                  <div className="absolute right-0 top-6 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 w-48 z-50 animate-fade-in shadow-xl">
                    Select your preferred programming language
                  </div>
                )}
              </div>
            </div>

            <div className="relative group">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full appearance-none bg-slate-900/80 border-2 border-slate-700/50 text-white rounded-2xl 
                p-3.5 md:p-4 pl-5 pr-12 font-semibold text-sm md:text-base
                focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none 
                transition-all duration-300
                hover:border-slate-600 hover:bg-slate-900 cursor-pointer 
                shadow-lg shadow-black/20
                group-hover:shadow-indigo-500/10
                transform hover:scale-[1.01]"
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
                  "Ruby",
                  "PHP",
                ].map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>

              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-indigo-400 transition-all duration-300 group-hover:scale-110">
                <ChevronDown className="w-5 h-5" />
              </div>

              {/* Enhanced glow effect on focus */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-focus-within:opacity-20 blur-xl transition-opacity pointer-events-none" />
            </div>
          </div>

          {/* Prompt Textarea */}
          <div
            className="space-y-2.5 animate-slide-in-left"
            style={{ animationDelay: "400ms" }}
          >
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                <div
                  className="w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                />
                Describe Your Task
              </label>
              <div
                className="relative"
                onMouseEnter={() => setShowTooltip("prompt")}
                onMouseLeave={() => setShowTooltip("")}
              >
                <Info className="w-3.5 h-3.5 text-slate-500 hover:text-slate-400 cursor-help transition-colors" />
                {showTooltip === "prompt" && (
                  <div className="absolute right-0 top-6 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 w-56 z-50 animate-fade-in shadow-xl">
                    Be specific about your requirements for better results
                  </div>
                )}
              </div>
            </div>

            <div className="relative group">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: Create a REST API endpoint that validates JWT tokens and handles authentication errors gracefully..."
                className="w-full h-32 md:h-48 lg:h-56 bg-slate-900/80 border-2 border-slate-700/50 text-white rounded-2xl 
                p-4 md:p-5 font-normal text-sm md:text-base
                focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none 
                resize-none transition-all duration-300
                placeholder:text-slate-600 placeholder:font-light leading-relaxed
                hover:border-slate-600 hover:bg-slate-900
                shadow-lg shadow-black/20
                transform hover:scale-[1.005]"
                required
              />

              {/* Character count indicator */}
              {prompt.length > 0 && (
                <div className="absolute bottom-3 right-3 text-xs font-medium bg-slate-900/90 px-2.5 py-1 rounded-lg border border-slate-700/50 backdrop-blur-sm animate-fade-in">
                  <span
                    className={`${
                      prompt.length > 500 ? "text-indigo-400" : "text-slate-500"
                    }`}
                  >
                    {prompt.length} chars
                  </span>
                </div>
              )}

              {/* Enhanced glow effect on focus */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 opacity-0 group-focus-within:opacity-20 blur-xl transition-opacity pointer-events-none" />
            </div>
          </div>

          {/* Generate Button */}
          <button
            type="submit"
            disabled={isGenerating || disabled}
            className="relative w-full group overflow-hidden rounded-2xl p-[2px] 
            disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300
            hover:shadow-2xl hover:shadow-indigo-500/40 active:scale-[0.98]
            animate-slide-in-left"
            style={{ animationDelay: "500ms" }}
          >
            {/* Animated gradient border */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
            opacity-100 group-hover:opacity-100 transition-opacity animate-gradient-rotate"
            />

            {/* Button content */}
            <div
              className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
            rounded-2xl px-6 py-3.5 md:py-4
            flex justify-center items-center gap-3
            group-hover:from-indigo-500 group-hover:via-purple-500 group-hover:to-pink-500
            transition-all duration-300
            group-disabled:from-slate-700 group-disabled:via-slate-700 group-disabled:to-slate-700"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="font-bold text-base md:text-lg text-white">
                    Generating Magic...
                  </span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                    <span
                      className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 text-white group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                  <span className="font-bold text-base md:text-lg text-white">
                    Generate Code
                  </span>
                  <Sparkles className="w-4 h-4 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                </>
              )}
            </div>

            {/* Enhanced shine effect on hover */}
            <div
              className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] 
            bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out pointer-events-none"
            />

            {/* Pulse animation when idle */}
            {!isGenerating && !disabled && (
              <div className="absolute inset-0 rounded-2xl bg-white/20 animate-ping-slow pointer-events-none" />
            )}
          </button>

          {/* Helper text */}
          {disabled && (
            <div className="flex items-center justify-center gap-2 text-xs text-red-400/80 font-medium animate-fade-in bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-3">
              <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <span>Service temporarily unavailable</span>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

// import { useState } from "react";
// import { Loader2, Sparkles, Zap, ChevronDown } from "lucide-react";

// export default function InputPanel({ onGenerate, isGenerating, disabled }) {
//   const [prompt, setPrompt] = useState("");
//   const [language, setLanguage] = useState("JavaScript");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onGenerate(prompt, language);
//     setPrompt("");
//   };

//   return (
//     <section className="w-full md:w-[40%] border-b md:border-b-0 md:border-r border-slate-700/50 bg-gradient-to-br from-slate-950 via-slate-900/50 to-slate-950 flex flex-col relative z-10 shrink-0 overflow-y-auto">
//       {/* Subtle background pattern */}
//       <div className="absolute inset-0 opacity-5 pointer-events-none">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `radial-gradient(circle at 2px 2px, rgb(99 102 241 / 0.15) 1px, transparent 0)`,
//             backgroundSize: "32px 32px",
//           }}
//         />
//       </div>

//       <div className="relative p-6 md:p-8 w-full max-w-2xl mx-auto">
//         {/* Header Section */}
//         <header className="mb-6 md:mb-8 space-y-4">
//           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 w-fit">
//             <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
//             <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
//               AI-Powered
//             </span>
//           </div>

//           <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
//             <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//               Describe Your Logic
//             </span>
//           </h1>

//           <p className="text-slate-400 text-sm md:text-base leading-relaxed">
//             Choose your language, explain what you need, and watch AI craft
//             production-ready code instantly.
//           </p>
//         </header>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
//           {/* Language Selector */}
//           <div className="space-y-2.5">
//             <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
//               <div className="w-1 h-4 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
//               Target Language
//             </label>

//             <div className="relative group">
//               <select
//                 value={language}
//                 onChange={(e) => setLanguage(e.target.value)}
//                 className="w-full appearance-none bg-slate-900/80 border-2 border-slate-700/50 text-white rounded-2xl
//                 p-3.5 md:p-4 pl-5 pr-12 font-semibold text-sm md:text-base
//                 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none
//                 transition-all duration-200
//                 hover:border-slate-600 hover:bg-slate-900 cursor-pointer
//                 shadow-lg shadow-black/20
//                 group-hover:shadow-indigo-500/10"
//               >
//                 {[
//                   "JavaScript",
//                   "Python",
//                   "Java",
//                   "C++",
//                   "Go",
//                   "Rust",
//                   "SQL",
//                   "TypeScript",
//                   "Ruby",
//                   "PHP",
//                 ].map((lang) => (
//                   <option key={lang} value={lang}>
//                     {lang}
//                   </option>
//                 ))}
//               </select>

//               <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-indigo-400 transition-colors">
//                 <ChevronDown className="w-5 h-5" />
//               </div>

//               {/* Glow effect on focus */}
//               <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-pink-500/0 opacity-0 group-focus-within:opacity-20 blur-xl transition-opacity pointer-events-none" />
//             </div>
//           </div>

//           {/* Prompt Textarea */}
//           <div className="space-y-2.5">
//             <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
//               <div className="w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
//               Describe Your Task
//             </label>

//             <div className="relative group">
//               <textarea
//                 value={prompt}
//                 onChange={(e) => setPrompt(e.target.value)}
//                 placeholder="Example: Create a REST API endpoint that validates JWT tokens and handles authentication errors gracefully..."
//                 className="w-full h-32 md:h-48 lg:h-56 bg-slate-900/80 border-2 border-slate-700/50 text-white rounded-2xl
//                 p-4 md:p-5 font-normal text-sm md:text-base
//                 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none
//                 resize-none transition-all duration-200
//                 placeholder:text-slate-600 placeholder:font-light leading-relaxed
//                 hover:border-slate-600 hover:bg-slate-900
//                 shadow-lg shadow-black/20"
//                 required
//               />

//               {/* Character count indicator */}
//               {prompt.length > 0 && (
//                 <div className="absolute bottom-3 right-3 text-xs text-slate-600 font-medium bg-slate-900/80 px-2 py-1 rounded">
//                   {prompt.length} chars
//                 </div>
//               )}

//               {/* Glow effect on focus */}
//               <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-indigo-500/0 opacity-0 group-focus-within:opacity-20 blur-xl transition-opacity pointer-events-none" />
//             </div>
//           </div>

//           {/* Generate Button */}
//           <button
//             type="submit"
//             disabled={isGenerating || disabled}
//             className="relative w-full group overflow-hidden rounded-2xl p-[2px]
//             disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300
//             hover:shadow-2xl hover:shadow-indigo-500/30 active:scale-[0.98]"
//           >
//             {/* Animated gradient border */}
//             <div
//               className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
//             opacity-100 group-hover:opacity-100 transition-opacity"
//             />

//             {/* Button content */}
//             <div
//               className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
//             rounded-2xl px-6 py-3.5 md:py-4
//             flex justify-center items-center gap-3
//             group-hover:from-indigo-500 group-hover:via-purple-500 group-hover:to-pink-500
//             transition-all duration-300"
//             >
//               {isGenerating ? (
//                 <>
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                   <span className="font-bold text-base md:text-lg text-white">
//                     Generating Magic...
//                   </span>
//                 </>
//               ) : (
//                 <>
//                   <Zap className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
//                   <span className="font-bold text-base md:text-lg text-white">
//                     Generate Code
//                   </span>
//                   <Sparkles className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
//                 </>
//               )}
//             </div>

//             {/* Shine effect on hover */}
//             <div
//               className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%]
//             bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out pointer-events-none"
//             />
//           </button>

//           {/* Helper text */}
//           {disabled && (
//             <p className="text-xs text-center text-red-400/80 font-medium">
//               ⚠️ Service temporarily unavailable
//             </p>
//           )}
//         </form>
//       </div>
//     </section>
//   );
// }

// import { useState } from "react";
// import { Loader2, Sparkles, Wand2 } from "lucide-react";

// export default function InputPanel({ onGenerate, isGenerating, disabled }) {
//   const [prompt, setPrompt] = useState("");
//   const [language, setLanguage] = useState("JavaScript");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onGenerate(prompt, language);
//     setPrompt("");
//   };

//   return (
//     <section className="w-full md:w-[40%] border-b md:border-b-0 md:border-r border-slate-800 bg-slate-950/50 flex flex-col relative z-10 shrink-0">
//       <div className="p-6 md:p-8 flex-1 flex flex-col max-w-2xl mx-auto w-full justify-center">
//         <header className="mb-8 md:mb-12 mt-4 md:mt-0">
//           <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">
//             <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//               What are we building?
//             </span>
//           </h1>
//           <p className="text-slate-400 text-sm md:text-base font-light">
//             Select your stack. Describe your logic. Let AI handle the syntax.
//           </p>
//         </header>

//         <form onSubmit={handleSubmit} className="space-y-5 md:space-y-8">
//           <div className="space-y-2">
//             <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
//               Target Language
//             </label>
//             <div className="relative group">
//               <select
//                 value={language}
//                 onChange={(e) => setLanguage(e.target.value)}
//                 className="w-full appearance-none bg-slate-900/50 border border-slate-700 text-white rounded-xl p-3 md:p-4 pl-5
//                 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all font-medium
//                 hover:border-slate-600 hover:bg-slate-900 cursor-pointer shadow-inner"
//               >
//                 {[
//                   "JavaScript",
//                   "Python",
//                   "Java",
//                   "C++",
//                   "Go",
//                   "Rust",
//                   "SQL",
//                   "TypeScript",
//                 ].map((lang) => (
//                   <option key={lang} value={lang}>
//                     {lang}
//                   </option>
//                 ))}
//               </select>
//               <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
//                 <svg
//                   className="w-4 h-4"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M19 9l-7 7-7-7"
//                   ></path>
//                 </svg>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-2 flex-1">
//             <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
//               Prompt
//             </label>
//             <textarea
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               placeholder="e.g. Write a secured Express.js middleware for JWT authentication..."
//               className="w-full h-32 md:h-56 bg-slate-900/50 border border-slate-700 text-white rounded-xl p-4 md:p-6
//               focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none resize-none transition-all
//               placeholder:text-slate-600 leading-relaxed text-sm md:text-base shadow-inner"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={isGenerating || disabled}
//             className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-[position:right_center]
//             disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 md:py-4 rounded-xl transition-all duration-500
//             flex justify-center items-center gap-3 shadow-lg shadow-indigo-500/20 active:scale-[0.98] border border-white/10"
//           >
//             {isGenerating ? (
//               <>
//                 <Loader2 className="w-5 h-5 animate-spin" /> Neural
//                 Processing...
//               </>
//             ) : (
//               <>
//                 <Wand2 className="w-5 h-5" /> Generate Solution
//               </>
//             )}
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// }
