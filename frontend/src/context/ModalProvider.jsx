import { createContext, useState } from "react"

export const ModalContext = createContext()

export default function ModalProvider({children}) {
    const [isModalOpen, setModalOpen] = useState(false)
    return (
      <ModalContext.Provider value={[isModalOpen, setModalOpen]}>
        {children}
      </ModalContext.Provider >
    )
   
}