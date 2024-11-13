import { InputHTMLAttributes } from "react";

interface Props {
    label: string;
    baseAttributes: InputHTMLAttributes<HTMLInputElement>;
}

export default function BasicInput({ label, baseAttributes } : Props) {
    return (
        <>
            <label>
                <h4 className="text-lg ml-1">{label}</h4>
                <input
                    {...baseAttributes}
                    className={"w-80 h-12 px-2 py-1 rounded-lg outline-none border-2 border-gray-300 shadow transition-colors hover:border-secondary " + baseAttributes.className}
                />
            </label>
        </>
    )
}