
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyDamkmq9KcCMY6TC0aqL_QHH3BPnDh_RxU",
    authDomain: "pgproject-f1050.firebaseapp.com",
    projectId: "pgproject-f1050",
    storageBucket: "pgproject-f1050.appspot.com",
    messagingSenderId: "625020363881",
    appId: "1:625020363881:web:e92ef60579392ded86eef8",
    measurementId: "G-0338E6VL64"
  }
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
//   console.log(permission,"222222222222");
if (permission === "granted"){
    const token = await getToken(messaging,{
        vapidKey :
        "BD5ASHCxOXLfxDWpXLkJAGVsCmyNkR0B-ZxKOgf3DT5hhDD10GBYoUZMEAeTo9X_7s2fN8dgtoGNHYcbMo3RtXk"
    })
    // console.log(token,"22222222222222");
}
};

export default firebaseConfig;
