import logo from "../assets/img/logo.svg"

export default function HomeFooter() {
    return (
       <footer className="inter footer sm:footer-horizontal text-base-content p-10 select-none  ">
           <aside>
               <div className="flex items-center justify-center">
                 <img src={logo} className="w-20 h-20"/>
                 <div className="flex flex-col">
                   <h1 className=" text-xl font-bold">Sentrix</h1>
                   <h1 className=" text-lg font-normal">Providing quality software since 2005.</h1>
                 </div>
               </div>
           </aside>
           <nav className="">
               <h6 className="footer-title">Services</h6>
               <a className="link link-hover">Branding</a>
               <a className="link link-hover">Design</a>
               <a className="link link-hover">Marketing</a>
               <a className="link link-hover">Advertisement</a>
           </nav>
           <nav>
               <h6 className="footer-title">Company</h6>
               <a className="link link-hover">About us</a>
               <a className="link link-hover">Contact</a>
               <a className="link link-hover">Jobs</a>
               <a className="link link-hover">Press kit</a>
           </nav>
           <nav>
               <h6 className="footer-title">Legal</h6>
               <a className="link link-hover">Terms of use</a>
               <a className="link link-hover">Privacy policy</a>
               <a className="link link-hover">Cookie policy</a>
           </nav>
       </footer>
    )
}