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
  amount:number
  setAmount:(amount:number)=> void
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
  amount:0,
  setAmount:()=>{
    throw new Error("Amount is called outisde Userprovider")
  }

});

export const useUserAuth = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0)

  // useEffect(() => {
  //   const token = localStorage.getItem("cryptex-token");
  //   if (token) {
  //     try {
  //       const decoded: any = jwtDecode(token);
  //       setIsAuth(true);
  //       setUser({
  //         token,
  //         user: {
  //           username: decoded.username,
  //           email: decoded.email,
  //           id: decoded.userId,
  //         },
  //       });
  //     } catch (e) {
  //       console.error("Invalid token", e);
  //       localStorage.removeItem("token");
  //       setIsAuth(false);
  //       setUser(null);
  //     }
  //   } else {
  //     setIsAuth(false);
  //     setUser(null);
  //   }
  // }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isAuth, setIsAuth,amount,setAmount }}>
      {children}
    </UserContext.Provider>
  );
};
