import { api } from "./client";

// List all habits

//Needed help updating this one
export async function listHabits() {
  const { data } = await api.get("/habits");
    return (Array.isArray(data) ? data : []).map(h => ({
      name: h?.name ?? "",
      streak: Number.isFinite(h?.streak) ? h.streak : 0,
      logs: Array.isArray(h?.logs) ? h.logs : [],
    }));
}

// Create a new habit
export async function createHabit(name) {
  const { data } = await api.post("/habits", { name });
  return data;
}

// Mark a habit as complete
export async function completeHabit(name) {
  const { data } = await api.post(`/habits/${encodeURIComponent(name)}/complete`);
  return data;
}

// Delete a habit
export async function deleteHabit(name) {
  await api.delete(`/habits/${encodeURIComponent(name)}`);
}
