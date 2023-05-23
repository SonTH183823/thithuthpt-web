import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD3SDeH_zSAsj_-065e-CfQO3FkK2aFZAE",
  authDomain: "thi-thu-thpt.firebaseapp.com",
  projectId: "thi-thu-thpt",
  storageBucket: "thi-thu-thpt.appspot.com",
  messagingSenderId: "43518708770",
  appId: "1:43518708770:web:c1b2bcc6732e2007490e7b",
  measurementId: "G-LZGDW134D3"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export async function requestPermission() {
  try {
    const permission = await Notification.requestPermission();
    const messaging = getMessaging(app);
    if (permission && permission === "granted") {
      const fcmToken = await getToken(messaging, {
        vapidKey:
          "BGLzc1HyoLoEhiKDk68XWlcUVr1i_F-4upQmMjIHqo_shWvBnAvHL517rWgHQ0vN5g2vWtOeqUVibC04ZKZE78I",
      });
      if (fcmToken) {
        return fcmToken;
      }
    }
  } catch (e) {
    console.log(e);
    return null;
  }
}
