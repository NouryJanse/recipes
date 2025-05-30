import type { APIRoute } from "astro";
import { User } from "../../../data/User";
import getAPIDatabaseConnection from "../../../services/getAPIDatabaseConnection";

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    await getAPIDatabaseConnection();
    const formData = await request.formData();
    const id = formData.get("id")?.toString();
    const role = formData.get("role")?.toString();

    // Verifying if role and id is presnt
    if (role && id) {
      // Verifying if the value of role is admin
      if (role === "admin") {
        await User.findById(id)
          .then(async (user) => {
            // Third - Verifies the user is not an admin
            if (user && user.role !== "admin") {
              user.role = role;
              await user.save();
            } else {
              // res.status(400).json({ message: "User is already an Admin" });
            }
          })
          .catch((error) => {
            console.error(error);

            // res.status(400).json({ message: "An error occurred", error: error.message });
          });
      } else {
        // res.status(400).json({
        //   message: "Role is not admin",
        // });
      }
    } else {
      // res.status(400).json({ message: "Role or Id not present" });
    }
    
    return redirect("");
  } catch (error) {
    console.error(error);
    return redirect("");
  }
};
