import React, { useState } from "react";
import { Eye, EyeOff, ShieldCheck, FileSearch, Sparkles } from "lucide-react";

// Plagiarism-Detector — Auth page
// Token system, matched to the landing page:
// Color: ink #0B1120, panel #111A2E, hairline #2A3550, gold #D9B65A, gold-bright #F0C975, fog #8C97AE, paper #F4F1EA
// Type: display = "Playfair Display"-style serif (headline), body = system sans
// Signature element: a rolling-hash "fingerprint" strip on the side panel that
// animates like a scanning hash sweep — ties directly to the Rabin-Karp hero copy.

export default function AuthPage() {
  const [mode, setMode] = useState("signin"); // 'signin' | 'signup'
  const [showPw, setShowPw] = useState(false);

  const isSignup = mode === "signup";

  return (
    <div className="min-h-screen w-full bg-[#0B1120] text-[#E7E9EE] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] rounded-2xl overflow-hidden border border-[#2A3550]/70 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
        {/* Left: brand / signature panel */}
        <div className="relative hidden lg:flex flex-col justify-between bg-[#0E1626] p-10 overflow-hidden">
          <FingerprintSweep />

          <div className="relative z-10">
            <a href="#" className="flex items-center gap-2">
              <span className="font-serif text-2xl text-[#D9B65A] tracking-tight">
                Plagiarism-Detector
              </span>
            </a>
          </div>

          <div className="relative z-10 mt-12">
            <h1 className="font-serif text-[2.6rem] leading-[1.05] text-[#F4F1EA]">
              Detect.
              <br />
              Analyze.
              <br />
              Integrity.
            </h1>
            <p className="mt-5 text-[#8C97AE] text-sm leading-relaxed max-w-sm">
              Hybrid Rabin-Karp fingerprinting and TF-IDF semantic analysis,
              working line by line to confirm every document is genuinely yours.
            </p>
          </div>

          <div className="relative z-10 mt-12 grid grid-cols-3 gap-4 text-[#8C97AE]">
            <Feature icon={<FileSearch size={16} />} label="Exact Match" />
            <Feature icon={<Sparkles size={16} />} label="Semantic Scan" />
            <Feature icon={<ShieldCheck size={16} />} label="Verified Source" />
          </div>
        </div>

        {/* Right: form panel */}
        <div className="bg-[#111A2E] p-8 sm:p-12 flex flex-col justify-center">
          <div className="lg:hidden mb-8 text-center">
            <span className="font-serif text-xl text-[#D9B65A]">
              Plagiarism-Detector
            </span>
          </div>

          {/* Mode toggle */}
          <div className="flex bg-[#0B1120] border border-[#2A3550] rounded-lg p-1 mb-8">
            <ToggleButton active={!isSignup} onClick={() => setMode("signin")}>
              Sign In
            </ToggleButton>
            <ToggleButton active={isSignup} onClick={() => setMode("signup")}>
              Sign Up
            </ToggleButton>
          </div>

          <h2 className="font-serif text-3xl text-[#F4F1EA] mb-2">
            {isSignup ? "Create your account" : "Welcome back"}
          </h2>
          <p className="text-[#8C97AE] text-sm mb-8">
            {isSignup
              ? "Start scanning documents for originality in minutes."
              : "Sign in to continue checking documents for plagiarism."}
          </p>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {isSignup && (
              <Field label="Full name">
                <input
                  type="text"
                  placeholder="Jane Whitfield"
                  className={inputClass}
                />
              </Field>
            )}

            <Field label="Email address">
              <input
                type="email"
                placeholder="jane@university.edu"
                className={inputClass}
              />
            </Field>

            <Field label="Password">
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••••"
                  className={`${inputClass} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C97AE] hover:text-[#D9B65A] transition-colors"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </Field>

            {!isSignup && (
              <div className="flex justify-end -mt-1">
                <a
                  href="#"
                  className="text-xs text-[#8C97AE] hover:text-[#D9B65A] transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-2 bg-[#D9B65A] hover:bg-[#F0C975] text-[#0B1120] font-semibold tracking-wide py-3 rounded-lg transition-colors shadow-[0_0_0_1px_rgba(217,182,90,0.4)]"
            >
              {isSignup ? "Create account" : "Check for Plagiarism"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-7">
            <div className="h-px flex-1 bg-[#2A3550]" />
            <span className="text-xs text-[#8C97AE]">or continue with</span>
            <div className="h-px flex-1 bg-[#2A3550]" />
          </div>

          <button className="w-full border border-[#2A3550] hover:border-[#D9B65A]/60 rounded-lg py-2.5 text-sm text-[#E7E9EE] flex items-center justify-center gap-2 transition-colors">
            <GoogleIcon />
            Google
          </button>

          <p className="text-center text-sm text-[#8C97AE] mt-8">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setMode(isSignup ? "signin" : "signup")}
              className="text-[#D9B65A] hover:text-[#F0C975] font-medium transition-colors"
            >
              {isSignup ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

const inputClass =
  "w-full bg-[#0B1120] border border-[#2A3550] focus:border-[#D9B65A] focus:ring-1 focus:ring-[#D9B65A]/40 rounded-lg px-4 py-2.5 text-sm text-[#E7E9EE] placeholder-[#5C667D] outline-none transition-colors";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wide text-[#8C97AE] mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}

function ToggleButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
        active
          ? "bg-[#D9B65A] text-[#0B1120]"
          : "text-[#8C97AE] hover:text-[#E7E9EE]"
      }`}
    >
      {children}
    </button>
  );
}

function Feature({ icon, label }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="text-[#D9B65A]">{icon}</div>
      <span className="text-xs leading-tight">{label}</span>
    </div>
  );
}

// Signature element: a faint sweeping line + scattered hash dots evoking a
// rolling-hash scan across the document, animated slowly across the panel.
function FingerprintSweep() {
  return (
    <div className="absolute inset-0 opacity-[0.35] pointer-events-none">
      <svg
        viewBox="0 0 400 600"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="sweepLine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D9B65A" stopOpacity="0" />
            <stop offset="50%" stopColor="#D9B65A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D9B65A" stopOpacity="0" />
          </linearGradient>
        </defs>
        {Array.from({ length: 14 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            x2="400"
            y1={i * 44 + 10}
            y2={i * 44 + 10}
            stroke="#2A3550"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 26 }).map((_, i) => (
          <circle
            key={i}
            cx={(i * 53) % 400}
            cy={((i * 97) % 600) + 10}
            r={i % 4 === 0 ? 2.4 : 1.4}
            fill="#D9B65A"
            fillOpacity={i % 3 === 0 ? 0.8 : 0.35}
          />
        ))}
        <rect x="0" y="-200" width="400" height="200" fill="url(#sweepLine)">
          <animate
            attributeName="y"
            from="-200"
            to="600"
            dur="6s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A10.99 10.99 0 0012 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1A6.6 6.6 0 015.5 12c0-.73.13-1.44.34-2.1V7.05H2.18A11 11 0 001 12c0 1.77.43 3.45 1.18 4.95l3.66-2.85z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.85C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}
