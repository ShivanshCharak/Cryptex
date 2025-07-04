import { createContext, useContext } from 'react';

export interface User {
  token:string,
  user:{
      username: string;
      email: string;
      id: string;
  }
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}



export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {
    throw new Error("setUser called outside of UserProvider");
  },
});

export const useUserAuth = () => useContext(UserContext);
