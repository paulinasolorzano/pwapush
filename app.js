import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js";

// Configuración de Firebase
const firebaseConfig = {
   apiKey: "AIzaSyBwg5-Bd7EvU5Swte97Jxt0C2vGqvLfaBQ",
   authDomain: "pushnotifications-e47f7.firebaseapp.com",
   projectId: "pushnotifications-e47f7",
   storageBucket: "pushnotifications-e47f7.firebasestorage.app",
   messagingSenderId: "936129767723",
   appId: "1:936129767723:web:09086d7035e49b465e3d6e",
   measurementId: "G-RW5BN4FDHW"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Registrar el Service Worker para la PWA y las notificaciones
if ('serviceWorker' in navigator) {
   navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then((registration) => {
         console.log("Service Worker registrado:", registration);
      })
      .catch((error) => {
         console.log("Error al registrar Service Worker:", error);
      });
}

// Función para solicitar permiso de notificación y obtener token
function subscribeToNotifications() {
   Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
         getToken(messaging, { vapidKey: "TU_VAPID_KEY" })
            .then((currentToken) => {
               if (currentToken) {
                  console.log("Token obtenido:", currentToken);
                  // Aquí envías el token a tu servidor para almacenar la suscripción
               } else {
                  console.log("No se obtuvo ningún token");
               }
            })
            .catch((err) => {
               console.log("Error al obtener token", err);
            });
      } else {
         console.log("Permiso para notificaciones denegado");
      }
   });
}

// Evento al hacer clic en el botón de suscripción
document.getElementById("notifyBtn").addEventListener("click", subscribeToNotifications);

// Escuchar mensajes en primer plano
onMessage(messaging, (payload) => {
   console.log("Notificación recibida en primer plano:", payload);
   // Aquí puedes mostrar la notificación en la interfaz
});
