import Link from "next/link";
import UserIcon from "../icons/UserIcon";

export default function ButtonCuenta() {
    return (
        <>
            <Link href={'/auth/login'} className="text-lg rounded-lg px-4 py-2 transition-all duration-200 hover:text-onSecondary hover:bg-secondary flex flex-row items-center gap-2">
                <UserIcon className="w-7 sm:w-8 h-auto" />
                Mi cuenta
            </Link>
        </>
    )
}
