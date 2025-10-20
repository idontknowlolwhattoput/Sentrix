import HomeHeader from "../components/homeHeader.jsx"
import HomeFooter from "../components/homeFooter.jsx"

export default function HomeLayout({ children }) {
    return (
        <>
         <HomeHeader/>
         <main>{children}</main>
         <HomeFooter/>
        </>
    )
}