import { expenseSchema } from "@/lib/validation/expenseSchema";

import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parseBody = expenseSchema.safeParse({
      ...body,
      date: new Date(body.date),
    });
    if (!parseBody.success) {
      console.error(parseBody.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { item, amount, note, category, subCategory, date } = parseBody.data;
    const { userId } = auth();

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    // Save to database
    const expense = await prisma.expense.create({
      data: {
        item,
        amount,
        note,
        category,
        subCategory,
        date,
        userId,
      },
    });
    return Response.json(expense, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Server Error" }, { status: 500 });
  }
}