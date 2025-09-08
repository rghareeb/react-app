import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db"; 

export async function POST(req: Request) {
  try {
    const formData=await req.formData();

    const Name=formData.get("Name") as string;
    const Phone=formData.get("Phone") as string;
    const Email=formData.get("Email") as string;
    const Address=formData.get("Address") as string;  
    if (!Name ) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }  
const db = await connectToDatabase();
    const [result] = await db.query(
      "INSERT INTO suppliers (Name, Phone, Email, Address) VALUES (?, ?, ?, ?)",
      [Name, Phone, Email, Address]
    );
    return NextResponse.json({ message: "Supplier added", supplierId: (result as any).insertId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}