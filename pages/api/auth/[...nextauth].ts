import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import credentials from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    
    credentials({
        name: 'Custom Login',
        credentials: {
            email: { label: "Correo", type: "email", placeholder: "correo@google.com" },
            password: { label: "Contraseña", type: "password", placeholder: "Contraseña" },
        },
       async authorize(credentials) {
        console.log({credentials})
        return {
          name: 'Jhon',
          correo:'jhonrr@fox.com',
          role: 'admin'
        };
       }
    }),
    // ...add more providers here
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  // Callbacks
  jwt: {
    async jwt({ token, account, user}){
console.log({account, token, user})
      return token;
    }
  },

  callbacks: {
    async session({ session, token, user}){
console.log({ session, token, user })
      return session;
    }

  }
};

export default NextAuth(authOptions);
