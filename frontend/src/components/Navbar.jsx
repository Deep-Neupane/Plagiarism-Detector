import React, { useState } from "react";
import {
  Home,
  Upload,
  BarChart3,
  Files,
  ShieldCheck,
  Info,
} from "lucide-react";

export default function Navbar() {
  // Track active tab to replicate the highlighted background look
  const [activeTab, setActiveTab] = useState("Home");

  const navItems = [
    { name: "Home", icon: Home },
    { name: "Upload", icon: Upload },
    { name: "Results", icon: BarChart3 },
    { name: "Comparison", icon: Files },
    { name: "Admin", icon: ShieldCheck },
    { name: "About", icon: Info },
  ];

  return (
    <nav className="w-full bg-[#0d1520] border-b border-[#1e293b] px-8 py-4 flex items-center justify-between select-none">
      {/* Logo / Brand Name */}
      <div className="text-[#d4af37] text-2xl font-serif font-bold tracking-wide cursor-pointer hover:opacity-90 transition-opacity">
        Plagarism-Detector
      </div>

      {/* Navigation Items */}
      <div className="flex items-center gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200
                ${
                  isActive
                    ? "bg-[#1a2433] text-[#d4af37] shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-[#131c2c]"
                }`}
            >
              <Icon
                size={16}
                className={isActive ? "text-[#d4af37]" : "text-slate-400"}
              />
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
