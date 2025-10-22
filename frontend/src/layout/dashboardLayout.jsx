import sentrixlogo from "../assets/img/logo.svg"
export default function DashboardLayout() {
    return (
        <div className="flex W-screen h-screen ">
         {/* LEFT SIDEBAR*/ }
          <div className="w-[20%] h-full bg-[#A6ABC8]">
             <div className="flex w-full h-[10%] pl-4 items-center gap-2">
               <img src={sentrixlogo} className="w-15 h-15" />
               <h1 className="inter text-2xl font-bold">Sentrix.</h1>
             </div>
          </div>
          <div className="flex flex-col w-full h-full ">
            <div className="w-full h-[15%] ">
            
            </div>
            <div className="w-full h-full ">
            
            </div>
          </div>
        </div>
    )
}