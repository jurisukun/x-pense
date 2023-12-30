"use client";

import * as React from "react";

import { useTheme } from "next-themes";
import { SunMedium, Moon } from "lucide-react";

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <>
      <SunMedium
        className={
          theme === "dark"
            ? "hidden"
            : "" + "transition duration-500 ease-in-out"
        }
        onClick={() => setTheme("dark")}
        size={24}
      />
      <Moon onClick={() => setTheme("light")} size={20} />
    </>
  );
}
