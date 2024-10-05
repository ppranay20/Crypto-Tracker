"use client"

export default function Toggle() {

  const handleChange = (e : any) => {
    if(e.target.checked){
      document.documentElement.classList.toggle("dark");
    }else{
      document.documentElement.classList.remove("dark");
    }
  }
  return (
    <div>
        <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" onChange={handleChange} />
            <div className="relative w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-black after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full peer-checked:after:bg-black after:h-4 after:w-4 after:transition-all"></div>
        </label>
    </div>
  )
}
