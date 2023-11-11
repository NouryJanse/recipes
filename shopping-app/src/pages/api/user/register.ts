import type { APIRoute } from "astro";
import { User } from "../../../data/User";
import connectToDB from "../../../services/mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const jwtSecret = import.meta.env.JWT_SECRET || "";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  await connectToDB();
  const formData = await request.formData();
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();

  if (!password || password.length < 6) {
    return redirect("");
    // return res.status(400).json({ message: "Password less than 6 characters" });
  }

  try {
    return bcrypt.hash(password, 10).then(async (hash) => {
      return await User.create({
        username,
        password: hash,
      })
        .then((user) => {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign({ id: user._id, username, role: user.role }, jwtSecret, {
            expiresIn: maxAge, // 3hrs in sec
          });

          cookies.set("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 3hrs in ms
          });
          return  redirect("/login");
          // return new Response(
          //   JSON.stringify({
          //     message: "User successfully created",
          //     user: user._id,
          //   })
          // );
        })
        .catch((error) => {
          return new Response(
            JSON.stringify({
              message: "User not successful created",
              error: error.message,
            })
          );
        });
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        message: "User not successful created",
        error: error.mesage,
      })
    );
  }
};
