import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";  // your db connection helper
import path from "path";
import fs from "fs/promises";
// POST 
export async function POST(req: Request) {
  try {
    const formData=await req.formData();

    const name=formData.get("name") as string;
      const category=formData.get("category") as string;
      const manufacturer=formData.get("manufacturer") as string;
       const description =formData.get("description") as string;
       const scientificName =formData.get("scientificName") as string;
      const  commercialName=formData.get("commercialName") as string;
      const countryoforigin=formData.get("countryOfOrigin") as string;
      const image=formData.get("image") as File | null;
      const notes=formData.get("notes") as string;
      const barcode =formData.get("barcode") as string;

    //validation
    if (!name || !category || !scientificName || !image) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }
    // for Debug
    if (image) {
      console.log("Image uploaded:", image.name, image.size, image.type);
    }
    // set image URL
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = Date.now() + "-" + image.name;
    const filepath = path.join(process.cwd(), "public", "uploads", filename);
    await fs.writeFile(filepath, buffer);

    const imageUrl = `/uploads/${filename}`;
    // Connect to database
    const db = await connectToDatabase();

    await db.query(
      "INSERT INTO medicines (name, category, manufacturer, description,scientificName,commercialName,countryoforigin,image,notes,barcode) VALUES (?, ?, ?, ?, ?, ?, ?,?,?,?)",
      [name, category, manufacturer, description,scientificName,commercialName,countryoforigin,imageUrl,notes,barcode]
    );


    return NextResponse.json({ message: "Drug added successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
