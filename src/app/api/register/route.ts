import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '../../../lib/db';

export async function POST(req: Request) {
  try {
    const { username, password,role } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    const db = await connectToDatabase();
    await db.execute('INSERT INTO user (user_name, user_password,user_role) VALUES (?, ?, ?)', [
      username,
      hashedPassword,
      role
    ]);

    return NextResponse.json({ message: 'User registered successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error registering user' }, { status: 500 });
  }
}