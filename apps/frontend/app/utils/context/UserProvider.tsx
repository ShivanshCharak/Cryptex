// utils/context/UserContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";

export interface User {
  token: string;
  user: {
    username: string;
    email: string;
    id: string;
  };
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuth: boolean;
  setIsAuth: (auth: boolean) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {
    throw new Error("setUser called outside of UserProvider");
  },
  isAuth: false,
  setIsAuth: () => {
    throw new Error("setIsAuth called outside of UserProvider");
  },
});

export const useUserAuth = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setIsAuth(true);
        setUser({
          token,
          user: {
            username: decoded.username,
            email: decoded.email,
            id: decoded.userId,
          },
        });
      } catch (e) {
        console.error("Invalid token", e);
        localStorage.removeItem("token");
        setIsAuth(false);
        setUser(null);
      }
    } else {
      setIsAuth(false);
      setUser(null);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isAuth, setIsAuth }}>
      {children}
    </UserContext.Provider>
  );
};
