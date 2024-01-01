import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  const body = await req.json();
  const { name } = body;
  const { userId } = auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const category = await prisma?.category.create({
    data: {
      name,
      userId,
    },
  });
  if (!category) {
    return Response.json({ error: "Error creating category" }, { status: 500 });
  }
  return Response.json(
    { message: "Category created successfully" },
    { status: 201 },
  );
}
