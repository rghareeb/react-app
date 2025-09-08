// components/AppButton.tsx
"use client";

import React from "react";

interface CancelBtnProps {
  caption: string;             // button text
  onClick?: () => void;        // click handler
  icon?: React.ReactNode;      // optional icon
  type?: "button" | "submit" | "reset"; 
  className?: string;          // extra Tailwind classes
}

export default function CancelBtn({
  caption,
  onClick,
  icon,
  type = "button",
  className = "",
}: CancelBtnProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`className="flex-1 bg-gray-500 hover:bg-gray-600 text-white p-2 rounded"
 ${className}`}
    >
    
      <span>{caption}</span>
    </button>
  );
}
