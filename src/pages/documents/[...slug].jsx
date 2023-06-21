import InteractiveContainer from "@/components/interactive/InteractiveContainer";
import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import RatingComponents from "@/components/rating/RatingComponents";
import RelatedDocuments from "@/components/documents/RelatedDocuments";
import PDFFile from "@/components/documents/PDFFile";
import DocDetail from "@/components/documents/DocDetail";
import {ExamAPI} from "../../apis/exam";
import {DocumentAPI} from "../../apis/document";

export async function getServerSideProps({params}) {
  let document = {};
  try {
    const id = params.slug[0].split("-").slice(-1);
    document = await DocumentAPI.getDocument(id);
  } catch (e) {
    console.log(e);
  }
  return {
    props: {
      document,
    },
  };
}

export default function DocumentDetail({document}) {
  const profile = useSelector((state) => state.auth.profile);
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(null);
  const dispatch = useDispatch();

  // useEffect(() => {
  //     if (favoritePosts && post.id) {
  //         const p = favoritePosts.find((i) => i.post.id === post.id);
  //         if (p) {
  //             setIsFavorite(true);
  //         }
  //     }
  // }, [favoritePosts]);

  // useEffect(() => {
  //     (async () => {
  //         try {
  //             if (post.id) {
  //                 const { province, district, ward, category, tradingForm } = post;
  //                 const res = await PostAPI.getRelatedPost({
  //                     id: post.id,
  //                     data: { province, district, category, tradingForm },
  //                 });
  //                 if (res) {
  //                     setRelatedPosts(res.relatedPosts);
  //                 }
  //             }
  //         } catch (e) {
  //             console.log(e);
  //         }
  //     })();
  // }, []);

  return (
    <Fragment>
      {document._id ? (
        <div className={"bg-base-200"}>
          <div className="container mx-auto py-2 sm:py-4 padding-mobile">
            <div className="lg:grid grid-cols-3 lg:space-x-4">
              <div className="col-span-2 relative">
                <div className={"bg-base-100 rounded-xl md:p-4 p-3"}>
                  <DocDetail item={document}/>
                </div>
                <div className={"bg-base-100 md:p-4 p-3 rounded-xl mt-4"}>
                  <PDFFile fileLink={document.link}/>
                </div>
                <RatingComponents/>
                <div className={"bg-base-100 p-4 !pt-1 rounded-xl mt-4"}>
                  <InteractiveContainer postId={document._id}/>
                </div>
              </div>
              <div className="block col-span-1 lg:flex flex-col">
                <div className={"bg-base-100 rounded-xl px-4 sm:mt-0 mt-4"}>
                  <RelatedDocuments idDoc={12}/>
                </div>
                <div className={"bg-base-100 rounded-xl px-4 mt-4"}>
                  <RelatedDocuments idDoc={12} type={0}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
}
