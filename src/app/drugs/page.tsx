"use client";

import { useState, useEffect } from "react";
import Header from "../../components/header";
import DataTable from "@/components/dataTable";
import AppButton from "@/components/addNewBtn";
import {Trash2 ,SquarePen,Plus,PackagePlus } from "lucide-react";

export default function AddDrugPage() {
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
   const [showForm, setShowForm] = useState(false); // state to control form visibility
   const [showQtyFrom, setShowQtyForm] = useState(false); // state to control form visibility
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
  const [qtyForm,setQtyForm]= useState({
    medicineId: "",
    expiryDate: "",
    purchaseprice:"",
    saleprice:"",
    QuantityAvailable: "",
    supplierId: ""
});

  const [message, setMessage] = useState("");
  const [drugs, setDrugs] = useState<any[]>([]);
  async function fetchDrugs() {
      const res = await fetch("/api/drugs");
      const data = await res.json();
      setDrugs(data);
      setShowForm(false)
    }

  useEffect(() => {
    
    fetchDrugs();
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }
function handleBtnClick(id: number) {
  fetch(`/api/drugs?id=${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      setMessage("✅ تم الحذف بنجاح");
      fetchDrugs();
      // setDrugs(drugs.filter((drug) => drug.MedicineID !== id));
    })
    .catch((error) => {
      console.error("Error deleting drug:", error);
      setMessage("❌ خطأ في الحذف");
    });
}
function handleQtyBtnClick(id: number) {
  setShowQtyForm(true)
  console.log(id)   
}
function handleQtyFormSubmit(e: React.FormEvent) {
  e.preventDefault(); } 

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
 function handleQtyChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
   // setForm({ ...qtyForm, [e.target.name]: e.target.value });
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
      <div className="flex justify-end mb-4">

    
      <AppButton
  caption="إضافة دواء جديد"
  icon={<Plus />}
  onClick={() => setShowForm(true)}
  className="bg-blue-600 hover:bg-blue-700"
/>
      </div>
      <div className="container mx-auto p-4 flex flex-wrap justify-end">
        
        <div className="max-w-md p-6">
          <DataTable
      data={drugs.map((d: any) => ({ ...d, id: d.MedicineID }))} // ensure "id"
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

          {/* <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border border-gray-300 font-semibold">
                  حذف
                </th>
                <th className="px-4 py-2 border border-gray-300 font-semibold">
                  تعديل
                </th> <th className="px-4 py-2 border border-gray-300 font-semibold">
                  إضافة كميّة
                </th>
                <th className="px-4 py-2 border border-gray-300 font-semibold width: 40%">
                  اسم الدواء
                </th> 
                  <th className="px-4 py-2 border border-gray-300 font-semibold">
                  ت
                </th>
              </tr>
            </thead>
            <tbody>
              {drugs.map((drug,index) => (

                <tr key={drug.MedicineID} className="hover:bg-gray-50 transition">
               
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md transition" onClick={()=>handleBtnClick(drug.MedicineID)}>
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md transition">
                      <SquarePen className="w-5 h-5" />
                    </button>
                  </td>
                   <td className="px-4 py-2 border border-gray-300 text-center">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md transition" onClick={()=>handleQtyBtnClick(drug.MedicineID)} >
                      <PackagePlus  className="w-5 h-5" />
                    </button>
                  </td>
                  <td className="px-4 py-2 border border-gray-300 width: 40%">
                    {drug.Name}
                  </td>
                    <td className="px-4 py-2 border border-gray-300 text-center">{index + 1}</td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
           {showForm && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white max-w-md w-full p-6 rounded-2xl shadow-lg relative">
      <h1 className="text-xl font-bold mb-4 text-center">إضافة دواء</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="name"
          placeholder="اسم الدواء"
          value={form.name || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="category"
          placeholder="الفئة"
          value={form.category || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="manufacturer"
          placeholder="المُضنِّع"
          value={form.manufacturer || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="scientificName"
          placeholder="الأسم العلمي"
          value={form.scientificName || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="commercialName"
          placeholder="الأسم التجاري"
          value={form.commercialName || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="countryOfOrigin"
          placeholder="بلد المنشأ"
          value={form.countryOfOrigin || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="image"
          accept="image/*"
          type="file"
          onChange={handleFileChange}
          key={image ? image.name : Date.now()}
          className="border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="الوصف"
          value={form.description || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        ></textarea>
        <textarea
          name="notes"
          placeholder="الملاحظات"
          value={form.notes || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        ></textarea>
        <input
          name="barcode"
          placeholder="الكود"
          value={form.barcode || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <div className="flex justify-between gap-2 mt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
          >
            حفظ
          </button>
          <button
            type="button"
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white p-2 rounded"
            onClick={() => fetchDrugs()
              
            }
          >
            إلغاء
          </button>
        </div>
      </form>
      {message && <p className="mt-2 text-center">{message}</p>}
    </div>
  </div>
)}



{showQtyFrom && (
<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white max-w-md w-full p-6 rounded-2xl shadow-lg relative">
      <h1 className="text-xl font-bold mb-4 text-center">إضافة كمية دواء</h1>
      <form onSubmit={handleQtyFormSubmit} className="flex flex-col gap-3">
      <select name="sel_suppliers" id="">
        <option value="">إختر المجهز</option>
        {}
      </select>
        <input
          name="name"
          placeholder="اسم الدواء"
          value={form.name || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="category"
          placeholder="الفئة"
          value={form.category || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="manufacturer"
          placeholder="المُضنِّع"
          value={form.manufacturer || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="scientificName"
          placeholder="الأسم العلمي"
          value={form.scientificName || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="commercialName"
          placeholder="الأسم التجاري"
          value={form.commercialName || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="countryOfOrigin"
          placeholder="بلد المنشأ"
          value={form.countryOfOrigin || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="image"
          accept="image/*"
          type="file"
          onChange={handleFileChange}
          key={image ? image.name : Date.now()}
          className="border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="الوصف"
          value={form.description || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        ></textarea>
        <textarea
          name="notes"
          placeholder="الملاحظات"
          value={form.notes || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        ></textarea>
        <input
          name="barcode"
          placeholder="الكود"
          value={form.barcode || ""}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <div className="flex justify-between gap-2 mt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
          >
            حفظ
          </button>
          <button
            type="button"
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white p-2 rounded"
            onClick={() => fetchDrugs()
              
            }
          >
            إلغاء
          </button>
        </div>
      </form>
      {message && <p className="mt-2 text-center">{message}</p>}
    </div>
  </div>
)}
      </div>
    </Header>
  );
}
