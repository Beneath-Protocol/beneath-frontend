"use client";

import { ThemeProvider } from "next-themes";
import ContextProvider from "../context/contextprovider";

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ContextProvider>{children}</ContextProvider>
    </ThemeProvider>
  );
}