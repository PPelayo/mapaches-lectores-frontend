import {ReactNode} from "react";

interface Props {
    error? : string | null,
    children? : ReactNode
}

export default function FullError({error, children} : Props){
    return (
        <>
            {
                error
                ? <div className="w-full h-full flex items-center text-center text-2xl text-red-400 font-bold">{error}</div>
                : children 
            }
        </>
    )
}