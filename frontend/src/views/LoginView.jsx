import React, { useState } from 'react';
import { User, Activity, ArrowRight } from 'lucide-react';

export const LoginView = ({ onLogin, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 animate-in fade-in duration-500">
      <div className="bg-white w-full max-w-md rounded-[2rem] shadow-xl p-8 md:p-12 border border-gray-100">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 text-white rounded-2xl mb-6 shadow-lg shadow-blue-200"><Activity size={40} /></div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Enter your details to track your habits.</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); setIsLoading(true); setTimeout(() => { setIsLoading(false); onLogin(email.split('@')[0] || 'User'); }, 800); }} className="space-y-5">
          <div className="space-y-2"><label className="text-xs font-bold text-gray-400 uppercase ml-1">Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500/20 outline-none" /></div>
          <div className="space-y-2"><label className="text-xs font-bold text-gray-400 uppercase ml-1">Password</label><input type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500/20 outline-none" /></div>
          <button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-xl active:scale-95 flex items-center justify-center gap-2 mt-4">{isLoading ? 'Signing in...' : 'Sign In'} {!isLoading && <ArrowRight size={20} />}</button>
        </form>
        <div className="mt-8 text-center"><p className="text-gray-400 text-sm">Don't have an account? <button onClick={onSwitchToSignup} className="text-blue-600 font-bold hover:underline">Sign up</button></p></div>
      </div>
    </div>
  );
};
