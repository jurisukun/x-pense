"use client";

import * as React from "react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { SunMedium, Moon } from "lucide-react";

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <>
      <Button
        variant="outline"
        className="w-auto rounded-full"
        onClick={() => {
          if (theme == "light") setTheme("dark");
          else setTheme("light");
        }}
      >
        <SunMedium
          className="h-[1.2rem] w-[1.2rem] scale-100 transition-all dark:scale-0"
          size={24}
        />
        <Moon
          className="absolute  scale-0  transition-all dark:scale-100"
          onClick={() => setTheme("light")}
          size={20}
        />
      </Button>
    </>
  );
}
