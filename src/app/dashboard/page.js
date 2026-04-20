'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardHub() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // The Route Guard
  useEffect(() => {
    const storedUserId = localStorage.getItem('prepos_user_id');
    const storedName = localStorage.getItem('prepos_user_name');
    
    if (!storedUserId) {
      router.push('/login'); // Kick out unauthorized users
    } else {
      setUserName(storedName);
      setIsLoading(false); // Reveal the page once authorized
    }
  }, [router]);

  if (isLoading) return null; // Prevent UI flash before redirect

  const handleLogout = () => {
    localStorage.removeItem('prepos_user_id');
    localStorage.removeItem('prepos_user_name');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 selection:bg-indigo-100 selection:text-indigo-900">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="border-b border-slate-200 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
            <p className="text-slate-500 mt-2 font-medium">Welcome back, <span className="text-indigo-600">{userName || 'Engineer'}</span>. Choose an analysis tool.</p>
          </div>
          <button onClick={handleLogout} className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">
            Log Out
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          
          <Link href="/dashboard/text" className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all block">
            <div className="h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Text Analysis</h2>
            <p className="text-slate-500">Paste a raw job description and your current skills to generate an instant roadmap.</p>
          </Link>

          <Link href="/dashboard/pdf" className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all block relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded-md">NEW</div>
            <div className="h-12 w-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">PDF Auto-Extract</h2>
            <p className="text-slate-500">Drag and drop a PDF Job Description. We will extract the requirements automatically.</p>
          </Link>

        </div>
      </div>
    </div>
  );
}