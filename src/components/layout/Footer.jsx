import * as React from "react";
import TitleWithUnderLine from "../common/TitleWithUnderline";
import youtube from "@/assets/images/social/youtube.svg";
import facebook from "@/assets/images/social/facebook.svg";
import instagram from "@/assets/images/social/instagram.svg";
import twitter from "@/assets/images/social/twitter.svg";
import Image from "next/image";
import {useRouter} from "next/router";

export default function Footer() {
  const router = useRouter();
  const about = [
    {id: 1, title: "Về chúng tôi", path: "/about"},
    {id: 4, title: "Blog", path: `/blog`},
  ];
  const news = [
    {id: 1, title: "Tin 1", path: "/about"},
    {id: 4, title: "Tin 2", path: `/blog`},
  ];
  const services = [
    {
      id: 1,
      title: "Toán Học",
      path: "/filter?subject=1",
    },
    {
      id: 2,
      title: "Vật Lý",
      path: "/filter?subject=2",
    },
    {
      id: 3,
      title: "Hóa Học",
      path: "/filter?subject=3",
    },
    {
      id: 4,
      title: "Sinh Học",
      path: "/filter?subject=4",
    },
    {
      id: 5,
      title: "Tiếng Anh",
      path: "/filter?subject=5",
    },
    {
      id: 6,
      title: "Lịch sử",
      path: "/filter?subject=6",
    },
    {
      id: 7,
      title: "Địa Lý",
      path: "/filter?subject=7",
    },
    {
      id: 8,
      title: "GDCD",
      path: "/filter?subject=8",
    },
  ];

  const handleClick = (item) => {
    router.push(item.path);
  };
  return (
    <div className="bg-[#212121] lg:py-8 py-4 padding-mobile relative bottom-0">
      <div className="container mx-auto text-white px-6 md:px-4 sm:px-4">
        <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 lg:space-x-6 mb-8">
          <div>
            <TitleWithUnderLine title="Thi ngay"/>
            <ul className={"my-4"}>
              {services.map((item) => (
                <li
                  key={item.id}
                  className={"mb-4 cursor-pointer text-backgroundGray hover:underline hover:text-primary"}
                  onClick={() => handleClick(item)}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <TitleWithUnderLine title="Tài liệu ôn tập"/>
            <ul className={"my-4"}>
              {about.map((item) => (
                <li
                  className={"mb-4 cursor-pointer text-backgroundGray hover:underline hover:text-primary w-fit"}
                  key={item.id}
                  onClick={() => handleClick(item)}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <TitleWithUnderLine title="Tin tức"/>
            <ul className={"my-4"}>
              {news.map((item) => (
                <li
                  className={"mb-4 cursor-pointer text-backgroundGray hover:underline hover:text-primary"}
                  key={item.id}
                  onClick={() => handleClick(item)}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div>
              <TitleWithUnderLine title="Theo dõi chúng tôi"/>
              <ul className={"flex items-center space-x-4 my-4 text-3xl"}>
                <li className={"cursor-pointer"}>
                  <Image
                    src={facebook}
                    width={32}
                    height={32}
                    alt={"facebook-icon"}
                  />
                </li>
                <li className={"cursor-pointer"}>
                  <Image
                    src={youtube}
                    width={32}
                    height={32}
                    alt={"youtube-icon"}
                  />
                </li>
                <li className={"cursor-pointer"}>
                  <Image
                    src={instagram}
                    width={32}
                    height={32}
                    alt={"insta-icon"}
                  />
                </li>
                <li className={"cursor-pointer"}>
                  <Image
                    src={twitter}
                    width={32}
                    height={32}
                    alt={"twitter-icon"}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="my-8">
          <p className="text-justify leading-8 text-[#e4e6eb]">
            Thi trắc nghiệm online với hàng ngàn đề thi, ngân hàng câu hỏi phong phú đa dạng trên nhiều lĩnh
            vực
          </p>
        </div>
        <div className="h-[2px] w-full bg-primary my-8"></div>
        <div className="text-center lg:pb-0 pb-4">
          <span>
            Bản quyền © 2022{" "}
            <span className="font-bold text-primary uppercase">
              thithuthpt.online
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
