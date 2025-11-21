import React, { useState } from 'react';
import { Edit2, Save, TrendingUp, BarChart2, PieChart, LogOut, Flame } from 'lucide-react';
import { SimpleLineChart } from '../components/charts/LineChart';
import { AggregateBarChart } from '../components/charts/BarChart';
import { DonutChart } from '../components/charts/DonutChart';

export const ProfileView = ({ user, onUpdateUser, habits, onLogout }) => {
  const [timeRange, setTimeRange] = useState('week'); 
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user || '');
  const [editEmail, setEditEmail] = useState('user@example.com');
  const [editPassword, setEditPassword] = useState('');
  
  const totalHabits = habits.length;
  const totalCompletions = habits.reduce((acc, h) => acc + h.history.filter(Boolean).length, 0);
  const longestStreak = Math.max(...habits.map(h => h.streak), 0);
  const totalPossible = habits.length * 7;
  const globalEfficiency = totalPossible > 0 ? Math.round((totalCompletions / totalPossible) * 100) : 0;
  const handleSaveProfile = () => { onUpdateUser(editName); setIsEditing(false); };

  return (
    <div className="p-6 max-w-6xl mx-auto animate-in slide-in-from-right duration-300 pb-24">
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 w-full">
            <div className="flex justify-between items-start mb-4">
              <div>
                {isEditing ? (
                  <div className="space-y-3 mb-4 max-w-md">
                    <div><label className="text-xs font-bold text-gray-400 uppercase">Name</label><input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500/20 outline-none" /></div>
                    <div><label className="text-xs font-bold text-gray-400 uppercase">Email</label><input type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500/20 outline-none" /></div>
                    <div><label className="text-xs font-bold text-gray-400 uppercase">New Password</label><input type="password" value={editPassword} onChange={(e) => setEditPassword(e.target.value)} placeholder="••••••" className="w-full border border-gray-200 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500/20 outline-none" /></div>
                    <div className="flex gap-2 mt-2"><button onClick={handleSaveProfile} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1 hover:bg-blue-700 transition-colors"><Save size={16} /> Save</button><button onClick={() => setIsEditing(false)} className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors">Cancel</button></div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3"><h2 className="text-3xl font-extrabold text-gray-900">{user}'s Profile</h2><button onClick={() => setIsEditing(true)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all" title="Edit Profile"><Edit2 size={20} /></button></div>
                    <p className="text-gray-500 mt-1 flex items-center gap-2">{editEmail} • <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md text-xs uppercase">Pro Plan</span></p>
                  </>
                )}
              </div>
              {!isEditing && <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">{user[0].toUpperCase()}</div>}
            </div>
             {!isEditing && (
               <div className="flex justify-center md:justify-start gap-4 mt-6">
                 <div className="bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100 text-center"><div className="text-gray-400 text-xs font-bold uppercase">Total Habits</div><div className="text-xl font-black text-gray-900">{totalHabits}</div></div>
                 <div className="bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100 text-center"><div className="text-gray-400 text-xs font-bold uppercase">Streak</div><div className="text-xl font-black text-gray-900 flex items-center gap-1">{longestStreak} <Flame size={16} className="text-orange-500" /></div></div>
               </div>
             )}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
         <h3 className="text-2xl font-bold text-gray-900">Analytics & Progress</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Trend Chart with FILTERS RESTORED */}
        <div className="lg:col-span-3 bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-between min-h-[300px]">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
             <div className="flex items-center gap-2">
               <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><TrendingUp size={20} /></div>
               <h3 className="font-bold text-gray-800 text-lg">Trend Over Time</h3>
             </div>
             
             {/* RESTORED FILTERS */}
             <div className="flex flex-wrap items-center gap-4 bg-gray-50 p-2 rounded-xl border border-gray-100">
               <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Habit:</label>
                  <select className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 outline-none">
                    <option>All Habits</option>
                    {habits.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                  </select>
               </div>
               <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Range:</label>
                  <input type="date" className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg p-1.5 outline-none w-32" />
                  <span className="text-gray-400 font-bold">-</span>
                  <input type="date" className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg p-1.5 outline-none w-32" />
               </div>
             </div>
          </div>
          <div className="flex-1 flex items-end pb-4 h-64">
             <SimpleLineChart color="bg-purple-500" />
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col justify-between min-h-[300px]">
           <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><BarChart2 size={20} /></div>
                <h3 className="font-bold text-gray-800">{timeRange === 'week' ? 'Weekly' : 'Monthly'} Totals</h3>
              </div>
              <div className="bg-gray-100 p-1 rounded-xl flex shadow-inner">
                <button onClick={() => setTimeRange('week')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${timeRange === 'week' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Week</button>
                <button onClick={() => setTimeRange('month')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${timeRange === 'month' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Month</button>
              </div>
          </div>
          <div className="flex-1 pt-4">
             <AggregateBarChart habits={habits} color="bg-blue-500" mode={timeRange} />
          </div>
        </div>

        <div className="lg:col-span-1 bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[300px]">
           <div className="flex items-center gap-2 mb-8 w-full">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><PieChart size={20} /></div>
            <h3 className="font-bold text-gray-800">Completion Rate</h3>
          </div>
          <DonutChart percent={globalEfficiency} color="bg-emerald-500" />
          <p className="text-center text-gray-400 text-sm font-medium mt-4">Overall Efficiency</p>
        </div>
      </div>

      <div className="flex justify-center">
        <button onClick={onLogout} className="bg-red-50 text-red-500 font-bold py-3 px-8 rounded-xl hover:bg-red-100 transition-colors flex items-center gap-2">
          <LogOut size={20} /> Log Out
        </button>
      </div>
    </div>
  );
};
