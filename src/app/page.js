import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 selection:bg-indigo-100 selection:text-indigo-900">
      <div className="max-w-3xl text-center space-y-8">
        
        {/* Logo & Headline */}
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm border border-slate-100 mb-2">
            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
            Welcome to Prep<span className="text-indigo-600">OS</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            The AI-Augmented Career Accelerator. We analyze complex job descriptions and generate exact, step-by-step technical roadmaps tailored to your current skills.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 gap-4 text-left my-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 text-lg mb-2">🧠 Llama 3 Powered</h3>
            <p className="text-slate-500 text-sm">Enterprise-grade LLM analysis to decode what recruiters actually want.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 text-lg mb-2">🎯 Personalized Roadmaps</h3>
            <p className="text-slate-500 text-sm">We map your specific current skills against the JD to find your exact gaps.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/login" className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-slate-700 bg-white border border-slate-200 font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all text-center">
            Log In
          </Link>
          <Link href="/register" className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-white bg-indigo-600 font-semibold hover:bg-indigo-700 shadow-sm hover:shadow-md transition-all text-center">
            Create Account
          </Link>
        </div>

      </div>
    </div>
  );
}