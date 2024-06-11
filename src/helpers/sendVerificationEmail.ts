import { resend } from "@/lib/Resend";
import VerificationEmail from "../../email/VerificationEmail";
import { ApiResponse } from "@/type/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "habiburrahmanofficial157@gmail.com",
      to: email,
      subject: "Mystery Message Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "verification email send succesfully" };
  } catch (emailError) {
    console.error("Error sending verification email", emailError);
    return { success: false, message: "failed to send verification email" };
  }
}
