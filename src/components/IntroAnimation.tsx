"use client";

import * as React from "react";
import { Sparkles, Radio, CheckCircle2, ArrowRight } from "lucide-react";

export function IntroAnimation() {
  const [stage, setStage] = React.useState<"active" | "fading" | "hidden">("active");
  const [phaseIndex, setPhaseIndex] = React.useState(0);
  const [progress, setProgress] = React.useState(10);

  const phases = React.useMemo(
    () => [
      {
        text: "Recording API traffic...",
        icon: Radio,
        color: "text-amber-500 dark:text-amber-400",
      },
      {
        text: "Synthesizing tests & mocks...",
        icon: Sparkles,
        color: "text-orange-500 dark:text-orange-400",
      },
      {
        text: "Ready. Replaying baseline...",
        icon: CheckCircle2,
        color: "text-emerald-500 dark:text-emerald-400",
      },
    ],
    []
  );

  const handleFinish = React.useCallback(() => {
    try {
      sessionStorage.setItem("keploy_intro_seen", "true");
    } catch {
      // Ignore sessionStorage errors in restricted environments
    }
    setStage("fading");
    setTimeout(() => {
      setStage("hidden");
    }, 500);
  }, []);

  React.useEffect(() => {
    // Check if user already saw the intro in this session
    try {
      if (sessionStorage.getItem("keploy_intro_seen") === "true") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStage("hidden");
        return;
      }
    } catch {
      // Continue to show if storage access fails
    }

    // Lock body scroll while intro is playing
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Progress animations over 2.4 seconds
    const tProgress1 = setTimeout(() => setProgress(45), 250);
    const tPhase1 = setTimeout(() => {
      setPhaseIndex(1);
      setProgress(80);
    }, 900);
    const tPhase2 = setTimeout(() => {
      setPhaseIndex(2);
      setProgress(100);
    }, 1800);
    const tComplete = setTimeout(() => {
      handleFinish();
    }, 2450);

    return () => {
      clearTimeout(tProgress1);
      clearTimeout(tPhase1);
      clearTimeout(tPhase2);
      clearTimeout(tComplete);
      document.body.style.overflow = originalOverflow;
    };
  }, [handleFinish]);

  if (stage === "hidden") {
    return null;
  }

  const CurrentIcon = phases[phaseIndex].icon;

  return (
    <div
      id="keploy-intro-overlay"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center select-none transition-all duration-500 ease-out ${
        stage === "fading"
          ? "opacity-0 scale-105 blur-sm pointer-events-none"
          : "opacity-100 scale-100 blur-0"
      }`}
      aria-label="Keploy intro animation"
      role="status"
    >
      {/* Background with theme-aware radial glow */}
      <div className="absolute inset-0 bg-[#f8fafc] dark:bg-[#020817] transition-colors duration-300" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.18)_0%,transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.22)_0%,transparent_65%)]" />
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-orange-500/15 dark:bg-orange-500/20 blur-3xl pointer-events-none" />

      {/* Subtle animated background grid */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Skip button for quick manual bypass */}
      <button
        onClick={handleFinish}
        className="absolute top-6 right-6 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-200/60 dark:bg-slate-800/60 hover:bg-slate-300/80 dark:hover:bg-slate-700/80 backdrop-blur-md transition-all border border-slate-300/40 dark:border-slate-700/40 cursor-pointer"
        aria-label="Skip intro animation"
      >
        <span>Skip</span>
        <ArrowRight className="w-3 h-3" />
      </button>

      {/* Central Animated Content */}
      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Animated Emblem / Mascot */}
        <div className="relative mb-6 group intro-logo-float">
          {/* Pulsing halo ring */}
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-orange-500 to-amber-400 blur-xl intro-halo" />

          {/* Main Logo Container */}
          <div className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-orange-500/30 dark:border-orange-500/40 shadow-2xl shadow-orange-500/20 backdrop-blur-md">
            {/* Custom Keploy Mascot SVG */}
            <svg
              className="w-14 h-14 sm:w-16 sm:h-16 text-orange-500"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Radar traffic signal waves */}
              <path
                d="M18 36C22 22 36 12 50 12C64 12 78 22 82 36"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="4 6"
                className="opacity-40 animate-[spin_8s_linear_infinite]"
                style={{ transformOrigin: "50% 50%" }}
              />

              {/* Ears */}
              <path
                d="M34 16C34 16 38 28 42 38C38 39 34 39 30 38C26 28 34 16 34 16Z"
                fill="url(#earsGradient)"
              />
              <path
                d="M66 16C66 16 62 28 58 38C62 39 66 39 70 38C74 28 66 16 66 16Z"
                fill="url(#earsGradient)"
              />

              {/* Inner ear glow highlights */}
              <path
                d="M35 22C35 22 37 28 39 34C37 34 35 34 33 34C31 28 35 22 35 22Z"
                fill="#fb923c"
                className="opacity-80"
              />
              <path
                d="M65 22C65 22 63 28 61 34C63 34 65 34 67 34C69 28 65 22 65 22Z"
                fill="#fb923c"
                className="opacity-80"
              />

              {/* Bunny Head / Shield Body */}
              <rect
                x="22"
                y="36"
                width="56"
                height="46"
                rx="20"
                fill="url(#headGradient)"
                stroke="#ea580c"
                strokeWidth="2.5"
              />

              {/* Friendly Eyes / Tech Visor */}
              <circle cx="39" cy="54" r="5" fill="#0f172a" />
              <circle cx="61" cy="54" r="5" fill="#0f172a" />
              <circle cx="41" cy="52" r="1.8" fill="#ffffff" />
              <circle cx="63" cy="52" r="1.8" fill="#ffffff" />

              {/* Cheerful Nose / Mouth */}
              <path
                d="M48 63C49 64.5 51 64.5 52 63"
                stroke="#0f172a"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M50 60V63"
                stroke="#0f172a"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Keploy Orange Cheeks */}
              <circle cx="31" cy="61" r="3.5" fill="#fb923c" fillOpacity="0.5" />
              <circle cx="69" cy="61" r="3.5" fill="#fb923c" fillOpacity="0.5" />

              {/* Gradients */}
              <defs>
                <linearGradient id="headGradient" x1="22" y1="36" x2="78" y2="82" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ffffff" />
                  <stop offset="1" stopColor="#fed7aa" />
                </linearGradient>
                <linearGradient id="earsGradient" x1="30" y1="16" x2="70" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#f97316" />
                  <stop offset="1" stopColor="#ea580c" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Brand Title with Gradient Text */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center justify-center gap-1.5">
          <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
            Keploy
          </span>
          <span className="text-slate-800 dark:text-slate-100 font-bold">Docs</span>
        </h1>

        {/* Subtitle Badge */}
        <div className="mt-2 text-xs uppercase tracking-widest font-semibold text-slate-500 dark:text-slate-400">
          Zero-Code API Testing for Go
        </div>

        {/* Status Pill & Activity Indicator */}
        <div className="mt-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200/70 dark:bg-slate-800/80 border border-slate-300/50 dark:border-slate-700/50 shadow-sm backdrop-blur">
          <CurrentIcon className={`w-3.5 h-3.5 animate-pulse ${phases[phaseIndex].color}`} />
          <span className="text-xs font-medium text-slate-700 dark:text-slate-200 transition-all duration-300">
            {phases[phaseIndex].text}
          </span>
        </div>

        {/* Smooth Glowing Progress Bar */}
        <div className="w-48 sm:w-56 h-1.5 mt-5 bg-slate-200 dark:bg-slate-800/90 rounded-full overflow-hidden p-0.5 border border-slate-300/30 dark:border-slate-700/30">
          <div
            className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-500 ease-out shadow-sm shadow-orange-500/50"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
