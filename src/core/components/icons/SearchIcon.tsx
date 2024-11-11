import React from 'react'
import type { SVGProps } from 'react'

export default function SearchIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            {...props}
        >
            <g fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" d="m20 20l-6-6"></path>
                <path d="M15 9.5a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0Z"></path>
            </g>
        </svg>
    )
}
