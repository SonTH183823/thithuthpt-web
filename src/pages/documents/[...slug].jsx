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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

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
  const [relatedDoc, setRelatedDoc] = useState([]);
  const [newestDoc, setNewestDoc] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // useEffect(() => {
  //     if (favoritePosts && post.id) {
  //         const p = favoritePosts.find((i) => i.post.id === post.id);
  //         if (p) {
  //             setIsFavorite(true);
  //         }
  //     }
  // }, [favoritePosts]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    (async () => {
      try {
        if (document._id) {
          const {subject} = document; //add filter in here
          const res = await DocumentAPI.getRelatedDocument({
            id: document._id,
            data: {subject}
          });
          if (res) {
            const ftdt = res.filter(item => item._id !== document._id)
            setRelatedDoc(ftdt);
          }
          const res1 = await DocumentAPI.getAllDocument();
          if (res1) {
            const newest = res1.data.filter(item => item._id !== document._id)
            setNewestDoc(newest);
          }
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [router.query]);

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
                  {loading ? <div className={'text-center flex items-center space-x-2 justify-center'}>
                      <FontAwesomeIcon icon={faSpinner} spin={true} className={'w-5'}/>
                      <span>Đang tải tài liệu...</span>
                    </div> :
                    <PDFFile fileLink={document.link}/>}
                </div>
                <RatingComponents/>
                <div className={"bg-base-100 p-4 !pt-1 rounded-xl mt-4"}>
                  <InteractiveContainer postId={document._id}/>
                </div>
              </div>
              <div className="block col-span-1 lg:flex flex-col">
                <div className={"bg-base-100 rounded-xl px-4 sm:mt-0 mt-4"}>
                  <RelatedDocuments type={0} relatedDoc={relatedDoc}/>
                </div>
                <div className={"bg-base-100 rounded-xl px-4 mt-4"}>
                  <RelatedDocuments relatedDoc={newestDoc}/>

                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
}
