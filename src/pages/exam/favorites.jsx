import React from "react";
import {useSelector} from "react-redux";
import HomeExamItem from "@/components/exam/HomeExamItem";

const Favorites = () => {
    // const favoritePosts = useSelector((state) => state.post.favoritePosts);
    const favoritePosts = [1, 2, 3, 4, 5]
    return (
        <div className="container mx-auto py-8 padding-mobile">
            <h3>Danh sách đề thi yêu thích</h3>
            {favoritePosts?.length ? (
                <div className="md:grid xl:grid-cols-3 md:grid-cols-2 lg:gap-3 gap-1">
                    {favoritePosts.map((item) => (
                        <HomeExamItem
                            key={item}
                            item={item}
                            user={{}}
                        />
                    ))}
                </div>
            ) : (
                <div className="py-8 text-center">
                    Hiện tại, không có tin yêu thích.
                </div>
            )}
        </div>
    );
};

export default Favorites;
