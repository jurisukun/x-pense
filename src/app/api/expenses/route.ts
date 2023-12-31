import {
  deleteExpenseSchema,
  expenseSchema,
  updateExpenseSchema,
} from "@/lib/validation/expenseSchema";

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
    return Response.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const parseBody = updateExpenseSchema.safeParse({
      ...body,
      date: new Date(body.date),
    });
    if (!parseBody.success) {
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { id, item, amount, note, category, subCategory, date } =
      parseBody.data;
    const { userId } = auth();
    const expense = await prisma.expense.findUnique({
      where: {
        id,
      },
    });

    if (!userId || expense?.userId !== userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const updateExpense = await prisma.expense.update({
      where: {
        id,
      },
      data: {
        item,
        amount,
        note,
        category,
        subCategory,
        date,
      },
    });

    if (!updateExpense) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    return Response.json(updateExpense, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const parseBody = deleteExpenseSchema.safeParse({
      ...body,
      date: new Date(body.date),
    });
    if (!parseBody.success) {
      return Response.json({ error: "Invalid entry id" }, { status: 400 });
    }

    const { id } = parseBody.data;
    const { userId } = auth();
    const expense = await prisma.expense.findUnique({
      where: {
        id,
      },
    });

    if (!userId || expense?.userId !== userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const deleteExpense = await prisma.expense.delete({
      where: {
        id,
      },
    });

    if (!deleteExpense) {
      return Response.json({ error: "Derror deleting entry" }, { status: 404 });
    }
    return Response.json(
      { message: "Entry deleted successfuly" },
      { status: 200 },
    );
  } catch (error) {
    return Response.json({ error: "Server Error" }, { status: 500 });
  }
}
