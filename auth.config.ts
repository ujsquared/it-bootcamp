import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { checkAllowedEmail } from "./app/api/auth/check-email/route";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const isAllowedEmail = await checkAllowedEmail(user.email as string);
      
      if (isAllowedEmail) {
        return true;
      } else {
        return false;
      }
    },
  },
  pages: {
    error: '/auth/error',
  },
  debug: process.env.NODE_ENV === 'development',
}; 