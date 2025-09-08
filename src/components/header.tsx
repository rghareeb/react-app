"use client";
import React from "react";
import Link from "next/link";
import { Home,Pill, Settings, LogOut, Users, BarChart3, Package, FileText, RefreshCcw, Trash2, Monitor,CircleUserRound,LandPlot } from "lucide-react";

import { useSearchParams } from "next/navigation";
interface HeaderProps {
    user_name?:string;
    user_role?:string;
      children?: React.ReactNode; 
}
function Header({ user_name,user_role,children}: HeaderProps ){
 const searchParams=useSearchParams();

  const username=user_name || searchParams.get('username') || "Guest";
  const role=user_role || searchParams.get('role') || "User";
return (

    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white flex justify-between items-center px-4 py-2 shadow">
        <div className="flex items-center gap-4">
          {/* Left icons */}
          {/* <button className="p-2 hover:bg-blue-700 rounded-full">
            <span className="text-lg">✖</span>
          </button> */}
           <div className="flex items-center gap-3">
          <div className="w-16 h-16 bg-white text-blue-600 font-bold flex items-center justify-center rounded-full text-xl">
            {username}
          </div>
          <div className="text-right">
            <p className="font-semibold text-lg">{username}</p>
            <p className="text-sm opacity-80">{role}</p>
          </div>
          </div>
          {/* <button className="p-2 hover:bg-blue-700 rounded-full">
            <Monitor className="w-5 h-5" />
          </button>
          <span>0</span> */}
        </div>
        <h1 className="font-bold">نظام المذخر</h1>
      </header>

      {/* Main layout */}
      <div className="flex flex-1">
        {/* Content */}
        <main className="flex-1 bg-gray-100 p-6">
            <main className="flex-1 p-8">{children}</main>
        </main>
        {/* Sidebar */}
        <aside className="w-64 bg-gray-700 text-white flex flex-col py-4">
          <nav className="flex flex-col space-y-3 px-4">
                <a href="/pharmacy" className="flex items-center gap-3 hover:bg-gray-600 p-2 rounded">
              <Pill className="w-5 h-5" /> إدارة الصيدليات
            </a>
            <a href="/drugs" className="flex items-center gap-3 hover:bg-gray-600 p-2 rounded">
              <FileText className="w-5 h-5" /> إدارة الأدوية
            </a>
            <a href="/customers" className="flex items-center gap-3 hover:bg-gray-600 p-2 rounded">
              <Trash2 className="w-5 h-5" /> إدارة الزبائن
            </a>
            <a href="/debts" className="flex items-center gap-3 hover:bg-gray-600 p-2 rounded">
              <Users className="w-5 h-5" /> إدارة الديون
            </a>
            <a href="/representatives" className="flex items-center gap-3 hover:bg-gray-600 p-2 rounded">
              <Package className="w-5 h-5" /> إدارة المندوبين
            </a>
             <a href="/suppliers" className="flex items-center gap-3 hover:bg-gray-600 p-2 rounded">
              <CircleUserRound className="w-5 h-5" /> إدارة المجهزين
            </a>
             <a href="/districts" className="flex items-center gap-3 hover:bg-gray-600 p-2 rounded">
              <LandPlot className="w-5 h-5" /> إدارة المناطق
            </a>
            <a href="/settings" className="flex items-center gap-3 hover:bg-gray-600 p-2 rounded">
              <RefreshCcw className="w-5 h-5" /> الإعدادات
            </a>
            {/* <a href="#" className="flex items-center gap-3 hover:bg-gray-600 p-2 rounded">
              <Home className="w-5 h-5" /> المخزن
            </a>
            <a href="#" className="flex items-center gap-3 hover:bg-gray-600 p-2 rounded">
              <BarChart3 className="w-5 h-5" /> المبيعات
            </a>
            <a href="#" className="flex items-center gap-3 hover:bg-gray-600 p-2 rounded">
              <Settings className="w-5 h-5" /> الإعدادات
            </a> */}
            <a href="#" className="flex items-center gap-3 hover:bg-gray-600 p-2 rounded">
              <LogOut className="w-5 h-5" /> خروج
            </a>
          </nav>
        </aside>
      </div>
    </div>
  );




  // return (
  //   <div className="w-full shadow bg-blue-600 text-white">
  //     {/* Top Bar */}
  //     <div className="flex items-center justify-between p-4">
  //       {/* زر الخروج */}
  //       <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium transition">
  //         x
  //       </button>
  //       <div className="flex items-center gap-3">
  //         <div className="w-12 h-12 bg-white text-blue-600 font-bold flex items-center justify-center rounded-full text-lg">
  //           {username.charAt(0)}
  //         </div>
  //         <div className="text-right">
  //           <p className="font-semibold text-lg">{username}</p>
  //           <p className="text-sm opacity-80">{role}</p>
  //         </div>
  //       </div>
  //     </div>

  //     {/* الروابط */}
  //     <div className="flex justify-left items-end bg-white ">
  //       {[
  //         { href: "/drugs", label: "إدارة الأدوية" },
  //         { href: "/customers", label: "إدارة الزبائن" },
  //         { href: "/debts", label: "إدارة الديون" },
  //         { href: "/representatives", label: "إدارة المندوبين" },
  //         { href: "/settings", label: "الإعدادات" },
  //       ].map((link) => (
  //         <Link
  //           key={link.href}
  //           href={link.href}
  //           className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1  text-center font-semibold shadow-md transition text-sm"
  //         >
  //           {link.label}
  //         </Link>
  //       ))}
  //     </div>
  //   </div>
  // );
}


    export default Header;