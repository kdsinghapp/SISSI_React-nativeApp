import {
  View,
  Text,
  ScrollView
} from 'react-native';
import React from 'react';
import {
  CodeField,
  Cursor,
} from 'react-native-confirmation-code-field';
import CustomButton from '../../../compoent/CustomButton';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';
import { useOtpVerification } from './useOTPVerification'; 
import CustomHeader from '../../../compoent/CustomHeader';
import LoadingModal from '../../../utils/Loader'; 
import { hp } from '../../../utils/Constant';
import { useLanguage } from '../../../LanguageContext';

export default function OtpScreen() {
  const {
    value,
    isLoading,
    errorMessage,
    ref,
    props,
    timer,
    getCellOnLayoutHandler,
    handleChangeText,
    handleVerifyOTP,
    handleResendOTP,
    navigation,
    data
  } = useOtpVerification()
  const { labels} = useLanguage();
return (
  <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <StatusBarComponent />
    <CustomHeader label={labels.back} />
    <LoadingModal visible={isLoading} />
    
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: '#FFF',
            marginTop: hp(4),
            borderRadius: 15,
            padding: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.22,
            shadowRadius: 3.70,
            elevation: 8,
          }}>
          
          <View style={styles.headerSection}>
            <Text style={styles.txtHeading}>{labels.checkMail}</Text>
            <Text style={styles.txtDes}>
              {labels.otpDescription} {data?.email}
            </Text>
          </View>

          <View style={styles.otpFieldContainer}>
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={handleChangeText}
              cellCount={4}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <View key={index} style={styles.cellWrapper}>
                  <Text
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}
                  >
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          </View>

          <View style={{ marginTop: 15 }}>
            <CustomButton
              title={labels.submit}
              onPress={handleVerifyOTP}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  </SafeAreaView>
);
}