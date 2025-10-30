import { useContext, useState } from "react";
import { ResourceContext } from "../context/ResourceProvider";
import { LayoutDashboard, ShoppingCart, Users, Calendar } from "lucide-react";

export default function SidebarList() {
  const [active, setActive] = useState("Dashboard");
  const [listOption, setListOption] = useContext(ResourceContext);

  // icon map for easy lookup
  const iconMap = {
    Dashboard: <LayoutDashboard size={18} />,
    Employees: <ShoppingCart size={18} />,
    Patients: <Users size={18} />,
    Appointments: <Calendar size={18} />,
  };

  return (
    <div className="flex flex-col w-64  p-6 text-gray-500 poppins space-y-6 bg-blue-500">
       {listOption.map((section) => (
         <div>
          <h1>{section.id}</h1>
         </div>
        ))}
    </div>
  );
}
