// import { bannerAPI } from "apis/banner";
import useWindowSize from "hooks/useWindowSize";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const BannerSection = () => {
  const [banners, setBanners] = useState([{
    url: 'https://img.freepik.com/photos-gratuite/plantes-romarin-dans-nature_1150-35514.jpg?w=1480&t=st=1682144634~exp=1682145234~hmac=0cd8a09ff0701bf4ea075e1509326dd77e8b8f460006473e002d8b678310375d',
    urlMobile: 'https://img.freepik.com/photos-gratuite/plantes-romarin-dans-nature_1150-35514.jpg?w=1480&t=st=1682144634~exp=1682145234~hmac=0cd8a09ff0701bf4ea075e1509326dd77e8b8f460006473e002d8b678310375d',
    urlTablet: 'https://img.freepik.com/photos-gratuite/plantes-romarin-dans-nature_1150-35514.jpg?w=1480&t=st=1682144634~exp=1682145234~hmac=0cd8a09ff0701bf4ea075e1509326dd77e8b8f460006473e002d8b678310375d',
  }]);
  const { width } = useWindowSize();
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
