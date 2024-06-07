import NextAuth from "next-auth"
import { UserRole } from "@prisma/client"
declare module "next-auth" {
  interface User {
        username: string
        role: UserRole
        description: string;
        details: string;
      
 }
 
  interface Session {
    user: User& {
      username: string
      role: UserRole
      
    }
    token: {
        username: string
        role: UserRole
    }
  }
}