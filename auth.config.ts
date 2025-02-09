// import { AuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { checkAllowedEmail } from "./app/api/auth/check-email/route";
//
// export const authOptions: AuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   callbacks: {
//     async signIn({ user }) {
//       const isAllowedEmail = await checkAllowedEmail(user.email as string);
//       
//       if (isAllowedEmail) {
//         return true;
//       } else {
//         return false;
//       }
//     },
//   },
//   pages: {
//     error: '/auth/error',
//   },
//   debug: process.env.NODE_ENV === 'development',
// }; 
import GoogleProvider from "next-auth/providers/google";
import { Session } from "next-auth";
import { checkAllowedEmail } from "@/app/utils/check-email";

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
    async session({ session }: { session: Session }) {
      return session;
    },
  },
  pages: {
    error: '/auth/error',
    signIn: '/auth/signin',
  },
  debug: process.env.NODE_ENV === 'development',
};
