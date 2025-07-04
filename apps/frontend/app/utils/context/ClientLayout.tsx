"use client";
import { ReactNode } from "react";
import { UserProvider } from "./UserProvider";
import { AmountProvider } from "./AmountProvider";

const ClientLayout = ({ children }: { children: ReactNode }) => {
  return <UserProvider>
          <AmountProvider>
             {children}
          </AmountProvider>
    </UserProvider>
};

export default ClientLayout;
