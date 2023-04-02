import useWindowSize from "../../hooks/useWindowSize";
import Image from "next/image";
import {useRouter} from "next/router";
import * as React from "react";
import logo_full from "../../assets/images/logo_new.png";
import logo from "../../assets/images/logo.png";
export default function Logo() {
    const router = useRouter();
    const {width} = useWindowSize();
    const goBackHome = () => {
        router.push("/");
    };
    return (
        <div
            className={`cursor-pointer relative flex ${
                width >= 1024 ? "w-[185px] h-[50px]" : "w-[60px] h-[33px]"
            }`}
            onClick={goBackHome}
        >
            <Image
                src={width >= 1024 ? logo_full : logo}
                alt=""
                layout="fill"
                objectFit="contain"
            />
        </div>
    );
}
