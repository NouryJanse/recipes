import type { APIRoute } from "astro";
import connectToDB from "../../../services/mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../../data/User";
const jwtSecret = import.meta.env.JWT_SECRET || "";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  await connectToDB();
  const formData = await request.formData();
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();

  if (!username || !password) {
    return new Response(
      JSON.stringify({
        message: "Username or Password not present",
      })
    );
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return new Response(
        JSON.stringify({
          message: "Login not successful",
          error: "User not found",
        })
      );
    } else {
      // comparing given password with hashed password
      return bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign({ id: user._id, username, role: user.role }, jwtSecret, {
            expiresIn: maxAge, // 3hrs in sec
          });

          cookies.set("jwt", token, {
            path: "/",
            httpOnly: true,
            maxAge: maxAge * 1000, // 3hrs in ms
          });

          cookies.set("start-time", "31", { path: "/" });

          return redirect("/");
          // return new Response(
          //   JSON.stringify({
          //     message: "User successfully Logged in",
          //     user: user._id,
          //   })
          // );
        } else {
          return new Response(
            JSON.stringify({
              message: "Login not succesful",
            })
          );
        }
      });
    }
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        message: "An error occurred",
        error: error.message,
      })
    );
  }
};
