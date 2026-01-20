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
import { color } from "../../../constant";
import { GetApi, PostApi } from "../../../api/apiRequest";
import { successToast } from "../../../utils/customToast";
import { loginSuccess } from "../../../redux/feature/authSlice";
import LoadingModal from "../../../utils/Loader";
import { language } from "../../../constant/Language";
import { useLanguage } from "../../../LanguageContext";

const EditProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLogin = useSelector((state: any) => state.auth);
  const { labels} = useLanguage();

  const [loading, setLoading] = useState(false);
  const [savedRole, setSavedRole] = useState<string | null>(null);

  // FORM STATES
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [education, setEducation] = useState("");
  const [degree, setDegree] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [unitName, setUnitName] = useState("");
  const [unitManager, setUnitManager] = useState("");
  const [image, setImage] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const educationOptions = [
    labels.highSchool,
    labels.bachelor,
    labels.master,
    labels.phd
  ];

  const loadRole = async () => {
    const role = await AsyncStorage.getItem("userRole");
    if (role) setSavedRole(role);
  };

  const getProfile = async () => {
    const param = {
      url: "auth/get-profile",
      user_id: isLogin?.userData?.id,
      token: isLogin?.token,
    };
    const res = await GetApi(param, setLoading);
    const data = res?.data?.user_data;
    if (!data) return;

    setFullName(data.user_name || "");
    setEmail(data.email || "");
    setPhone(data.mobile_number || "");
    setAddress(data.address || "");
    setDob(data.dob || "");
    setEducation(data.education || "");
    setDegree(data.degree || "");
    setSchoolName(data.school_name || "");
    setGraduationYear(data.year_of_graduation || "");
    setUnitName(data.unit_name || "");
    setUnitManager(data.unit_manager_name || "");
    setImageUrl(data.image || null);
  };

  useEffect(() => {
    loadRole();
    getProfile();
  }, []);

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

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append("user_name", fullName);
    formData.append("email", email);
    formData.append("mobile_number", phone);
    formData.append("address", address);
    formData.append("dob", dob);

    if (savedRole === "Substitute") {
      formData.append("education", education);
      formData.append("degree", degree);
      formData.append("school_name", schoolName);
      formData.append("year_of_graduation", graduationYear);
    } else {
      formData.append("unit_name", unitName);
      formData.append("unit_manager_name", unitManager);
    }

    if (image) {
      formData.append("image", {
        uri: image.uri,
        type: image.type,
        name: image.fileName || "profile.jpg",
      });
    }

    const param = {
      url: "auth/update-profile",
      token: isLogin?.token,
      data: formData,
      isFormData: true,
    };

    const res = await PostApi(param, setLoading);
    if (res?.status) {
      dispatch(loginSuccess({ userData: res?.data, token: isLogin?.token }));
      successToast(labels.profileUpdated);
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading && <LoadingModal />}
      <StatusBarComponent />
      <CustomHeader label={labels.myProfile} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
        >
          {/* PROFILE IMAGE */}
          <View style={styles.profileContainer}>
            <Image
              source={
                image ? { uri: image.uri } : 
                imageUrl ? { uri: imageUrl } : 
                imageIndex.prfile
              }
              style={styles.profileImage}
            />
            <TouchableOpacity
              style={styles.editIconContainer}
              onPress={() => setIsModalVisible(true)}
            >
              <Image source={imageIndex.eoditphots} style={styles.editIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <View style={styles.formContainer}>
              {savedRole === "Substitute" ? (
                <TextInputField
                  placeholder={labels.fullName}
                  value={fullName}
                  onChangeText={setFullName}
                  firstLogo
                  img={imageIndex.Textprofile}
                />
              ) : (
                <>
                  <TextInputField
                    placeholder={labels.institutionName}
                    firstLogo
                    img={imageIndex.Level}
                    value={fullName}
                    onChangeText={setFullName}
                  />
                  <TextInputField
                    placeholder={labels.unitName}
                    firstLogo
                    img={imageIndex.Health}
                    value={unitName}
                    onChangeText={setUnitName}
                  />
                  <TextInputField
                    placeholder={labels.unitManagerName}
                    firstLogo
                    img={imageIndex.Textprofile}
                    value={unitManager}
                    onChangeText={setUnitManager}
                  />
                </>
              )}

              <TextInputField
                placeholder={labels.email}
                value={email}
                onChangeText={setEmail}
                firstLogo
                img={imageIndex.mess}
                editable={false}
              />

              <TextInputField
                placeholder={labels.phoneNumber}
                value={phone}
                onChangeText={setPhone}
                firstLogo
                img={imageIndex.Textphone}
                keyboardType="phone-pad"
              />

              <TextInputField
                placeholder={labels.address}
                value={address}
                onChangeText={setAddress}
                firstLogo
                img={imageIndex.location}
              />

              {savedRole === "Substitute" && (
                <>
                  <Text style={styles.sectionTitle}>{labels.educationDetails}</Text>
                  <TouchableOpacity
                    style={styles.dropdown}
                    onPress={() => setDropdownVisible(true)}
                  >
                    <View style={styles.dropdownContent}>
                      <Image source={imageIndex.Level} style={styles.dropdownIcon} tintColor={color.primary} />
                      <Text style={{ marginLeft: 8, color: education ? "#000" : "#999" }}>
                        {education || labels.levelOfEducation}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TextInputField
                    placeholder={labels.degree}
                    value={degree}
                    onChangeText={setDegree}
                    img={imageIndex.heart}
                    firstLogo
                  />

                  <TextInputField
                    placeholder={labels.schoolName}
                    value={schoolName}
                    onChangeText={setSchoolName}
                    firstLogo
                    img={imageIndex.Health}
                  />

                  <TextInputField
                    placeholder={labels.yearOfGraduation}
                    value={graduationYear}
                    onChangeText={setGraduationYear}
                    firstLogo
                    img={imageIndex.yerar}
                    keyboardType="numeric"
                  />
                </>
              )}

              <View style={{ marginTop: 20, marginBottom: 40 }}>
                <CustomButton
                  title={labels.updateProfile}
                  onPress={handleUpdateProfile}
                />
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

      <Modal visible={dropdownVisible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setDropdownVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={educationOptions}
              keyExtractor={(i) => i}
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
    borderColor: color.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: color.primary,
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