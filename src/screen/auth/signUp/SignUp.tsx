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
import useSignup from './useSinup'; 
import LoadingModal from '../../../utils/Loader';

export default function SignUpUI() {
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

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigation = useNavigation();
  const educationOptions = ['High School', 'Bachelor', 'Master', 'PhD'];

  const handleSelectEducation = (item: string) => {
    handleChange('educationLevel', item);
    setDropdownVisible(false);
  };

  const handleCriminalRecordChange = () => {
    handleChange('criminalRecordExtract', !credentials.criminalRecordExtract);
  };

  const renderError = (field: keyof typeof errors) => {
    if (errors[field]) {
      return <Text style={styles.errorText}>{errors[field]}</Text>;
    }
    return null;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBarComponent />
      <CustomHeader />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginHorizontal: 20,
            marginTop: hp(3),
            backgroundColor: "white",
          }}
        >
      {isLoading && <LoadingModal/>}

          <View style={styles.formWrapper}>
            <Image 
              source={imageIndex.appLogo}
              resizeMode='cover'
              style={styles.logo} 
            />
            
            <Text style={styles.title}>
              {savedRole === "Substitute" ? "Worker Registration" : "Institution Registration"}
            </Text>
            
            <Text style={styles.subtitle}>
              Fill your details to create your profile
            </Text>

            {/* General Error Message */}
            {errors.general && (
              <View style={styles.generalError}>
                <Text style={styles.generalErrorText}>{errors.general}</Text>
              </View>
            )}

            <View style={styles.formContainer}>
              {/* Worker Fields */}
              {savedRole === "Substitute" && (
                <TextInputField
                  placeholder="Full Name"
                  value={credentials.fullName}
                  onChangeText={(text) => handleChange('fullName', text)}
                  firstLogo
                  img={imageIndex.Textprofile}
                  error={errors.fullName}
                />
              )}
              {savedRole === "Substitute" && renderError('fullName')}

              {/* Institution Fields */}
              {savedRole !== "Substitute" && (
                <>
                  <TextInputField
                    placeholder="Institution Name"
                    value={credentials.institutionName}
                    onChangeText={(text) => handleChange('institutionName', text)}
                    firstLogo
                    img={imageIndex.Level}
                    error={errors.institutionName}
                  />
                  {renderError('institutionName')}

                  <TextInputField
                    placeholder="Unit Name"
                    value={credentials.unitName}
                    onChangeText={(text) => handleChange('unitName', text)}
                    firstLogo
                    img={imageIndex.Health}
                    error={errors.unitName}
                  />
                  {renderError('unitName')}

                  <TextInputField
                    placeholder="Unit Manager Name"
                    value={credentials.unitManagerName}
                    onChangeText={(text) => handleChange('unitManagerName', text)}
                    firstLogo
                    img={imageIndex.Textprofile}
                    error={errors.unitManagerName}
                  />
                  {renderError('unitManagerName')}
                </>
              )}

              {/* Common Fields */}
              <TextInputField
                placeholder="Email"
                value={credentials.email}
                onChangeText={(text) => handleChange('email', text)}
                firstLogo
                img={imageIndex.mess}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
              />
              {renderError('email')}

              <TextInputField
                placeholder="Phone Number"
                value={credentials.mobile}
                onChangeText={(text) => handleChange('mobile', text)}
                firstLogo
                img={imageIndex.Textphone}
                keyboardType="phone-pad"
                error={errors.mobile}
                maxLength={15}
              />
              {renderError('mobile')}

              <TextInputField
                placeholder="Password"
                value={credentials.password}
                onChangeText={(text) => handleChange('password', text)}
                firstLogo
                showEye
                img={imageIndex.textLock}
                secureTextEntry
                error={errors.password}
              />
              {renderError('password')}

              <TextInputField
                placeholder="Confirm Password"
                value={credentials.cpassword}
                onChangeText={(text) => handleChange('cpassword', text)}
                firstLogo
                showEye
                img={imageIndex.textLock}
                secureTextEntry
                error={errors.confirmPassword}
              />
              {renderError('confirmPassword')}

              {/* Year of Birth (Worker only) */}
              {savedRole === "Substitute" && (
                <>
                  <TextInputField
                    placeholder="Year of birth"
                    value={credentials.yearOfBirth}
                    onChangeText={(text) => handleChange('yearOfBirth', text)}
                    firstLogo
                    img={imageIndex.calneder}
                    keyboardType='numeric'
                    maxLength={4}
                    error={errors.yearOfBirth}
                  />
                  {renderError('yearOfBirth')}
                </>
              )}

              {/* Address Field */}
              <TextInputField
                placeholder="Address"
                value={credentials.address}
                onChangeText={(text) => handleChange('address', text)}
                firstLogo
                img={imageIndex.location}
                error={errors.address}
                multiline
                numberOfLines={3}
              />
              {renderError('address')}

              {/* Worker Education Section */}
              {savedRole === "Substitute" && (
                <>
                  <Text style={styles.sectionTitle}>Education Details</Text>
                  
                  {/* Education Level Dropdown */}
                  <TouchableOpacity
                    style={[styles.dropdown, errors.educationLevel && styles.errorBorder]}
                    onPress={() => setDropdownVisible(true)}
                  >
                    <View style={styles.dropdownContent}>
                      <Image 
                        source={imageIndex.Level}
                        style={styles.dropdownIcon}
                      />
                      <Text style={[
                        styles.dropdownText, 
                        !credentials.educationLevel && styles.placeholderText
                      ]}>
                        {credentials.educationLevel || 'Level of Education'}
                      </Text>
                    </View>
                    <Image 
                      source={imageIndex.arrowqdown}
                      style={styles.dropdownArrow}
                    />
                  </TouchableOpacity>
                  {renderError('educationLevel')}

                  {/* Education Modal */}
                  <Modal
                    visible={dropdownVisible}
                    transparent
                    animationType="fade"
                  >
                    <TouchableOpacity
                      style={styles.modalOverlay}
                      onPress={() => setDropdownVisible(false)}
                    >
                      <View style={styles.modalContent}>
                        <FlatList
                          data={educationOptions}
                          keyExtractor={(item) => item}
                          renderItem={({ item }) => (
                            <TouchableOpacity
                              style={styles.modalItem}
                              onPress={() => handleSelectEducation(item)}
                            >
                              <Text style={styles.modalItemText}>{item}</Text>
                            </TouchableOpacity>
                          )}
                        />
                      </View>
                    </TouchableOpacity>
                  </Modal>

                  <TextInputField
                    placeholder="Degree"
                    value={credentials.degree}
                    onChangeText={(text) => handleChange('degree', text)}
                    firstLogo
                    img={imageIndex.heart}
                  />

                  <TextInputField
                    placeholder="School Name"
                    value={credentials.schoolName}
                    onChangeText={(text) => handleChange('schoolName', text)}
                    firstLogo
                    img={imageIndex.Health}
                  />

                  <TextInputField
                    placeholder="Year of Graduation"
                    value={credentials.yearOfGraduation}
                    onChangeText={(text) => handleChange('yearOfGraduation', text)}
                    firstLogo
                    img={imageIndex.yerar}
                    keyboardType='numeric'
                    maxLength={4}
                    error={errors.yearOfGraduation}
                  />
                  {renderError('yearOfGraduation')}

                  {/* Criminal Record Checkbox */}
                  <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={handleCriminalRecordChange}
                  >
                    <View style={styles.checkboxOuter}>
                      {credentials.criminalRecordExtract && <View style={styles.checkboxInner} />}
                    </View>
                    <Text style={styles.checkboxLabel}>
                      I have a valid Criminal Record Extract for working with children
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              
              {/* Terms & Conditions Checkbox */}
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setTermsAccepted(!termsAccepted)}
              >
                <View style={[
                  styles.checkboxOuter, 
                  !termsAccepted && errors.general && styles.checkboxError
                ]}>
                  {termsAccepted && <View style={styles.checkboxInner} />}
                </View>
                <Text style={styles.checkboxLabel}>
                  I agree to the Terms & Conditions
                </Text>
              </TouchableOpacity>
            </View>

            {/* Submit Button */}
            <CustomButton
              title={savedRole === "Substitute" ? "Submit" : "Submit for Approval"}
              onPress={handleSignup}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate(ScreenNameEnum.Login as any)}>
              <Text style={styles.signUpLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  logo: {
    height: 44,
    width: 120,
    alignSelf: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 18,
    color: "black"
  },
  subtitle: {
    fontSize: 16,
    color: '#9DB2BF',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  formContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: "black",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 10
  },
  dropdown: {
    borderWidth: 1,
    backgroundColor: '#F7F8F8',
    borderColor: '#F7F8F8',
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownIcon: {
    height: 20,
    width: 20,
  },
  dropdownText: {
    marginLeft: 8,
    fontSize: 16,
  },
  placeholderText: {
    color: '#999',
  },
  dropdownArrow: {
    tintColor: "black",
    height: 20,
    width: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 10,
    maxHeight: '50%',
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  modalItemText: {
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 15,
  },
  checkboxOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF4081',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF4081',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    lineHeight: 20,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  signUpText: {
    fontSize: 17,
    color: '#909090',
    fontWeight: '500'
  },
  signUpLink: {
    fontSize: 17,
    fontWeight: '700',
    color: '#F3178B'
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: -8,
    marginBottom: 10,
    marginLeft: 5,
  },
  errorBorder: {
    borderColor: '#FF3B30',
    borderWidth: 1,
  },
  checkboxError: {
    borderColor: '#FF3B30',
  },
  generalError: {
    backgroundColor: '#FFE5E5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#FF3B30',
  },
  generalErrorText: {
    color: '#D32F2F',
    fontSize: 14,
    fontWeight: '500',
  },
});