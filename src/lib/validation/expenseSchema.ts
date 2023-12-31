import z from "zod";

export const expenseSchema = z.object({
  item: z.string().min(1, { message: "Item name is required" }),
  amount: z.number().min(0.01, { message: "Amount must be greater than 0" }),
  note: z.string().optional(),
  category: z.string().min(1, { message: "Category is required" }),
  subCategory: z.string().optional(),
  date: z.date(),
});

export type ExpenseSchemaType = z.infer<typeof expenseSchema>;

export const updateExpenseSchema = expenseSchema.extend({
  id: z.string().min(1, { message: "Entry id is required" }),
});

export const deleteExpenseSchema = z.object({
  id: z.string().min(1, { message: "Entry id is required" }),
});
