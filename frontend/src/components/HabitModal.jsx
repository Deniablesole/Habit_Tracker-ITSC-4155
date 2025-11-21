import React, { useState, useEffect } from 'react';
import { X, Activity, Briefcase, Brain, BookOpen, Coffee } from 'lucide-react';

const CATEGORIES = {
  Health: { color: 'bg-emerald-500', light: 'bg-emerald-50', text: 'text-emerald-600', icon: Activity },
  Work: { color: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-600', icon: Briefcase },
  Mindfulness: { color: 'bg-violet-500', light: 'bg-violet-50', text: 'text-violet-600', icon: Brain },
  Education: { color: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-600', icon: BookOpen },
  Lifestyle: { color: 'bg-pink-500', light: 'bg-pink-50', text: 'text-pink-600', icon: Coffee },
};

export const HabitModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [name, setName] = useState(''); 
  const [goal, setGoal] = useState(''); 
  const [category, setCategory] = useState('Health');

  useEffect(() => { 
      if (initialData) { 
          setName(initialData.name); 
          setGoal(initialData.goal); 
          setCategory(initialData.category); 
      } else { 
          setName(''); 
          setGoal(''); 
          setCategory('Health'); 
      } 
  }, [initialData, isOpen]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 animate-in fade-in duration-200 p-4">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md p-8 animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-gray-800">{initialData ? 'Edit Habit' : 'New Habit'}</h2><button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"><X size={24} /></button></div>
        <div className="space-y-5">
          <div><label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wider">Category</label><div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">{Object.keys(CATEGORIES).map((cat) => (<button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${category === cat ? `${CATEGORIES[cat].color} text-white shadow-md` : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>{cat}</button>))}</div></div>
          <div><label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wider">Habit Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" /></div>
          <div><label className="block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-wider">Goal</label><input type="text" value={goal} onChange={(e) => setGoal(e.target.value)} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" /></div>
          <button onClick={() => { if (name && goal) { onSave({ name, goal, category }); onClose(); }}} className="w-full mt-4 bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-lg shadow-gray-200 transition-all active:scale-95">{initialData ? 'Save Changes' : 'Create Habit'}</button>
        </div>
      </div>
    </div>
  );
};
