"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoginPage from "../login/page";

interface Props {
  children: React.ReactNode;
  onAuth?: () => void;
}

export default function ProtectedRoute({ children, onAuth }: Props) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      //alert(authenticated)
      try {
        const res = await axios.get("https://bkashp2p.onrender.com/user/token-test", {
          withCredentials: true,
        });
        //alert(res.status)


        if (res.status === 200) {
          setAuthenticated(true);
          if (onAuth) onAuth();
        } else {
          setAuthenticated(false);
          router.replace("/login");
        }
      }catch (err : any) {
        //console.error("Auth check failed:", err);
        setAuthenticated(false);
        router.replace("/login");
      }
    };

     checkAuth();
  }, [router]);

  if (authenticated === null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Checking authentication...</p>
      </div>
    );
    
  }
  

  return authenticated ? <>{children}</> :  <LoginPage />;
}
