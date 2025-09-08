"use client";
import {useState} from "react";
import Header from "../../components/header";
export default function AddDistrictPage() { 
    const [districtName, setDistrictName] = useState("");
    const [message, setMessage] = useState("");
    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
       setDistrictName(e.target.value);
    }
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
    const form = new FormData();
    form.append("districtName", districtName);
    
    const res = await fetch("/api/districts", {
        method: "POST",
        body: form,
    });
    if(res.ok){
        setMessage("تمت إضافة المنطقة بنجاح");
        setDistrictName("");
    }
    else{
       setMessage("حدث خطأ أثناء إضافة المنطقة");
    }
}
    return (
        <Header>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
                <h2 className="text-xl font-bold text-gray-700 mb-2 text-center">إضافة منطقة</h2>
                <input type="text" name="districtName" placeholder="اسم المنطقة" onChange={handleChange} className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right" value={districtName || ""}/>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">إضافة المنطقة</button>
            </form>
            {message && <p className="text-green-500 text-center mt-4">{message}</p>}
        </Header>
            );
    }
