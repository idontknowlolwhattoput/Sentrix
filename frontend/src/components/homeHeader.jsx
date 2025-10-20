import { motion } from "motion/react"
import { useNavigate } from "react-router"
import "./homeHeader.css"
import logo from "../assets/img/logo.svg"

export default function HomeHeader() {

  const navigate = useNavigate();

    return(
        <header className="parentContainer w-screen h-30 flex select-none">
            {/* LEFT SECTION */}
          <div className="blackbar mt-6 inter w-[30%] h-full flex items-center justify-center gap-15 text-2xl font-medium" id="left">
            <h1 className=" animation p-2 ">Features</h1>
            <h1 className="animation p-2 ">Docs</h1>
            <h1 className="animation p-2 ">About</h1>
          </div>

            {/* MIDDLE SECTION */}
          <div className="middle mt-2 inter font-bold text-3xl w-full md:w-[40%] h-full flex flex-col items-center  justify-center" id="middle">
            <img src={logo} className="middleContent w-20 h-20"/>
            <h1>Sentrix</h1>
          </div>
          

            {/* RIGHT SECTION */}
          <div className="blackbar mt-6 inter font-medium md:w-[30%] h-full flex items-center justify-center gap-10 text-2xl" id="right">
            <h1 className="animation">Try demo</h1>
            <button className="request  w-50 h-12 bg-black text-white text-xl rounded-3xl" onClick={() => {navigate("/signin")}}>Request demo</button>
          </div>
        </header>
    )
}