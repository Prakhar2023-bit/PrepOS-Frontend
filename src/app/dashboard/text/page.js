'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function TextAnalysis() {
  const [jobDescription, setJobDescription] = useState('');
  const [currentSkills, setCurrentSkills] = useState('');
  const [roadmap, setRoadmap] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const generateRoadmap = async () => {
    if (!jobDescription || !currentSkills) {
      setError('Please provide both the Job Description and your current skills.');
      return;
    }

    setIsGenerating(true);
    setError('');
    setRoadmap(null);

    try {
      const response = await fetch('http://localhost:8000/roadmaps/analyze-jd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_description: jobDescription,
          current_skills: currentSkills,
        }),
      });

      if (!response.ok) throw new Error('Failed to connect to the AI Engine');
      const result = await response.json();
      setRoadmap(result.data);
    } catch (err) {
      setError('Connection failed. Ensure FastAPI is running.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Navigation & Header Section */}
        <div className="space-y-6">
          <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Dashboard
          </Link>
          
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center p-2 bg-indigo-50 rounded-xl mb-4 ring-1 ring-indigo-100/50">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              Text Analysis Engine
            </h1>
            <p className="text-lg text-slate-500 font-medium">Paste the JD and generate your roadmap.</p>
          </div>
        </div>

        {/* Main Input Card */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 md:p-8 space-y-6 transition-all">
          
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              Target Job Description
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-slate-700 placeholder:text-slate-400"
              placeholder="Paste the full requirements (e.g., React, Node, AWS, System Design...)"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              Your Current Technical Stack
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-slate-700 placeholder:text-slate-400"
              placeholder="e.g., C++, Python, basic full-stack knowledge"
              value={currentSkills}
              onChange={(e) => setCurrentSkills(e.target.value)}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm font-medium flex items-center gap-2">
               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
               {error}
            </div>
          )}

          <button
            onClick={generateRoadmap}
            disabled={isGenerating}
            className={`w-full py-3.5 px-6 rounded-xl text-white font-semibold text-base transition-all duration-200 flex items-center justify-center gap-2 ${
              isGenerating 
                ? 'bg-indigo-400 cursor-not-allowed shadow-none' 
                : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-500/20 active:scale-[0.98]'
            }`}
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Analyzing Engine...
              </>
            ) : 'Generate Executive Roadmap'}
          </button>
        </div>

        {/* Results Section */}
        {roadmap && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-2xl font-bold text-slate-900 px-2 tracking-tight">
              {roadmap.title}
            </h2>
            
            <div className="grid gap-4">
              {roadmap.steps.map((step, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col sm:flex-row gap-5 hover:shadow-md hover:border-indigo-100 transition-all duration-300 group">
                  
                  {/* Step Number Badge */}
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-xl bg-slate-50 text-slate-500 font-bold text-lg flex items-center justify-center ring-1 ring-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:ring-indigo-100 transition-colors">
                      {step.step_number}
                    </div>
                  </div>
                  
                  {/* Step Content */}
                  <div className="pt-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">{step.focus}</h3>
                    <ul className="space-y-2.5">
                      {step.action_items.map((item, i) => (
                        <li key={i} className="flex items-start text-slate-600 text-sm leading-relaxed">
                          <svg className="w-5 h-5 text-indigo-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}