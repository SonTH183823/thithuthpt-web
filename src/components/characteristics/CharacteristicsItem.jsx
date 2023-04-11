import * as React from "react";
import Image from "next/image";
export default function CharacteristicsItem({icon, children, className = "",}) {

    return (
        <div className={`flex space-x-1 items-center justify-center text-info ${className}`}>
            <div className={'w-6 h-6 flex items-center justify-center'}>
                <Image
                    src={icon}
                    className={"object-cover w-full h-full"}
                    alt={""}
                />
            </div>
            <div>{children}</div>
        </div>);
}
