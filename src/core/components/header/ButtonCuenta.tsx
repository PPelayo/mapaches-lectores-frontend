import Link from "next/link";
import UserIcon from "../icons/UserIcon";
import { useUserStore } from "@/features/auth/services/useUserStore";
import { useEffect, useState } from "react";
import { getTokens } from "@/features/auth/services/tokenService";

export default function ButtonCuenta() {

    const { user } = useUserStore()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const tokens = getTokens()
        if(user || !tokens) return

        (async () => {
            setLoading(true)
            

        })()


    }, [user])

    return (
        <>
            <Link href={'/auth/login'} className="text-lg rounded-lg px-4 py-2 transition-all duration-200 hover:text-onSecondary hover:bg-secondary flex flex-row items-center gap-2">
                {
                    !user ? (
                        <>
                            <UserIcon className="w-7 sm:w-8 h-auto" />
                            Mi cuenta
                        </>
                    )
                    : (
                        <>
                            {user.name}
                        </>
                    )
                }
            </Link>
        </>
    )
}
