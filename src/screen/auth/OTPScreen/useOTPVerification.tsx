import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { otp_Verify } from '../../../api/apiRequest'; 
import { useLanguage } from '../../../LanguageContext';
 

export const useOtpVerification = (cellCount: number = 4) => {
  const navigation = useNavigation();
  const route: any = useRoute();
  const { email, code, type } = route.params || {};
  // console.log(route.params)
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const [timer, setTimer] = useState(0);

  // Local reference to Finnish labels
  const { labels} = useLanguage();

  // Timer countdown logic
  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const data = {
    email: email,
    code: code
  }

  const [errorMessage, setErrorMessage] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

  const handleChangeText = (text: string) => {
    setValue(text);
    // Localized error message
    setErrorMessage(text.length < cellCount ? labels.otpError : '');
  };

  const handleResendOTP = async () => {
    if (timer > 0) return; 
    setIsLoading(true);
    try {
      const params = { email, code };
      setTimer(30); 
    } catch (error) {
      console.error(labels.otpResendError, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (value.length !== cellCount) {
      // Localized error message
      setErrorMessage(labels.otpError);
      return;
    }

    setIsLoading(true);
    try {
      setIsLoading(false)
      const params = { email, otp: value, navigation, code, type };
      await otp_Verify(params, setIsLoading);
    } catch (error) {
      setIsLoading(false)
    }
  };

  return {
    value,
    setValue,
    isLoading,
    errorMessage,
    ref,
    props,
    getCellOnLayoutHandler,
    handleChangeText,
    handleVerifyOTP,
    navigation,
    handleResendOTP,
    data,
    timer
  };
};