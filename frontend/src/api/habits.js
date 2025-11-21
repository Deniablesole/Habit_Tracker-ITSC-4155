import { api } from "./client";

export async function listHabits() {
  const { data } = await api.get("/habits");
  return data;
}

export async function createHabit(habitData) {
  const { data } = await api.post("/habits", habitData);
  return data;
}

export async function completeHabit(name) {
  const { data } = await api.post(`/habits/${encodeURIComponent(name)}/complete`);
  return data;
}

export async function deleteHabit(id) {
  await api.delete(`/habits/id/${id}`);
}
