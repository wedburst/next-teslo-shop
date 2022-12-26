import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import credentials from "next-auth/providers/credentials";
import { dbUsers } from "database";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    credentials({
      name: "Custom Login",
      credentials: {
        email: {
          label: "Correo",
          type: "email",
          placeholder: "correo@google.com",
        },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "Contraseña",
        },
      },
      async authorize(credentials) {
        // return {
        //   name: "Jhon",
        //   correo: "jhonrr@fox.com",
        //   role: "admin",
        // };

        return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password)
      },
    }),
    // ...add more providers here
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  // Custom Pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },

  // Callbacks
  jwt: {
   
  },

  session: {
    maxAge: 2592000, // 30d
    strategy: 'jwt',
    updateAge: 86499 // cada día
  },

  callbacks: {

    async jwt({ token, account, user }) {
      // console.log({ account, token, user });

      if (account) {
        token.accesToken = account.access_token;

        switch (account.type) {
          case 'oauth':
            token.user = await dbUsers.oAUthToDbUser( user?.email || "", user?.name || "");
            break;
          case 'credentials':
            token.user = user;
            break;
        }
      }
      return token;
    },

    async session({ session, token, user }) {
      // console.log({ session, token, user });

      session.accesToken = token.accesToken;
      session.user = token.user as any;

      return session;
    },
  },
};

export default NextAuth(authOptions);
