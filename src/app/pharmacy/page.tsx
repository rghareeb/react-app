"use client";
import {useState,useEffect} from "react";
import Header from "../../components/header";
import AppButton from "@/components/addNewBtn";
import CancelBtn from "@/components/canelBtn";
import DataTable from "@/components/dataTable";
import {Trash2 ,SquarePen,PackagePlus,Plus } from "lucide-react";
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
export default function AddPharmacyPage() { 
    const [form,setForm]=useState({
        Name:"",
        Phone:"",
        Address:"", 
        district_Id:""
    });
    const [showForm,setShowForm]=useState(false);
    const [district,setDistrict]=useState<any[]>([]);
    const [pharmacy,setPharmacy]=useState<any[]>([]);
    const [districtId,setDistrictId]=useState<number>();
    async function fetchDistricts(){
        const res=await fetch("/api/districts");
        const data=await res.json();
        setDistrict(data);
    }
    async function fetchPharmacies(){
      const res=await fetch("/api/pharmacy");
      const data=await res.json();
      setPharmacy(data);
      setShowForm(false);
    }
  useEffect(() => {
    
 fetchDistricts();
 fetchPharmacies();
  }, []);

    const [message,setMessage]=useState("");    
   async function handleChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        setForm({...form,[e.target.name]:e.target.value});
    }
    async function handleSubmit(e:React.FormEvent){
        e.preventDefault();
        const formData=new FormData();
        formData.append("Name",form.Name);
        formData.append("Phone",form.Phone);
        formData.append("Address",form.Address); 
      formData.append("district_Id",districtId?.toString() || "");   
    const res=await fetch("/api/pharmacy",{
        method:"POST",
        body:formData,  })
    if(res.ok){ 
        setMessage("تمت إضافة الصيدلية بنجاح");
        setForm({Name:"",Phone:"",Address:"",district_Id:""});}
        else{
            setMessage("حدث خطأ أثناء إضافة الصيدلية");
        }
    }

    return (
        <Header>

     <div className="flex justify-end mb-4">
      <AppButton
  caption="إضافة صيدلية جديدة"
  icon={<Plus />} 
   onClick={() => setShowForm(true)}
  className="bg-blue-600 hover:bg-blue-700" />
           </div>



      {showForm && (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white max-w-md w-full p-6 rounded-2xl shadow-lg relative">
         <h1 className="text-xl font-bold mb-4 text-center">إضافة الصيدلية</h1>
<form 
  onSubmit={handleSubmit} 
  className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
>


  <input
    type="text"
    name="Name"
    placeholder="اسم الصيدلية"
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
    type="text"
    name="Address"
    placeholder="العنوان"
    value={form.Address || ""}
    onChange={handleChange}
    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
  />
    <select name="district" value={districtId} onChange={(e) => setDistrictId(Number(e.target.value) || undefined)}>
    <option value="">اختر المنطقة</option>
   {  district.map((district)=>(
        <option key={district.districtid} value={district.districtid}>{district.districtname}</option>
    )) }
    </select>
  <button
    type="submit"
    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
  >
    إضافة الصيدلية
  </button>
  <CancelBtn
  caption="إلغاء"
  onClick={() => fetchPharmacies()}
  className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded"
  /> 
</form>
{message && <p className="text-green-500 text-center mt-4">{message}</p>}

</div>

</div>
)}



<div className="container mx-auto p-4 flex flex-wrap justify-end">
        
        <div className="max-w-md p-6">
<DataTable
      data={pharmacy.map((d: any) => ({ ...d, id: d.pharmacyID }))} // ensure "id"
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