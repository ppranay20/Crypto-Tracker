import zod, { string } from "zod";

export const signInSchema = zod.object({
    email : zod.string({required_error : "Email is required"})
        .min(1,"Email is required")
        .email("Invalid Email"),
    password : zod.string({required_error : "Password is required"})
        .min(1,"Password is required")
}) 

export const signUpSchema = zod.object({
    username : zod.string({required_error : "Username is required"})
        .min(1,"Username is requried"),
    email : zod.string({required_error : "Email is required"})
        .min(1,"Email is required")
        .email("Invalid Email"),
    password : zod.string({required_error : "Password is required"})
        .min(1,"Password is required")
        .min(8,"Password must be greater than 8 characters")
        .max(32,"Password must be less than 32 characters"),
    confirmPassword : zod.string({required_error : "Password is required"})
        .min(1,"Password is required")
        .min(8,"Password must be greater than 8 characters")
        .max(32,"Password must be less then 32 characters")
}).refine((data) => data.password === data.confirmPassword, {
    message : "Passwords do not match",
    path : ["confirmPassword"]
})