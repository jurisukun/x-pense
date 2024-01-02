import { auth } from "@clerk/nextjs";

export async function GET(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const categories = await prisma?.category.findMany({
    where: {
      userId,
    },
    select: {
      name: true,
    },
  });
  if (!categories) {
    return Response.json(
      { error: "Error fetching categories" },
      { status: 500 },
    );
  }
  return Response.json({ categories }, { status: 200 });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name } = body;
  const { userId } = auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const existingCategory = await prisma?.category.findFirst({
    where: {
      name,
      userId,
    },
  });
  if (!existingCategory) {
    const category = await prisma?.category.create({
      data: {
        name,
        userId,
      },
    });
    if (!category) {
      return Response.json(
        { error: "Error creating category" },
        { status: 500 },
      );
    }
    return Response.json(
      { message: "Category created successfully" },
      { status: 201 },
    );
  }
  return Response.json({ message: "Category already exists" }, { status: 400 });
}
