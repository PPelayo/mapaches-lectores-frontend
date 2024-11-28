'use client'

import {BookIcon} from "@/core/components/icons/BookIcon";
import {useState} from "react";
import BaseModal from "@/core/components/modal/BaseModal";
import SearcherBooksLateralMenu from "@/features/searcher/components/SearcherBooksLateralMenu";

export default function SearcherBooksButtonMenu() {

    const [open, setOpen] = useState(false)

    return (
        <>
            <BaseModal
                onDissmiss={() => setOpen(false)}
                open={open}
            >
                <div className={'min-w-64'}>
                    <SearcherBooksLateralMenu onCategoryClick={() => setOpen(false)}/>
                </div>
            </BaseModal>

            <button
                onClick={() => setOpen(!open)}
                className="sm:hidden fixed bottom-6 left-3 bg-primary shadow-xl rounded-full px-4 py-4 border border-onPrimary">
                <BookIcon className="w-8 h-auto text-onPrimary"/>
            </button>
        </>
    )
}