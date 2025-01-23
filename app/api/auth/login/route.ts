import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  
  // Redirect to dashboard if already logged in
  if (session) {
    redirect("/dashboard");
  }
  
  // Redirect to the NextAuth signin page with Google
  redirect("/api/auth/signin?callbackUrl=/dashboard");
} 