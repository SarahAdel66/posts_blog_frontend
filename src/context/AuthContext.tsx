import { createContext, useState, ReactNode, useEffect } from "react";
import { User } from "../types/types";

interface AuthContextType {
  user: User | null;
  login: (userData: User,token :string) => void;
  logout: () => void;
  token: string | null;

}

export const AuthContext = createContext<AuthContextType | null>(null);

// ReactNode makes the component flexible and allows any type of children
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  
  useEffect(() => {

    if (token) {
      localStorage.setItem("token", token);
      //get user`s info from token
      fetchUserFromToken(token); 

    } else {
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

  const fetchUserFromToken = async (token: string) => {
    
    try {
      const response = await fetch("http://localhost:5000/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {

        const userData = await response.json();
        setUser(userData);

      } else {
        logout();
      }

    } catch (error) {
      console.error("Error fetching user:", error);
      logout();
    }
  };


  const login = (userData: User,token :string) => {

    setUser(userData);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);

  };

  const logout = () => {

    setUser(null);
    setToken(token);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

  };

  return (
    <AuthContext.Provider value={{ user,token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
