import NextAuth from "next-auth"
import { prisma } from '@/utils/prisma' 
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "@/utils/zod"
import bcrypt from 'bcryptjs'
import Google from "next-auth/providers/google"
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  pages : {
    signIn : "/auth/signin"
  },
  session: { strategy: "jwt" },
  providers : [
    Google({
      clientId : process.env.GOOGLE_CLIENT_ID,
      clientSecret : process.env.GOOGLE_CLIENT_SECRET
    }),
    Credentials({
      async authorize(credentials){
        const validateFields = signInSchema.safeParse(credentials);

        if(!validateFields.success){
          throw new Error("Invalid Credentials");
        }

        const email = credentials.email as string;
        const password = credentials.password as string

        const user = await prisma.user.findUnique({
          where : {
            email : email
          }
        })

        if(!user || !user.password) {
          throw new Error("User Not Found")
        }

        const matchPasswords = await bcrypt.compare(password,user.password);

        if(!matchPasswords) {
          throw new Error("Incorrect Password");
        }

        return user;
      } 
    })
  ]
})