import {ButtonHTMLAttributes, ReactNode} from "react"

interface Props {
    children? : ReactNode,
    basicAttributes? : ButtonHTMLAttributes<HTMLButtonElement>
}

export default function PrimaryButton({children, basicAttributes} : Props){
    return (
        <>
            <button
                {...basicAttributes}
                className={`mt-4 px-4 py-2 bg-primary text-xl font-bold uppercase rounded-full text-onPrimary border-2 border-transparent 
                    transition-colors duration-300 hover:border-primary hover:text-primary hover:bg-onPrimary
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary disabled:hover:text-onPrimary
                    ${basicAttributes?.className}`}
            >
                {children}
            </button>
        </>
    )
}