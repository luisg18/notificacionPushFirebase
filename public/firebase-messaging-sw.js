importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js"); //firebase-app-compat.js
importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js"); //firebase-messaging-compat.js

const firebaseConfig = {
  apiKey: "AIzaSyASJBzsUmzEJK-7spzR3Up0GodgcX3FiNo",
  authDomain: "notificacioneshup.firebaseapp.com",
  projectId: "notificacioneshup",
  storageBucket: "notificacioneshup.appspot.com",
  messagingSenderId: "1012811821170",
  appId: "1:1012811821170:web:fd3d3dc80bad6adf4212eb",
  measurementId: "G-40B5LWEC0E"
};


const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

//Qué hacer en caso de que la aplicación esté cerrada
messaging.onBackgroundMessage(async payload => {
  console.log("Recibiste mensaje mientras estabas ausente11 ");
  const audioUrl = payload.notification.body;
  console.log("audio mientras estabas ausente: ",audioUrl);
  // Esperamos 2 segundos antes de reproducir el audio

  //previo a mostrar notificación
  const notificationTitle = payload.notification.body;
  const notificationOptions = {
    body : payload.notification.body,
    icon: "./logoDcyticHup.png"
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});