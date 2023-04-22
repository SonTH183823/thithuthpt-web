import Image from "next/image";
import React from "react";
import {useRouter} from "next/router";
import {strToSlug} from "utils/common";
import {formatDate} from "utils/moment";

export default function NewHomeItem({item1}) {
    const router = useRouter();
    const item = {
        title: 'Bùng nổ nhu cầu AI, vốn hóa thị trường NVIDIA tăng gần gấp đôi sau 4 tháng',
        createdAt: new Date(),
        id: 123,
        category: {
            name: 'Tinh tế'
        },
        thumbnail: 'https://img.freepik.com/photos-gratuite/plantes-romarin-dans-nature_1150-35514.jpg?w=1480&t=st=1682144634~exp=1682145234~hmac=0cd8a09ff0701bf4ea075e1509326dd77e8b8f460006473e002d8b678310375d',
        description: 'Chỉ sau 4 tháng kể từ đầu năm 2023, vốn hóa thị trường của NVIDIA đã tăng chóng mặt, tất cả là nhờ bùng nổ nhu cầu về AI. Ở thời điểm bài viết, vốn hóa thị trường NVIDIA là 666.67 tỉ USD, mức tăng 83.06% so với đầu năm, trong khi đó đỉnh điểm là 1/4/2023, vốn hóa đạt mức 692.2 tỉ USD, tương ứng tăng 90.07% so với mốc 364.18 tỉ USD vào ngày cuối cùng năm 2022.'
    }
    const handleClick = () => {
        const slug = strToSlug(item.title);
        router.push(`/news/${slug}-${item.id}`);
    };
    return (
        <div
            className="md:grid grid-cols-3 lg:space-x-5 md:space-x-3 lg:py-4 pb-4 cursor-pointer"
            onClick={handleClick}
        >
            <div className={`relative lg:h-[150px] md:h-[120px] h-[180px] `}>
                <Image
                    alt={item.title}
                    src={item.thumbnail}
                    placeholder={"blur"}
                    blurDataURL={item.thumbnail}
                    layout={"fill"}
                    className={"rounded-lg"}
                    objectFit={"cover"}
                />
                <div className="absolute right-1.5 bottom-1.5 text-white bg-primary rounded-md p-1 text-xs">
                    <div className="max-w-[200px] line-clamp-1">{item.category.name}</div>
                </div>
            </div>
            <div className="col-span-2 my-2 md:my-0">
                <div className="text-sm mb-1">{formatDate(item.createdAt)}</div>
                <h2 className="m-0 text-info lg:text-xl text-[16px] line-clamp-2 hover:text-primary">
                    {item.title}
                </h2>
                <p className="leading-6 text-sm line-clamp-2">{item.description}</p>
            </div>
        </div>
    );
}
