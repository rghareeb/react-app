import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db"; 

export async function POST(req: Request) {
  try {
    const formData=await req.formData();

    const Name=formData.get("Name") as string;
    const Phone=formData.get("Phone") as string;
    const Email=formData.get("Email") as string;
    const hiredate=formData.get("hireDate") as string;  
    console.log("Received data:", { Name, Phone, Email, hiredate });
    if (!Name ) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }  
const db = await connectToDatabase();
    const [result] = await db.query(
      "INSERT INTO representatives (Name, Phone, Email, hiredate) VALUES (?, ?, ?, ?)",
      [Name, Phone, Email, hiredate]
    );
    return NextResponse.json({ message: "rep added"});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
export async function GET() {
  try {
    const db = await connectToDatabase();
    const [rows] = await db.query("SELECT * FROM representatives");
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  } }