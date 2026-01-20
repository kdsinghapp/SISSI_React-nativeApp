import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';
import { updatePassword } from '../../../../api/apiRequest'; 
import { language } from '../../../../constant/Language';
import { useLanguage } from '../../../../LanguageContext';

const useCreateNewPassword = () => {
  const { labels} = useLanguage();
  const navigation = useNavigation<any>();
  const route: any = useRoute();
  const { userId } = route.params || {};

  const [credentials, setCredentials] = useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));

    // Real-time validation
    if (field === "password" && value.length > 0 && value.length < 5) {
      setErrors(prev => ({ ...prev, password: labels.passwordMinLength }));
    }
  };

  const handleResetPass = async () => {
    const { password, confirmPassword } = credentials;
    let validationErrors: any = {};

    if (!password.trim()) validationErrors.password = labels.passwordRequired;
    if (!confirmPassword.trim()) validationErrors.confirmPassword = labels.confirmPasswordRequired;

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(labels.errorTitle, labels.passwordsDoNotMatch);
      return;
    }

    try {
      const params = {
        password,
        confirm_password: confirmPassword,
        userId,
        navigation,
      };
      await updatePassword(params, setIsLoading);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    credentials,
    errors,
    isLoading,
    handleChange,
    handleResetPass,
    navigation,
  };
};

export default useCreateNewPassword;