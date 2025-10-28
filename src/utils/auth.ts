// src/utils/auth.ts
export const saveSession = (user: any) => {
  localStorage.setItem("session_user", JSON.stringify(user));
};

export const getSession = (): any | null => {
  try {
    const data = localStorage.getItem("session_user");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export  const clearSession = (): void => {
  localStorage.removeItem("session_user");
};

export const isAuthenticated = (): boolean => {
  return !!getSession();
};
