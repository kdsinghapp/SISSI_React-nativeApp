import React, { useEffect, useState } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';

export default function SignUpUI() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [education, setEducation] = useState('');
  const [radioSelected, setRadioSelected] = useState(false);
  const [radioSelected1, setRadioSelected1] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
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
  const educationOptions = ['High School', 'Bachelor', 'Master', 'PhD'];

  const handleSelectEducation = (item) => {
    setEducation(item);
    setDropdownVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBarComponent/> 
      <CustomHeader/>
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
          <Image source={imageIndex.appLogo}  
          resizeMode='cover'
          style={styles.logo} />
          {/* Title */}
          <Text style={styles.title}>
            {savedRole == "Substitute" ?  "Worker Registration" :"Institution Registration"}
          </Text>
          <Text style={styles.subtitle}>
            Fill your details to create your worker profile
          </Text>

          {/* Form */}
          <View style={styles.formContainer}>

            {
              savedRole === "Substitute" ?    (
                 <TextInputField
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
              firstLogo
              img={imageIndex.Textprofile}
            />
              ) :(
                <>
                 <TextInputField
              placeholder="Institution Name"
            
              firstLogo
              img={imageIndex.Level}
            />
                 <TextInputField
              placeholder="Unit Name"
            
              firstLogo
              img={imageIndex.Health}
            />
                 <TextInputField
              placeholder="Unit Manager Name"
            
              firstLogo
              img={imageIndex.Textprofile}
            />
            </>
              )
            }
           
            <TextInputField
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              firstLogo
              img={imageIndex.mess}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInputField
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              firstLogo
              img={imageIndex.Textphone}
              keyboardType="phone-pad"
            />
            <TextInputField
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              firstLogo
              showEye
              img={imageIndex.textLock}
              secureTextEntry
            />
            <TextInputField
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              firstLogo
              showEye
              img={imageIndex.textLock}
              secureTextEntry
            />
              { savedRole === "Substitute" &&  
              
              <TextInputField
              placeholder="Year of birth"
               firstLogo
               img={imageIndex.calneder}
             />
              }

             
  <TextInputField
              placeholder="Address"
               firstLogo
               img={imageIndex.location}
             /> 


             {
              savedRole == "Substitute" && <>
                           <Text style={{
              color:"black",
              fontSize:20,
              fontWeight:"600" ,
              marginTop:8,
              marginBottom:10

             }}>Education Details</Text>
             <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setDropdownVisible(true)}
            >
              <View style={{flexDirection:"row" ,
                alignItems:"center"
              }}>
               <Image source={imageIndex.Level} 
              style={{
                 height:20,
                width:20
              }}
              />
              <Text style={{marginLeft:8, color: education ? '#000' : '#999' }}>
                {education || 'Level of Education'}
              </Text> 
              </View>
              <Image source={imageIndex.arrowqdown} 
              style={{
                tintColor:"black",
                height:20,
                width:20
              }}
              />
            </TouchableOpacity>
  <TextInputField
              placeholder="Degree"
               firstLogo
               img={imageIndex.heart}
             /> 
  <TextInputField
              placeholder="School Name"
               firstLogo
               img={imageIndex.Health}
             /> 

           
             
               <TextInputField
              placeholder="Year of Graduation"
               firstLogo
               img={imageIndex.yerar}
             /> 

     
             

              </>
             }

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

            {/* Radio Button */}
            { savedRole == "Substitute" &&  <>
            
            <TouchableOpacity
              style={styles.radioContainer}
              onPress={() => setRadioSelected(!radioSelected)}
            >
              <View style={styles.radioOuter}>
                {radioSelected && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioLabel}>
               I have a valid Criminal Record Extract for working with children
              </Text>
            </TouchableOpacity>
            </>}
            
            <TouchableOpacity
              style={styles.radioContainer}
              onPress={() => setRadioSelected1(!radioSelected1)}
            >
              <View style={styles.radioOuter}>
                {radioSelected1 && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioLabel}>
                I agree to the Terms & Conditions
              </Text>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <CustomButton title="Submit" onPress={() =>navgation.navigate(ScreenNameEnum.Login)} />
            </View>
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
});
