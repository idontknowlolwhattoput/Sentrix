import { useState } from "react"

import sentrixlogo from "../assets/img/logo.svg"
import searchlogo from "../assets/icons/search.svg"
import arrowdown from "../assets/icons/dropdown.svg"
import arrowup from "../assets/icons/dropup.svg"
import notif from "../assets/icons/notifyes.svg"

import SidebarList from "../components/sidebarlist"

export default function DashboardLayout() {

    const [isDropdown, setDropDown] = useState(false)

    const handleDropdown = () => {
      setDropDown(!isDropdown)
    }
    return (
        <div className="flex W-screen h-screen poppins ">
         {/* LEFT SIDEBAR*/ }
          <div className="w-[20%] h-full bg-[#F1F2F7]">
             <div className="flex w-full h-[10%] pl-6 items-center gap-1 shadow-sm">
               <img src={sentrixlogo} className="w-15 h-15" />
               <h1 className="inter text-2xl font-extrabold">Sentrix.</h1>
             </div>
             <SidebarList />
          </div>

          {/* MAIN CONTENT */}
          <div className="flex flex-col w-full h-full ">
            {/* TOP NAVBAR */}
            <div className="flex items-center justify-between w-full h-[11.2%] bg-white shadow-sm px-8">
              {/* LEFT: SEARCH BAR */}
              <div className="flex items-center w-[60%]">
                <div
                  className="flex items-center w-[60%] bg-[#F6F6FB] rounded-lg px-4 py-2 shadow-inner focus-within:ring-2 focus-within:ring-indigo-200 transition-all">
                  <input type="text"
                    className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 font-medium"
                    placeholder="Search here..." />
                  <img src={searchlogo} alt="search" className="w-5 h-5 opacity-60" />
                </div>
              </div>

              {/* RIGHT: ACCOUNT + NOTIFICATION */}
              <div className="flex items-center gap-6">
                {/* Notification Icon */}
                <div className="relative">
                  <img src={notif} alt="notifications"
                    className="w-7 h-7 cursor-pointer opacity-80 hover:opacity-100 transition" />
                  {/* Example notification dot */}
                  <span className="absolute top-0 right-0 block w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                </div>

                {/* Account Section */}
                <div
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 py-2 px-3 rounded-lg transition">
                  <div
                    className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div className="flex items-center gap-1">
                    <h1 className="text-base font-medium text-gray-700">Admin Account</h1>
                    <img src={isDropdown ? arrowup : arrowdown} alt="dropdown" className="w-4 h-4 opacity-60"
                      onClick={handleDropdown} />
                  </div>
                </div>
              </div>
            </div>


            <div className="w-full h-full ">
            
            </div>
          </div>
        </div>
    )
}