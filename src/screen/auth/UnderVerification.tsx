import {
  View,
  Text,
  Image,
  ScrollView,

} from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBarCompoent from '../../compoent/StatusBarCompoent';
import imageIndex from '../../assets/imageIndex';
import CustomButton from '../../compoent/CustomButton';
import CustomHeader from '../../compoent/CustomHeader';
// import useForgot from './useForgot';
import LoadingModal from '../../utils/Loader'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function UnderVerification() {
 const navigation = useNavigation()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBarCompoent />
      <ScrollView showsVerticalScrollIndicator={false} >
         <View style={{ marginTop: 18 }}>
          <CustomHeader label='Back' />
        </View>
        <View
          style={{
            backgroundColor: '#FFF',        // White background
            marginTop: hp(4),               // Responsive top margin
            marginHorizontal: 15,           // Horizontal margin
            borderColor: '#ccc',            // Add border color for better visibility
            borderRadius: 20,               // Rounded corners (optional but recommended)
            shadowColor: '#000',            // iOS shadow
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
            }}>Under Review</Text>
            <Text style={{
              fontWeight: '400',
              fontSize: 16,
              color: '#9DB2BF',
              marginTop: 4,
              lineHeight: 20,
              textAlign: 'center',
              marginHorizontal:15

            }}>An administrator is checking your information. You Will notified once it approved.</Text>
          </View>
          <View
            // onPress={() => setType("SMS")}

            style={{
              flexDirection: 'row', alignItems: "center", justifyContent: "center", marginTop: 15,
              marginHorizontal: 8,
            }}>
            
          </View>
                 <Image resizeMode='contain' source={imageIndex.review} style={{ width: '70%', height: hp(30), alignSelf: 'center', marginBottom: 30 }} />

          <View style={{
            justifyContent: 'flex-start', marginBottom: 15
            ,
            marginHorizontal: 15
          }}>
            <CustomButton
              title={'Got It'}
               
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>


      </ScrollView>

    </SafeAreaView>
  );
}



