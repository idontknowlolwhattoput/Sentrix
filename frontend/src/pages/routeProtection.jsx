import { Outlet, Navigate } from "react-router";
import { useContext, useEffect } from "react";
import Signin from "./signin";

import { AuthContext } from "../context/AuthProvider";

export default function RouteProtection() {
   const [isAuthenticated, setAuthentication] = useContext(AuthContext)
   alert(isAuthenticated)
   return isAuthenticated ? <Outlet /> : <Signin />;
}
