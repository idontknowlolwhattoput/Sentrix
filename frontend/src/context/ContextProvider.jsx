import AuthProvider from "./AuthProvider"
import ResourceProvider from "./ResourceProvider"
import SelectionProvider from "./SelectionProvider"

export default function ContextProvider({children}) {
    return (
        <AuthProvider>
          <ResourceProvider>
            <SelectionProvider>
             {children}
            </SelectionProvider>
          </ResourceProvider>
        </AuthProvider>
    )
}