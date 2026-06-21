import React from "react";
import {
  Upload,
  FileText,
  Hash,
  BarChart3,
  CheckSquare,
  Code2,
  Brain,
} from "lucide-react";

export default function About() {
  // Data for the vertical "How It Works" timeline steps
  const steps = [
    {
      step: "Step 1",
      title: "Upload",
      desc: "Submit your document for plagiarism analysis. Supported formats include PDF, DOCX, and TXT.",
      icon: Upload,
    },
    {
      step: "Step 2",
      title: "Preprocess",
      desc: "Text is extracted, cleaned, and normalized. We remove formatting and tokenize the content.",
      icon: FileText,
    },
    {
      step: "Step 3",
      title: "Rabin-Karp Matching",
      desc: "Efficient rolling hash algorithm detects exact text matches against our database.",
      icon: Hash,
    },
    {
      step: "Step 4",
      title: "TF-IDF Cosine Similarity",
      desc: "Advanced semantic analysis identifies paraphrased content and similar patterns.",
      icon: BarChart3,
    },
    {
      step: "Step 5",
      title: "Results",
      desc: "Comprehensive report highlighting matched sections with similarity scores and source attribution.",
      icon: CheckSquare,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0e1726] text-white flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Brand Header Block */}
      <header className="max-w-6xl w-full mx-auto px-6 pt-12 pb-6 border-b border-slate-800/40">
        <h2 className="text-2xl font-bold tracking-tight text-[#cca64f] mb-1">
          Plagiarism Detection System
        </h2>
        <p className="text-xs text-slate-400 tracking-wide">
          Advanced algorithms for academic integrity
        </p>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-16 flex flex-col items-center">
        {/* SECTION 1: HOW IT WORKS */}
        <section className="w-full text-center mb-24">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
            How It Works
          </h1>
          <p className="max-w-xl mx-auto text-slate-400 text-sm md:text-base leading-relaxed mb-16">
            Our five-step workflow combines traditional pattern matching with
            cutting-edge semantic analysis
          </p>

          {/* Stepper Timeline Stack */}
          <div className="relative max-w-2xl mx-auto flex flex-col gap-12 text-left pl-8 sm:pl-0">
            {/* The vertical connector line */}
            <div className="absolute left-[24px] sm:left-6 top-4 bottom-4 w-[2px] bg-gradient-to-b from-amber-500/30 via-amber-500/20 to-transparent pointer-events-none" />

            {steps.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  className="relative flex flex-col sm:flex-row items-start gap-6 group"
                >
                  {/* Glowing Icon Container representing the Step node */}
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-[#121d31] border border-amber-500/30 text-[#cca64f] shadow-[0_0_15px_rgba(204,166,79,0.15)] group-hover:border-amber-500/60 transition-all shrink-0">
                    <IconComponent className="w-5 h-5" strokeWidth={1.5} />
                  </div>

                  {/* Step Description Content */}
                  <div className="flex-1 pt-1">
                    <span className="text-[11px] font-medium tracking-widest text-[#cca64f] uppercase block mb-1">
                      {item.step}
                    </span>
                    <h3 className="text-lg font-semibold text-white mb-2 tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: ALGORITHM DETAILS */}
        <section className="w-full text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Algorithm Details
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 text-sm leading-relaxed mb-16">
            Dual-layer detection ensures both verbatim copying and sophisticated
            paraphrasing are caught
          </p>

          {/* Algorithm Grid Layout */}
          <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl text-left">
            {/* Card 1: Rabin-Karp */}
            <div className="relative overflow-hidden border border-slate-800/80 bg-[#121d31]/30 rounded-2xl p-8 backdrop-blur-xs flex flex-col">
              {/* Top-Right Ambient Geometric Background Effect */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-slate-800/20 rounded-full blur-2xl pointer-events-none" />

              <div className="mb-6 w-11 h-11 rounded-lg bg-slate-800/50 border border-slate-700/40 flex items-center justify-center text-amber-500/80">
                <Code2 className="w-5 h-5" strokeWidth={1.5} />
              </div>

              <h3 className="text-2xl font-serif text-white mb-1">
                Rabin-Karp
              </h3>
              <span className="text-xs font-medium text-[#cca64f] tracking-wide block mb-4">
                Exact Match Detection
              </span>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
                Uses rolling hash functions to efficiently scan text for exact
                substring matches. By computing hash values for sliding windows
                of text, we can quickly identify verbatim copying without
                comparing every character. This approach offers $O(n)$ time
                complexity for pattern matching across millions of documents.
              </p>
            </div>

            {/* Card 2: TF-IDF + Cosine Similarity */}
            <div className="relative overflow-hidden border border-slate-800/80 bg-[#121d31]/30 rounded-2xl p-8 backdrop-blur-xs flex flex-col">
              {/* Top-Right Ambient Geometric Background Effect */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-slate-800/20 rounded-full blur-2xl pointer-events-none" />

              <div className="mb-6 w-11 h-11 rounded-lg bg-slate-800/50 border border-slate-700/40 flex items-center justify-center text-amber-500/80">
                <Brain className="w-5 h-5" strokeWidth={1.5} />
              </div>

              <h3 className="text-2xl font-serif text-white mb-1">
                TF-IDF + Cosine Similarity
              </h3>
              <span className="text-xs font-medium text-[#cca64f] tracking-wide block mb-4">
                Semantic Analysis
              </span>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
                Term Frequency-Inverse Document Frequency weights words by
                importance, then cosine similarity measures the angle between
                document vectors. This mathematical approach detects
                paraphrasing and conceptual overlap even when exact wording
                differs, catching sophisticated plagiarism attempts that simple
                string matching would miss.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Styled Inline View Footer */}
      <footer className="border-t border-slate-900/60 bg-[#0b121f] py-6 text-center text-[11px] tracking-wide text-slate-500">
        <p>
          &copy; 2026 Plagiarism Detection System. Ensuring academic integrity.
        </p>
      </footer>
    </div>
  );
}
