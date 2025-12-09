import { createContext, useContext, useState, useEffect } from "react";
import { logout as reqLogout } from "../../utils/api";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load saved login info from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (data) => {
    const decoded = jwtDecode(data.accessToken);
    const updatedUser = { ...data.user, role: decoded.role };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
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
