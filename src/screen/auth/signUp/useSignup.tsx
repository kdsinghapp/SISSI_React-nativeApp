
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SinupCustomer } from '../../../api/apiRequest';
import { language } from '../../../constant/Language'; 
import { useLanguage } from '../../../LanguageContext';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[0-9]{10,15}$/;
const nameRegex = /^[a-zA-Z\s]{2,50}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const yearRegex = /^(19|20)\d{2}$/;

interface Credentials {
  email: string;
  password: string;
  cpassword?: string; // Add this field
  mobile: string;
  fullName: string;
  city?: string;
  country?: string;
  address?: string;
  institutionName?: string;
  unitName?: string;
  unitManagerName?: string;
  yearOfBirth?: string;
  educationLevel?: string;
  degree?: string;
  schoolName?: string;
  yearOfGraduation?: string;
  criminalRecordExtract?: boolean;
}

interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  mobile?: string;
  fullName?: string;
  institutionName?: string;
  unitName?: string;
  unitManagerName?: string;
  address?: string;
  yearOfBirth?: string;
  educationLevel?: string;
  degree?: string;
  schoolName?: string;
  yearOfGraduation?: string;
  general?: string;
}
// ... interfaces remain the same ...

const useSignup = () => {
  const { labels} = useLanguage(); // Reference Finnish labels
  const [errors, setErrors] = useState<ValidationErrors>({});
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [savedRole, setSavedRole] = useState<string | null>(null);

  const [credentials, setCredentials] = useState<Credentials>({
    email: '', password: '', cpassword: '', mobile: '',
    fullName: '', address: '', institutionName: '',
    unitName: '', unitManagerName: '', yearOfBirth: '',
    educationLevel: '', degree: '', schoolName: '',
    yearOfGraduation: '', criminalRecordExtract: false,
  });

  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => { loadRole(); }, []);

  const loadRole = async () => {
    try {
      const role = await AsyncStorage.getItem("userRole");
      if (role) setSavedRole(role);
    } catch (error) {
      console.log("Error fetching role:", error);
    }
  };

  const handleChange = (field: keyof Credentials, value: string | boolean) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
    if (field === 'password' || field === 'cpassword') {
      setErrors((prev) => ({ 
        ...prev, [field]: '', confirmPassword: field === 'cpassword' ? '' : prev.confirmPassword 
      }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: '', general: '' }));
    }
  };

  const validateFields = (): boolean => {
    const { email, password, cpassword, mobile, fullName, yearOfBirth, yearOfGraduation } = credentials;
    const validationErrors: ValidationErrors = {};

    // Common validations
    if (!email.trim()) {
      validationErrors.email = labels.emailReq;
    } else if (!emailRegex.test(email)) {
      validationErrors.email = labels.emailInvalid;
    }

    if (!mobile.trim()) {
      validationErrors.mobile = labels.mobileReq;
    } else if (!mobileRegex.test(mobile)) {
      validationErrors.mobile = labels.mobileInvalid;
    }

    if (!password.trim()) {
      validationErrors.password = labels.passReq;
    } else if (password.length < 8) {
      validationErrors.password = labels.passMin;
    } else if (!passwordRegex.test(password)) {
      validationErrors.password = labels.passStrong;
    }

    if (!cpassword?.trim()) {
      validationErrors.confirmPassword = labels.confirmPassReq;
    } else if (password !== cpassword) {
      validationErrors.confirmPassword = labels.passMismatch;
    }

    // Role-specific validations
    if (savedRole === 'Substitute') {
      if (!fullName?.trim()) {
        validationErrors.fullName = labels.nameReq;
      } else if (!nameRegex.test(fullName)) {
        validationErrors.fullName = labels.nameInvalid;
      }

      if (yearOfBirth) {
        if (!yearRegex.test(yearOfBirth)) {
          validationErrors.yearOfBirth = labels.yearInvalid;
        } else {
          const age = new Date().getFullYear() - parseInt(yearOfBirth);
          if (age < 18) validationErrors.yearOfBirth = labels.ageError;
        }
      } else {
        validationErrors.yearOfBirth = labels.yearBirthReq;
      }

      if (!credentials.educationLevel?.trim()) {
        validationErrors.educationLevel = labels.eduLevelReq;
      }

      if (credentials.yearOfGraduation && !yearRegex.test(credentials.yearOfGraduation)) {
        validationErrors.yearOfGraduation = labels.gradYearInvalid;
      }

    } else {
      if (!credentials.institutionName?.trim()) {
        validationErrors.institutionName = labels.instReq;
      }
      if (!credentials.unitName?.trim()) {
        validationErrors.unitName = labels.unitReq;
      }
      if (!credentials.unitManagerName?.trim()) {
        validationErrors.unitManagerName = labels.managerReq;
      } else if (!nameRegex.test(credentials.unitManagerName)) {
        validationErrors.unitManagerName = labels.managerInvalid;
      }
    }

    if (!credentials.address?.trim()) {
      validationErrors.address = labels.addressReq;
    // } else if (credentials.address.length < 10) {
    //   validationErrors.address = labels.addressMin;
    }

    if (!termsAccepted) {
      validationErrors.general = labels.acceptTerms;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validateFields()) return;
    setIsLoading(true);
    setErrors({});

    try {
      let signupData: any = {
        email: credentials.email,
        password: credentials.password,
        mobile: credentials.mobile,
        address: credentials.address,
        terms_accepted: termsAccepted,
      };

      if (savedRole === 'Substitute') {
        signupData = {
          ...signupData,
          full_name: credentials.fullName,
          year_of_birth: credentials.yearOfBirth,
          education_level: credentials.educationLevel,
          degree: credentials.degree,
          school_name: credentials.schoolName,
          year_of_graduation: credentials.yearOfGraduation,
          criminal_record_extract: credentials.criminalRecordExtract,
        };
      } else {
        signupData = {
          ...signupData,
          full_name: credentials.institutionName,
          unit_name: credentials.unitName,
          unit_manager_name: credentials.unitManagerName,
        };
      }

      const param = {
        ...signupData,
        navigation,
        roleType: savedRole === 'Substitute' ? 'User' : 'Institution',
      };

      await SinupCustomer(param, setIsLoading);
setIsLoading(false)
    } catch (error: any) {
setIsLoading(false)

      setErrors({ 
        general: error.message || labels.signupFailed 
      });
    }
  };

  return {
    credentials, errors, isLoading,
    termsAccepted, setTermsAccepted,
    handleChange, handleSignup, savedRole,
  };
};

export default useSignup;