// components/AppButton.tsx
"use client";

import React from "react";

interface AppButtonProps {
  caption: string;             // button text
  onClick?: () => void;        // click handler
  icon?: React.ReactNode;      // optional icon
  type?: "button" | "submit" | "reset"; 
  className?: string;          // extra Tailwind classes
}

export default function AppButton({
  caption,
  onClick,
  icon,
  type = "button",
  className = "",
}: AppButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-md transition text-white ${className}`}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      <span>{caption}</span>
    </button>
  );
}
