import { auth } from "@clerk/nextjs";

export const checkUser = () => {
  const { userId } = auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return userId;
};
