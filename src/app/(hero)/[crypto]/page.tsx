"use client"

import { IoArrowBackOutline } from "react-icons/io5";
import Image from "next/image";
import { useCryptoStore } from "@/utils/store";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {  redirect, useRouter } from "next/navigation";
import Loading from "@/components/Loading";


export default function page() {
    const selectedCrypto = useCryptoStore((state) => state.selectedCrypto);
    const session = useSession();
    const router = useRouter();

    if(session.status === "loading"){
        return <div className="h-screen flex justify-center items-center">
            <Loading />
        </div>
    }

    setTimeout(() => {
        if(session.status === "unauthenticated"){
            router.push("/auth/signin");
        }
    },2000)

    if(!selectedCrypto){
        redirect("/");
    }

  return (
    <div className="dark:bg-gray-900 dark:h-full transition-colors duration-200 min-h-screen overflow-y-auto">
       <div className="max-w-[1200px] py-[15px] mx-auto">
            <Link href="/" className="flex items-center text-blue-600 gap-1 pb-5 text-sm hover:underline cursor-pointer dark:text-blue-400">
                <IoArrowBackOutline />
                <h2>Back to list</h2>
            </Link>
            <div className="border bg-white shadow-md px-4 py-4 rounded-md dark:bg-gray-800 dark:border-transparent">
                <div className="flex gap-5 items-center">
                    <Image src={selectedCrypto?.image!} alt="crypto" width={60} height={60} />
                    <div>
                        <h1 className="text-[17px] font-bold dark:text-white">{selectedCrypto?.name}</h1>
                        <p className="text-gray-600 py-1 dark:text-gray-400">{selectedCrypto?.symbol}</p>
                    </div>
                </div>
                <p className="py-5 text-[16px] font-light dark:text-gray-300">{selectedCrypto?.name} is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency</p>
                <div className="grid grid-cols-2 gap-6">
                    <div className="flex gap-4 flex-col">
                        <div className="bg-gray-100 py-2 px-3 rounded-md dark:bg-gray-700">
                            <h3 className="text-[16px] font-semibold text-gray-900 mb-2 dark:text-white">Rank</h3>
                            <h4 className="text-[17px] font-bold text-gray-700 dark:text-gray-300">{selectedCrypto?.market_cap_rank}</h4>
                        </div>
                        <div className="bg-gray-100 py-2 px-3 rounded-md dark:bg-gray-700">
                            <h3 className="text-[16px] font-semibold text-gray-900 mb-2 dark:text-white">Current Price</h3>
                            <p className="text-[17px] font-bold text-gray-700 dark:text-gray-300">${selectedCrypto?.current_price}</p>
                        </div>
                        <div className="bg-gray-100 py-2 px-3 rounded-md dark:bg-gray-700">
                            <h3 className="text-[16px] font-semibold text-gray-900 mb-2 dark:text-white">Market Cap Change (24h)</h3>
                            <p className={`text-[17px] font-bold text-gray-700 ${selectedCrypto?.market_cap_change_24h! >= 0 ? "text-green-500" : "text-red-500"}`}>{(selectedCrypto?.market_cap_change_24h!/100000000000).toFixed(2)}%</p>
                        </div>
                        <div className="bg-gray-100 py-2 px-3 rounded-md dark:bg-gray-700">
                            <h3 className="text-[16px] font-semibold text-gray-900 mb-2 dark:text-white">Total Volume (24h)</h3>
                            <h3 className="text-[17px] font-bold text-gray-700 dark:text-gray-300">${selectedCrypto?.total_volume}</h3>
                        </div>
                    </div>
                    <div className="flex gap-4 flex-col">
                        <div className="bg-gray-100 py-2 px-3 rounded-md dark:bg-gray-700">
                            <h1 className="text-[16px] font-semibold text-gray-900 mb-2 dark:text-white">Market Cap</h1>
                            <h3 className="text-[17px] font-bold text-gray-700 dark:text-gray-300">${selectedCrypto?.market_cap}</h3>
                        </div>
                        <div className="bg-gray-100 py-2 px-3 rounded-md dark:bg-gray-700">
                            <h1 className="text-[16px] font-semibold text-gray-900 mb-2 dark:text-white">Total Supply</h1>
                            <h3 className="text-[17px] font-bold text-gray-700 dark:text-gray-300">{selectedCrypto?.total_supply}</h3>
                        </div>
                        <div className="bg-gray-100 py-2 px-3 rounded-md dark:bg-gray-700">
                            <h1 className="text-[16px] font-semibold text-gray-900 mb-2 dark:text-white">24h High / Low</h1>
                            <h3 className="text-[17px] font-bold text-gray-700 dark:text-gray-300">${selectedCrypto?.high_24h} / ${selectedCrypto?.low_24h}</h3>
                        </div>
                        <div className="bg-gray-100 py-2 px-3 rounded-md dark:bg-gray-700">
                            <h1 className="text-[16px] font-semibold text-gray-900 mb-2 dark:text-white">Circulating Supply</h1>
                            <h3 className="text-[17px] font-bold text-gray-700 dark:text-gray-300">{selectedCrypto?.circulating_supply}</h3>
                        </div>
                    </div>
                </div>
            </div>
       </div>
    </div>
  )
}
