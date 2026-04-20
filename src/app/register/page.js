'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', target_role: '', current_skills: '' });
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Registration failed');
      }
      
      // If success, send them to login
      router.push('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-sm border border-slate-100 p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Create your account</h2>
        
        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">{error}</div>}
        
        <form onSubmit={handleRegister} className="space-y-4">
          <input required type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none" onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input required type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none" onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <input required type="text" placeholder="Target Role (e.g., Software Engineer)" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none" onChange={(e) => setFormData({...formData, target_role: e.target.value})} />
          <input required type="text" placeholder="Current Skills (e.g., C++, Python)" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none" onChange={(e) => setFormData({...formData, current_skills: e.target.value})} />
          
          <button type="submit" className="w-full py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors">Register</button>
        </form>
        
        <p className="text-center mt-6 text-sm text-slate-500">
          Already have an account? <Link href="/login" className="text-indigo-600 font-semibold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}