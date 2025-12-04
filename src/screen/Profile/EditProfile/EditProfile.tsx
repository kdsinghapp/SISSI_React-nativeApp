import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  FlatList,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import CustomHeader from "../../../compoent/CustomHeader";
import CustomButton from "../../../compoent/CustomButton";
import ImagePickerModal from "../../../compoent/ImagePickerModal";
import imageIndex from "../../../assets/imageIndex";
import TextInputField from "../../../compoent/TextInputField";
 import ScreenNameEnum from "../../../routes/screenName.enum";

const EditProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userData: any = useSelector((state: any) => state.auth.userData);

  const [fullName, setFullName] = useState(userData?.firstName || "Emma Johnson");
  const [email, setEmail] = useState(userData?.email || "");
  const [address, setAddress] = useState(userData?.address || "");
  const [phone, setPhone] = useState(userData?.phone || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [image, setImage] = useState<any>(userData?.image || null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [radioSelected, setRadioSelected] = useState(false);
  const [radioSelected1, setRadioSelected1] = useState(false);

  const [education, setEducation] = useState("");
  const educationOptions = ["High School", "Bachelor", "Master", "PhD"];
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const [savedRole, setSavedRole] = useState(null); // CLEAN FIX

  // ====================== GET SAVED ROLE ======================
  const loadRole = async () => {
    const role = await AsyncStorage.getItem("userRole");
    if (role) setSavedRole(role);
  };

  useEffect(() => {
    loadRole();
  }, []);

  // ====================== IMAGE PICKER ======================
  const pickImageFromGallery = () => {
    launchImageLibrary({ mediaType: "photo" }, (res) => {
      if (res.assets?.[0]) {
        setImage(res.assets[0]);
        setIsModalVisible(false);
      }
    });
  };

  const takePhotoFromCamera = () => {
    launchCamera({ mediaType: "photo" }, (res) => {
      if (res.assets?.[0]) {
        setImage(res.assets[0]);
        setIsModalVisible(false);
      }
    });
  };

  // ====================== HANDLE SUBMIT ======================
  const handleSubmit = () => {
    navigation.navigate(ScreenNameEnum.Login);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBarComponent />
      <CustomHeader label="My Profile" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* ====================== PROFILE IMAGE ====================== */}
          <View style={styles.profileContainer}>
            <Image
              // source={image ? { uri: image.uri } : imageIndex.prfile}

              source={{ uri: "https://i.pravatar.cc/300" }}
              style={styles.profileImage}
              resizeMode="cover"
            />

            <TouchableOpacity
              style={styles.editIconContainer}
              onPress={() => setIsModalVisible(true)}
            >
              {/* <Image source={imageIndex.eoditphots} style={styles.editIcon} 
              tintColor={"#F3178B"} /> */}
            </TouchableOpacity>
          </View>
          <Text style={{
            textAlign:"center" ,
            fontSize:20 ,
            color:"black" ,
            fontWeight:"600"
          }}>Ashlynn Bergson</Text>
          <Text 
          
          style={{
            textAlign:"center" ,
            fontSize:13 ,
            color:"#6B7280" ,
            fontWeight:"600" ,
            marginTop:8
          }}
          >@Ashlynn</Text>
          <View style={styles.card}>


            <View style={styles.formContainer}>
              {savedRole === "Substitute" ? (
                <TextInputField
                  placeholder="Full Name"
                  value={fullName}
                  onChangeText={setFullName}
                  firstLogo
                  img={imageIndex.Textprofile}
                />
              ) : (
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
              )}

              {/* COMMON FIELDS */}
              <TextInputField
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                firstLogo
                img={imageIndex.mess}
                keyboardType="email-address"
              />

              <TextInputField
                placeholder="Phone Number"
                value={phone}
                onChangeText={setPhone}
                firstLogo
                img={imageIndex.Textphone}
                keyboardType="phone-pad"
              />



              {savedRole === "Substitute" && (
                <TextInputField
                  placeholder="Year of birth"
                  firstLogo
                  img={imageIndex.calneder}
                />
              )}

              <TextInputField
                placeholder="Address"
                firstLogo
                img={imageIndex.location}
              />

              {/* ====================== EDUCATION (ONLY SUBSTITUTE) ====================== */}
              {savedRole === "Substitute" && (
                <>
                  <Text style={styles.sectionTitle}>Education Details</Text>

                  <TouchableOpacity
                    style={styles.dropdown}
                    onPress={() => setDropdownVisible(true)}
                  >
                    <View style={styles.dropdownContent}>
                      <Image source={imageIndex.Level} style={styles.dropdownIcon} />
                      <Text style={{ marginLeft: 8, color: education ? "#000" : "#999" }}>
                        {education || "Level of Education"}
                      </Text>
                    </View>

                    <Image
                      source={imageIndex.arrowqdown}
                      style={{ width: 18, height: 18 }}
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
              )}
              <Text style={styles.sectionTitle}>Worker Experience</Text>

              <TextInputField

                placeholder="Write here "
              />
              <View style={{
                marginTop: 15
              }}>

                <CustomButton title="Edit Profile" onPress={handleSubmit} />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <ImagePickerModal
        modalVisible={isModalVisible}
        setModalVisible={setIsModalVisible}
        pickImageFromGallery={pickImageFromGallery}
        takePhotoFromCamera={takePhotoFromCamera}
      />

      <Modal visible={dropdownVisible} transparent animationType="fade">
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
                  onPress={() => {
                    setEducation(item);
                    setDropdownVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default EditProfile;


const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFF" },

  profileContainer: {
    alignItems: "center",
    marginTop: 20,
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 135,
  },

  editIcon: { width: 33, height: 33 },

  card: {
    backgroundColor: "#FFF",
    padding: 18,
  },

  logo: {
    height: 44,
    width: 120,
    alignSelf: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 15,
    color: "black",
  },

  subtitle: {
    textAlign: "center",
    color: "#9DB2BF",
    marginTop: 5,
    marginBottom: 20,
  },

  formContainer: {
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 15,
    color: "black",
  },

  dropdown: {
    borderWidth: 1,
    borderColor: "#F7F8F8",
    backgroundColor: "#F7F8F8",
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dropdownContent: { flexDirection: "row", alignItems: "center" },

  dropdownIcon: { height: 20, width: 20 },

  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },

  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FF4081",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF4081",
  },

  radioLabel: { flex: 1, color: "#333" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    backgroundColor: "#FFF",
    width: "80%",
    borderRadius: 10,
  },

  modalItem: { padding: 15, borderBottomWidth: 1, borderColor: "#EEE" },

  modalItemText: { fontSize: 16 },
});
