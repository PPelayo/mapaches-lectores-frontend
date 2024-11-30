import ButtonCuenta from './ButtonCuenta'
import SubHeader from './SubHeader'
import Link from "next/link";
import SearcherHeader from "@/core/components/header/SearcherHeader";
import NavigationButton from "@/core/components/buttons/NavigationButton";

export default function MainHeader() {
    return (
        <div className="flex flex-col sticky top-0 left-0 right-0 z-10">
            <header
                className="w-full text-md sm:text-lg bg-primaryContainer min-h-12 flex flex-row items-center justify-between px-4 py-2">
                <div className={'flex flex-row gap-2 items-center flex-grow sm:flex-grow-0 justify-between sm:justify-start'}>
                    <div className={'sm:hidden'}>
                        <NavigationButton/>
                    </div>
                    <Link href={'/'} className="cursor-pointer flex flex-row gap-2 items-center justify-between xs:justify-start">
                        <img src="/logo.png" alt="logo" className={'h-12'}/>
                        <h2 className={'text-lg font-semibold uppercase hidden xs:block'}>
                            MAPACHES LECTORES
                        </h2>
                    </Link>
                    <div/>
                </div>
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
