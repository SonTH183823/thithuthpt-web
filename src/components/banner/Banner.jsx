import useWindowSize from "hooks/useWindowSize";
import Image from "next/image";
import * as React from "react";
import {Autoplay, Navigation, Pagination} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
export default function Banner({
                                   banners,
                                   navigation = true,
                                   autoplay = false,
                                   heightImageItem,
                               }) {
    const {width} = useWindowSize();
    console.log(banners)
    return (
        <section className="flex items-center justify-center">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={autoplay}
                navigation={navigation}
                loop={true}
                loopFillGroupWithBlank={true}
                modules={[Autoplay, Pagination, Navigation]}
                className={"dot-white"}
            >
                {banners.length > 0 &&
                    banners.map((item, index) => (
                        <SwiperSlide key={index + 'banner-home'}>
                            <div className={`w-full relative overflow-hidden ${heightImageItem}`}>
                                {width <= 640 ? (
                                    <Image
                                        alt=""
                                        src={item}
                                        layout={"fill"}
                                        className={"object-cover w-full h-full"}
                                    />
                                ) : (
                                    <Image
                                        alt=""
                                        src={item}
                                        layout={"fill"}
                                        className={"object-cover w-full h-full"}
                                    />
                                )}

                                {width > 768 && (
                                    <Image
                                        alt=""
                                        src={item}
                                        layout={"fill"}
                                        className={"object-cover w-full h-full"}
                                    />
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </section>
    );
}
