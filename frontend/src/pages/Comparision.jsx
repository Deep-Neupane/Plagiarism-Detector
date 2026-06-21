import React from "react";
import {
  LayoutDashboard,
  Globe,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function Results() {
  // Mock data representing matched sources from your layout
  const matchingSources = [
    {
      id: 1,
      url: "https://en.wikipedia.org/wiki/Rabin–Karp_algorithm",
      percentage: "24%",
    },
    {
      id: 2,
      url: "https://www.geeksforgeeks.org/rabin-karp-algorithm-for-pattern-searching/",
      percentage: "12%",
    },
    { id: 3, url: "https://arxiv.org/abs/cs/0111015", percentage: "5%" },
  ];

  return (
    <div className="min-h-screen bg-[#0e1726] text-white flex flex-col font-sans select-none antialiased">
      {/* Results Main Split Workspace Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* ================= LEFT SIDE: HIGHLIGHTED TEXT BLOCK (7 Columns) ================= */}
        <section className="lg:col-span-7 flex flex-col gap-4">
          <div className="border border-slate-800/80 bg-[#121d31]/40 rounded-xl flex-1 flex flex-col overflow-hidden backdrop-blur-xs shadow-lg">
            {/* Context Card Header Toolbar */}
            <div className="px-4 py-3.5 border-b border-slate-800/60 flex items-center justify-between bg-[#121d31]/20">
              <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-2">
                <AlertTriangle size={14} className="text-[#cca64f]" />
                Analysis Document Overview
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                Highlighted blocks indicate similarity sequences
              </span>
            </div>

            {/* Rendered Text Box Layer Container */}
            <div className="w-full flex-1 p-6 text-slate-300 text-sm leading-relaxed font-serif overflow-y-auto max-h-[550px] lg:max-h-[600px]">
              <p className="mb-4">
                The core engine relies heavily on hybrid mathematical
                vectorization properties.
                <span className="bg-amber-500/20 text-amber-200 border-b-2 border-[#cca64f] px-1 py-0.5 rounded-xs mx-0.5 font-medium transition-all">
                  The Rabin-Karp algorithm uses rolling hash values to
                  efficiently match fixed patterns inside larger texts. By
                  mapping character windows into calculated integer
                  representations, it circumvents standard nested string scans.
                </span>
                This offers robust linear lookup pipelines across complex
                documentation.
              </p>

              <p className="mb-4">
                Furthermore, textual comparisons are enhanced by mapping
                structural term frequencies.
                <span className="bg-amber-500/20 text-amber-200 border-b-2 border-[#cca64f] px-1 py-0.5 rounded-xs mx-0.5 font-medium transition-all">
                  TF-IDF vector values help weight term distributions across
                  database records. This filters out frequently appearing
                  grammatical terms like connectors while elevating rare unique
                  descriptive statements.
                </span>
                The vectors are then mapped mathematically via cosine
                similarities to evaluate true conceptual plagiarized patterns
                rather than simple verbatim word-for-word string re-ordering
                techniques.
              </p>

              <p>
                As a result, checking overlapping sequences allows
                administrators to quickly flag paraphrased segments across
                multi-author papers effortlessly.
              </p>
            </div>
          </div>
        </section>

        {/* ================= RIGHT SIDE: SIMILARITY INDEX METRICS (5 Columns) ================= */}
        <section className="lg:col-span-5 flex flex-col gap-5 justify-start">
          {/* Main Title Banner */}
          <div className="pt-2 border-b border-slate-800/40 pb-3">
            <h2 className="text-xl font-serif tracking-wide text-white">
              Analysis Results
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Identified matches and mathematical scoring metrics
            </p>
          </div>

          {/* Metric Scaffolding Panels */}
          <div className="flex flex-col gap-4">
            {/* Metric Card 1: Plagiarism Percentage Score */}
            <div className="border border-slate-800/80 bg-[#121d31]/20 rounded-xl p-5 flex items-center justify-between shadow-xs">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-[#cca64f] rounded-lg shrink-0">
                  <LayoutDashboard size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-wide text-white mb-0.5">
                    Plagiarism Score
                  </h4>
                  <p className="text-xs text-slate-400 max-w-[210px] leading-relaxed font-serif">
                    Overall computed document weight matching secondary
                    reference content databases.
                  </p>
                </div>
              </div>

              {/* Radial Callout Percentage Number */}
              <div className="text-right">
                <span className="text-4xl font-serif font-bold text-[#cca64f] tracking-tight block">
                  41%
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500/80 font-bold">
                  Match Detected
                </span>
              </div>
            </div>

            {/* Metric Card 2: Sources Domain Panel */}
            <div className="border border-slate-800/80 bg-[#121d31]/20 rounded-xl p-5 flex flex-col shadow-xs">
              {/* Sub header */}
              <div className="flex items-center gap-2 border-b border-slate-800/50 pb-3 mb-3">
                <Globe size={16} className="text-slate-400" />
                <h4 className="text-sm font-semibold tracking-wide text-white">
                  Matched Reference Sources
                </h4>
              </div>

              {/* Source Lists */}
              <div className="flex flex-col gap-2.5">
                {matchingSources.map((source) => (
                  <div
                    key={source.id}
                    className="bg-[#121d31]/40 rounded-lg p-3 border border-slate-800/60 flex items-center justify-between gap-4 group hover:border-slate-700/80 transition-all duration-200"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-xs font-mono text-slate-500 font-bold shrink-0">
                        0{source.id}.
                      </span>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-serif text-slate-300 truncate hover:text-[#cca64f] transition-colors flex items-center gap-1"
                      >
                        {source.url}
                        <ExternalLink
                          size={10}
                          className="inline opacity-0 group-hover:opacity-100 transition-opacity text-slate-500"
                        />
                      </a>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-bold text-slate-200 bg-slate-800/40 px-2 py-0.5 rounded border border-slate-700/30">
                        {source.percentage}
                      </span>
                      <ArrowRight
                        size={12}
                        className="text-slate-500 group-hover:text-[#cca64f] group-hover:translate-x-0.5 transition-all"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
