import Image from "next/image";
import Link from "next/link";
import not_found from "@/assets/images/404.jpg";
import LayoutWithoutHeader from "@/components/layout/LayoutWithoutHeader";
import React from "react";
export default function FourOhFour() {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-white">
      <div className="w-[750px] h-[495px] relative">
        <Image
          alt="img-404"
          src={not_found}
          layout={"fill"}
          className={"object-cover"}
        />
      </div>
      <div>
          <Link href={"/"}
              className="mt-4 flex items-center justify-center gap-x-2 text-primary hover:text-white rounded-lg p-2 px-4 cursor-pointer bg-backgroundPrimary hover:bg-primary"
          >
              <span className="text-xl font-bold ">Về trang chủ</span>
          </Link>
      </div>
    </div>
  );
}
FourOhFour.Layout = LayoutWithoutHeader;
