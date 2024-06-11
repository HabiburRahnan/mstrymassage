import dbConnect from "@/lib/bdConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();

    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          succuss: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({
      email,
    })
    if (existingUserByEmail) {
        true //todu back here
    }
  } catch (error) {
    console.error("Error registering user", error);
    return Response.json(
      {
        succus: false,
        message: "Error registering user",
      },
      { status: 500 }
    );
  }
}
