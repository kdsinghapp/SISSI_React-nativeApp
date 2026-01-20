import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { language } from '../../../constant/Language'; 
import { restEmailOtp } from '../../../api/apiRequest';
import { useLanguage } from '../../../LanguageContext';

const useForgot = () => {
  const [errors, setErrors] = useState<any>({});
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false);
  const [credentials, setCredentials] = useState({ email: '' });
  
  // Local reference to Finnish labels
  const { labels} = useLanguage();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (field: string, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    setErrors((prev: any) => ({ ...prev, [field]: '' }));

    if (field === 'email') {
      if (!value.trim()) {
        setErrors((prev: any) => ({ ...prev, email: labels.emailRequired }));
      } else if (!emailRegex.test(value)) {
        setErrors((prev: any) => ({ ...prev, email: labels.invalidEmail }));
      }
    }
  };

  const handleForgot = async () => {
    const { email } = credentials;
    let validationErrors: any = {};

    if (!email.trim()) {
      validationErrors.email = labels.emailRequired;
    } else if (!emailRegex.test(email)) {
      validationErrors.email = labels.invalidEmail;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Assuming restEmailOtp is your API service
      const params = { email: email, navigation: navigation };
      await restEmailOtp(params, setisLoading);
    } catch (error) {
      // Handle error (optionally add a 'something went wrong' translation here)
      console.error(error);
    }
  };

  return {
    credentials,
    errors,
    isLoading,
    handleChange,
    handleForgot,
    navigation,
  };
};

export default useForgot;