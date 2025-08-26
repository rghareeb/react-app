import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../../../lib/db';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    const db = await connectToDatabase();

    const [rows]: any = await db.execute('SELECT * FROM user WHERE user_name = ?', [username]);
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.user_password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign({ id: user.id, username: user.user_name ,role:user.user_role}, 'secret_key', { expiresIn: '1h' });
    return NextResponse.json({ message: 'Login successful', token });
  } catch (error) {
    return NextResponse.json({ error: 'Error logging in' }, { status: 500 });
  }
}
