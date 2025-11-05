import { createContext, useState } from "react"

export const ModalContent = createContext()

export default function ModalProvider({children}) {
    const [isModalOpen, setModalOpen] = useState(false)
    return (
      <ModalContent.Provider value={[isModalOpen, setModalOpen]}>
        {children}
      </ModalContent.Provider >
    )
   
}