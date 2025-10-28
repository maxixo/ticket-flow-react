import type { LoginFormData, SignupFormData, User, Session } from "../types";

// ✅ Save session data (e.g., token + user info)
export const saveSession = (user: User): void => {
  localStorage.setItem("session_user", JSON.stringify(user));
};

// ✅ Retrieve the current session
export const getSession = (): User | null => {
  try {
    const data = localStorage.getItem("session_user");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

// ✅ Clear the session completely
export const clearSession = (): void => {
  localStorage.removeItem("session_user");
};

// ✅ Check authentication status
export const isAuthenticated = (): boolean => {
  return !!getSession();
};

// ✅ Get currently logged-in user (shortcut)
export const getCurrentUser = (): User | null => {
  return getSession();
};

// ✅ Mock login function — replace with API call later
export const loginUser = async (credentials: LoginFormData): Promise<boolean> => {
  const storedUser = getSession();

  // For demo: assume credentials match if emails are the same
  if (storedUser && storedUser.email === credentials.email && storedUser.password === credentials.password) {
    return true;
  }

  return false;
};

// ✅ Mock signup function — stores user locally
export const signupUser = async (formData: SignupFormData): Promise<boolean> => {
  const newUser: User = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
  };

  saveSession(newUser);
  return true;
};

// ✅ Logout user
export const logoutUser = (): void => {
  clearSession();
};
