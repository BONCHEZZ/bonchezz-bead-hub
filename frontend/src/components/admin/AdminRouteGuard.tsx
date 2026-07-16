"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("bonchezz-token");
    if (!token) {
      void navigate({ to: "/login" });
    } else {
      setChecked(true);
    }
  }, [navigate]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
