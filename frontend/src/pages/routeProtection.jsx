import { Outlet, Navigate } from "react-router";
import { useAuth } from "../context/AuthProvider";

export default function RouteProtection() {
   const [authenticated] = useAuth(); 
   return authenticated ? <Outlet /> : <Navigate to="/signin" />;
}
