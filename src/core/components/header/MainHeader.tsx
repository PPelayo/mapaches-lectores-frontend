import SearchIcon from '../icons/SearchIcon'
import ButtonCuenta from './ButtonCuenta'
import SubHeader from './SubHeader'
import Link from "next/link";
import SearcherHeader from "@/core/components/header/SearcherHeader";

export default function MainHeader() {
    return (
        <div className="flex flex-col sticky top-0 left-0 right-0 z-10">
            <header
                className="w-full text-md sm:text-lg bg-primaryContainer min-h-12 flex flex-row items-center justify-between px-4 py-2">
                <Link href={'/'} className="border rounded-lg cursor-pointer">ZONA DEL LOGO</Link>
                <div className='hidden sm:block h-full'>
                    <SearcherHeader/>
                </div>
                <section>
                    <ButtonCuenta/>
                </section>
            </header>
            <div className={'hidden sm:block'}>
                <SubHeader/>
            </div>
            <div className='w-full px-4 py-2 bg-secondaryContainer block sm:hidden'>
                {/*<SearchInput/>*/}
                <SearcherHeader/>
            </div>
        </div>
    )
}

function SearchInput() {
    return (
        <>
            <div
                className="h-full overflow-hidden rounded-lg flex flex-row items-center bg-surface shadow-lg sm:w-52 md:w-96">
                <input
                    className="px-3 py-1 outline-none bg-surface h-full w-full border-2 rounded-l-lg border-transparent transition-colors hover:border-secondary"
                    type="text"
                    placeholder="Libro, autor"
                />
                <button
                    className="bg-secondary text-onSecondary h-full flex items-center px-2 border-l-2 border-transparent rounded-r-lg transition-colors hover:border-secondary hover:bg-surface hover:text-secondary">
                    <SearchIcon className="w-8 h-auto"/>
                </button>
            </div>
        </>
    )
}
