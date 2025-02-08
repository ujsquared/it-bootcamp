import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { checkAllowedEmail } from "../check-email/route";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: { email?: string | null } }) {
      try {
        const isAllowedEmail = await checkAllowedEmail(user.email as string);
        return isAllowedEmail;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async session({ session }: { session: any }) {
      return session;
    },
  },
  pages: {
    error: '/auth/error',
    signIn: '/auth/signin',
  },
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };