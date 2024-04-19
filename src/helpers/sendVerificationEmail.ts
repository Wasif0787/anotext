import { ApiResponse } from './../types/ApiResponse';
import { resend } from "@/lib/resend";
import VerificationEmail from "../../Emails/VerificationEmail";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Anotext | Verification Email',
            react: VerificationEmail({ username, otp: verifyCode }),
        });

        return { success: true, message: "Verification email send successfully" }
    } catch (emailError) {
        console.error("Error sending verification email", emailError);
        return { success: false, message: "Failed to send verification email" }
    }
}