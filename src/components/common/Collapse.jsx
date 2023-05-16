import * as React from "react";
import { useState } from "react";
export default function Collapse({ title, children }) {
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    return (<div>
            <div className={`flex items-center justify-between cursor-pointer mt-5 ${open ? '':'border-b-[1px] border-b-gray-300 pb-3'}`} onClick={handleClick}>
                <div className={'font-bold pb-1'}>{title}</div>
                <i className={`fa-regular fa-chevron-down ${open ? '-rotate-180 transition-all duration-500' : '-rotate-360 transition-all duration-500'}`}></i>
            </div>
            <div className={`h-[0px] ${open ? 'block grow-div' : 'hidden translate-y-2 duration-1000'}`}>
                {children}
            </div>
        </div>);
}
