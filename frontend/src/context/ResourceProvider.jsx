import { createContext, useState } from "react"

export const ResourceContext = createContext()

export default function ResourceProvider({children}) {

    const [sidebarList, setSidebarList] = useState([
        {
         id: "General",
         items: [
            {item: "Dashboard"},
            {item: "Employees"},
            {item: "Patients"},
            {item: "Appointments"}
         ]
        },
        {
         id: "Finance and Billing",
         items: [
            {item: "Finance Dashboard"},
            {item: "Billing Statements"},
         ]
        },
    ])

    const [listOption, setListOption] = useState("")

    return (
      <ResourceContext value={[listOption, setListOption]}>
         {children}
      </ResourceContext>
    )
}