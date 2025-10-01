// components/ProtectedRoute.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginPage from "@/app/login/page"; 

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const hasToken = document.cookie.includes("token");

    if (hasToken) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);

    }
  }, [router]);

  if (authenticated === null) return null; // still checking

  return authenticated ? <>{children}</> : <LoginPage />;
}
