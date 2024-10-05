"use client"

import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import BitcoinLogo from "@/components/BitcoinLogo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/utils/zod";
import { registerUser } from "@/actions/actions";
import { toast } from "react-toastify";

export default function page() {
  const pathname = usePathname()
  const [showPassword,setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword,setShowConfirmPassword] = useState<boolean>(false);
  const { register , handleSubmit , formState : {errors}} = useForm<zod.infer<typeof signUpSchema>>({
    resolver : zodResolver(signUpSchema),
    defaultValues : {
      username : "",
      email : "",
      password : "",
      confirmPassword : ""
    }
  })

  const router = useRouter();

  const onSubmit = (data : zod.infer<typeof signUpSchema>) => {
    try{
      const res = registerUser(data).then((data) => {
        if(data?.error){
          toast.error(`${data.error}`,{
            position : 'top-right'
          })
        }else{
          router.push("/");
          setTimeout(() => {
            toast.success("Account Created",{
              position : "top-right"
            })
          },2000)
        }
      });
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="bg-[#19202f] min-h-screen flex items-center justify-center">
      <div className="border rounded-md flex flex-col gap-2 items-center px-6 bg-[#f2f2f5]">
        <h1 className="w-full flex justify-center pt-2.5"><BitcoinLogo /></h1>
        <h2 className="text-2xl text-[#fbb037] font-bold">CryptoTracker</h2>
        <p className="text-[#8e8e8f] text-sm">Signin or create an account to start tracking</p>
        <div className="w-full border bg-white py-0.5 my-2 flex justify-between px-0.5 rounded-md">
          <Link href="/auth/signin" className="w-[50%] text-center">Sign In</Link>
          <button className={`${pathname === "/auth/signup" ? "w-[50%] text-center rounded-md border bg-orange-500 text-white" : " w-[50%] text-center"}`}>Sign Up</button>
        </div>
        <form className="py-2 flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-[14px]">Username</label>
            <input type="text" {...register("username")} placeholder="John Doe" {...register("username")} className="py-1.5 px-2 rounded-md outline-gray-400 text-sm" required />
          </div>
          { errors.username && <p className="text-xs text-red-600">{errors.username.message}</p> }
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-[14px]">Email</label>
            <input type="text" placeholder="jogn@example.com" {...register("email")} className="py-1.5 px-2 rounded-md outline-gray-400 text-sm" required />
          </div>
          { errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-[14px]">Password</label>
            <div className="flex items-center">
              <input type={showPassword ? "text" : "password"} {...register("password")}  placeholder="Create a strong password" className="py-1.5 px-2 rounded-md outline-gray-400 text-sm min-w-[315px]" required />
              <div className="ml-[-25px] text-lg" onClick={() => setShowPassword(!showPassword)}>
                {
                  showPassword ? <IoEyeOffOutline /> : <IoEyeOutline /> 
                }
              </div>
            </div>
          </div>
          { errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
          <div className="flex flex-col gap-1">
            <label htmlFor="confirm-password" className="text-[14px]">Confirm Password</label>
            <div className="flex items-center">
              <input type={showConfirmPassword ? "text" : "password"} {...register("confirmPassword")} placeholder="Confirm your password" className="py-1.5 px-2 rounded-md outline-gray-400 text-sm min-w-[315px]"  required />
              <div className="ml-[-25px] text-lg" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {
                  showConfirmPassword ? <IoEyeOffOutline /> : <IoEyeOutline /> 
                }
              </div>
            </div>
          </div>
          { errors.confirmPassword && <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>}
          <div className="flex items-center gap-2 py-1">
            <input type="checkbox" required />
            <p className="text-sm">I agree to Terms of Service and Privacy Policy</p>
          </div>
          <button type="submit" className="select-none w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white py-2 rounded-md my-2">Sign Up</button>
        </form>
      </div>
    </div>
  )
}
