
//importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
//importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Configuración de Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBwg5-Bd7EvU5Swte97Jxt0C2vGqvLfaBQ",
    authDomain: "pushnotifications-e47f7.firebaseapp.com",
    projectId: "pushnotifications-e47f7",
    storageBucket: "pushnotifications-e47f7.firebasestorage.app",
    messagingSenderId: "936129767723",
    appId: "1:936129767723:web:09086d7035e49b465e3d6e",
    measurementId: "G-RW5BN4FDHW"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
   console.log("Notificación recibida en segundo plano:", payload);
   self.registration.showNotification(payload.notification.title, {
      body: payload.notification.body,
   });
});
