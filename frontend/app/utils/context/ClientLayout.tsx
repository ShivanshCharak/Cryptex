"use client";
import { ReactNode } from "react";
import { UserProvider } from "./UserProvider";


const ClientLayout = ({ children }: { children: ReactNode }) => {
  return <UserProvider>

             {children}
    </UserProvider>
};

export default ClientLayout;
