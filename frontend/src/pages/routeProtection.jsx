import { Outlet, Navigate } from "react-router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function RouteProtection() {
   const [isAuthenticated, setAuthentication] = useContext(AuthContext)
   return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
}
