import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listHabits, createHabit, completeHabit, deleteHabit } from './api/habits';

// Components
import { Header } from './components/Header';
import { HabitModal } from './components/HabitModal';

// Views
import { LoginView } from './views/LoginView';
import { SignUpView } from './views/SignupView';
import { Dashboard } from './views/Dashboard';
import { ProfileView } from './views/ProfileView';
import { HabitDetailView } from './views/HabitDetailView';

export default function App() {
  const [user, setUser] = useState(null); 
  const [view, setView] = useState('login'); 
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);

  // --- API INTEGRATION ---
  const queryClient = useQueryClient();
  const { data: habits = [] } = useQuery({ queryKey: ['habits'], queryFn: listHabits });
  
  const createMutation = useMutation({ mutationFn: createHabit, onSuccess: () => queryClient.invalidateQueries(['habits']) });
  const toggleMutation = useMutation({ mutationFn: completeHabit, onSuccess: () => queryClient.invalidateQueries(['habits']) });
  const deleteMutation = useMutation({ mutationFn: deleteHabit, onSuccess: () => { queryClient.invalidateQueries(['habits']); setView('dashboard'); }});

  const handleLogin = (username) => { setUser(username); setView('dashboard'); };
  const handleLogout = () => { setUser(null); setView('login'); };
  
  const handleSaveHabit = (data) => { 
    createMutation.mutate(data);
    setEditingHabit(null); 
  };
  
  const handleDeleteHabit = (id) => { if (window.confirm("Are you sure?")) { deleteMutation.mutate(id); } };
  
  const handleToggleDay = (name, dayIndex) => { 
    if (dayIndex === 6) {
       toggleMutation.mutate(name); 
    } else {
       alert("In this demo, you can only toggle today's habit.");
    }
  };
  
  const activeHabit = habits.find(h => h.id === selectedId);

  if (view === 'login') return <LoginView onLogin={handleLogin} onSwitchToSignup={() => setView('signup')} />;
  if (view === 'signup') return <SignUpView onLogin={handleLogin} onSwitchToLogin={() => setView('login')} />;

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100">
      <Header user={user} setView={setView} />
      <main>
        {view === 'dashboard' && <Dashboard user={user} habits={habits} onAdd={() => { setEditingHabit(null); setIsModalOpen(true); }} onSelect={(id) => { setSelectedId(id); setView('habit-detail'); }} />}
        {view === 'habit-detail' && <HabitDetailView habit={activeHabit} onBack={() => setView('dashboard')} onToggleDay={handleToggleDay} onDelete={handleDeleteHabit} onEdit={(h) => { setEditingHabit(h); setIsModalOpen(true); }} />}
        {view === 'profile' && <ProfileView user={user} onUpdateUser={setUser} habits={habits} onLogout={handleLogout} />}
      </main>
      <HabitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveHabit} initialData={editingHabit} />
    </div>
  );
}
