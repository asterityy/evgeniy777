import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "guest" | "user" | "admin";

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface StoredUser {
  id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: string;
}

export interface TestResult {
  id: string;
  userId: string;
  testId: string;
  testTitle: string;
  score: number;
  total: number;
  percentage: number;
  date: string;
  answers: Record<string, string | string[]>;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  getAllUsers: () => StoredUser[];
  saveTestResult: (result: Omit<TestResult, "id" | "userId" | "date">) => void;
  getUserResults: (userId?: string) => TestResult[];
  getAllResults: () => TestResult[];
  deleteUserResults: (userId: string) => void;
  deleteUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = "jsa_users";
const CURRENT_USER_KEY = "jsa_current_user";
const RESULTS_KEY = "jsa_results";

const ADMIN_USER: StoredUser = {
  id: "admin-001",
  username: "admin",
  email: "admin@jsacademy.ru",
  password: "admin123",
  role: "admin",
  createdAt: new Date().toISOString(),
};

function getStoredUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const users: StoredUser[] = raw ? JSON.parse(raw) : [];
    if (!users.find((u) => u.username === "admin")) {
      users.push(ADMIN_USER);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
    return users;
  } catch {
    return [ADMIN_USER];
  }
}

function saveStoredUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getStoredResults(): TestResult[] {
  try {
    const raw = localStorage.getItem(RESULTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredResults(results: TestResult[]) {
  localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStoredUsers();
    try {
      const raw = localStorage.getItem(CURRENT_USER_KEY);
      if (raw) {
        const stored = JSON.parse(raw);
        setUser(stored);
      }
    } catch {}
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    const users = getStoredUsers();
    const found = users.find((u) => u.username === username && u.password === password);
    if (!found) return false;
    const u: User = { id: found.id, username: found.username, email: found.email, role: found.role, createdAt: found.createdAt };
    setUser(u);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(u));
    return true;
  };

  const register = async (username: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const users = getStoredUsers();
    if (users.find((u) => u.username === username)) return { success: false, error: "Пользователь с таким именем уже существует" };
    if (users.find((u) => u.email === email)) return { success: false, error: "Пользователь с таким email уже существует" };
    const newUser: StoredUser = {
      id: `user-${Date.now()}`,
      username,
      email,
      password,
      role: "user",
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    saveStoredUsers(users);
    const u: User = { id: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role, createdAt: newUser.createdAt };
    setUser(u);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(u));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const getAllUsers = () => getStoredUsers();

  const saveTestResult = (result: Omit<TestResult, "id" | "userId" | "date">) => {
    if (!user) return;
    const results = getStoredResults();
    const newResult: TestResult = {
      ...result,
      id: `result-${Date.now()}`,
      userId: user.id,
      date: new Date().toISOString(),
    };
    results.push(newResult);
    saveStoredResults(results);
  };

  const getUserResults = (userId?: string) => {
    const id = userId || user?.id;
    if (!id) return [];
    return getStoredResults().filter((r) => r.userId === id);
  };

  const getAllResults = () => getStoredResults();

  const deleteUserResults = (userId: string) => {
    const results = getStoredResults().filter((r) => r.userId !== userId);
    saveStoredResults(results);
  };

  const deleteUser = (userId: string) => {
    const users = getStoredUsers().filter((u) => u.id !== userId && u.username !== "admin");
    saveStoredUsers(users);
    deleteUserResults(userId);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, getAllUsers, saveTestResult, getUserResults, getAllResults, deleteUserResults, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
