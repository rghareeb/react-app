"use client";

import { useState } from "react";
import Header from "../../components/header";
export default function AddDrugPage() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    manufacturer: "",
    description: "",
    scientificName:"",
    commercialName:"",
    countryOfOrigin:"",
    notes:"",
    barcode:""

  });
  const [image,setImage]= useState<File | null>(null);
  const [message, setMessage] = useState("");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData=new FormData();
    formData.append("name", form.name);
    formData.append("category", form.category);
    formData.append("manufacturer", form.manufacturer);
    formData.append("description", form.description);
    formData.append("scientificName", form.scientificName);
    formData.append("commercialName", form.commercialName);
    formData.append("countryOfOrigin", form.countryOfOrigin);
    formData.append("notes", form.notes);
    formData.append("barcode", form.barcode);
    if (image) formData.append("image", image); // attach file

    const res = await fetch("/api/drugs", {
      method: "POST",
      body: formData, // NO Content-Type, browser sets it
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("✅ تمت الإضافة بنجاح");
      setForm({
        name: "",
        category: "",
        manufacturer: "",
        description: "",
        scientificName: "",
        commercialName: "",
        countryOfOrigin: "",
        notes: "",
        barcode: "",
      });
      setImage(null);
    } else {
      setMessage("❌ خطأ في الإضافة");
    }
  }

  return (

    <Header>

    <div className="max-w-md mx-auto p-6">
    
      <h1 className="text-xl font-bold mb-4">إضافة دواء</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input name="name" placeholder="اسم الدواء" value={form.name} onChange={handleChange} className="border p-2" />
        <input name="category" placeholder="الفئة" value={form.category} onChange={handleChange} className="border p-2" />
        <input name="manufacturer" placeholder="المُضنِّع" value={form.manufacturer} onChange={handleChange} className="border p-2" />
        <input name="scientificName" placeholder="الأسم العلمي" value={form.scientificName} onChange={handleChange} className="border p-2" />
        <input name="commercialName" placeholder="الأسم التجاري" value={form.commercialName} onChange={handleChange} className="border p-2" />
        <input name="countryOfOrigin" placeholder="بلد المنشأ" value={form.countryOfOrigin} onChange={handleChange} className="border p-2" />
        <input name="image" accept="image/*" type="file" onChange={handleFileChange} key={image ? image.name : Date.now()}  className="border p-2" />
       <textarea name="description" placeholder="الوصف" value={form.description} onChange={handleChange} className="border p-2"></textarea>
        <textarea name="notes" placeholder="الملاحظات" value={form.notes} onChange={handleChange} className="border p-2"></textarea>
         <input name="barcode" placeholder="الكود" value={form.barcode} onChange={handleChange} className="border p-2" />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">حفظ</button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </div>
      </Header>
   
  
  );
}
