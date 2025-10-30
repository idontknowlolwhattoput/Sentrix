import { createContext, useState } from "react"

export const SelectionContext = createContext()

export default function SelectionProvider({children}) {

   const [selection, setSelection] = useState("dashboard")
   
   return (
       <SelectionContext value={[selection, setSelection]}>
         {children}
       </SelectionContext>
   )
}