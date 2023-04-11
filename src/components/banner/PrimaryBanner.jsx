import React, {useEffect, useState} from "react";
import banner1 from "@/assets/images/banner/1.png";
import banner2 from "@/assets/images/banner/2.png";
import banner3 from "@/assets/images/banner/3.png";
import Banner from "./Banner";
// import { bannerAPI } from "apis/banner";
const PrimaryBanner = () => {
    const [banners, setBanners] = useState([banner1, banner2, banner3]);

    useEffect(() => {
        // (async () => {
        //   try {
        //     const res = await bannerAPI.getBannerByScreen({
        //       offset: 0,
        //       limit: 20,
        //       screenId: 1,
        //       status: 1
        //     });
        //     if (res.banners) {
        //       setBanners(res.banners);
        //     }
        //   } catch (e) {
        //     console.log(e);
        //   }
        // })();
    }, []);
    return (
        <Banner
            banners={banners}
            navigation={false}
            heightImageItem={"lg:h-[500px] h-[300px]"}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
        />
    );
};

export default PrimaryBanner;
