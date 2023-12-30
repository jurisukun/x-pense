import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";
import NavBar from "../NavBar";
import ExpenseEntry from "@/components/expense-entry";

export default async function Dashboard() {
  const { userId } = auth();
  if (!userId) throw new Error("Not Authenticated");
  const allEntries = await prisma.expense.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="h-full">
      <div className="flex  w-screen flex-col items-center justify-center gap-3">
        <NavBar />
      </div>
      <div className=" space-y-3  border-red-300 p-3">
        {allEntries.map((entry, key) => (
          <ExpenseEntry key={key} expenseData={entry} />
        ))}
      </div>
    </div>
  );
}
