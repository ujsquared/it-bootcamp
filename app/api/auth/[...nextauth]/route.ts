import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { checkAllowedEmail } from "../check-email/route"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Check if the user's email is in the allowed list
      const isAllowedEmail = await checkAllowedEmail(user.email as string);
      
      if (isAllowedEmail) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or return a URL to redirect to an error page
        // return '/unauthorized'
      }
    },
  },
  pages: {
    error: 'api/auth/error', // Create this page to show custom error messages
  },
  debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };