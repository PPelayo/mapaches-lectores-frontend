import { useState } from "react";
import BasicSearcherTextField from "./BasicSearcherTextField";

export default function SearcherTextField<T extends Entity>(){

    const [value, setValue] = useState('')


    const handleItemClick = (item : T) => {
        
    }

    return (
        <>
            <BasicSearcherTextField
                value={value}
            
            />
        </>
    )
}