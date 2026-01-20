import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './LoginTypes';
import { useDispatch } from 'react-redux';
import ScreenNameEnum from '../../../routes/screenName.enum';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginCustomer } from '../../../api/apiRequest';
import messaging from '@react-native-firebase/messaging';
import { language } from '../../../constant/Language';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const useLogin = () => {
  const [errors, setErrors] = useState<any>({});
  const navigation = useNavigation<RootStackParamList>();
  
  // Access Finnish labels
  const labels = language.fi;
  
  const [isLoading, setisLoading] = useState(false);
  
  interface Credentials {
    email: string;
    password: string;
  }

  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  });

  const [savedRole, setSavedRole] = useState<string | null>(null);
  const dispatch = useDispatch();

  const loadRole = async () => {
    try {
      const role = await AsyncStorage.getItem("userRole");
      if (role !== null) {
        setSavedRole(role);
      }
    } catch (error) {
      console.log("Error fetching role:", error);
    }
  };

  useEffect(() => {
    loadRole();
  }, []);

  const handleChange = (field: keyof Credentials, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateFields = () => {
    const { email, password } = credentials;
    let validationErrors: any = {};

    if (!email.trim()) {
      validationErrors.email = labels.emailRequired; // Translated
    } else if (!emailRegex.test(email)) {
      validationErrors.email = labels.invalidEmail; // Translated
    }

    if (!password.trim()) {
      validationErrors.password = labels.passwordRequired; // Translated
    } else if (password.length < 6) {
      validationErrors.password = labels.passwordLength; // Translated
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    try {
      const fcmtoken = await messaging().getToken();

      if (!validateFields()) return;

      const params = {
        email: credentials?.email,
        password: credentials?.password,
        roleType: savedRole === 'Substitute' ? 'User' : 'Institution',
        token: fcmtoken,
        navigation: navigation,
        dispatch: dispatch
      };

      await LoginCustomer(params, setisLoading, dispatch);
    } catch (error) {
      console.error("Login Error:", error);
      // Optional: show a Finnish toast or alert here using labels.loginError
    }
  };

  return {
    credentials,
    errors,
    isLoading,
    handleChange,
    handleLogin,
    navigation,
    labels,
  };
};

export default useLogin;