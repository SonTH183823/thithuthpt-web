import Image from "next/image";
import {useRouter} from "next/router";
import React from "react";
import {strToSlug} from "utils/common";
import {formatDate} from "../../utils/moment";

const LatestNew = ({item1}) => {
    const router = useRouter();
    const item = {
        id: 111,
        title: 'Bùng nổ nhu cầu AI, vốn hóa thị trường NVIDIA tăng gần gấp đôi sau 4 tháng',
        createdAt: new Date(),
        thumbnail: 'https://img.freepik.com/photos-gratuite/plantes-romarin-dans-nature_1150-35514.jpg?w=1480&t=st=1682144634~exp=1682145234~hmac=0cd8a09ff0701bf4ea075e1509326dd77e8b8f460006473e002d8b678310375d',
    }
    const handleDetail = () => {
        const slug = strToSlug(item.title);
        router.push(`/news/${slug}-${item.id}`);
    };
    return (
        <div
            className="flex items-start space-x-3 cursor-pointer w-full"
            onClick={handleDetail}
        >
            <div className="relative w-[130px] h-[74px]">
                <Image
                    alt="thumbnail"
                    src={item.thumbnail}
                    layout={"fill"}
                    objectFit={"cover"}
                    className={"rounded-lg w-full"}
                />
            </div>
            <div className={'flex-1'}>
                <span className="font-bold text-sm line-clamp-2 flex-1 hover:text-primary">{item.title}</span>
                <span className="text-sm block">{formatDate(item.createdAt)}</span>
            </div>

        </div>
    );
};

export default LatestNew;
