// import messaging from '@react-native-firebase/messaging';

// export const requestUserPermission = async () => {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('Authorization status:', authStatus);
//     getFcmToken();
//   }
// };

// export const getFcmToken = async () => {
//   const fcmToken = await messaging().getToken();
//   if (fcmToken) {
//     console.log('FCM Token:', fcmToken);
//   } else {
//     console.log('Failed to get FCM token');
//   }
// };

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyAa8IzUr2DbSVxjZkSFBa48b7QhaoRsnCs",
  authDomain: "mila-25c3c.firebaseapp.com",
  projectId: "mila-25c3c",
  storageBucket: "mila-25c3c.firebasestorage.app",
  messagingSenderId: "732661654768",
  appId: "1:732661654768:web:2223f1d807c07981804e35",
  measurementId: "G-XFC89D1HW9"
};

// ✅ Initialize app only once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
