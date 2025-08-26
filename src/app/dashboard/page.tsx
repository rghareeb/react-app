"use client"; // لضمان أن هذه الصفحة تعمل في المتصفح

// import Link from "next/link"; // استيراد Link للتنقل بين الصفحات
// import { useSearchParams } from "next/navigation";
import React from "react";
import Header from "../../components/header";
export default function Dashboard() {

return (
  
    

      <div className="">
    
         <Header/> 
         
      {/* <div className="flex-1 p-8">
      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-50 rounded-lg p-4 text-center shadow">
            <h2 className="text-xl font-semibold text-gray-600 font-mono">عدد الأدوية</h2>
            <p className="text-xl font-bold text-blue-600 font-mono">50</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center shadow">
            <h2 className="text-xl font-semibold text-gray-600 font-mono">عدد الزبائن</h2>
            <p className="text-xl font-bold text-green-600 font-mono">120</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center shadow">
            <h2 className="text-xl font-semibold text-gray-600 font-mono">المبيعات</h2>
            <p className="text-xl font-bold text-indigo-600 font-mono">3000</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center shadow">
            <h2 className="text-xl font-semibold text-gray-600 font-mono">الديون المستحقة</h2>
            <p className="text-xl font-bold text-red-600 font-mono">500</p>
          </div>
        </div>

      </div> */}

      
    </div>

);


  // return (
    
  //   <div className="max-w-6xl mx-auto mt-10 p-6">
  //     <nav>{username}</nav>
  //     {/* العنوان الرئيسي */}
  //     <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
  //       لوحة التحكم
  //     </h1>

  //     {/* الإحصائيات */}
  //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
  //       <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
  //         <h2 className="text-lg font-semibold text-gray-600">عدد الأدوية</h2>
  //         <p className="text-2xl font-bold text-blue-600 mt-2">50</p>
  //       </div>
  //       <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
  //         <h2 className="text-lg font-semibold text-gray-600">عدد الزبائن</h2>
  //         <p className="text-2xl font-bold text-green-600 mt-2">120</p>
  //       </div>
  //       <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
  //         <h2 className="text-lg font-semibold text-gray-600">المبيعات</h2>
  //         <p className="text-2xl font-bold text-indigo-600 mt-2">3000</p>
  //       </div>
  //       <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
  //         <h2 className="text-lg font-semibold text-gray-600">الديون المستحقة</h2>
  //         <p className="text-2xl font-bold text-red-600 mt-2">500</p>
  //       </div>
  //     </div>

  //     {/* روابط التنقل */}
  //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
  //       <Link
  //         href="/medicines"
  //         className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition"
  //       >
  //         إدارة الأدوية
  //       </Link>
  //       <Link
  //         href="/customers"
  //         className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow-md transition"
  //       >
  //         إدارة الزبائن
  //       </Link>
  //       <Link
  //         href="/debts"
  //         className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold shadow-md transition"
  //       >
  //         إدارة الديون
  //       </Link>
  //       <Link
  //         href="/representatives"
  //         className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold shadow-md transition"
  //       >
  //         إدارة المندوبين
  //       </Link>
  //       <Link
  //         href="/settings"
  //         className="bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold shadow-md transition"
  //       >
  //         الإعدادات
  //       </Link>
  //     </div>
  //   </div>
  // );
}


