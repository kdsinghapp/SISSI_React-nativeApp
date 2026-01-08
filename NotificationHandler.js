// import React, { useEffect } from 'react';
// import messaging from '@react-native-firebase/messaging';
// import PushNotification from 'react-native-push-notification';
// import { Platform } from 'react-native';

// const NotificationHandler = () => {
//   // Ask user for notification permission
//   useEffect(() => {
//     const requestPermission = async () => {
//       const authStatus = await messaging().requestPermission();
//       const enabled =
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//       if (enabled) {
//         console.log('✅ Notification permission granted');

//         // iOS: Register for remote messages
//         if (Platform.OS === 'ios') {
//           await messaging().registerDeviceForRemoteMessages();

//           // iOS: Set notification presentation options for foreground
//           await messaging().setAutoInitEnabled(true);
//           messaging().setBackgroundMessageHandler(async remoteMessage => {
//             console.log('🔵 Background message handled:', remoteMessage);
//           });
//         }

//         // iOS: Get and log the APNs token
//         if (Platform.OS === 'ios') {
//           const token = await messaging().getAPNSToken();
//           if (token) {
//             console.log('🍏 APNs Token:', token);
//           }
//         }

//         // Common: Get FCM Token
//         const fcmToken = await messaging().getToken();
//         console.log('📲 FCM Token:', fcmToken);
//       }
//     };

//     requestPermission();
//   }, []);

//   // Create Android notification channel
//   useEffect(() => {
//     if (Platform.OS === 'android') {
//       PushNotification.createChannel(
//         {
//           channelId: 'dpop.channel',
//           channelName: 'DPOP Channel',
//           channelDescription: 'A channel for DPOP notifications',
//           importance: 4, // Max importance
//           vibrate: true,
//         },
//         (created) => console.log(`✅ Notification channel created: ${created}`)
//       );
//     }
//   }, []);

//   // Foreground FCM handler
//   useEffect(() => {
//     const unsubscribe = messaging().onMessage(async (remoteMessage) => {
//       console.log('📩 Foreground FCM Message:', remoteMessage);

//       PushNotification.localNotification({
//         channelId: 'dpop.channel',
//         title: remoteMessage?.notification?.title || 'New Notification',
//         message: remoteMessage?.notification?.body || 'You have a new message',
//         playSound: true,
//         soundName: 'default',
//         vibrate: true,
//         priority: 'high',
//         importance: 'high',
//       });
//     });

//     return unsubscribe;
//   }, []);

//   // Background and quit-state handling
//   useEffect(() => {
//     messaging()
//       .getInitialNotification()
//       .then((remoteMessage) => {
//         if (remoteMessage) {
//           console.log('📲 Opened from quit state:', remoteMessage);
//           navigateToNotification();
//         }
//       });

//     const unsubscribe = messaging().onNotificationOpenedApp((remoteMessage) => {
//       if (remoteMessage) {
//         console.log('📲 Opened from background:', remoteMessage);
//         navigateToNotification();
//       }
//     });

//     return unsubscribe;
//   }, []);

//   // Dummy navigation logic — replace with actual navigation
//   const navigateToNotification = () => {
//     console.log('➡️ Navigate to notification screen');
//     // navigation.navigate('NotificationDetail', { id: ... });
//   };

//   return null;
// };

// export default NotificationHandler;
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
//         id: 'dpop.channel',
//         name: 'DPOP Channel',
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
//           channelId: 'dpop.channel',
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
//     console.log('➡️ Navigate to notification screen', remoteMessage?.notification?.title);
//     // TODO: add navigation logic here if needed
//   };

//   return null;
// };

// export default NotificationHandler;
// NotificationHandler.js
// import React, { useEffect } from 'react';
// import messaging from '@react-native-firebase/messaging';
// import notifee, { AndroidImportance } from '@notifee/react-native';
// import { Platform } from 'react-native';
//  import { createNavigationContainerRef } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';


// const NotificationHandler = () => {
//   useEffect(() => {
//     const requestPermission = async () => {
//       const authStatus = await messaging().requestPermission();
//       const enabled =
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//       if (enabled) {
//         console.log('✅ Notification permission granted');

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

//         const fcmToken = await messaging().getToken();
//         console.log('📲 FCM Token:', fcmToken);
//       }
//     };

//     requestPermission();
//   }, []);

//   // Create Notifee channel on Android
//   useEffect(() => {
//     if (Platform.OS === 'android') {
//       notifee.createChannel({
//         id: 'dpop.channel',
//         name: 'DPOP Channel',
//         importance: AndroidImportance.HIGH,
//       }).then(() => {
//         console.log('✅ Notifee channel created');
//       });
//     }
//   }, []);
//   const  navigationRef = createNavigationContainerRef();

//   // Handle foreground notifications
//   useEffect(() => {
//     const unsubscribe = messaging().onMessage(async (remoteMessage) => {
//       console.log('📩 Foreground FCM Message:', remoteMessage);

//       await notifee.displayNotification({
//         title: remoteMessage?.notification?.title || 'New Notification',
//         body: remoteMessage?.notification?.body || 'You have a new message',
//         android: {
//           channelId: 'dpop.channel',
//           importance: AndroidImportance.HIGH,
//           pressAction: {
//             id: 'default', // required for Android to trigger click
//           },
//         },
//         data: remoteMessage?.data, // Pass data to notifee for click handling
//       });
//     });

//     return unsubscribe;
//   }, []);

//   // Handle background and quit state notification clicks
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
     
//       navigationRef.current?.navigate('ChatScreen1', {

//         orderId: "1",
      
//       });
       
//       console.log("remoteMessage",remoteMessage)
//       if (remoteMessage) {
//         console.log('📲 Opened from background:', remoteMessage);
//         navigateToNotification(remoteMessage);
//       }
//     });

//     return unsubscribe;
//   }, []);

//   // Handle Notifee notification tap (foreground case only for Android)
//   useEffect(() => {
//     const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
//      console.log('7878978786786:', type);
//      console.log('🔔 detail notification tap:', detail);
//     //  navigation.navigate('ProductDetails', {

//     //   orderId: "1",
    
//     // });
//       if (type == "1") {
//         console.log('111111111:', detail.notification?.data);
//         navigateToNotification({ data: detail.notification?.data });
//       }
//     });

//     return unsubscribe;
//   }, []);

//   // Function to navigate to ProductDetails
//   const navigateToNotification = async(remoteMessage) => {
//     console.log("remoteMessage",remoteMessage)
//     // const productId = remoteMessage?.data?.product_id;
//     navigationRef.current?.navigate('ChatScreen1', {

//       orderId: "1",
    
//     });
//     await AsyncStorage.setItem('@FROM_NOTIFICATION', 'true');

//     // if (productId && productId !== '0') {
//       // console.log('➡️ Navigate to ProductDetails with product_id:', productId);
//       // navigate('ChatScreen1', 1);
//     // } else {
//     //   console.log('⚠️ No valid product_id in notification');
//     // }
//   };

//   return null;
// };

// export default NotificationHandler;
import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import  navigationRef 


 

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
        // console.log('1111111', detail.notification);
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
