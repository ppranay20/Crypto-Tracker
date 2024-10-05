"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { crypto , useCryptoStore } from '@/utils/store';

export default function CryptoTable({searchCrypto} : {searchCrypto : string}) {
  const [cryptoData,setCryptoData] = useState<any[]>([]);
  const setSelectedCryto = useCryptoStore((state) => state.setSelectedCrypto);

  const fetchData = async () => {
    try{
      const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d')
      setCryptoData(res.data);
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData();
  },[])

  const router = useRouter();

  const filteredCryptoData = cryptoData.filter((crypto) => {
    if(crypto.name.toLowerCase().startsWith(searchCrypto.toLowerCase())){
      return crypto.name;
    }

    return false;
  })

  const handleOnClick = (crypto : crypto) => {
    setSelectedCryto(crypto);
    router.push(`/${crypto.name}`)
  }

  return (
    <div className="my-4 max-h-80 max-w-full overflow-x-auto overflow-y-auto dark:bg-gray-800">
      <table className="border-transparent rounded-md bg-white shadow-md">
        <thead className="text-[15px] border-b border-gray-300 bg-gray-100 z-50 top-0 sticky dark:border-transparent">
          <tr className='dark:bg-gray-700'>
            <th className="px-10 py-3 font-semibold dark:text-white">Name</th>
            <th className="px-12 py-3 font-semibold dark:text-white">Price</th>
            <th className="px-12 py-3 font-semibold dark:text-white">Market Cap</th>
            <th className="px-12 py-3 font-semibold dark:text-white">1h Change</th>
            <th className="px-12 py-3 font-semibold dark:text-white">24h Change</th>
            <th className="px-10 py-3 font-semibold dark:text-white">7D Change</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredCryptoData.map((crypto,index) => {
              return(
                <tr key={index} className={`text-sm cursor-pointer ${index%2 === 0 ? "bg-gray-50 dark:bg-gray-900" : "dark:bg-gray-800"}`} onClick={() => handleOnClick(crypto)}>
                  <td className="px-10 py-3 text-center font-semibold dark:text-white">{crypto.name}</td>
                  <td className="px-10 py-3 text-center dark:text-white">${crypto.current_price}</td>
                  <td className="px-10 py-3 text-center dark:text-white">${(crypto.market_cap/100000000000).toFixed(1)}B</td>
                  <td className={`px-10 py-3 text-center ${crypto.price_change_percentage_1h_in_currency >= 0 ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>{crypto.price_change_percentage_1h_in_currency.toFixed(2)}%</td>
                  <td className={`px-10 py-3 text-center ${crypto.price_change_percentage_24h_in_currency >= 0 ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>{crypto.price_change_percentage_24h_in_currency.toFixed(2)}%</td>
                  <td className={`px-10 py-3 text-center ${crypto.price_change_percentage_7d_in_currency >= 0 ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>{crypto.price_change_percentage_7d_in_currency.toFixed(2)}%</td>
                </tr>
              )              
            })
          }
        </tbody>
      </table>
    </div>
  )
}
