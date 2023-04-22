import Image from "next/image";
import logo from "@/assets/images/logo.png";
import {useEffect, useState} from "react";
// import { IntroductionAPI } from "apis/introduction";
export default function About() {
    const [intro, setIntro] = useState('giới thiệu');
    useEffect(() => {
        (async () => {
            try {
                // const res = await IntroductionAPI.getIntroduction();
                // if (res) {
                //   setIntro(res.intro);
                // }
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);
    return (
        <div className={"max-w-[1000px] mx-auto padding-mobile"}>
            <div className={"flex flex-col justify-center items-center mt-8"}>
                <div className={"relative w-[280px] h-[80PX]"}>
                    <Image
                        src={logo}
                        alt={"logo without icon"}
                        layout={"fill"}
                        className={"object-contain"}
                    />
                </div>
                <h2 className={"text-center my-8"}>Về <span className={'text-primary'}>THITHUTHPT</span></h2>
                <div
                    className={"pb-8"}
                    dangerouslySetInnerHTML={{__html: intro}}
                ></div>
            </div>
        </div>
    );
}
