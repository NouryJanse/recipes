import type { APIRoute } from "astro";
import { User } from "../../../data/User";
import getAPIDatabaseConnection from "../../../services/getAPIDatabaseConnection";

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    await getAPIDatabaseConnection();
    const formData = await request.formData();
    const id = formData.get("id")?.toString();
    const user = await User.findById(id);

    if (user) {
      await user.deleteOne();
    }

    return redirect("http://localhost:4321/");
  } catch (error) {
    console.error(error);
    return redirect("http://localhost:4321/");
  }
};
