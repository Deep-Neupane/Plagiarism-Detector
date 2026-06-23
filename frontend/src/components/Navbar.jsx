import React from "react";
import { NavLink } from "react-router-dom"; // Use NavLink instead of useState + useNavigate
import {
  Home,
  Upload,
  BarChart3,
  Files,
  ShieldCheck,
  Info,
} from "lucide-react";

export default function Navbar() {
  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Upload", path: "/upload", icon: Upload },
    { name: "Comparison", path: "/comparision", icon: BarChart3 },
    { name: "History", path: "/history", icon: ShieldCheck },
    { name: "About", path: "/about", icon: Info },
  ];

  return (
    <nav className="w-full bg-[#0d1520] border-b border-[#1e293b] px-8 py-4 flex items-center justify-between select-none">
      {/* Logo / Brand Name */}
      <NavLink 
        to="/" 
        className="text-[#d4af37] text-2xl font-serif font-bold tracking-wide cursor-pointer hover:opacity-90 transition-opacity"
      >
        Plagiarism-Detector
      </NavLink>

      {/* Navigation Items */}
      <div className="flex items-center gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 cursor-pointer
                ${
                  isActive
                    ? "bg-[#1a2433] text-[#d4af37] shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-[#131c2c]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={16}
                    className={isActive ? "text-[#d4af37]" : "text-slate-400"}
                  />
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}