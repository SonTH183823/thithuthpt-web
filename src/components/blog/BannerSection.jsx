// import { bannerAPI } from "apis/banner";
import useWindowSize from "hooks/useWindowSize";
import Image from "next/image";
import React, {useEffect, useState} from "react";

const BannerSection = () => {
  const [banners, setBanners] = useState([{
    url: 'https://img.freepik.com/free-psd/earth-day-template-design_23-2150192868.jpg?w=1800&t=st=1686393133~exp=1686393733~hmac=92cddf2cb027d6a47c0350d7f8b247abbada02086f9531e88725a3824d72a72a',
    urlMobile: 'https://img.freepik.com/free-psd/earth-day-template-design_23-2150192868.jpg?w=1800&t=st=1686393133~exp=1686393733~hmac=92cddf2cb027d6a47c0350d7f8b247abbada02086f9531e88725a3824d72a72a',
    urlTablet: 'https://img.freepik.com/free-psd/earth-day-template-design_23-2150192868.jpg?w=1800&t=st=1686393133~exp=1686393733~hmac=92cddf2cb027d6a47c0350d7f8b247abbada02086f9531e88725a3824d72a72a',
  }]);
  const {width} = useWindowSize();
  useEffect(() => {
    (async () => {
      try {
        // const res = await bannerAPI.getBannerByScreen({
        //   offset: 0,
        //   limit: 20,
        //   screenId: 3,
        //   status: 1
        // });
        // if (res.banners) {
        //   setBanners(res.banners);
        // }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <div>
      {banners[0] && (
        <div className="md:h-[350px] h-[200px] w-full relative">
          {width <= 640 ? (
            <Image
              alt=""
              src={banners[0].urlMobile}
              layout={"fill"}
              objectFit={"cover"}
            />
          ) : (
            <Image
              alt=""
              src={banners[0].urlTablet}
              layout={"fill"}
              objectFit={"cover"}
            />
          )}
          {width > 768 && (
            <Image
              alt=""
              src={banners[0].url}
              layout={"fill"}
              objectFit={"cover"}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default BannerSection;
