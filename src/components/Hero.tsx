"use client"

import { useState,useEffect } from "react";
import axios from 'axios'
import CryptoTable from "./CryptoTable"
import { IoSearchSharp } from "react-icons/io5";

export default function Hero() {
  const [searchCrypto,setSearchCrypto] = useState<string>("");

  const fetchData = async () => {
    try{
      const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d')
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  },[])

  return (
    <div className="max-w-[1250px] m-auto pt-5 flex items-center gap-1 flex-col">
        <h1 className="text-4xl py-2 font-bold dark:text-white">CoinPulse</h1>
        <p className="py-2 text-gray-500 text-lg dark:text-white">Real-time cryptocurrency insights at your fingertips</p>
        <div className="flex items-center dark:text-gray-500">
            <div className="relative left-8 text-gray-500">
                <IoSearchSharp size={22} />
            </div>
            <input onChange={(e) => setSearchCrypto(e.target.value)} type="text" placeholder="Search Cryptocurrencies..." className="w-[350px] my-3 rounded-full py-2 outline-none pl-10 text-sm dark:bg-gray-800 dark:text-white" />
        </div>
        <CryptoTable searchCrypto={searchCrypto} />
    </div>
  )
}
