
"use client";
import { OrdersProvider } from "@/app/utils/context/DepthContext";

export default function TradingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OrdersProvider>
      {children}
    </OrdersProvider>
  );
}