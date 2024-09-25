"use client"

import { IoEyeOutline } from "react-icons/io5";
import BitcoinLogo from "@/components/BitcoinLogo";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { IoEyeOffOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";

export default function page() {
  const [showPassword,setShowPassword] = useState<boolean>(false);
  const pathname = usePathname();

  return (
    <div className="bg-[#19202f] min-h-screen flex items-center justify-center">
      <div className="border rounded-md flex flex-col gap-2 items-center px-6 bg-[#f2f2f5]">
        <h1 className="w-full flex justify-center pt-2.5"><BitcoinLogo /></h1>
        <h2 className="text-2xl text-[#fbb037] font-bold">CryptoTracker</h2> 
        <p className="text-[#8e8e8f] text-sm">Signin or create an account to start tracking</p>
        <div className="w-full border bg-white py-0.5 my-2 flex justify-between px-0.5 rounded-md">
          <button className={`${pathname === "/auth/signin" ? "w-[50%] text-center rounded-md border bg-orange-500 text-white" : " w-[50%] text-center"}`}>Sign In</button>
          <Link href="/auth/signup" className="w-[50%] text-center">Sign Up</Link>
        </div>
        <form className="py-2 flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-[14px]">Email</label>
            <input type="text" placeholder="jogn@example.com" name="email" className="py-1.5 px-2 rounded-md outline-gray-400 text-sm" required />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-[14px]">Password</label>
            <div className="flex items-center">
              <input type={showPassword ? "text" : "password"} name="password"  placeholder="Create a strong password" className="py-1.5 px-2 rounded-md outline-gray-400 text-sm min-w-[315px]" required  />
              <div className="ml-[-25px] text-lg" onClick={() => setShowPassword(!showPassword)}>
                {
                  showPassword ? <IoEyeOffOutline /> : <IoEyeOutline /> 
                }
              </div>
            </div>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white py-2 rounded-md my-2 select-none">Sign In</button>
        </form>
        <div className="py-1.5 mb-4 cursor-pointer bg-white text-orange-500 flex items-center gap-2 px-16 rounded-md border border-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300">
          <div>
            <FaGoogle />
          </div>
          <p>Continue with google</p>
        </div>
      </div>
    </div>
  )
}
