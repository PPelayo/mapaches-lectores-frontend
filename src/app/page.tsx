import MainHeader from '@/core/components/header/MainHeader'
import MorePopularBooks from '@/features/books/components/MorePopularBooks'

export default function Home() {
    return (
        <div className="min-h-dvh w-full grid grid-rows-[auto_1fr_auto]">
            <MainHeader />

            <main className='w-full overflow-hidden'>
                {/* <div className='flex flex-row gap-2 flex-nowrap overflow-auto p-4'>
                    <BookCard /> 
                    <BookCard /> 
                    
                </div> */}
                <MorePopularBooks/>
            </main>

            <footer className="bg-gray-600">Footer</footer>
        </div>
    )
}
