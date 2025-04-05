"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CheckStatus = () => {
    const router = useRouter();
    useEffect(() => {
        const isLoggedIn = localStorage.getItem("token");

        if (!isLoggedIn) {
            router.push("/login");
        }
    }, [router])

    return (<></>)
}

export default CheckStatus