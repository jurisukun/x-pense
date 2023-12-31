import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";
import NavBar from "../NavBar";
import ExpenseEntry from "@/components/expense-entry";

export type userSubCategoryTypes = {
  id: string;
  name: string;
  userId: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}[];

import { ToastDestructive } from "@/components/toast-button";

export default async function Dashboard() {
  const { userId } = auth();
  if (!userId) throw new Error("Not Authenticated");
  const allEntries = await prisma.expense.findMany({
    where: {
      userId,
    },
  });

  const allCategories = await prisma.category.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      name: true,
      userId: true,
      subCategory: true,
    },
  });

  const allSubCategories = await prisma.subCategory.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="h-full">
      <div className="flex  w-screen flex-col items-center justify-center gap-3">
        <NavBar
          userCategories={allCategories}
          userSubCategories={allSubCategories}
        />
      </div>
      <div className=" space-y-3  border-red-300 p-3">
        {allEntries.map((entry, key) => (
          <ExpenseEntry
            key={key}
            expenseData={entry}
            userCategories={allCategories}
            userSubCategories={allSubCategories}
          />
        ))}
      </div>
    </div>
  );
}
