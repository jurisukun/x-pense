"use client";

import { Expense } from "@prisma/client";
import { format } from "date-fns";
import AddEntryDialog from "./add-entry-dialog";
import { useState } from "react";

export default function ExpenseEntry({
  expenseData,
}: {
  expenseData: Expense;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className=" flex h-16 w-full cursor-pointer items-center rounded-md border px-5 shadow-lg  transition-all hover:bg-slate-50 sm:h-20 hover:dark:bg-slate-800 "
        onClick={() => {
          setOpen(true);
        }}
      >
        <div className="flex w-full flex-row justify-between ">
          <div className="flex w-1/2 flex-col sm:w-1/3">
            <div className="text-md font-bold">{expenseData.item}</div>
            <div className="text-sm text-slate-400">
              {expenseData.category}/{expenseData.subCategory || "None"}
            </div>
          </div>
          <div className="hidden flex-col sm:block">
            <div className="text-md text-start font-medium">
              {expenseData.note || "No notes"}
            </div>
            <div className="text-sm text-slate-400 sm:text-center">Note</div>
          </div>
          <div className="flex w-1/2  flex-col items-end sm:w-1/3">
            <div className="text-l text-center font-bold text-red-400">
              ₱{expenseData.amount}
            </div>
            <div className="text-center text-sm text-slate-400">
              {format(expenseData.date, "dd/MM/yyyy")}
            </div>
          </div>
        </div>
      </div>
      <AddEntryDialog open={open} setOpen={setOpen} expenseData={expenseData} />
    </>
  );
}
