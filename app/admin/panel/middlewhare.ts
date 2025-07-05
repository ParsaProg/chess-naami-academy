"use client";

import { useEffect, useState } from "react";

export default function CheckIsLogin() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  useEffect(() => {
    // Client-side cookie check
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("admin-token="))
      ?.split("=")[1];

    setIsLogin(!!cookieValue);
  }, []);
  return isLogin;
}
