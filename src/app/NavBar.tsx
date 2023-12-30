"use client";

import Image from "next/image";
import logo from "../assets/logo3.png";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { useState } from "react";
import AddEntryDialog from "@/components/add-entry-dialog";
import ModeToggle from "@/components/theme-toggle";
import { Plus } from "lucide-react";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="w-full px-6 py-3 shadow">
        <div className="flex flex-wrap  items-center justify-center space-x-9 min-[500px]:justify-between">
          <span className="flex  items-center justify-center text-lg font-bold">
            <Image
              src={logo}
              alt="Logo"
              width="80"
              height="80"
              priority={true}
            />
            Xpenses
          </span>
          <span className="pointer flex cursor-pointer items-center gap-5">
            <ModeToggle />
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: {
                    showAvatar: true,
                    showInitials: true,
                    showName: true,
                    size: "sm",
                  },
                },
              }}
            />
            <Button
              onClick={() => {
                setOpen(true);
              }}
            >
              <Plus size={20} />
              New Entry
            </Button>
          </span>
        </div>
      </div>
      <AddEntryDialog open={open} setOpen={setOpen} />
    </>
  );
}
