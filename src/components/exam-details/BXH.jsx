import React from 'react';
import Avatar from "@/components/user/Avatar";
import gold from "@/assets/images/bxh/gold.png"
import silver from "@/assets/images/bxh/silver.png"
import bronze from "@/assets/images/bxh/bronze.png"
import Image from "next/image";

const listE = [
    {
        name: 'Nguyễn Văn A',
        point: 9,
        time: '48m52'
    },
    {
        name: 'Nguyễn Văn A',
        point: 9,
        time: '48m52'
    },
    {
        name: 'Nguyễn Văn A',
        point: 9,
        time: '48m52'
    },
    {
        name: 'Nguyễn Văn A',
        point: 9,
        time: '48m52'
    },
    {
        name: 'Nguyễn Văn A',
        point: 9,
        time: '48m52'
    },
    {
        name: 'Nguyễn Văn A',
        point: 9,
        time: '48m52'
    },
    {
        name: 'Nguyễn Văn A ',
        point: 9,
        time: '48m52s'
    },
    {
        name: 'Nguyễn Văn A ',
        point: 9,
        time: '48m52s'
    },
    {
        name: 'Nguyễn Văn A ',
        point: 9,
        time: '48m52s'
    },
    {
        name: 'Nguyễn Văn A ',
        point: 9,
        time: '48m52s'
    }
]

function BXH({idExam}) {
    const genCup = (index) => {
        if (index === 1) return <Image src={gold} alt={''} className={'absolute w-3 h-3 left-[-10px]'}/>
        if (index === 2) return <Image src={silver} alt={''} className={'absolute w-3 h-3 left-[-10px]'}/>
        if (index === 3) return <Image src={bronze} alt={''} className={'absolute w-3 h-3 left-[-10px]'}/>
        return <></>
    }
    return (
        <>
            <h3 className="text-lg font-bold !my-2">
                Bảng xếp hạng
            </h3>
            <div className="grid grid-cols-12 gap-2 font-bold">
                <div className="py-2 px-4 col-span-7 ">Tên</div>
                <div className="py-2 col-span-2 text-center">Điểm</div>
                <div className="py-2 col-span-3 text-center">Thời gian</div>
            </div>
            {
                listE.map((item, index) => (
                    <div className="grid grid-cols-12 gap-2 !text-sm">
                        <div className=" py-2 px-2 col-span-7 flex items-center relative cursor-pointer">
                            <Avatar sizeAvatar={'small'} className={'w-8 h-8'}/>
                            {genCup(index + 1)}
                            <span className={'ml-2 line-clamp-1 font-semibold hover:text-primary hover:underline'}>{item.name}</span>
                        </div>
                        <div className=" py-2 col-span-2 text-center">{item.point}</div>
                        <div className=" py-2 col-span-3 text-center">{item.time}</div>
                    </div>
                ))
            }
        </>
    );
}

export default BXH;