"use client"

import { IoIosLogOut } from "react-icons/io";
import Toggle from "./Toggle";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";
import { signOutUser } from "@/actions/actions";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  
  const handleLogout = () => {
    signOutUser();
    router.push("/auth/signin");
  }

  return (
    <div>
      <nav className="bg-gray-900 text-white flex justify-between px-10 py-4 items-center dark:bg-gray-800">
        <h1 className="text-2xl font-bold">CryptoTracker</h1>
        <div className="flex gap-10">
          <div className="flex gap-2 items-center">
            <MdOutlineWbSunny size={15} />
            <div className="pt-1.5">
              <Toggle />
            </div>
            <IoMoonOutline size={15} />
          </div>
          <div className="border bg-white text-black flex gap-2 items-center rounded-md px-2 py-1 cursor-pointer dark:bg-black dark:text-white dark:border-transparent">
            <IoIosLogOut />
            <p className="pb-0.5" onClick={handleLogout}>Logout</p>
          </div>
        </div>
      </nav>
    </div>
  )
}
