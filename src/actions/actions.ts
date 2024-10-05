"use server"
import zod, { any } from 'zod';
import { signInSchema, signUpSchema } from '@/utils/zod';
import { prisma } from '@/utils/prisma';
import bcrypt from 'bcryptjs'
import { signIn, signOut } from '@/app/auth';
import { AuthError } from 'next-auth';

export async function registerUser(data : zod.infer<typeof signUpSchema>){
    const isValidData = signUpSchema.safeParse(data);

    if(!isValidData.success){
        return { error : "Invalid Data"}
    }

    if(data.password !== data.confirmPassword){
        return { error : "Passwords do not match"}
    }

    const isUserExist = await prisma.user.findUnique({
        where : {
            email : data.email
        }
    })

    if(isUserExist) {
        return { error : "User Already Exist"}
    }

    const hashedPassword = await bcrypt.hash(data.password,10);
    
    const newUser = await prisma.user.create({
        data : {
            username : data.username,
            email : data.email,
            password : hashedPassword,
        }
    })

    if(newUser){
        return { success : "User Created Successfully"}
    }
}

export async function loginUser(data : zod.infer<typeof signInSchema>){
    const validateFields = signInSchema.safeParse(data);

    if(!validateFields.success){
        return { error : "Invalid Credentials"};
    }

    try{
        const res = await signIn("credentials",{
            email : data.email as string,
            password : data.password
        })
    }
    catch(error){
        if(error instanceof AuthError){
            return { error : error.cause?.err?.message}
        }
    }
}

export async function signOutUser() {
    await signOut();
}