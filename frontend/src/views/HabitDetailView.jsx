import React from 'react';
import { ChevronRight, Trash2, Edit2, Flame, Calendar, Check, Activity, Briefcase, Brain, BookOpen, Coffee } from 'lucide-react';

const CATEGORIES = {
  Health: { color: 'bg-emerald-500', light: 'bg-emerald-50', text: 'text-emerald-600', icon: Activity },
  Work: { color: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-600', icon: Briefcase },
  Mindfulness: { color: 'bg-violet-500', light: 'bg-violet-50', text: 'text-violet-600', icon: Brain },
  Education: { color: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-600', icon: BookOpen },
  Lifestyle: { color: 'bg-pink-500', light: 'bg-pink-50', text: 'text-pink-600', icon: Coffee },
};

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const HabitDetailView = ({ habit, onBack, onToggleDay, onDelete, onEdit }) => {
  if (!habit) return null;
  const theme = CATEGORIES[habit.category] || CATEGORIES.Health;
  const completedDays = habit.history.filter(Boolean).length;
  const progressPercent = Math.round((completedDays / habit.history.length) * 100);
  const Icon = theme.icon;
  return (
    <div className="p-6 max-w-5xl mx-auto animate-in slide-in-from-right duration-300 pb-24">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition-all"><ChevronRight className="rotate-180" size={20} /> Back</button>
        <div className="flex gap-2">
          <button onClick={() => onDelete(habit.id)} className="p-2 bg-white text-gray-400 hover:text-red-500 border border-gray-200 rounded-xl hover:shadow-md transition-all"><Trash2 size={20} /></button>
        </div>
      </div>
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 p-8 md:p-10 overflow-hidden relative">
        <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full ${theme.light} opacity-50 blur-3xl`} ></div>
        <div className="relative z-10">
          <div className="flex items-center gap-5 mb-8">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${theme.light} ${theme.text} shadow-inner`} ><Icon size={32} /></div>
            <div><div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mb-2 ${theme.light} ${theme.text}`}>{habit.category}</div><h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">{habit.name}</h1><p className="text-gray-500 font-medium mt-1">Goal: {habit.goal}</p></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
             <div className="bg-gray-50 rounded-3xl p-6 flex flex-col justify-center items-center border border-gray-100"><div className="text-gray-400 text-xs font-bold uppercase">Current Streak</div><div className="text-3xl font-black text-gray-800 mt-1 flex items-center gap-2">{habit.streak} <Flame className="text-orange-500" /></div></div>
             <div className="bg-gray-50 rounded-3xl p-6 flex flex-col justify-center items-center border border-gray-100"><div className="text-gray-400 text-xs font-bold uppercase">Efficiency</div><div className="text-3xl font-black text-gray-800 mt-1">{progressPercent}%</div></div>
             <div className="bg-gray-50 rounded-3xl p-6 flex flex-col justify-center items-center border border-gray-100"><div className="text-gray-400 text-xs font-bold uppercase">Days Completed</div><div className="text-3xl font-black text-gray-800 mt-1">{completedDays}/7</div></div>
          </div>
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Calendar size={18} className={theme.text} /> Weekly Log</h3>
          <div className="grid grid-cols-7 gap-2 md:gap-4">
            {DAYS.map((day, idx) => (<button key={idx} onClick={() => onToggleDay(habit.name, idx)} className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-all duration-300 group ${habit.history[idx] ? `${theme.color} text-white shadow-lg scale-105` : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}><span className="text-xs font-bold mb-1">{day}</span>{habit.history[idx] ? <Check size={20} strokeWidth={4} /> : <div className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-gray-400"></div>}</button>))}
          </div>
        </div>
      </div>
    </div>
  );
};
