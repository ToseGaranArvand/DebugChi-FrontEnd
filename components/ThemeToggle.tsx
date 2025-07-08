"use client";

import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  if (!theme) {
    // Optionally, render a placeholder or loading state
    return null;
  }

  return (
    <Tabs value={theme} onValueChange={(value: any) => setTheme(value)}>
      <TabsList>
        <TabsTrigger value="light">
          <Sun size={16} />
        </TabsTrigger>
        <TabsTrigger value="dark">
          <Moon size={16} />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
