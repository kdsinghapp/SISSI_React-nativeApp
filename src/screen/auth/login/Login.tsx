import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import imageIndex from '../../../assets/imageIndex';
import CustomButton from '../../../compoent/CustomButton';
import ScreenNameEnum from '../../../routes/screenName.enum';
import LoadingModal from '../../../utils/Loader';
import useLogin from './useLogin';
import TextInputField from '../../../compoent/TextInputField';
import { color } from '../../../constant';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const {
    credentials,
    errors,
    isLoading,
    navigation,
    handleChange,
    handleLogin,
    labels
  } = useLogin();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
      <LoadingModal visible={isLoading} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          {/* App Logo */}
          <Image
            source={imageIndex.appLogo}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Login Title */}
          <Text style={styles.title}>{labels.login}</Text>
          <Text style={styles.subtitle}>
            {labels.enterDetails}
          </Text>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <TextInputField
              placeholder={labels.email}
              text={credentials.email}
              img={imageIndex.userLogo}
              firstLogo={true}
              onChangeText={(value: any) => handleChange('email', value)}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TextInputField
              placeholder={labels.password}
              text={credentials.password}
              img={imageIndex.lock}
              firstLogo={true}
              showEye={true}
              onChangeText={(value: any) => handleChange('password', value)}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={() => navigation.navigate(ScreenNameEnum.PasswordReset)}
          >
            <Text style={styles.forgotText}>{labels.forgotPassword}</Text>
          </TouchableOpacity>

          <View style={{
            marginTop: 15,
            marginBottom: 15,
            marginHorizontal: 15
          }}>
            <CustomButton
              title={labels.login}
              onPress={handleLogin}
              style={styles.loginBtn}
            />
          </View>
        </View>
      </ScrollView>

      {/* Footer / Sign Up */}
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>{labels.noAccount}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(ScreenNameEnum.Sinup)}
        >
          <Text style={styles.signUpLink}>{labels.signUp}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  innerContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: hp(10),
    marginHorizontal: 15,
    borderColor: '#ccc',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3.84,
    elevation: 8,
  },
  // often needed with elevation },
  logo: { height: 80, width: 120, alignSelf: 'center', },
  title: { fontSize: 28, fontWeight: '600', color: 'black', textAlign: 'center' },
  subtitle: { fontSize: 15, color: '#9DB2BF', textAlign: 'center', marginTop: 5 },
  inputContainer: { marginTop: 20, marginHorizontal: 15 },
  errorText: { color: 'red', fontSize: 12, marginTop: 5 },
  forgotText: { textAlign: 'center', color: 'black', fontSize: 14, marginTop: 15 },
  loginBtn: { marginTop: 11, borderRadius: 30 },
  orText: { textAlign: 'center', marginTop: 20, fontSize: 16, fontWeight: '500', color: 'black' },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: 10,
    width: '90%',
    paddingVertical: 12,
    justifyContent: 'center',
    marginTop: 25,
  },
  googleLogo: { width: 20, height: 20, marginRight: 10 },
  googleText: { fontSize: 17, fontWeight: '500', color: '#909090' },
  signUpContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 30, },
  signUpText: { fontSize: 17, color: '#909090', fontWeight: '500' },
  signUpLink: { fontSize: 17, fontWeight: '700', color: color.primary },
});
