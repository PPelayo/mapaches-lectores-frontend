import ImageIcon from "@/core/components/icons/ImageIcon";
interface Props {
    cover? : string | null,
    className? : string
}


export default  function CoverBook({cover, className} : Props){
    return (
        <>
            <picture className={`aspect-portada ${className}`}>
                {
                    cover
                        ?
                        <img src={cover} alt={'Portada del libro'} loading={'lazy'} className={'object-cover aspect-portada'}/>
                        :
                        <div className={'flex items-center justify-center w-full h-full bg-gray-200'}>
                            <ImageIcon className={'w-12 h-auto'}/>
                        </div>
                }
            </picture>
        </>
    )
}