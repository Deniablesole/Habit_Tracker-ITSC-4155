import React from 'react';
import { Plus, Flame, Activity, Briefcase, Brain, BookOpen, Coffee } from 'lucide-react';

const CATEGORIES = {
  Health: { color: 'bg-emerald-500', light: 'bg-emerald-50', text: 'text-emerald-600', icon: Activity },
  Work: { color: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-600', icon: Briefcase },
  Mindfulness: { color: 'bg-violet-500', light: 'bg-violet-50', text: 'text-violet-600', icon: Brain },
  Education: { color: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-600', icon: BookOpen },
  Lifestyle: { color: 'bg-pink-500', light: 'bg-pink-50', text: 'text-pink-600', icon: Coffee },
};

export const Dashboard = ({ user, habits, onAdd, onSelect }) => {
  const completedToday = habits.filter(h => h.history[6]).length;
  return (
    <div className="p-6 max-w-6xl mx-auto animate-in fade-in duration-500 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div><h2 className="text-3xl font-extrabold text-gray-900">Hello, {user}!</h2><p className="text-gray-500 mt-2 font-medium">You've completed <span className="text-blue-600 font-bold">{completedToday}</span> habits today.</p></div>
        <button onClick={onAdd} className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-xl shadow-lg shadow-gray-200 flex items-center gap-2 transition-all active:scale-95 font-bold"><Plus size={20} /> Add Habit</button>
      </div>
      {habits.length === 0 && <div className="text-center py-10 text-gray-400">No habits yet. Create one!</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {habits.map((habit) => {
          const theme = CATEGORIES[habit.category] || CATEGORIES.Health;
          const Icon = theme.icon;
          const progress = Math.round((habit.history.filter(Boolean).length / 7) * 100);
          return (
            <div key={habit.id} onClick={() => onSelect(habit.id)} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden">
              <div className="flex justify-between items-start mb-6"><div className={`p-4 rounded-2xl ${theme.light} ${theme.text} group-hover:scale-110 transition-transform`}><Icon size={24} /></div><div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${theme.light} ${theme.text}`}>{habit.category}</div></div>
              <h3 className="font-bold text-xl text-gray-800 mb-1">{habit.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-6"><Flame size={14} className="text-orange-500" /> {habit.streak} day streak</div>
              <div className="space-y-2"><div className="flex justify-between text-xs font-bold text-gray-400"><span>Progress</span><span>{progress}%</span></div><div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden"><div className={`h-full ${theme.color} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${progress}%` }}></div></div></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
