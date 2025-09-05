"use client";
import { useAuthContext } from "@/lib/contexts/auth-context";
import PublicNav from "./public-nav";
import AuthNav from "./auth-nav";

const Nav = () => {
  const { isAuthenticated } = useAuthContext();
  
  return isAuthenticated  ? <AuthNav /> : <PublicNav /> 
};

export default Nav;
