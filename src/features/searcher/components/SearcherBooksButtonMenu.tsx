'use client'

import { BookIcon } from "@/core/components/icons/BookIcon";
import SearcherBooksLateralMenu from "./SearcherBooksLateralMenu";

export default function SearcherBooksButtonMenu() {
    return (
        <>
            <div className="sm:hidden">
                <SearcherBooksLateralMenu />
            </div>

            <button className="fixed bottom-6 left-3 bg-background shadow-lg rounded-full px-4 py-4 border border-white">
                <BookIcon className="w-8 h-auto text-white" />
            </button>
        </>
    )
}