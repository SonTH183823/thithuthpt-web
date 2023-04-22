// import {NewCategoryAPI} from "apis/new-category";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {strToSlug} from "utils/common";

const NewCategorySection = ({categories}) => {
    const categoriess = [
        'Giáo dục',
        'Tuyển sinh',
        'Kiến thức',
        'Toeic',
        'Tổng hợp',
    ]
    const router = useRouter();
    const handleClickCategory = (item) => {
        const slug = strToSlug(item);
        // router.replace(`/blog/${slug}-${item.id}`);
        router.replace(`/blog/${slug}`);
    };
    return (
        <div className="bg-backgroundPrimary py-4 flex items-center justify-center space-x-10">
            {categoriess &&
                categoriess.map((item, index) => (
                    <span
                        className="font-bold cursor-pointer hover:text-primary"
                        key={index}
                        onClick={() => handleClickCategory(item)}
                    >
            {item}
          </span>
                ))}
        </div>
    );
};

export default NewCategorySection;
