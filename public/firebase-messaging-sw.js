
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');


firebase.initializeApp({
    apiKey: "AIzaSyDamkmq9KcCMY6TC0aqL_QHH3BPnDh_RxU",
    authDomain: "pgproject-f1050.firebaseapp.com",
    projectId: "pgproject-f1050",
    storageBucket: "pgproject-f1050.appspot.com",
    messagingSenderId: "625020363881",
    appId: "1:625020363881:web:e92ef60579392ded86eef8",
    measurementId: "G-0338E6VL64"
  });
  
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon:  payload.notification.image, 
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });