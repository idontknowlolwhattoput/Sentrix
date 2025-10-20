import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  // ✅ Initialize from localStorage immediately
  const [authenticated, setAuthentication] = useState(() => {
    const saved = localStorage.getItem("auth");
    return saved ? JSON.parse(saved) : false;
  });

  // ✅ Keep localStorage synced when state changes
  useEffect(() => {
    if (authenticated) {
      localStorage.setItem("auth", JSON.stringify(true));
    } else {
      localStorage.removeItem("auth");
    }
  }, [authenticated]);

  return (
    <AuthContext.Provider value={[authenticated, setAuthentication]}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
