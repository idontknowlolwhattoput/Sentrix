import AuthProvider from "./AuthProvider"
import ModalContent  from "./ModalProvider"
import ResourceProvider from "./ResourceProvider"
import SelectionProvider from "./SelectionProvider"

export default function ContextProvider({children}) {
    return (
        <AuthProvider>
          <ResourceProvider>
            <SelectionProvider>
              <ModalContent>
                {children}
              </ModalContent>
            </SelectionProvider>
          </ResourceProvider>
        </AuthProvider>
    )
}