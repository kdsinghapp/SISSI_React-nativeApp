import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
   StyleSheet,
 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputField from '../../../compoent/TextInputField';
import CustomButton from '../../../compoent/CustomButton';
import imageIndex from '../../../assets/imageIndex';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import CustomHeader from '../../../compoent/CustomHeader';
 import { useNavigation } from '@react-navigation/native';
 
export default function CreateNewShift() {
   const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [education, setEducation] = useState('');
  const [radioSelected, setRadioSelected] = useState(false);
  const [radioSelected1, setRadioSelected1] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
 const navgation = useNavigation()
  // Function to load the saved role
 
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBarComponent/> 
      <CustomHeader label='Create New Shift'/>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView  
        showsVerticalScrollIndicator={false}
        style={{
          marginHorizontal:20 ,
           marginTop: hp(3), 
           backgroundColor:"white" ,
  
        }} >
          {/* Logo */}
          <View style={{
                 backgroundColor: '#FFF',        // White background
     marginHorizontal: 5,           // Horizontal margin
     borderColor: '#ccc',            // Add border color for better visibility
    borderRadius: 10,               // Rounded corners (optional but recommended)
    shadowColor: '#000',            // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3.84,
    elevation: 5, 
    padding:15 ,
    marginTop:11,
    marginBottom:60
          }}>
        
         

          {/* Form */}
          <View style={styles.formContainer}>

         
           
            <TextInputField
              placeholder="Date"
              value={email}
              onChangeText={setEmail}
              firstLogo
              img={imageIndex.calneder}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInputField
              placeholder="Time Startr"
              value={phone}
              onChangeText={setPhone}
              firstLogo
              img={imageIndex.time2}
             />
            <TextInputField
              placeholder="Time End"
              value={password}
              onChangeText={setPassword}
              firstLogo
               img={imageIndex.time2}
             />
            <TextInputField
              placeholder="Location"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              firstLogo
               img={imageIndex.location}
               
            />
              

             
  <TextInputField
              placeholder="Unit"
               firstLogo
               img={imageIndex.Level}
             /> 

  <TextInputField
              placeholder="Description"
               firstLogo
               img={imageIndex.Phone1}
             /> 
 
       

 
           
          </View>

 
        
            </View>

   <CustomButton title= {
               "Post Shift"
          }  />
        </ScrollView>
        
      </KeyboardAvoidingView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
 height: 44, width: 120, alignSelf: 'center',
   },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 5, 
    marginTop:18 ,
    color:"black"
  },
  subtitle: {
    fontSize: 16,
    color: '#9DB2BF',
    textAlign: 'center',
    marginBottom: 20,
        marginTop:10 , 
      

  },
  formContainer: {
    marginBottom: 20,
  },
  dropdown: {
    borderWidth: 1,
      backgroundColor: '#F7F8F8',
            borderColor: '#F7F8F8',
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
    flexDirection:"row",
    justifyContent:"space-between" ,

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
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  modalItemText: {
    fontSize: 16,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF4081',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF4081',
  },
  radioLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
    signUpContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom:30, },
  signUpText: { fontSize: 17, color: '#909090', fontWeight: '500' },
  signUpLink: { fontSize: 17, fontWeight: '700', color: '#F3178B' },

});
