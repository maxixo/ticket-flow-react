import type { Ticket } from "../types/index";

const TICKETS_KEY = "tickets";
const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

// Tickets
export function getTickets(): Ticket[] {
  const data = localStorage.getItem(TICKETS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveTickets(tickets: Ticket[]): void {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
}

// Users
export function getUsers(): any[] {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveUsers(users: any[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUser() {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function setCurrentUser(user: any) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}
