import {
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBarCompoent from '../../../compoent/StatusBarCompoent';
import imageIndex from '../../../assets/imageIndex';
import CustomButton from '../../../compoent/CustomButton';
import CustomHeader from '../../../compoent/CustomHeader';
import useForgot from './useForgot';
import LoadingModal from '../../../utils/Loader'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputField from '../../../compoent/TextInputField';
import { language } from '../../../constant/Language';
import { useLanguage } from '../../../LanguageContext';
// Import your language object here 

export default function PasswordReset() {
  const { credentials,
    errors,
    isLoading,
    handleChange,
    handleForgot,
    navigation, } = useForgot();

  // Reference Finnish strings
  const { labels} = useLanguage();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBarCompoent />
      <ScrollView showsVerticalScrollIndicator={false} >
        {isLoading ? <LoadingModal /> : null}
        
        <View style={{ marginTop: 18 }}>
          <CustomHeader label={labels.back} />
        </View>

        <View
          style={{
            backgroundColor: '#FFF',
            marginTop: hp(4),
            marginHorizontal: 15,
            borderColor: '#ccc',
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.12,
            shadowRadius: 3.84,
            elevation: 8,
          }}>
          
          <View style={{ marginTop: 6 }}>
            <Text style={{
              fontWeight: '700',
              fontSize: 24,
              lineHeight: 36,
              color: 'rgba(0, 0, 0, 1)',
              textAlign: 'center'
            }}>{labels.passwordReset}</Text>
            
            <Text style={{
              fontWeight: '400',
              fontSize: 16,
              color: '#9DB2BF',
              marginTop: 4,
              lineHeight: 20,
              textAlign: 'center'
            }}>
              {labels.emailResetPrompt}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row', 
              alignItems: "center", 
              justifyContent: "center", 
              marginTop: 15,
              marginHorizontal: 8,
            }}>
            <TextInputField
              placeholder={labels.emailPlaceholder}
              text={credentials.email}
              img={imageIndex.mess}
              firstLogo={true}
              onChangeText={(value: any) => handleChange('email', value)}
            />
          </View>

          <Text style={{
            color: "red",
            marginBottom: 15,
            marginLeft: 15
          }}>{errors.email}</Text>

          <View style={{
            justifyContent: 'flex-start', 
            marginBottom: 15,
            marginHorizontal: 15
          }}>
            <CustomButton
              title={labels.send}
              onPress={() => handleForgot()}
            />
          </View>
        </View>

        <Image 
          resizeMode='contain' 
          source={imageIndex.resetPassword} 
          style={{ width: '70%', height: hp(50), alignSelf: 'center', marginBottom: 30 }} 
        />
      </ScrollView>
    </SafeAreaView>
  );
}

