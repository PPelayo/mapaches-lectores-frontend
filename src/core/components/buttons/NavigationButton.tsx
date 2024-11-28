'use client'

import MenuIcon from "@/core/components/icons/MenuIcon";
import {useNavigationStore} from "@/core/services/useNavigationStore";

export default function NavigationButton()  {

    const { open } = useNavigationStore()

    return (
        <>
            <button
                onClick={open}
                className="font-bold py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-secondary hover:text-onSecondary">
                <MenuIcon className={'w-8 h-auto'}/>
            </button>
        </>
    )
}