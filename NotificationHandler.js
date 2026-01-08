// import React, { useEffect } from 'react';
// import messaging from '@react-native-firebase/messaging';
// import notifee, { AndroidImportance } from '@notifee/react-native';
// import { Platform } from 'react-native';
 
// const NotificationHandler = () => {
 
//   useEffect(() => {
//     const requestPermission = async () => {
//       const authStatus = await messaging().requestPermission();
//       const enabled =
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL;
 
//       if (enabled) {
//         console.log('✅ Notification permission granted');

//         // iOS: Register + foreground banner settings
//         if (Platform.OS === 'ios') {
//           await messaging().registerDeviceForRemoteMessages();
//           await messaging().setAutoInitEnabled(true);
 
//           await messaging().setForegroundNotificationPresentationOptions({
//             alert: true,
//             badge: true,
//             sound: true,
//           });
 
//           const apnsToken = await messaging().getAPNSToken();
//           if (apnsToken) {
//             console.log('🍏 APNs Token:', apnsToken);
//           }
//         }
 
//         // Common: Get FCM Token
//         const fcmToken = await messaging().getToken();
//         console.log('📲 FCM Token:', fcmToken);
//       }
//     };
 
//     requestPermission();
//   }, []);
 
//   // Android channel
//   useEffect(() => {
//     if (Platform.OS === 'android') {
//       notifee.createChannel({
//         id: 'Stelia.channel',
//         name: 'Stelia Channel',
//         importance: AndroidImportance.HIGH,
//       }).then(() => {
//         console.log('✅ Notifee channel created');
//       });
//     }
//   }, []);
 
//   // Foreground FCM messages
//   useEffect(() => {
//     const unsubscribe = messaging().onMessage(async (remoteMessage) => {
//       console.log('📩 Foreground FCM Message:', remoteMessage);
 
//       await notifee.displayNotification({
//         title: remoteMessage?.notification?.title || 'New Notification',
//         body: remoteMessage?.notification?.body || 'You have a new message',
//         android: {
//           channelId: 'SISSI.channel',
//           importance: AndroidImportance.HIGH,
//           pressAction: { id: 'default' },
//         },
//       });
//     });
 
//     return unsubscribe;
//   }, []);
 
//   // Background & quit state handlers
//   useEffect(() => {
//     messaging()
//       .getInitialNotification()
//       .then((remoteMessage) => {
//         if (remoteMessage) {
//           console.log('📲 Opened from quit state:', remoteMessage);
//           navigateToNotification(remoteMessage);
//         }
//       });
 
//     const unsubscribe = messaging().onNotificationOpenedApp((remoteMessage) => {
//       if (remoteMessage) {
//         console.log('📲 Opened from background:', remoteMessage);
//         navigateToNotification(remoteMessage);
//       }
//     });
 
//     return unsubscribe;
//   }, []);
 
//   const navigateToNotification = (remoteMessage) => {
//     console.log('➡️ Navigate to notification screen', remoteMessage);
//     // TODO: add navigation logic here if needed
//   };
 
//   return null;
// };
 
// export default NotificationHandler;



import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { navigationRef } from './RootNavigation'; // Assuming you set up RootNavigation.js

const NotificationHandler = () => {

  // Request Notification Permissions
  useEffect(() => {
    const requestPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled = 
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('✅ Notification permission granted');

        if (Platform.OS === 'ios') {
          await messaging().registerDeviceForRemoteMessages();
          await messaging().setAutoInitEnabled(true);

          await messaging().setForegroundNotificationPresentationOptions({
            alert: true,
            badge: true,
            sound: true,
          });

          const apnsToken = await messaging().getAPNSToken();
          if (apnsToken) {
            console.log('🍏 APNs Token:', apnsToken);
          }
        }

        const fcmToken = await messaging().getToken();
        console.log('📲 FCM Token:', fcmToken);
      }
    };

    requestPermission();
  }, []);

  // Create Android Notification Channel
  useEffect(() => {
    if (Platform.OS === 'android') {
      notifee.createChannel({
        id: 'dpop.channel',
        name: 'DPOP Channel',
        importance: AndroidImportance.HIGH,
      }).then(() => {
        console.log('✅ Notifee channel created');
      });
    }
  }, []);

  // Foreground Notifications
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('📩 Foreground FCM Message:', remoteMessage);

      await notifee.displayNotification({
        title: remoteMessage?.notification?.title || 'New Notification',
        body: remoteMessage?.notification?.body || 'You have a new message',
        android: {
          channelId: 'dpop.channel',
          importance: AndroidImportance.HIGH,
          pressAction: { id: 'default' },
        },
        data: remoteMessage?.data,
      });
    });

    return unsubscribe;
  }, []);

  // Handle Notification Open (background or quit state)
  // useEffect(() => {
  //   messaging().getInitialNotification().then((remoteMessage) => {
  //     if (remoteMessage) {
  //       console.log('📲 Opened from quit state:', remoteMessage);
  //       handleNotificationTap(remoteMessage);
  //     }
  //   });

  //   const unsubscribe = messaging().onNotificationOpenedApp((remoteMessage) => {
  //     if (remoteMessage) {
  //       console.log('📲 Opened from background:', remoteMessage);
  //       handleNotificationTap(remoteMessage);
  //     }
  //   });

  //   return unsubscribe;
  // }, []);

  // Notifee Foreground Event Handling (Android)
  useEffect(() => {
    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS && detail.notification) {
        console.log('1111111', detail.notification);
        // handleNotificationTap({ data: detail.notification.data });
    //        navigationRef.current?.navigate('ChatScreen1', {
    //   type: '2', // Replace with real data if needed
    // });
      }
    });

    return unsubscribe;
  }, []);

  // Navigate on Notification Tap
  const handleNotificationTap = async (remoteMessage) => {
    await AsyncStorage.setItem('@FROM_NOTIFICATION', 'true');
    console.log('➡️ Navigating to ChatScreen1');
    // navigationRef.current?.navigate('ChatScreen1', {
    //   type: '2', // Replace with real data if needed
    // });
    // navigationRef.current?.navigate('ChatScreen1', {
    //   orderId: '1', // Replace with real data if needed
    // });
  };

  return null;
};

export default NotificationHandler;
