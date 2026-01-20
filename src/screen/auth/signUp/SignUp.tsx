// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Modal,
//   FlatList,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import TextInputField from '../../../compoent/TextInputField';
// import CustomButton from '../../../compoent/CustomButton';
// import imageIndex from '../../../assets/imageIndex';
// import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import StatusBarComponent from '../../../compoent/StatusBarCompoent';
// import CustomHeader from '../../../compoent/CustomHeader';
// import { useNavigation } from '@react-navigation/native';
// import ScreenNameEnum from '../../../routes/screenName.enum';
// import useSignup from './useSignup'; 
// import LoadingModal from '../../../utils/Loader';
// import { color } from '../../../constant';
// import { language } from '../../../constant/Language'; 
// import { useLanguage } from '../../../LanguageContext';

// export default function SignUpUI() {
//   const { labels} = useLanguage(); // Reference Finnish strings
//   const {
//     credentials,
//     errors,
//     isLoading,
//     termsAccepted,
//     setTermsAccepted,
//     handleChange,
//     handleSignup,
//     savedRole,
//   } = useSignup();

//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const navigation = useNavigation();
  
//   // Localized education options
//   const educationOptions = [
//     labels.highSchool, 
//     labels.bachelor, 
//     labels.master, 
//     labels.phd
//   ];

//   const handleSelectEducation = (item: string) => {
//     handleChange('educationLevel', item);
//     setDropdownVisible(false);
//   };

//   const handleCriminalRecordChange = () => {
//     handleChange('criminalRecordExtract', !credentials.criminalRecordExtract);
//   };

//   const renderError = (field: keyof typeof errors) => {
//     if (errors[field]) {
//       return <Text style={styles.errorText}>{errors[field]}</Text>;
//     }
//     return null;
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
//       <StatusBarComponent />
//       <CustomHeader label={labels.login} />
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       >
//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           style={{
//             marginHorizontal: 20,
//             marginTop: hp(3),
//             backgroundColor: "white",
//           }}
//         >
//           {isLoading && <LoadingModal/>}

//           <View style={styles.formWrapper}>
//             <Image 
//               source={imageIndex.appLogo}
//               resizeMode='cover'
//               style={styles.logo} 
//             />
            
//             <Text style={styles.title}>
//               {savedRole === "Substitute" ? labels.workerRegistration : labels.institutionRegistration}
//             </Text>
            
//             <Text style={styles.subtitle}>
//               {labels.fillDetails}
//             </Text>

//             {errors.general && (
//               <View style={styles.generalError}>
//                 <Text style={styles.generalErrorText}>{errors.general}</Text>
//               </View>
//             )}

//             <View style={styles.formContainer}>
//               {/* Worker Fields */}
//               {savedRole === "Substitute" && (
//                 <TextInputField
//                   placeholder={labels.fullName}
//                   value={credentials.fullName}
//                   onChangeText={(text) => handleChange('fullName', text)}
//                   firstLogo
//                   img={imageIndex.Textprofile}
//                   error={errors.fullName}
//                 />
//               )}
//               {savedRole === "Substitute" && renderError('fullName')}

//               {/* Institution Fields */}
//               {savedRole !== "Substitute" && (
//                 <>
//                   <TextInputField
//                     placeholder={labels.institutionName}
//                     value={credentials.institutionName}
//                     onChangeText={(text) => handleChange('institutionName', text)}
//                     firstLogo
//                     img={imageIndex.Level}
//                     error={errors.institutionName}
//                   />
//                   {renderError('institutionName')}

//                   <TextInputField
//                     placeholder={labels.unitName}
//                     value={credentials.unitName}
//                     onChangeText={(text) => handleChange('unitName', text)}
//                     firstLogo
//                     img={imageIndex.Health}
//                     error={errors.unitName}
//                   />
//                   {renderError('unitName')}

//                   <TextInputField
//                     placeholder={labels.unitManagerName}
//                     value={credentials.unitManagerName}
//                     onChangeText={(text) => handleChange('unitManagerName', text)}
//                     firstLogo
//                     img={imageIndex.Textprofile}
//                     error={errors.unitManagerName}
//                   />
//                   {renderError('unitManagerName')}
//                 </>
//               )}

//               {/* Common Fields */}
//               <TextInputField
//                 placeholder={labels.email}
//                 value={credentials.email}
//                 onChangeText={(text) => handleChange('email', text)}
//                 firstLogo
//                 img={imageIndex.mess}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 error={errors.email}
//               />
//               {renderError('email')}

//               <TextInputField
//                 placeholder={labels.phoneNumber}
//                 value={credentials.mobile}
//                 onChangeText={(text) => handleChange('mobile', text)}
//                 firstLogo
//                 img={imageIndex.Textphone}
//                 keyboardType="phone-pad"
//                 error={errors.mobile}
//                 maxLength={15}
//               />
//               {renderError('mobile')}

//               <TextInputField
//                 placeholder={labels.password}
//                 value={credentials.password}
//                 onChangeText={(text) => handleChange('password', text)}
//                 firstLogo
//                 showEye
//                 img={imageIndex.textLock}
//                 secureTextEntry
//                 error={errors.password}
//               />
//               {renderError('password')}

//               <TextInputField
//                 placeholder={labels.confirmPassword}
//                 value={credentials.cpassword}
//                 onChangeText={(text) => handleChange('cpassword', text)}
//                 firstLogo
//                 showEye
//                 img={imageIndex.textLock}
//                 secureTextEntry
//                 error={errors.confirmPassword}
//               />
//               {renderError('confirmPassword')}

//               {/* Year of Birth (Worker only) */}
//               {savedRole === "Substitute" && (
//                 <>
//                   <TextInputField
//                     placeholder={labels.yearOfBirth}
//                     value={credentials.yearOfBirth}
//                     onChangeText={(text) => handleChange('yearOfBirth', text)}
//                     firstLogo
//                     img={imageIndex.calneder}
//                     keyboardType='numeric'
//                     maxLength={4}
//                     error={errors.yearOfBirth}
//                   />
//                   {renderError('yearOfBirth')}
//                 </>
//               )}

//               <TextInputField
//                 placeholder={labels.address}
//                 value={credentials.address}
//                 onChangeText={(text) => handleChange('address', text)}
//                 firstLogo
//                 img={imageIndex.location}
//                 error={errors.address}
//                 multiline
//                 numberOfLines={3}
//               />
//               {renderError('address')}

//               {/* Worker Education Section */}
//               {savedRole === "Substitute" && (
//                 <>
//                   <Text style={styles.sectionTitle}>{labels.educationDetails}</Text>
//                   <TouchableOpacity
//                     style={[styles.dropdown, errors.educationLevel && styles.errorBorder]}
//                     onPress={() => setDropdownVisible(true)}
//                   >
//                     <View style={styles.dropdownContent}>
//                       <Image 
//                         source={imageIndex.Level}
//                         style={styles.dropdownIcon}
//                         tintColor={color.primary}
//                       />
//                       <Text style={[
//                         styles.dropdownText, 
//                         !credentials.educationLevel && styles.placeholderText
//                       ]}>
//                         {credentials.educationLevel || labels.levelOfEducation}
//                       </Text>
//                     </View>
//                     <Image 
//                       source={imageIndex.arrowqdown}
//                       style={styles.dropdownArrow}
//                       tintColor={color.primary}
//                     />
//                   </TouchableOpacity>
//                   {renderError('educationLevel')}

//                   <Modal
//                     visible={dropdownVisible}
//                     transparent
//                     animationType="fade"
//                   >
//                     <TouchableOpacity
//                       style={styles.modalOverlay}
//                       onPress={() => setDropdownVisible(false)}
//                     >
//                       <View style={styles.modalContent}>
//                         <FlatList
//                           data={educationOptions}
//                           keyExtractor={(item) => item}
//                           renderItem={({ item }) => (
//                             <TouchableOpacity
//                               style={styles.modalItem}
//                               onPress={() => handleSelectEducation(item)}
//                             >
//                               <Text style={styles.modalItemText}>{item}</Text>
//                             </TouchableOpacity>
//                           )}
//                         />
//                       </View>
//                     </TouchableOpacity>
//                   </Modal>

//                   <TextInputField
//                     placeholder={labels.degree}
//                     value={credentials.degree}
//                     onChangeText={(text) => handleChange('degree', text)}
//                     firstLogo
//                     img={imageIndex.heart}
//                   />

//                   <TextInputField
//                     placeholder={labels.schoolName}
//                     value={credentials.schoolName}
//                     onChangeText={(text) => handleChange('schoolName', text)}
//                     firstLogo
//                     img={imageIndex.Health}
//                   />

//                   <TextInputField
//                     placeholder={labels.yearOfGraduation}
//                     value={credentials.yearOfGraduation}
//                     onChangeText={(text) => handleChange('yearOfGraduation', text)}
//                     firstLogo
//                     img={imageIndex.yerar}
//                     keyboardType='numeric'
//                     maxLength={4}
//                     error={errors.yearOfGraduation}
//                   />
//                   {renderError('yearOfGraduation')}

//                   <TouchableOpacity
//                     style={styles.checkboxContainer}
//                     onPress={handleCriminalRecordChange}
//                   >
//                     <View style={styles.checkboxOuter}>
//                       {credentials.criminalRecordExtract && <View style={styles.checkboxInner} />}
//                     </View>
//                     <Text style={styles.checkboxLabel}>
//                       {labels.criminalRecordLabel}
//                     </Text>
//                   </TouchableOpacity>
//                 </>
//               )}
              
//               <TouchableOpacity
//                 style={styles.checkboxContainer}
//                 onPress={() => setTermsAccepted(!termsAccepted)}
//               >
//                 <View style={[
//                   styles.checkboxOuter, 
//                   !termsAccepted && errors.general && styles.checkboxError
//                 ]}>
//                   {termsAccepted && <View style={styles.checkboxInner} />}
//                 </View>
//                 <Text style={styles.checkboxLabel}>
//                   {labels.agreeToTerms}
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             <CustomButton
//               title={savedRole === "Substitute" ? labels.submit : labels.submitForApproval}
//               onPress={handleSignup}
//               loading={isLoading}
//               disabled={isLoading}
//             />
//           </View>

//           <View style={styles.signUpContainer}>
//             <Text style={styles.signUpText}>{labels.alreadyHaveAccount}</Text>
//             <TouchableOpacity onPress={() => navigation.navigate(ScreenNameEnum.Login as any)}>
//               <Text style={styles.signUpLink}>{labels.login}</Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }
// const styles = StyleSheet.create({
//   formWrapper: {
//     backgroundColor: '#FFF',
//     marginHorizontal: 5,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.12,
//     shadowRadius: 3.84,
//     elevation: 5,
//     padding: 15,
//     marginTop: 11,
//     marginBottom: 20,
//   },
//   logo: {
//     height: 44,
//     width: 120,
//     alignSelf: 'center',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '600',
//     textAlign: 'center',
//     marginBottom: 5,
//     marginTop: 18,
//     color: "black"
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#9DB2BF',
//     textAlign: 'center',
//     marginBottom: 20,
//     marginTop: 10,
//   },
//   formContainer: {
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     color: "black",
//     fontSize: 18,
//     fontWeight: "600",
//     marginTop: 8,
//     marginBottom: 10
//   },
//   dropdown: {
//     borderWidth: 1,
//     backgroundColor: '#F7F8F8',
//     borderColor: '#F7F8F8',
//     padding: 15,
//     borderRadius: 12,
//     marginVertical: 10,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   dropdownContent: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   dropdownIcon: {
//     height: 20,
//     width: 20,
//   },
//   dropdownText: {
//     marginLeft: 8,
//     fontSize: 16,
//   },
//   placeholderText: {
//     color: '#999',
//   },
//   dropdownArrow: {
//     tintColor: "black",
//     height: 20,
//     width: 20,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.3)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     width: '80%',
//     borderRadius: 10,
//     maxHeight: '50%',
//   },
//   modalItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderColor: '#eee',
//   },
//   modalItemText: {
//     fontSize: 16,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     marginVertical: 15,
//   },
//   checkboxOuter: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: color.primary,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 10,
//     marginTop: 2,
//   },
//   checkboxInner: {
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     backgroundColor: color.primary,
//   },
//   checkboxLabel: {
//     fontSize: 14,
//     color: '#333',
//     flex: 1,
//     lineHeight: 20,
//   },
//   signUpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 30,
//   },
//   signUpText: {
//     fontSize: 17,
//     color: '#909090',
//     fontWeight: '500'
//   },
//   signUpLink: {
//     fontSize: 17,
//     fontWeight: '700',
//     color: color.primary
//   },
//   errorText: {
//     color: '#FF3B30',
//     fontSize: 14,
//     marginTop: -8,
//     marginBottom: 10,
//     marginLeft: 5,
//   },
//   errorBorder: {
//     borderColor: '#FF3B30',
//     borderWidth: 1,
//   },
//   checkboxError: {
//     borderColor: '#FF3B30',
//   },
//   generalError: {
//     backgroundColor: '#FFE5E5',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 15,
//     borderLeftWidth: 4,
//     borderLeftColor: '#FF3B30',
//   },
//   generalErrorText: {
//     color: '#D32F2F',
//     fontSize: 14,
//     fontWeight: '500',
//   },
// });


import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputField from '../../../compoent/TextInputField';
import CustomButton from '../../../compoent/CustomButton';
import imageIndex from '../../../assets/imageIndex';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../compoent/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';
import useSignup from './useSignup';
import LoadingModal from '../../../utils/Loader';
import { color } from '../../../constant';
import { useLanguage } from '../../../LanguageContext';

export default function SignUpUI() {
  const { labels } = useLanguage();
  const {
    credentials,
    errors,
    isLoading,
    termsAccepted,
    setTermsAccepted,
    handleChange,
    handleSignup,
    savedRole,
  } = useSignup();

  const navigation = useNavigation();

  // Modal Visibility States
  const [eduModalVisible, setEduModalVisible] = useState(false);
  const [birthYearModalVisible, setBirthYearModalVisible] = useState(false);
  const [gradYearModalVisible, setGradYearModalVisible] = useState(false);

  // Data Generators
  const educationOptions = [labels.highSchool, labels.bachelor, labels.master, labels.phd];
  
  const generateYears = (start: number, end: number) => {
    const years = [];
    for (let i = end; i >= start; i--) years.push(i.toString());
    return years;
  };

  const birthYears = generateYears(1950, new Date().getFullYear() - 18); // Min 18 years old
  const graduationYears = generateYears(1980, new Date().getFullYear() + 6); // Includes future grads

  // Reusable Component for Selectable Inputs (Dropdowns/Pickers)
  const SelectionField = ({ label, value, onPress, icon, error }: any) => (
    <View style={{ marginBottom: 5 }}>
      <TouchableOpacity
        style={[styles.dropdown, error && styles.errorBorder]}
        onPress={onPress}
      >
        <View style={styles.dropdownContent}>
          <Image source={icon} style={styles.dropdownIcon} tintColor={color.primary} />
          <Text style={[styles.dropdownText, !value && styles.placeholderText]}>
            {value || label}
          </Text>
        </View>
        <Image source={imageIndex.arrowqdown} style={styles.dropdownArrow} tintColor={color.primary} />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBarComponent />
      <CustomHeader label={labels.back} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          {isLoading && <LoadingModal />}

          <View style={styles.formWrapper}>
            <Image source={imageIndex.appLogo} resizeMode="cover" style={styles.logo} />

            <Text style={styles.title}>
              {savedRole === 'Substitute' ? labels.workerRegistration : labels.institutionRegistration}
            </Text>

            <Text style={styles.subtitle}>{labels.fillDetails}</Text>

            {errors.general && (
              <View style={styles.generalError}>
                <Text style={styles.generalErrorText}>{errors.general}</Text>
              </View>
            )}

            <View style={styles.formContainer}>
              {/* --- Common Identity Fields --- */}
              {savedRole === 'Substitute' ? (
                <TextInputField
                  placeholder={labels.fullName}
                  value={credentials.fullName}
                  onChangeText={(text) => handleChange('fullName', text)}
                  firstLogo
                  img={imageIndex.Textprofile}
                  error={errors.fullName}
                />
              ) : (
                <>
                  <TextInputField
                    placeholder={labels.institutionName}
                    value={credentials.institutionName}
                    onChangeText={(text) => handleChange('institutionName', text)}
                    firstLogo
                    img={imageIndex.Level}
                    error={errors.institutionName}
                  />
                  <TextInputField
                    placeholder={labels.unitName}
                    value={credentials.unitName}
                    onChangeText={(text) => handleChange('unitName', text)}
                    firstLogo
                    img={imageIndex.Health}
                    error={errors.unitName}
                  />
                  <TextInputField
                    placeholder={labels.unitManagerName}
                    value={credentials.unitManagerName}
                    onChangeText={(text) => handleChange('unitManagerName', text)}
                    firstLogo
                    img={imageIndex.Textprofile}
                    error={errors.unitManagerName}
                  />
                </>
              )}

              <TextInputField
                placeholder={labels.email}
                value={credentials.email}
                onChangeText={(text) => handleChange('email', text)}
                firstLogo
                img={imageIndex.mess}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
              />

              <TextInputField
                placeholder={labels.phoneNumber}
                value={credentials.mobile}
                onChangeText={(text) => handleChange('mobile', text)}
                firstLogo
                img={imageIndex.Textphone}
                keyboardType="phone-pad"
                error={errors.mobile}
                maxLength={15}
              />

              <TextInputField
                placeholder={labels.password}
                value={credentials.password}
                onChangeText={(text) => handleChange('password', text)}
                firstLogo
                showEye
                img={imageIndex.textLock}
                secureTextEntry
                error={errors.password}
              />

              <TextInputField
                placeholder={labels.confirmPassword}
                value={credentials.cpassword}
                onChangeText={(text) => handleChange('cpassword', text)}
                firstLogo
                showEye
                img={imageIndex.textLock}
                secureTextEntry
                error={errors.confirmPassword}
              />

              {/* --- Year of Birth Picker (Worker Only) --- */}
              {savedRole === 'Substitute' && (
                <SelectionField
                  label={labels.yearOfBirth}
                  value={credentials.yearOfBirth}
                  onPress={() => setBirthYearModalVisible(true)}
                  icon={imageIndex.calneder}
                  error={errors.yearOfBirth}
                />
              )}

              <TextInputField
                placeholder={labels.address}
                value={credentials.address}
                onChangeText={(text) => handleChange('address', text)}
                firstLogo
                img={imageIndex.location}
                error={errors.address}
                multiline
              />

              {/* --- Education Section (Worker Only) --- */}
              {savedRole === 'Substitute' && (
                <>
                  <Text style={styles.sectionTitle}>{labels.educationDetails}</Text>
                  
                  <SelectionField
                    label={labels.levelOfEducation}
                    value={credentials.educationLevel}
                    onPress={() => setEduModalVisible(true)}
                    icon={imageIndex.Level}
                    error={errors.educationLevel}
                  />

                  <TextInputField
                    placeholder={labels.degree}
                    value={credentials.degree}
                    onChangeText={(text) => handleChange('degree', text)}
                    firstLogo
                    img={imageIndex.heart}
                  />

                  <TextInputField
                    placeholder={labels.schoolName}
                    value={credentials.schoolName}
                    onChangeText={(text) => handleChange('schoolName', text)}
                    firstLogo
                    img={imageIndex.Health}
                  />

                  <SelectionField
                    label={labels.yearOfGraduation}
                    value={credentials.yearOfGraduation}
                    onPress={() => setGradYearModalVisible(true)}
                    icon={imageIndex.yerar}
                    error={errors.yearOfGraduation}
                  />

                  <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => handleChange('criminalRecordExtract', !credentials.criminalRecordExtract)}
                  >
                    <View style={styles.checkboxOuter}>
                      {credentials.criminalRecordExtract && <View style={styles.checkboxInner} />}
                    </View>
                    <Text style={styles.checkboxLabel}>{labels.criminalRecordLabel}</Text>
                  </TouchableOpacity>
                </>
              )}

              {/* --- Terms --- */}
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setTermsAccepted(!termsAccepted)}
              >
                <View style={[styles.checkboxOuter, !termsAccepted && errors.general && styles.checkboxError]}>
                  {termsAccepted && <View style={styles.checkboxInner} />}
                </View>
                <Text style={styles.checkboxLabel}>{labels.agreeToTerms}</Text>
              </TouchableOpacity>
            </View>

            <CustomButton
              title={savedRole === 'Substitute' ? labels.submit : labels.submitForApproval}
              onPress={handleSignup}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>{labels.alreadyHaveAccount}</Text>
            <TouchableOpacity onPress={() => navigation.navigate(ScreenNameEnum.Login as any)}>
              <Text style={styles.signUpLink}>{labels.login}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* --- REUSABLE MODALS --- */}
      
      {/* Education Modal */}
      <SelectionModal
        visible={eduModalVisible}
        data={educationOptions}
        onClose={() => setEduModalVisible(false)}
        onSelect={(item) => handleChange('educationLevel', item)}
      />

      {/* Birth Year Modal */}
      <SelectionModal
        visible={birthYearModalVisible}
        data={birthYears}
        onClose={() => setBirthYearModalVisible(false)}
        onSelect={(item) => handleChange('yearOfBirth', item)}
      />

      {/* Graduation Year Modal */}
      <SelectionModal
        visible={gradYearModalVisible}
        data={graduationYears}
        onClose={() => setGradYearModalVisible(false)}
        onSelect={(item) => handleChange('yearOfGraduation', item)}
      />

    </SafeAreaView>
  );
}

// Internal Reusable Modal Component
const SelectionModal = ({ visible, data, onClose, onSelect }: any) => (
  <Modal visible={visible} transparent animationType="fade">
    <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
      <View style={styles.modalContent}>
        <FlatList
          data={data}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => {
                onSelect(item);
                onClose();
              }}
            >
              <Text style={styles.modalItemText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </TouchableOpacity>
  </Modal>
);

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 20,
    marginTop: hp(3),
    backgroundColor: 'white',
  },
  formWrapper: {
    backgroundColor: '#FFF',
    marginHorizontal: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 15,
    marginTop: 11,
    marginBottom: 20,
  },
  logo: { height: 44, width: 120, alignSelf: 'center' },
  title: { fontSize: 22, fontWeight: '600', textAlign: 'center', marginBottom: 5, marginTop: 18, color: 'black' },
  subtitle: { fontSize: 16, color: '#9DB2BF', textAlign: 'center', marginBottom: 20, marginTop: 10 },
  formContainer: { marginBottom: 20 },
  sectionTitle: { color: 'black', fontSize: 18, fontWeight: '600', marginTop: 15, marginBottom: 10 },
  dropdown: {
    borderWidth: 1,
    backgroundColor: '#F7F8F8',
    borderColor: '#F7F8F8',
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 55,
  },
  dropdownContent: { flexDirection: 'row', alignItems: 'center' },
  dropdownIcon: { height: 20, width: 20 },
  dropdownText: { marginLeft: 10, fontSize: 14, color: 'black' },
  placeholderText: { color: '#999' },
  dropdownArrow: { height: 18, width: 18 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', width: '80%', borderRadius: 15, maxHeight: '50%', paddingVertical: 10 },
  modalItem: { padding: 18, borderBottomWidth: 1, borderColor: '#f0f0f0' },
  modalItemText: { fontSize: 16, color: 'black', textAlign: 'center' },
  checkboxContainer: { flexDirection: 'row', alignItems: 'flex-start', marginVertical: 12 },
  checkboxOuter: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: color.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxInner: { width: 12, height: 12, borderRadius: 2, backgroundColor: color.primary },
  checkboxLabel: { fontSize: 14, color: '#333', flex: 1, lineHeight: 20 },
  signUpContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 30 },
  signUpText: { fontSize: 17, color: '#909090', fontWeight: '500' },
  signUpLink: { fontSize: 17, fontWeight: '700', color: color.primary, marginLeft: 5 },
  errorText: { color: '#FF3B30', fontSize: 12, marginBottom: 10, marginLeft: 5 },
  errorBorder: { borderColor: '#FF3B30', borderWidth: 1 },
  checkboxError: { borderColor: '#FF3B30' },
  generalError: { backgroundColor: '#FFE5E5', padding: 12, borderRadius: 8, marginBottom: 15, borderLeftWidth: 4, borderLeftColor: '#FF3B30' },
  generalErrorText: { color: '#D32F2F', fontSize: 14, fontWeight: '500' },
});