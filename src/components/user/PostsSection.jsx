// import { PostAPI } from "apis/post";
import React, {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PrimaryPostItem from "../exam/PrimaryExamItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

const PostsSection = ({userId}) => {
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [posts, setPosts] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    // (async () => {
    //   if (userId) {
    //     try {
    //       const res = await PostAPI.getPostsByUser({
    //         userId,
    //         offset: offset,
    //         limit,
    //         isActive: 1,
    //         status: 1,
    //       });
    //       if (res.total) {
    //         setPosts(res.posts);
    //         setTotal(res.total);
    //         if (res.posts.length === res.total) {
    //           setHasMore(false);
    //         }
    //       } else {
    //         setHasMore(false);
    //       }
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   }
    // })();
  }, [userId]);

  const getMorePost = async () => {
    try {
      // const res = await PostAPI.getPostsByUser(offset + limit);
      // setOffset(offset + limit);
      // if (res.posts.length) {
      //   setNotifications([...posts, ...res.posts]);
      // } else {
      //   setHasMore(false);
      // }
    } catch (e) {
      setHasMore(false);
    }
  };
  return (
    <InfiniteScroll
      dataLength={getMorePost}
      next={getMorePost}
      hasMore={hasMore}
      endMessage={
        <div className="text-sm font-normal text-center mt-4">
          Đã tải hết.
        </div>
      }
      loader={
        <div className={'text-center flex items-center space-x-2 justify-center'}>
          <FontAwesomeIcon icon={faSpinner} spin={true} className={'w-5'}/>
          <span>Đang tải...</span>
        </div>}
    >
      {posts.length > 0 &&
        posts.map((item) => <PrimaryPostItem post={item} key={item.id}/>)}
    </InfiniteScroll>
  );
};

export default PostsSection;
