"use client";

import { useState, useEffect } from "react";
import Header from "../../components/header";
export default function SupplierPage() {
  const [supplier, setSupplier] = useState({
    Name: "",
    Phone: "",
    Email: "",  
    Address: "",
  });    
const [message, setMessage] = useState("");
 function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); 
    const data = new FormData();
    data.append("Name", supplier.Name);
    data.append("Phone", supplier.Phone);
    data.append("Email", supplier.Email);
    data.append("Address", supplier.Address);   
  const res=await  fetch("/api/suppliers", {
      method: "POST",
      body: data,       

    });

    if (res.ok){
        
        setMessage("تمت إضافة المجهز بنجاح"); 
        setSupplier({ Name: "", Phone: "", Email: "", Address: "" }); 
        }
        else{
            setMessage("حدث خطأ أثناء إضافة المجهز"); 
        }
  
  }
    return (   
        <Header>
<div>
<form 
  onSubmit={handleSubmit} 
  className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
>
  <h2 className="text-xl font-bold text-gray-700 mb-2 text-center">إضافة المجهز</h2>

  <input
    type="text"
    name="Name"
    placeholder="اسم المجهز"
    value={supplier.Name || ""}
    onChange={handleChange}
    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
  />

  <input
    type="text"
    name="Phone"
    placeholder="رقم الهاتف"
    value={supplier.Phone || ""}
    onChange={handleChange}
    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
  />

  <input
    type="email"
    name="Email"
    placeholder="البريد الإلكتروني"
    value={supplier.Email || ""}
    onChange={handleChange}
    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
  />

  <input
    type="text"
    name="Address"
    placeholder="العنوان"
    value={supplier.Address || ""}
    onChange={handleChange}
    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
  />

  <button
    type="submit"
    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
  >
    إضافة المجهز
  </button>
</form>
{message && <p className="text-green-500 text-center mt-4">{message}</p>}
</div>
</Header> 
        );
}