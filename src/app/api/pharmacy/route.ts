import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db"; 
  export async function GET() {
    try {
      const db = await connectToDatabase();
      const [rows] = await db.query("SELECT * FROM pharmacies");
      return NextResponse.json(rows);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }  
 }
 export async function POST(req:Request){
        try {
const formData = await req.formData();
const Name = formData.get("Name") as string;
const Phone = formData.get("Phone") as string;
const Address = formData.get("Address") as string; 
const district_Id = formData.get("district_Id") as string;   
console.log("Received data:", { Name, Phone, Address, district_Id });
if (!Name || !Phone || !Address || !district_Id) {
            return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
} 
const db = await connectToDatabase();
        const [result] = await db.query(
          "INSERT INTO pharmacies (Name, Phone, Address, district_Id) VALUES (?, ?, ?, ?)",
          [Name, Phone, Address, district_Id]
        );
        return NextResponse.json({ message: "Pharmacy added" });        

// console.log("Received data:", { Name, Phone, Address, district_Id });
//return NextResponse.json({ message: "Pharmacy added" });  
        } 
        catch(error){return NextResponse.json({ error: "Server error" }, { status: 500 });}

    }