// utils/context/UserContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext, User } from "./UserContext";
import { jwtDecode } from "jwt-decode";



export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUser({
          token,
          user: {
            username: decoded.username,
            email: decoded.email,
            id: decoded.userId,
          },
        });
      } catch (e) {
        console.log("Invalid token", e);
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
