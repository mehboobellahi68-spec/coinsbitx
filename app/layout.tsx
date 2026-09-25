"use client";
import { useState, useEffect } from "react";
import { MantineProvider } from "@mantine/core";
import { theme } from "../context/ThemeContext";
import { ColorSchemeScript } from "@mantine/core";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {hydrated && <ColorSchemeScript />}
      </head>
      <body style={{ backgroundColor: "#0a0a0f" }}>
        <MantineProvider theme={theme}>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}