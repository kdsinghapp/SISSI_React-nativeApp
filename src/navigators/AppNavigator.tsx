import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RegistrationRoutes from './RegistrationRoutes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../redux/store';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import NetworkStatusModal from '../compoent/NetworkStatusModal';
import Toast from 'react-native-toast-message';
import toastConfig from '../utils/customToast';
import NotificationHandler  from './../../NotificationHandler'
import { PermissionsAndroid, Platform } from 'react-native';

import messaging from '@react-native-firebase/messaging';


const AppNavigator: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  // NetInfo listener
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setIsConnected(state.isConnected ?? true);
    });

    return () => unsubscribe();
  }, []);
   useEffect(() => { 
    requestUserPermission();
    // listenForForegroundNotification();
  }, []);

   

  const requestUserPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission denied');
        return;
      }
    }

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification permission granted:', authStatus);
      getFcmToken();
    } else {
      console.log('Notification permission not granted');
    }
  };

  const getFcmToken = async () => {
    console.log('FCM Token:');

    const token = await messaging().getToken().then((res)=>{
      console.log(res,'res')
    })
    .catch((e)=>console.log(e))
    console.log('FCM Token:', token);
    // 🔥 Send this token to your backend or Firestore if needed
  };
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <NetworkStatusModal
            modalVisible={!isConnected}
            offlineText="No Internet! Please check your connection."
          />
<NotificationHandler/>
          <RegistrationRoutes />
          <Toast config={toastConfig} />

        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default AppNavigator;
