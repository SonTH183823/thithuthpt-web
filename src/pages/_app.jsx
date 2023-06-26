import '../styles/globals.scss'
import {Fragment, useEffect} from "react";
import Head from "next/head";
import MainLayout from "@/components/layout/MainLayout";
import {wrapper} from "../store/configStore";
import {requestPermission} from "../configs/firebaseConfig";
import {ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {getToken, removeToken} from "../utils/auth";
import {userAPI} from "../apis/user";
import {authUpdateProfile} from "../store/auth/auth-slice";
import {updateFavoritePosts} from "../store/post/post-slice";
import {authAPI} from "../apis/auth";
import {useRouter} from "next/router";
import {ExamAPI} from "../apis/exam/index";
import {updateFavoriteExams} from "../store/exam/exam-slice";
import "react-toastify/dist/ReactToastify.css";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "react-input-range/lib/css/index.css";
import 'react-best-tabs/dist/index.css';
import 'react-image-lightbox/style.css';
import "swiper/css";
import "swiper/css/pagination";
import "react-image-lightbox/style.css";
import "swiper/css/navigation";
import "react-input-range/lib/css/index.css";
import "react-tooltip/dist/react-tooltip.css";
import "reactjs-popup/dist/index.css";
import "swiper/css/pagination";
import "../styles/globals.scss";
import "@fortawesome/fontawesome-svg-core/styles.css"

function App({Component, pageProps}) {
  const Layout = Component.Layout ?? MainLayout;
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);
  useEffect(() => {
    (async () => {
      const {accessToken} = getToken();
      if (accessToken) {
        try {
          const profileData = await userAPI.getProfile();
          if (profileData) {
            dispatch(authUpdateProfile({...profileData}));
          }
        } catch (e) {
          console.log(e);
        }
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (profile._id) {
        const res = await ExamAPI.getFavoriteExams({userId: profile._id});
        if (res) {
          dispatch(updateFavoriteExams(res.data));
        }
      }
    })()
  }, [profile])
  useEffect(() => {
    (async () => {
      const fcmToken = await requestPermission();
      console.log('fcmToken', fcmToken)
      if (fcmToken) {
        localStorage.setItem("fcmToken", fcmToken);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (profile._id) {
        if (profile.isLocked) {
          const res = await authAPI.logout();
          if (res.ok) {
            dispatch(authUpdateProfile({}));
            removeToken();
          }
          const modal = document.getElementById("modal-lock-account");
          if (modal) {
            modal.click();
          }
          // router.replace("/sign-in");
        }
      }
    })();
  }, [profile]);
  return (
    <Layout>
      <Fragment>
        <Head>
          <meta name="title" content="Thi thử THPT" property="og:title"/>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
          />
          <link rel="icon" href="/icon1.png"/>
          <title>Thi thử THPT</title>
        </Head>
        <Component {...pageProps} />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          theme="colored"
        />
      </Fragment>
    </Layout>
  )
}

export default wrapper.withRedux(App);
