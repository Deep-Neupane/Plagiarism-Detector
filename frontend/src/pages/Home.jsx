import React from "react";
import { FileSearch, Sparkles, Eye } from "lucide-react";

export default function HomeSection() {
  return (
    <div className="min-h-screen bg-[#0e1726] text-white flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Main Container / Hero Wrapper */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-6xl mx-auto px-4 pt-20 pb-16 text-center">
        {/* Main Heading with Elegant Serif Styling */}
        <h1 className="text-5xl md:text-7xl font-serif tracking-tight text-white mb-6">
          Detect. Analyze. Integrity.
        </h1>

        {/* Description Subtext */}
        <p className="max-w-2xl mx-auto text-slate-300 font-serif text-base md:text-lg leading-relaxed tracking-wide mb-10">
          Advanced plagiarism detection powered by hybrid Rabin-Karp
          fingerprinting and TF-IDF semantic analysis. Ensure academic integrity
          with precision and confidence.
        </p>

        {/* Glowing Call-to-Action Button */}
        <div className="mb-20">
          <button className="px-6 py-3 bg-[#cca64f] hover:bg-[#b8933f] text-[#0e1726] font-medium text-sm rounded-md transition-all duration-300 shadow-[0_0_20px_rgba(204,166,79,0.35)] hover:shadow-[0_0_25px_rgba(204,166,79,0.5)] tracking-wide cursor-pointer">
            Check for Plagiarism
          </button>
        </div>

        {/* Feature Grid Segment */}
        <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl text-left">
          {/* Card 1: Exact Match Detection */}
          <div className="border border-amber-500/20 bg-[#121d31]/40 rounded-xl p-8 backdrop-blur-xs transition-all duration-300 hover:border-amber-500/40 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="mb-5 p-2 rounded-lg text-[#cca64f]">
              <FileSearch className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-xl mb-3 tracking-wide text-white">
              Exact Match Detection
            </h3>
            <p className="text-slate-400 font-serif text-sm leading-relaxed">
              Rabin-Karp rolling hash algorithm identifies identical text
              sequences with cryptographic precision, catching verbatim
              plagiarism instantly.
            </p>
          </div>

          {/* Card 2: Semantic Analysis */}
          <div className="border border-amber-500/20 bg-[#121d31]/40 rounded-xl p-8 backdrop-blur-xs transition-all duration-300 hover:border-amber-500/40 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="mb-5 p-2 rounded-lg text-[#cca64f]">
              <Sparkles className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-xl mb-3 tracking-wide text-white">
              Semantic Analysis
            </h3>
            <p className="text-slate-400 font-serif text-sm leading-relaxed">
              TF-IDF vectorization detects paraphrased content and conceptual
              similarities, revealing sophisticated plagiarism attempts.
            </p>
          </div>

          {/* Card 3: Visual Highlighting */}
          <div className="border border-amber-500/20 bg-[#121d31]/40 rounded-xl p-8 backdrop-blur-xs transition-all duration-300 hover:border-amber-500/40 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="mb-5 p-2 rounded-lg text-[#cca64f]">
              <Eye className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-xl mb-3 tracking-wide text-white">
              Visual Highlighting
            </h3>
            <p className="text-slate-400 font-serif text-sm leading-relaxed">
              Color-coded overlay system instantly highlights suspicious
              passages with similarity scores and source attribution.
            </p>
          </div>
        </div>
      </main>

      {/* Styled Branded Footer */}
      <footer className="border-t border-slate-800/60 bg-[#0b121f] py-8 text-center text-xs tracking-wider text-slate-400">
        <p className="mb-1 text-slate-400 font-serif">
          Built with precision by the PlagioScan Team
        </p>
        <p className="text-[#cca64f]/80 font-serif text-[11px] space-x-2">
          <span>Academic Integrity</span> • <span>Advanced Detection</span> •{" "}
          <span>Trusted Accuracy</span>
        </p>
      </footer>
    </div>
  );
}
