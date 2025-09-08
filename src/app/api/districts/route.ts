import {connectToDatabase} from "@/lib/db";
import { NextResponse } from "next/server";
async function GET() {
    try {
      const db = await connectToDatabase();
      const [rows] = await db.query("SELECT * FROM districts");
      return NextResponse.json(rows);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
async function POST(req: Request) {
    try {
      const formData=await req.formData(); 
    
    const name=formData.get("districtName") as string;
    console.log("Received data:", { name });    
    if (!name ) {
        return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
            }
            const db = await connectToDatabase();
            const [result]= await db.query("INSERT INTO districts (districtname) VALUES (?)",[name]);
            return NextResponse.json({ message: "district added"});
        }
        catch (error) {
            console.error(error);
            return NextResponse.json({ error: "Server error" }, { status: 500 });
        }
    }
    async function DELETE(req: Request) {
        try {
          const { searchParams } = new URL(req.url);    
          const id = searchParams.get("id");
        const db= await connectToDatabase();
        const[result]=await db.query("DELETE FROM districts WHERE districtid=?",[id]);
        return NextResponse.json({ message: "district deleted"});
    }
          catch (error) {
            console.error(error);
            return NextResponse.json({ error: "Server error" }, { status: 500 });
          }
        }
    async function PUT(req: Request) {  
        try {
          const formData=await req.formData(); 
          const id=formData.get("districtid") as string;
          const name=formData.get("districname") as string;
        if (!id || !name ) {
            return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
                }
                const db = await  connectToDatabase();
                const [result]= await db.query("UPDATE districts SET districtname=? WHERE districtid=?",[name,id]);
                return NextResponse.json({ message: "district updated"});

        }
          catch (error) {
            console.error(error);
            return NextResponse.json({ error: "Server error" }, { status: 500 });
          }
    }
export {GET,POST,DELETE,PUT};