import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {ExamAPI} from "../../../apis/exam";
import {DocumentAPI} from "../../../apis/document";

function HomeDocumentList(props) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const res = await DocumentAPI.filterDocument({perPage: 4})
        setPosts(res.data)
        setLoading(false)
      } catch (e) {
        setLoading(false)
        console.log(e)
      }
    })()
  }, [])
  return (
    <div></div>
  );
}

export default HomeDocumentList;
