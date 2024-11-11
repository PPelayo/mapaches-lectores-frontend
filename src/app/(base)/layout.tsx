import MainHeader from '@/core/components/header/MainHeader'
import React from 'react'

export default function BaseLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-dvh w-full grid grid-rows-[auto_1fr_auto]">
            <MainHeader />

            <main className="w-full overflow-hidden">
                {children}
            </main>

            <footer className="bg-gray-600">Footer</footer>
        </div>
    )
}
