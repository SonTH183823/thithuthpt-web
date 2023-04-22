import React from "react";
import Image from "next/image";
import {formatDate} from "utils/moment";
import {useRouter} from "next/router";
import {strToSlug} from "utils/common";

const PrimayNewItem = ({primary = false, item1}) => {
    const item = {
        title: 'Bùng nổ nhu cầu AI, vốn hóa thị trường NVIDIA tăng gần gấp đôi sau 4 tháng',
        createdAt: new Date(),
        id: 123,
        thumbnail: 'https://img.freepik.com/photos-gratuite/plantes-romarin-dans-nature_1150-35514.jpg?w=1480&t=st=1682144634~exp=1682145234~hmac=0cd8a09ff0701bf4ea075e1509326dd77e8b8f460006473e002d8b678310375d',
        description: 'Chỉ sau 4 tháng kể từ đầu năm 2023, vốn hóa thị trường của NVIDIA đã tăng chóng mặt, tất cả là nhờ bùng nổ nhu cầu về AI. Ở thời điểm bài viết, vốn hóa thị trường NVIDIA là 666.67 tỉ USD, mức tăng 83.06% so với đầu năm, trong khi đó đỉnh điểm là 1/4/2023, vốn hóa đạt mức 692.2 tỉ USD, tương ứng tăng 90.07% so với mốc 364.18 tỉ USD vào ngày cuối cùng năm 2022.'
    }
    const router = useRouter();
    const handleDetail = () => {
        const slug = strToSlug(item.title);
        router.push(`/new/${slug}-${item.id}`);
    };
    return (
        <div
            onClick={handleDetail}
            className={` cursor-pointer ${
                primary
                    ? "lg:h-[408px] md:h-[350px] h-[250px]"
                    : "lg:h-[196px] md:h-[200px] h-[120px]"
            } relative`}
        >
            <Image alt="" src={item.thumbnail} layout={"fill"} objectFit={"cover"}/>
            <div className="absolute bottom-0 flex flex-col space-y-1 md:p-4 p-2 bg-info text-white left-0 right-0">
        <span className="text-sm md:block hidden">
          {formatDate(item.createdAt)}
        </span>
                <span className="font-bold lg:text-xl line-clamp-2 text-sm hover:underline">
          {item.title}
        </span>
                <div className="md:block hidden">
                    {primary && (
                        <p className="line-clamp-2 text-sm md:block hidden">
                            {item.description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PrimayNewItem;
