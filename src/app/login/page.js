'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Login failed');
      }
      
      const user = await response.json();
      
      // Store user identity securely in the browser
      localStorage.setItem('prepos_user_id', user.id);
      localStorage.setItem('prepos_user_name', user.name);
      
      // Redirect to the protected tools hub
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 selection:bg-indigo-100 selection:text-indigo-900">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-sm border border-slate-100 p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Welcome Back</h2>
        
        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg border border-red-100">{error}</div>}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            required 
            type="email" 
            placeholder="Enter your email" 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none" 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            required 
            type="password" 
            placeholder="Enter your password" 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none" 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit" className="w-full py-3.5 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-sm hover:shadow-md">
            Log In
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-slate-500">
          New here? <Link href="/register" className="text-indigo-600 font-semibold hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
}