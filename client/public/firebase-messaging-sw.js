importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyABwoy-dHhHneEx337pxuLST2U4f7Tt2wY",
  authDomain: "traveldekho-fa917.firebaseapp.com",
  projectId: "traveldekho-fa917",
  storageBucket: "traveldekho-fa917.firebasestorage.app",
  messagingSenderId: "342824864189",
  appId: "1:342824864189:web:c0dc6872d69b9779ed6ad4",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/icons/icon-192x192.png',
  });
});
