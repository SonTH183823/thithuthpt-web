import React from 'react';
import FeatureSection from "@/components/filter/FilterSection";
import Image from "next/image";
import search from '@/assets/images/search-banner.jpg'

function SearchSection(props) {
    return (
        <div className={'bg-white w-full'}>
            <div className="container mx-auto padding-mobile grid grid-cols-2">
                <div className={'w-full p-12 aspect-square'}>
                    <Image src={search} alt={''} className={'object-cover w-full h-full'} layout={'fit'} />
                </div>
                <div className={'flex-1 my-auto px-4'}>
                    <div className={'font-bold text-2xl'}>Ngân hàng đề thi trắc nghiệm online, tuyển tập bài giảng, bài học trực tuyến.</div>
                    <FeatureSection/>
                </div>
            </div>
        </div>
    );
}

export default SearchSection;
