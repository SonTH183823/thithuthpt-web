import * as React from "react";
import Image from "next/image";
export function CharacteristicsItem({icon, children, className = "",}) {

    return (
        <div className={`flex space-x-1 items-center justify-center text-info text-sm ${className}`}>
            <div className={'w-5 h-5 flex items-center justify-center'}>
                <Image
                    src={icon}
                    className={"object-cover w-full h-full"}
                    alt={""}
                />
            </div>
            <div>{children}</div>
        </div>);
}

export function CharacteristicsItemIcon({ icon = "", children, className = "", }) {
    return (<div className={`flex space-x-1 items-center text-info ${className}`}>
        {icon && <i className={icon}></i>}
        <div>{children}</div>
    </div>);
}
