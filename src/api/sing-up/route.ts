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
    });

    const verifyCode = Math.floor(10000 + Math.random() * 90000).toString;

    if (existingUserByEmail) {
      true; //todu back here
    } else {
      const hasedPassword = await bcrypt.hash(password, 10);

      const expiryDate = new Date();

      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        password: hasedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isverified: false,
        isAccepttingMessage: true,
        messages: [],
      });
      await newUser.save();
    }
    // send farification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    if (!emailResponse.success) {
      return Response.json(
        {
          succuss: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        succuss: true,
        message: "Users Registered successfully. Please verify your email",
      },
      { status: 201 }
    );
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
