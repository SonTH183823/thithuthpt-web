import '../styles/globals.scss'
import {Fragment, useEffect} from "react";
import Head from "next/head";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "react-input-range/lib/css/index.css";
import MainLayout from "@/components/layout/MainLayout";
import {wrapper} from "../store/configStore";
import {requestPermission} from "../configs/firebaseConfig";
import {ToastContainer} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {getToken} from "../utils/auth";
import {userAPI} from "../apis/user";
import {authUpdateProfile} from "../store/auth/auth-slice";
import {PostAPI} from "../apis/post";
import {updateFavoritePosts} from "../store/post/post-slice";
import "react-toastify/dist/ReactToastify.css";
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
          const res = await PostAPI.getFavoritePosts();
          if (res) {
            dispatch(updateFavoritePosts(res.favoritePosts));
          }
        } catch (e) {
          console.log(e);
        }
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const fcmToken = await requestPermission();
      if (fcmToken) {
        localStorage.setItem("fcmToken", fcmToken);
      }
    })();
  }, []);
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
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Fragment>
    </Layout>
  )
}

export default wrapper.withRedux(App);
