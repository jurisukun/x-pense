import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, categoryId } = body;
  const { userId } = auth();
  if (!userId) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  const addedsubcategory = await prisma?.subCategory.create({
    data: {
      name,
      categoryId,
    },
  });

  if (!addedsubcategory) {
    console.log("error creating subcategory");
    return Response.json(
      { message: "Error creating subcategory" },
      { status: 500 },
    );
  }
  const updateCategory = await prisma?.category.update({
    where: {
      id: categoryId,
    },
    data: {
      subCategory: {
        connect: {
          id: addedsubcategory.id,
        },
      },
    },
  });

  if (!updateCategory) {
    console.log("error updating category");
    return Response.json(
      { message: "Error updating category" },
      { status: 500 },
    );
  }
  return Response.json(
    { message: "Subcategory created successfully" },
    { status: 201 },
  );
}
