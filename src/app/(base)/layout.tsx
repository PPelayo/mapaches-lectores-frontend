import MainHeader from '@/core/components/header/MainHeader'
import React from 'react'
import {MobileNavigations} from "@/core/components/navigation/Navigation";
import {navGraphConfig} from "@/NavGraphConfig";
import MainFooter from "@/core/components/footer/MainFooter";

export default function BaseLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-dvh w-full grid grid-rows-[auto_1fr_auto]">
            <MainHeader />
            <main className="w-full overflow-auto">
                <MobileNavigations navGraph={navGraphConfig} />
                {children}
            </main>

            <MainFooter/>
        </div>
    )
}
