"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

interface QueryClientProviderProps {
  children: React.ReactNode;
}

// Create a new query client and provide it to the children components
export const TansStackProvider = ({ children }: QueryClientProviderProps) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
