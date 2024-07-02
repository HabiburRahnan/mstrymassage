import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import bdConnect from "@/lib/bdConnect"
import UserModel from "@/model/User"

export const authOptions: NextAuthOptions ={
providers:[
    CredentialsProvider({
        id:"credentials",
        name: "Credentials",
        credentials:{
            username:{label:"Email", type:"Text", },
            password:{label:"Password", type:"Password"}
        }
        async authorize(credentials:any):Promise<any>{

        }

    })
]
} 