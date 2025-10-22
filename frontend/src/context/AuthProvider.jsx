import { createContext, useEffect, useState } from "react";

// CREATE THE CONTEXT
export const AuthContext = createContext()

export default function AuthProvider({children}) {
   const [isAuthenticated, setAuthentication] = useState(false)
   return (
      <AuthContext value={[isAuthenticated, setAuthentication]}>
        {children}
      </AuthContext>
   )
}