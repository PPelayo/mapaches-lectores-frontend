import {InputHTMLAttributes} from "react";

interface Props {
    label: string;
    error? : string | null;
    baseAttributes: InputHTMLAttributes<HTMLInputElement>;
}

export default function BasicInput({ label, baseAttributes, error } : Props) {
    return (
        <>
            <label className="flex flex-col">
                <h4 className="text-lg ml-1">{label}</h4>
                <input
                    {...baseAttributes}
                    className={`w-80 h-12 px-2 py-1 rounded-lg outline-none border-2 shadow 
                        transition-colors hover:border-secondary
                        ${error ? 'border-red-500' : 'border-gray-300'}
                        ${baseAttributes.className}`}
                />
                {
                    error && <span className="text-red-500 ml-1">{error}</span>
                }
            </label>
        </>
    )
}