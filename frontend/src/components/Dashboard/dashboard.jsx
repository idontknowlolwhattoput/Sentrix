import { useContext } from "react"
import { ResourceContext } from "../../context/ResourceProvider"
import { SelectionContext } from "../../context/SelectionProvider"
import {
  LayoutDashboard,
  Users,
  UserCircle2,
  List,
  CalendarDays,
  PieChart,
  Receipt,
} from "lucide-react"


export default function Dashboard() {

  const [sidebarList] = useContext(ResourceContext)
  const [selection, setSelection] = useContext(SelectionContext)

  const icons = {
    LayoutDashboard,
    Users,
    List,
    CalendarDays,
    PieChart,
    Receipt,
  }

  const select = (selection) => {
       setSelection(selection)
      
  }

  return (
    <div className="w-full h-full flex flex-wrap gap-8 p-10">
      {sidebarList.map((section) =>
        section.items.map((item, key) => {
          const Icon = icons[item.icon] || LayoutDashboard 
          return (
            <div
              key={key}
              onClick={() => {select(item.item)}}
              className="w-[140px] h-[140px] rounded-2xl bg-white shadow-md hover:shadow-lg flex flex-col items-center justify-center gap-3 cursor-pointer border border-gray-100 hover:border-black transition-all"
            >
              <Icon size={36} className="text-black" />
              <p className=" text-sm font-medium text-gray-700 text-center ">{item.item}</p>
            </div>
          )
        })
      )}
    </div>
  )
}
