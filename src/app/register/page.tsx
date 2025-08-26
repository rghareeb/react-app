'use client';
import { useState } from 'react';
import { useStyleRegistry } from 'styled-jsx';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setUserrole]=useState('');
  const [msg,setMessage]=useState('');
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password,role }),
    });
    const data = await res.json();
    setMessage(data.message || data.error);
  }

return (
  <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h1>
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
      <select
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required value={role} onChange={e => setUserrole(e.target.value)}
      >
        <option  disabled selected>Select Role</option>
        <option value="Manager">Manager</option>
        <option value="Admin">Admin</option>
        <option value="User" >User</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
      >
        Register
      </button>
    </form>
    <p className="mb-3 text-gray-500 dark:text-gray-400">{msg}</p>
  </div>
);
}