import { createContext, useContext, useState, useEffect } from "react";
import { logout as reqLogout } from "../../utils/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load saved login info from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (data) => {
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.accessToken);
  };

  const logout = async () => {
    setUser(null);
    await reqLogout();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
