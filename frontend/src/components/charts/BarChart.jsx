import React from 'react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const WEEKS = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

export const AggregateBarChart = ({ habits, color, mode }) => {
  let labels = []; let data = []; let maxPossible = 0;
  if (mode === 'week') {
    labels = DAYS;
    data = DAYS.map((_, dayIdx) => {
      return habits.reduce((total, habit) => total + (habit.history[dayIdx] ? 1 : 0), 0);
    });
    maxPossible = habits.length; 
  } else {
    labels = WEEKS;
    const totalHabits = habits.length * 7; 
    data = [
      Math.round(totalHabits * 0.6), 
      Math.round(totalHabits * 0.75), 
      Math.round(totalHabits * 0.5), 
      habits.reduce((acc, h) => acc + h.history.filter(Boolean).length, 0) 
    ];
    maxPossible = totalHabits;
  }
  return (
    <div className="flex items-end justify-between h-full w-full gap-3">
      {data.map((count, i) => {
        const percentage = maxPossible > 0 ? (count / maxPossible) * 100 : 0;
        return (
          <div key={i} className="flex flex-col items-center justify-end h-full flex-1 group">
            <div className="relative w-full h-full flex items-end">
               <div className={`w-full rounded-t-lg transition-all duration-500 ${percentage > 0 ? color : 'bg-gray-100'}`} style={{ height: `${Math.max(percentage, 5)}%` }}>
                 <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap pointer-events-none z-10 shadow-lg transition-opacity">
                    {count} / {maxPossible}
                 </div>
              </div>
            </div>
            <div className="text-xs font-bold text-gray-400 mt-2">{labels[i]}</div>
          </div>
        );
      })}
    </div>
  );
};
