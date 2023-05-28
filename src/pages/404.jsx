import Image from "next/image";
import Link from "next/link";
import not_found from "@/assets/images/404.jpg";
import React from "react";
import LayoutEmpty from "@/components/layout/LayoutEmpty";

export default function FourOhFour() {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-white">
      <div className="md:w-[750px] w-[350px] md:h-[495px] h-[200px]">
        <Image
          alt="img-404"
          src={not_found}
          className={"object-cover"}
        />
      </div>
      <div
        className="mt-4 md:mt-8 flex items-center justify-center text-white rounded-lg p-2 px-4 cursor-pointer bg-primary">
        <Link href={"/"}>
          <span className="text-xl font-bold ">Về trang chủ</span>
        </Link>
      </div>
    </div>
  );
}
FourOhFour.Layout = LayoutEmpty;
