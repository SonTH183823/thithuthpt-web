import {useRouter} from "next/router";
import React from "react";
import {strToSlug} from "utils/common";

const NewCategorySection = ({categories}) => {
  const router = useRouter();
  const handleClickCategory = (item) => {
    const slug = strToSlug(item.name);
    router.replace(`/blog/${slug}-${item._id}`);
  };
  return (
    <div className="bg-backgroundPrimary py-4 flex items-center justify-center space-x-10">
      {categories &&
        categories.map((item, index) => (
          <span
            className="font-bold cursor-pointer hover:text-primary"
            key={index}
            onClick={() => handleClickCategory(item)}
          >
            {item.name}
          </span>
        ))}
    </div>
  );
};

export default NewCategorySection;
