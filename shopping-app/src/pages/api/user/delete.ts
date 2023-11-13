import type { APIRoute } from "astro";
import { User } from "../../../data/User";
import connectToDB from "../../../services/mongoose";

export const POST: APIRoute = async ({ request, redirect }) => {
  await connectToDB();
  const formData = await request.formData();
  const id = formData.get("id")?.toString();
  const user = await User.findById(id);

  if (user) {
    await user.deleteOne();
    // const res = await user.remove();
  }
  return redirect("http://localhost:4321/");
};
