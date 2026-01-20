import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import StatusBarComponent from '../../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../../compoent/CustomHeader';
import TextInputField from '../../../../compoent/TextInputField';
import CustomButton from '../../../../compoent/CustomButton';
import LoadingModal from '../../../../utils/Loader';
import PasswordSuccessfullyModal from '../../../../compoent/ PasswordSuccessfullyModal';

import imageIndex from '../../../../assets/imageIndex';
import ResponsiveSize from '../../../../utils/ResponsiveSize'; 
import useCreateNewPassword from './useCreateNewPassword';
import { language } from '../../../../constant/Language';

export default function CreateNewPassword() {
  const labels = language.fi;
  const { credentials, errors, isLoading, handleChange, handleResetPass } = useCreateNewPassword();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBarComponent />
      <View style={styles.headerContainer}>
        <CustomHeader label={labels.back} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading && <LoadingModal />}

        <View style={styles.cardContainer}>
          <View style={styles.textSection}>
            <Text style={styles.title}>{labels.createNewPassword}</Text>
            <Text style={styles.description}>{labels.passwordDesc}</Text>
          </View>

          <View style={styles.inputSection}>
            <TextInputField
              lable={labels.passwordLabel}
              text={credentials.password}
              placeholder={labels.passwordLabel}
              onChangeText={(val) => handleChange('password', val)}
              firstLogo showEye img={imageIndex.lock}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <View style={{ marginTop: 12 }}>
              <TextInputField
                lable={labels.confirmPasswordLabel}
                text={credentials.confirmPassword}
                placeholder={labels.confirmPasswordLabel}
                onChangeText={(val) => handleChange('confirmPassword', val)}
                firstLogo showEye img={imageIndex.lock}
              />
            </View>
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton title={labels.save} onPress={handleResetPass} />
          </View>
        </View>

        <PasswordSuccessfullyModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  headerContainer: { marginTop: 5 },
  cardContainer: {
    backgroundColor: '#FFF',
    marginTop: hp(4),
    marginHorizontal: 15,
    borderRadius: 20,
    paddingBottom: 20,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3.84,
    elevation: 8,
  },
  textSection: { marginTop: 5, paddingHorizontal: 10 },
  title: {
    fontWeight: '700', fontSize: 24, lineHeight: 36,
    color: '#000', textAlign: 'center', marginTop: 8
  },
  description: {
    fontWeight: '400', fontSize: 16, color: '#9DB2BF',
    marginTop: 5, lineHeight: 20, textAlign: 'center'
  },
  inputSection: {
    marginHorizontal: 15,
    marginTop: ResponsiveSize.marginTop(18),
    paddingVertical: hp(2)
  },
  errorText: { color: 'red', fontSize: 14, marginTop: 8 },
  buttonContainer: { marginHorizontal: 15, marginBottom: 10 }
});