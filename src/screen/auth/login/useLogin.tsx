import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
 import { RootStackParamList } from './LoginTypes';
import { useDispatch } from 'react-redux';
import ScreenNameEnum from '../../../routes/screenName.enum';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogiApi, LoginCustomer } from '../../../api/apiRequest';
import { loginApi } from '../../../api/authApi/AuthApi';
 
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const useLogin = () => {
  const [errors, setErrors] = useState<any>({});
  const navigation = useNavigation<RootStackParamList>();
  const [isLoading, setisLoading] = useState(false)
interface Credentials {
  email: string;
  password: string;
}

const [credentials, setCredentials] = useState<Credentials>({
  email: '',
  password: '',
});


const [savedRole, setSavedRole] = useState(null);
const navgation = useNavigation()
  // Function to load the saved role
  const loadRole = async () => {
    try {
      const role = await AsyncStorage.getItem("userRole");
      if (role !== null) {
        setSavedRole(role); // role is a string
        console.log("Saved role:", role);
      } else {
        console.log("No role saved yet.");
      }
    } catch (error) {
      console.log("Error fetching role from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    loadRole();
  }, []);
const dispatch = useDispatch()
const handleChange = (field: keyof Credentials, value: string) => {
  setCredentials((prev) => ({ ...prev, [field]: value }));
  setErrors((prev) => ({ ...prev, [field]: '' }));
};
  const validateFields = () => {
    const { email, password } = credentials;
    let validationErrors: any = {};
    if (!email.trim()) {
      validationErrors.email = 'Email is required.';
    } else if (!emailRegex.test(email)) {
      validationErrors.email = 'Enter a valid email address.';
    }
  
    if (!password.trim()) {
      validationErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters.';
    }
     
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
// if (savedRole != "Substitute") {
//   navigation.navigate(ScreenNameEnum.Tab2Navigator);
// } else {
//   navigation.navigate(ScreenNameEnum.TabNavigator);
// }


    if (!validateFields()) return; // Stop execution if validation fails
    try {
      const params = {
        email: credentials?.email,
        password: credentials?.password,
        roleType:savedRole == 'Substitute' ? 'User' :'Institution',
         navigation: navigation,
         dispatch:dispatch
       };
       const response = await LoginCustomer(params, setisLoading, dispatch);
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };
  return {
    credentials,
    errors,
    isLoading,
    handleChange,
    handleLogin,
    navigation, 
    
  };
};

export default useLogin;
