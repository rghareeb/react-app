'use client';
import { useState } from 'react';
import {useRouter} from 'next/navigation';
export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg,setMessage]=useState('');
  const router=useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
     // setMessage('تم تسجيل الدخول بنجاح');
    const payload = JSON.parse(atob(data.token.split(".")[1]));
    const { username: user, role } = payload;
    router.push(`/dashboard?username=${user}&role=${role}`);
    } else {
     
     setMessage(data.error);
    }
  }

  return (
   <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
  <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h1>
  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    <input
      value={username}
      onChange={e => setUsername(e.target.value)}
      placeholder="Username"
      required
      className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <input
      value={password}
      onChange={e => setPassword(e.target.value)}
      placeholder="Password"
      type="password"
      required
      className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="submit"
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
    >
      Login
    </button>
  </form>
  <p className="mb-3 text-gray-500 dark:text-gray-400">{msg}</p>
</div>

  );
}