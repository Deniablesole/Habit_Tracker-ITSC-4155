import React, { useState } from 'react';
import { User, ArrowRight } from 'lucide-react';

export const SignUpView = ({ onLogin, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 animate-in slide-in-from-right duration-500">
      <div className="bg-white w-full max-w-md rounded-[2rem] shadow-xl p-8 md:p-12 border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-2xl mb-6 shadow-lg"><User size={32} /></div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create Account</h1>
          <p className="text-gray-500 mt-2">Join us to track your progress.</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); setIsLoading(true); setTimeout(() => { setIsLoading(false); onLogin(name || 'User'); }, 1000); }} className="space-y-4">
          <div className="space-y-2"><label className="text-xs font-bold text-gray-400 uppercase ml-1">Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500/20 outline-none" required /></div>
          <div className="space-y-2"><label className="text-xs font-bold text-gray-400 uppercase ml-1">Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500/20 outline-none" required /></div>
          <div className="space-y-2"><label className="text-xs font-bold text-gray-400 uppercase ml-1">Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500/20 outline-none" required /></div>
          <button type="submit" disabled={isLoading} className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-xl active:scale-95 flex items-center justify-center gap-2 mt-4">{isLoading ? 'Creating...' : 'Sign Up'} {!isLoading && <ArrowRight size={20} />}</button>
        </form>
        <div className="mt-8 text-center"><p className="text-gray-400 text-sm">Already have an account? <button onClick={onSwitchToLogin} className="text-blue-600 font-bold hover:underline">Log in</button></p></div>
      </div>
    </div>
  );
};
