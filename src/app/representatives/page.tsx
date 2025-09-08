"use client";

import { useState, useEffect } from "react";
import Header from "../../components/header";
import DataTable from "@/components/dataTable";
import AppButton from "@/components/addNewBtn";
import CancelBtn from "@/components/canelBtn";
import {Trash2 ,SquarePen,PackagePlus,Plus } from "lucide-react";
import App from "next/app";
export default function RepresentativePage() {
    const handleDelete = (drug: any) => {
    console.log("Delete", drug.MedicineID);
    // call delete API...
  };

  const handleEdit = (drug: any) => {
    console.log("Edit", drug.MedicineID);
    // open edit modal...
  };

  const handleQty = (drug: any) => {
    console.log("Add Qty", drug.MedicineID);
    // open qty modal...
  };
  const [representitave, setRepresentitaves] = useState<any[]>([]);
  const [form, setForm] = useState({
    Name: "",
    Phone: "",
    Email: "",  
    hireDate: "",
  });    
  const [showForm, setShowForm] = useState(false);

   async function fetchRep() {
      const res = await fetch("/api/representitaves");
      const data = await res.json();
      setRepresentitaves(data);
      setShowForm(false)
    }

  useEffect(() => {
    fetchRep();
  
  }, []);
const [message, setMessage] = useState("");
 function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); 
    const data = new FormData();
    data.append("Name", form.Name);
    data.append("Phone", form.Phone);
    data.append("Email", form.Email);
    data.append("hireDate", form.hireDate);   
  const res=await  fetch("/api/representitaves", {
      method: "POST",
      body: data,       

    });

    if (res.ok){
        
        setMessage("تمت إضافة المندوب بنجاح"); 
        setForm({ Name: "", Phone: "", Email: "", hireDate: "" }); 
        }
        else{
            setMessage("حدث خطأ أثناء إضافة المندوب"); 
        }
  
  }
    return (   
        <Header>
           <div className="flex justify-end mb-4">
      <AppButton
  caption="إضافة مندوب جديد"
  icon={<Plus />} 
   onClick={() => setShowForm(true)}
  className="bg-blue-600 hover:bg-blue-700" />
           </div>

   {showForm && (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white max-w-md w-full p-6 rounded-2xl shadow-lg relative">
      <h1 className="text-xl font-bold mb-4 text-center">إضافة المندوب</h1>
  <form 
  onSubmit={handleSubmit} 
  className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
>
 

  <input
    type="text"
    name="Name"
    placeholder="اسم المندوب"
    value={form.Name || ""}
    onChange={handleChange}
    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
  />

  <input
    type="text"
    name="Phone"
    placeholder="رقم الهاتف"
    value={form.Phone || ""}
    onChange={handleChange}
    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
  />

  <input
    type="email"
    name="Email"
    placeholder="البريد الإلكتروني"
    value={form.Email || ""}
    onChange={handleChange}
    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
  />

  <input
    type="date"
    name="hireDate"
    placeholder="تاريخ التوظيف"
    value={form.hireDate || ""}
    onChange={handleChange}
    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
  />

  <button
    type="submit"
    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
  >
    إضافة المندوب
  </button>
<CancelBtn
caption="إلغاء"
onClick={() => fetchRep()}
className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded"
/>  
    {/* <button
            type="button"
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white p-2 rounded"
            onClick={() => fetchRep()
            }
          >
            إلغاء
          </button> */}
</form>

      </div>
   
  
{message && <p className="text-green-500 text-center mt-4">{message}</p>}
</div>
)}
  <div className="container mx-auto p-4 flex flex-wrap justify-end">
        
        <div className="max-w-md p-6">
<DataTable
      data={representitave.map((d: any) => ({ ...d, id: d.repID }))} // ensure "id"
      actions={[
        {
          label: "حذف",
          icon: <Trash2 className="w-5 h-5 text-white" />,
          onClick: handleDelete,
          className: "bg-red-600 hover:bg-red-700 text-white",
        },
        {
          label: "تعديل",
          icon: <SquarePen className="w-5 h-5 text-white" />,
          onClick: handleEdit,
          className: "bg-yellow-500 hover:bg-yellow-600 text-white",
        },
        {
          label: "إضافة كميّة",
          icon: <PackagePlus className="w-5 h-5 text-white" />,
          onClick: handleQty,
          className: "bg-green-600 hover:bg-green-700 text-white",
        },
      ]}
      columns={[
        {
          header: "اسم الدواء",
          accessor: "Name",
          className: "w-[40%]",
        },
        {
          header: "ت",
          accessor: (_row, index) => index + 1,
          className: "text-center",
          },
      ]}
/> 
</div> 

</div>
</Header> 
        );
}