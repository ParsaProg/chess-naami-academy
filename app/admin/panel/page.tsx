"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CheckIsLogin from "./middlewhare";

export default function AdminPanelPage() {
    const isLogin: boolean = CheckIsLogin();
    const router = useRouter();
    
    useEffect(() => {
        if (!isLogin) {
            router.push("/admin/panel/auth");
        }
    }, [isLogin, router]); // Added dependencies here

    return <div className="mt-[50px] w-full"></div>;
}