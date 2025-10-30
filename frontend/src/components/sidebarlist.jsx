import { useContext, useState } from "react";
import { ResourceContext } from "../context/ResourceProvider";
import { LayoutDashboard, ShoppingCart, Users, Calendar, FilePenLine, List } from "lucide-react";
import { SelectionContext } from "../context/SelectionProvider";

export default function SidebarList() {
  const [active, setActive] = useState("Dashboard");
  const [listOption, setListOption] = useContext(ResourceContext);
  const [selection, setSelection] = useContext(SelectionContext)

  // icon map for easy lookup
  const iconMap = {
    Dashboard: <LayoutDashboard size={18} />,
    Employees: <ShoppingCart size={18} />,
    Patients: <Users size={18} />,
    Appointments: <Calendar size={18} />,
  };

  const handleClick = (item) => {
     setActive(item)
     setSelection(item)
  }

  return (
    <div className="flex flex-col w-64 p-6 text-gray-500 poppins space-y-6">
      {listOption.map((section) => (
        <div key={section.id}>
          <h1 className="text-xs font-semibold uppercase tracking-wider mb-3 text-gray-400">
            {section.id}
          </h1>

          <div className="space-y-1">
            {section.items.map((item) => (
              <div
                key={item.item}
                onClick={() => {handleClick(item.item)}}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                  active === item.item
                    ? "bg-[#EEF1FD] text-black font-medium"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-md ${
                    active === item.item
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {iconMap[item.item] || <LayoutDashboard size={18} />}
                </div>
                <span className="text-sm">{item.item}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
