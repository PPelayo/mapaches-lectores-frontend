import SearchIcon from '../icons/SearchIcon'
import ButtonCuenta from './ButtonCuenta'
import SubHeader from './SubHeader'

export default function MainHeader() {
    return (
        <div className="flex flex-col sticky top-0 left-0 right-0 z-10">
            <header className="w-full text-md sm:text-lg bg-primaryContainer min-h-12 flex flex-row items-center justify-between px-4 py-2">
                <div className="border rounded-lg ">ZONA DEL LOGO</div>
                <div className='hidden sm:block h-full'>
                    <SearchInput/>
                </div>
                <section>
                    <ButtonCuenta/>
                </section>
            </header>
            <SubHeader />
            <div className='w-full px-4 py-2 bg-secondaryContainer block sm:hidden'>
                <SearchInput/>
            </div>
        </div>
    )
}

function SearchInput() {
    return (
        <>
            <div className="h-full overflow-hidden rounded-lg flex flex-row items-center bg-surface shadow-lg sm:w-52 md:w-96">
                <input
                    className="px-3 py-1 outline-none bg-surface h-full w-full border-2 rounded-l-lg border-transparent transition-colors hover:border-secondary"
                    type="text"
                    placeholder="Libro, autor"
                />
                <button className="bg-secondary text-onSecondary h-full flex items-center px-2 border-l-2 border-transparent rounded-r-lg transition-colors hover:border-secondary hover:bg-surface hover:text-secondary">
                    <SearchIcon className="w-8 h-auto" />
                </button>
            </div>
        </>
    )
}
