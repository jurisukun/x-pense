import Image from "next/image";
import logo from "../assets/logo3.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();

  if (userId) redirect("/dashboard");
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div className="flex h-full flex-col items-center justify-center ">
        <Image
          src={logo}
          alt="Expense Tracker"
          width={250}
          height={250}
          priority={true}
          className="mb-5 rounded-full bg-slate-50"
        />
        <h1 className="text-center text-2xl font-bold text-gray-800 lg:text-3xl dark:text-slate-50">
          AI Expense Tracker
        </h1>
        <p className="text-center font-semibold text-gray-600 dark:text-slate-400">
          Intelligent expense tracker made with Next JS
        </p>
        <div className="mt-5 ">
          <Button asChild className="px-8 hover:bg-slate-700">
            <Link href="/dashboard">Sign in</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
