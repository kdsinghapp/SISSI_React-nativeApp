//   getProfile:'profile/view-profile',
//   uploadFile:'upload/file',
//  createProfile:'profile/create-profile',
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as ImagePicker from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
import useQueryApi from "../services/queries/useQueryApi";
import { EndPoints } from "../services/EndPoints";
import LoadingModal from "../Components/Loader";
// import {  } from "../services/mutations";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { BaseUrl } from "../api/authApi/BaseUrl";
import { mutationHandler } from "../services/mutations/mutationHandler";
const VerifyEmailProfileScreen = () => {
  const navigation = useNavigation<any>();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("9878657880");
  const [email, setEmail] = useState("");
  const [languages, setLanguages] = useState("");
  const [pan, setPan] = useState("");
  const [imageUri, setImageUri] = useState<string | null>("");
  const [imageoldUri, setImageoldUri] = useState<string | null>("");
  const [showPickerModal, setShowPickerModal] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState("");
  const [ready, setReady] = useState(false);
  const [images, setImages] = useState();
  const [loading, setLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
   useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    setToken(userToken || "");
    console.log(userToken)
    setReady(true);
  };
console.log('token___liya__',token)
  const handleConfirm = (date) => {
    setSelectedDate(date.toLocaleDateString());
    hideDatePicker();
    setDob(date.toISOString().split("T")[0]);
    console.log(date.toISOString().split("T")[0]);
  };
 

  const { data: profileData, isLoading: isprofileLoading } = useQueryApi(
    ["getProfiledata"],
    `${EndPoints.getProfile}`,
    token,
    {},
    !!token && ready,
    false,
    { lang: "en" }
  );

  useEffect(() => {
    if (profileData?.data) {
      const user = profileData.data;
      setName(user.name || "");
      setGender(user.gender || "");
      setDob(user.dateOfBirth || "");
      setMobile(user.phone || "");
      setEmail(user.email || "");
      setLanguages(user.languages || "");
      setPan(user.pan || "");
      setImageoldUri(user.image || null);
    }
  }, [profileData]);

  const pickFromCamera = async () => {
    try {
      // Close modal first to prevent UI crash
      setShowPickerModal(false);
      await new Promise((resolve) => setTimeout(resolve, 300)); // small delay

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: "images",
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled) {
        const asset = result.assets[0];
        setImageUri(asset.uri);

        // Create FormData compatible object
        const file: any = {
          uri: asset.uri,
          type: "image/jpeg",
          name: asset.fileName || "photo.jpg",
        };
        setImages(file);
      }
    } catch (error) {
      console.log("Camera error:", error);
    }
  };

  const pickFromGallery = async () => {
    try {
      setShowPickerModal(false);
      await new Promise((resolve) => setTimeout(resolve, 300));

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const asset = result.assets[0];
        setImageUri(asset.uri);

        // Create FormData compatible object
        const file: any = {
          uri: asset.uri,
          type: "image/jpeg",
          name: asset.fileName || "photo.jpg",
        };
        setImages(file);
      }
    } catch (error) {
      console.log("Gallery error:", error);
    }
  };

  const uploadMedia = async () => {
    if (!images) {
      Alert.alert("Please select an image first!");
      return;
    }

    // setLoading(true);

    //   const token = await AsyncStorage.getItem("userToken");

    const formData = new FormData();
    formData.append("files", images); // 'files' should match API field name
    console.log(images);
    try {
      const response = await fetch(
        `https://api.addvey.com/api/${EndPoints.uploadFile}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );

      const result = await response.json();
      console.log("Upload result:", result.data?.files?.[0].path);

      if (result.success) {
        //   Alert.alert("Success", "Image uploaded successfully!");
        return result.data?.files?.[0].path; // return uploaded file URL
      } else {
        Alert.alert("Error", result.message || "Upload failed");
        return null;
      }
    } catch (err) {
      console.log("Upload error:", err);
      Alert.alert("Error", "Something went wrong while uploading.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 📸 Pick Image (Gallery)
  //   const pickImage = () => {
  //     ImagePicker.launchImageLibrary(
  //       { mediaType: "photo", quality: 0.7 },
  //       (response) => {
  //         if (response.didCancel) return;
  //         if (response.errorCode) {
  //           Alert.alert("Error", response.errorMessage || "Image pick failed");
  //           return;
  //         }
  //         const uri = response.assets?.[0]?.uri;
  //         if (uri) setImageUri(uri);
  //       }
  //     );
  //   };

  // 🧾 Validation
  
  const validateForm = () => {
    const newErrors: any = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!gender.trim()) newErrors.gender = "Gender is required";
    if (!dob.trim()) newErrors.dob = "Date of birth is required";
    if (!mobile.trim()) newErrors.mobile = "Mobile number is required";
    else if (!/^\+?\d{10,15}$/.test(mobile))
      newErrors.mobile = "Enter valid mobile number";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Invalid email";
    // if (!languages.trim()) newErrors.languages = "Languages are required";
    // if (!pan.trim()) newErrors.pan = "PAN is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSuccess = async (res: any) => {
    console.log("><><><><><><><><>", res);
    // const response =await JSON.parse(res);
    // if (res?.success) {
    //   navigation.navigate("OTP", { phone: phoneNumber });
    // }
    setLoading(false);
    setTimeout(() => {}, 1000);
    reset();
  };

  const onError = (err: any) => {
    console.log("<><><><><", err);
    setLoading(false);

    reset();
  };

  // useEffect(()=> {
  //   onSuccess()
  // },[])
  const { mutate, isPending, reset } = mutationHandler(
    EndPoints.createProfile,
    token, // todo
    onSuccess,
    onError
  );

  // 📤 Submit
  const handleSubmit = async () => {
    if (!validateForm()) return;
    // setLoading(true);
    const img = await uploadMedia();
    const payload = {
      name: name,
      dateOfBirth: dob,
      gender: gender,
      image: img,
      phone: mobile,
      email: email,
    };
    console.log("<><><><><><", payload);
// ✅ Example: React Native API call with try-catch and async/await

const createUserProfile = async () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6InZlbmRvciIsImlzVmVyaWZpZWQiOnRydWUsImVtYWlsIjoidGVzdHVzZXIyQGdtYWlsLmNvbSIsInBob25lIjoiNjMwNTMwMTkxOCIsImlzQmxvY2tlZCI6ZmFsc2UsImlhdCI6MTc2MDgwMjAzNiwiZXhwIjoxNzYxNDA2ODM2fQ.onHCSwHzrIs3XS8AUJcQWzyLnv2LhKkCKQ0M5dpgEk0";

  try {
    const response = await fetch("https://api.addvey.com/api/profile/create-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: "Govind_ji",
        // name: name,
        // gender: gender,
        gender: "female",
        dateOfBirth: dob,
         email: "sk@gmail.com",
        socialLinks: [
          { platform: "twitter", url: "https://twitter.com/johndoe" },
          { platform: "linkedin", url: "https://linkedin.com/in/johndoe" },
          { platform: "youtube", url: "https://youtube.com/myyoutubechannel" },
        ],
        image: "https://example.com/profile.jpg",
      }),
    });
    console.log('sld__dcssc',JSON.stringify({
        name: "Govind_ji",
        gender: "male",
        dateOfBirth: dob,
         email: email,
        socialLinks: [
          { platform: "twitter", url: "https://twitter.com/johndoe" },
          { platform: "linkedin", url: "https://linkedin.com/in/johndoe" },
          { platform: "youtube", url: "https://youtube.com/myyoutubechannel" },
        ],
        image: "https://example.com/profile.jpg",
      }),)
    // ✅ Handle non-200 responses
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
    }

    const result = await response.json();
    console.log("✅ Profile Created Successfully:", result);

  } catch (error) {
    console.error("❌ Error creating profile:", error.message);
    alert("Something went wrong while creating the profile. Please try again.");
  }
};

// Call the function
createUserProfile();
console.log('call___createUserProfile')
    // mutate(payload);
  };

 

  useEffect(() => {
    (async () => {
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();
      const mediaPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (
        cameraPermission.status !== "granted" ||
        mediaPermission.status !== "granted"
      ) {
        Alert.alert(
          "Permission required",
          "Please allow camera and gallery access."
        );
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {(isprofileLoading || isSubmitting) && <LoadingModal />}
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {loading && <LoadingModal />}
      {/* Fixed Header */}
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={20}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.subtitleRow}>
            <Text style={styles.headerSubtitle}>
              Addvey Partner ID: {profileData?.data?.partnerId}
            </Text>
            <Image
              source={require("../../assets/images/profilesave.png")}
              style={styles.smallImage}
            />
          </View>
        </View>

        <Image
          source={require("../../assets/images/verify.png")}
          style={styles.rightImage}
        />
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#fff" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ paddingBottom: hp("4%") }}>
            {/* Profile Image */}
            <View style={styles.profileContainer}>
              <TouchableOpacity
                onPress={() => {
                  // pickFromCamera()

                  setShowPickerModal(true);
                }}
              >
                <Image
                  source={
                    imageUri
                      ? { uri: imageUri }
                      : imageoldUri
                      ? { uri: Base_URL + imageoldUri }
                      : require("../../assets/images/very.png")
                  }
                  style={styles.profileImage}
                />
                <View style={styles.cameraCenter}>
                  <Ionicons
                    name="camera"
                    style={{
                      backgroundColor: "#fff",
                      paddingHorizontal: wp(1.2),
                      paddingVertical: hp(0.4),
                      borderRadius: 20,
                    }}
                    size={16}
                    color="#6E533F"
                  />
                </View>
              </TouchableOpacity>
              <Image
                source={require("../../assets/images/save.png")}
                style={styles.verifyBadge}
              />
            </View>

            {/* All Inputs - design same, just error below */}
            <View style={styles.inputContainer}>
              {/* Name */}
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Name*</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                />
                {errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
              </View>

              {/* Gender */}
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Gender</Text>
                <TextInput
                  style={styles.input}
                  value={gender}
                  onChangeText={setGender}
                />
                <Ionicons
                  name="male-female"
                  size={16}
                  color="gray"
                  style={styles.inputIcon}
                />
                {errors.gender && (
                  <Text style={styles.errorText}>{errors.gender}</Text>
                )}
              </View>

              {/* DOB */}
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Date of Birth</Text>
                <Text
                  style={styles.input}
                  // value={dob} onChangeText={setDob}
                  onPress={() => setDatePickerVisibility(true)}
                >
                  {dob}
                </Text>
                <Ionicons
                  name="calendar-outline"
                  size={16}
                  color="gray"
                  style={styles.inputIcon}
                />
                {errors.dob && (
                  <Text style={styles.errorText}>{errors.dob}</Text>
                )}
              </View>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />

              {/* Mobile */}
              <View style={styles.inputWrapper}>
                <View style={styles.labelIconRow}>
                  <Ionicons
                    name="call-outline"
                    size={12}
                    color="gray"
                    style={{ marginRight: 4 }}
                  />
                  <Text style={styles.labelText}>Mobile</Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={mobile}
                  onChangeText={setMobile}
                  editable={false}
                />
                <TouchableOpacity style={styles.verifyBtn}>
                  <Image
                    source={require("../../assets/images/verifygreen.png")}
                    style={{
                      marginRight: 4,
                      width: wp(4),
                      height: hp(2),
                      resizeMode: "contain",
                    }}
                  />
                  <Text
                    style={{
                      color: "#32CD32",
                      fontWeight: "600",
                      fontSize: wp("2.8%"),
                    }}
                  >
                    Verified
                  </Text>
                </TouchableOpacity>
                {errors.mobile && (
                  <Text style={styles.errorText}>{errors.mobile}</Text>
                )}
              </View>

              {/* Email */}
              <View style={styles.inputWrapper}>
                <View style={styles.labelIconRow}>
                  <Ionicons
                    name="mail-outline"
                    size={12}
                    color="gray"
                    style={{ marginRight: 4 }}
                  />
                  <Text style={styles.labelText}>Email</Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                />
                <TouchableOpacity style={styles.verifyBtn}>
                  <Text
                    style={{
                      color: "#6C63FF",
                      fontWeight: "600",
                      fontSize: wp("2.8%"),
                    }}
                  >
                    Verify
                  </Text>
                </TouchableOpacity>
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              {/* Languages */}
              <View style={styles.inputWrapper}>
                <View style={styles.labelIconRow}>
                  <Ionicons
                    name="language"
                    size={12}
                    color="gray"
                    style={{ marginRight: 4 }}
                  />
                  <Text style={styles.labelText}>Languages</Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={languages}
                  onChangeText={setLanguages}
                />
                <Ionicons
                  name="create-outline"
                  size={14}
                  color="#6B4EFF"
                  style={styles.inputIcon}
                />
                {errors.languages && (
                  <Text style={styles.errorText}>{errors.languages}</Text>
                )}
              </View>

              {/* PAN */}
              <TouchableOpacity onPress={()=>navigation?.navigate('PANCardUplaod')} style={styles.inputWrapper}>
                <Text style={styles.label}>PAN</Text>
                <TextInput
                  style={styles.input}
                  value={pan}
                  onChangeText={setPan}
                  editable={false}
                />
                {errors.pan && (
                  <Text style={styles.errorText}>{errors.pan}</Text>
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.updateBtn} onPress={handleSubmit}>
              <Text style={styles.updateText}>Update Profile</Text>
            </TouchableOpacity>

            <Modal visible={showPickerModal} transparent animationType="slide">
              <View style={styles.modalOverlay}>
                <TouchableOpacity
                  style={styles.closeIconTopRight}
                  onPress={() => setShowPickerModal(false)}
                >
                  <Ionicons name="close" size={20} color="#000" />
                </TouchableOpacity>

                <View style={styles.modalContent}>
                  <View style={styles.rowOptions}>
                    <TouchableOpacity
                      style={styles.optionBox}
                      onPress={() => {
                        setShowPickerModal(false);
                        pickFromCamera();
                      }}
                    >
                      <FontAwesome6 name="camera" size={38} color="#6C63FF" />
                      <Text style={styles.optionText}>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.optionBox}
                      onPress={pickFromGallery}
                    >
                      <Image
                        source={require("../../assets/images/images.png")}
                        style={{
                          width: wp("10%"),
                          height: wp("10%"),
                          resizeMode: "contain",
                          marginBottom: hp(0.5),
                        }}
                      />
                      <Text style={styles.optionText}>Gallery</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default VerifyEmailProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp("5%"),
    paddingTop: hp("4%"),
    paddingBottom: hp("1%"),
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  titleContainer: {
    flex: 1,
    marginLeft: wp("3%"),
  },
  headerTitle: {
    fontSize: wp("4%"),
    color: "#000",
    fontFamily: "Poppins-Regular",
  },
  subtitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerSubtitle: {
    fontSize: wp("2.8%"),
    color: "#6E533F",
    marginRight: wp("2%"),
  },
  smallImage: {
    width: wp("5%"),
    height: wp("5%"),
    borderRadius: wp("2.5%"),
  },
  rightImage: {
    width: wp("6%"),
    height: wp("6%"),
    borderRadius: wp("3%"),
  },
  profileContainer: {
    alignItems: "center",
    marginTop: hp("15%"),
    marginBottom: hp(3),
  },
  profileImage: {
    width: wp("30%"),
    height: wp("30%"),
    borderRadius: wp("15%"),
    borderWidth: 2,
    borderColor: "#6B4EFF",
  },
  cameraCenter: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: wp("30%"),
    height: wp("30%"),
    borderRadius: wp("15%"),
  },
  verifyBadge: {
    position: "absolute",
    bottom: hp("0.5%"),
    right: wp("37%"),
    width: wp("7%"),
    height: wp("7%"),
    borderRadius: wp("3.5%"),
  },
  inputContainer: {
    marginTop: hp("2%"),
    paddingHorizontal: wp("5%"),
  },
  inputWrapper: {
    marginBottom: hp("3%"),
    position: "relative",
  },
  label: {
    position: "absolute",
    top: -hp("1%"),
    left: wp("5%"),
    backgroundColor: "#fff",
    paddingHorizontal: wp("1%"),
    fontSize: wp("2.8%"),
    color: "#00000099",
    fontWeight: "600",
    zIndex: 1,
  },
  labelIconRow: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: -hp("1%"),
    left: wp("3%"),
    backgroundColor: "#fff",
    paddingHorizontal: wp("1%"),
    zIndex: 2,
  },
  labelText: {
    fontSize: wp("2.8%"),
    color: "#00000099",
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("3%"),
    fontSize: wp("3.5%"),
  },
  inputIcon: {
    position: "absolute",
    right: wp("3%"),
    top: "30%",
  },
  verifyBtn: {
    position: "absolute",
    right: wp("3%"),
    top: "28%",
    flexDirection: "row",
    alignItems: "center",
  },
  updateBtn: {
    backgroundColor: "#6B4EFF",
    borderRadius: 20,
    paddingVertical: hp("1.8%"),
    marginTop: hp("2%"),
    alignItems: "center",
    marginHorizontal: wp("5%"),
  },
  updateText: {
    color: "#fff",
    fontSize: wp("4%"),
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    fontSize: wp("2.8%"),
    marginTop: hp("0.5%"),
    marginLeft: wp("2%"),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: wp(0),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeIconTopRight: {
    position: "absolute",
    top: hp(73),
    right: wp(2),
    zIndex: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  rowOptions: {
    flexDirection: "row",
    marginTop: hp(5),
    marginBottom: hp(2),
    paddingHorizontal: wp(5),
  },
  optionBox: {
    paddingVertical: hp(0),
    paddingHorizontal: wp(5),
    alignItems: "center",
    marginBottom: hp(3),
  },
  optionText: { color: "black", fontSize: wp("3.5%"), marginTop: hp(0.5) },

  modalOverlayCenter: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});


// import React, { useEffect, useState } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     TextInput,
//     TouchableOpacity,
//     Image,
//     ScrollView,
//     StatusBar
// } from "react-native";
// import {
//     widthPercentageToDP as wp,
//     heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import { Ionicons, Feather } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { EndPointUser } from "../api/serciveUser/EndPiontUser";
// import { apiHelper, getApi } from "../api/getApi/getApi";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// const VerifyEmailProfileScreen = () => {
//     const navigation = useNavigation<any>();
//          const [token, setToken] = useState('');
    
//     const [name, setName] = useState("Nanda kumar");
//     const [gender, setGender] = useState("Male");
//     const [dob, setDob] = useState("30 Sep 2002");
//     const [mobile, setMobile] = useState("+91 9392322767");
//     const [email, setEmail] = useState("nk9392322@gmail.com");
//     const [languages, setLanguages] = useState("English, Telugu, Tamil");
//     const [pan, setPan] = useState("");

//     return (
//         <View style={styles.container}>
//             <StatusBar barStyle="dark-content" backgroundColor="#fff" />
//             {/* Fixed Header */}
//             <View style={styles.header}>
//                 <Ionicons name="arrow-back" size={20} color="black" />

//                 <View style={styles.titleContainer}>
//                     <Text style={styles.headerTitle}>Profile</Text>
//                     <View style={styles.subtitleRow}>
//                         <Text style={styles.headerSubtitle}>Addvey Partner ID: 2134354</Text>
//                         <Image
//                             source={require('../../assets/images/profilesave.png')}
//                             style={styles.smallImage}
//                         />
//                     </View>
//                 </View>

//                 <Image
//                     source={require('../../assets/images/verify.png')}
//                     style={styles.rightImage}
//                 />
//             </View>

//             <ScrollView contentContainerStyle={{ paddingBottom: hp("4%") }}>
//                 {/* Profile Image with Camera */}
//                 <View style={styles.profileContainer}>
//                     <Image
//                         source={require('../../assets/images/very.png')}
//                         style={styles.profileImage}
//                     />
//                     {/* Camera Center Overlay */}
//                     <View style={styles.cameraCenter}>
//                         <Ionicons
//                             name="camera"
//                             style={{
//                                 backgroundColor: "#fff",
//                                 paddingHorizontal: wp(1.2),
//                                 paddingVertical: hp(0.4),
//                                 borderRadius: 20,
//                             }}
//                             size={16}
//                             color="#6E533F"
//                         />
//                     </View>
//                     {/* Verify Badge bottom-right */}
//                     <Image
//                         source={require('../../assets/images/save.png')}
//                         style={styles.verifyBadge}
//                     />
//                 </View>

//                 {/* Input Fields */}
//                 <View style={styles.inputContainer}>
//                     {/* Name */}
//                     <View style={styles.inputWrapper}>
//                         <Text style={styles.label}>Name*</Text>
//                         <TextInput
//                             style={styles.input}
//                             value={name}
//                             onChangeText={setName}
//                         />
//                     </View>

//                     {/* Gender */}
//                     <View style={styles.inputWrapper}>
//                         <Text style={styles.label}>Gender</Text>
//                         <TextInput
//                             style={styles.input}
//                             value={gender}
//                             onChangeText={setGender}
//                         />
//                         <Ionicons name="male-female" size={16} color="gray" style={styles.inputIcon} />
//                     </View>

//                     {/* DOB */}
//                     <View style={styles.inputWrapper}>
//                         <Text style={styles.label}>Date of Birth</Text>
//                         <TextInput
//                             style={styles.input}
//                             value={dob}
//                             onChangeText={setDob}
//                         />
//                         <Ionicons name="calendar-outline" size={16} color="gray" style={styles.inputIcon} />
//                     </View>

//                     {/* Mobile with Icon in Label + Right Side Icon/Text */}
//                     <View style={styles.inputWrapper}>
//                         <View style={styles.labelIconRow}>
//                             <Ionicons name="call-outline" size={12} color="gray" style={{ marginRight: 4 }} />
//                             <Text style={styles.labelText}>Mobile</Text>
//                         </View>
//                         <TextInput
//                             style={styles.input}
//                             value={mobile}
//                             onChangeText={setMobile}
//                         />
//                         <TouchableOpacity style={styles.verifyBtn}>
//                             <Image
//                                 source={require('../../assets/images/verifygreen.png')}
//                                 style={{ marginRight: 4, width: wp(4), height: hp(2), resizeMode: 'contain' }}
//                             />
//                             <Text style={{ color: "#32CD32", fontWeight: "600", fontSize: wp("2.8%") }}>Verified</Text>
//                         </TouchableOpacity>
//                     </View>

//                     {/* Email with Icon in Label */}
//                     <View style={styles.inputWrapper}>
//                         <View style={styles.labelIconRow}>
//                             <Ionicons name="mail-outline" size={12} color="gray" style={{ marginRight: 4 }} />
//                             <Text style={styles.labelText}>Email</Text>
//                         </View>
//                         <TextInput
//                             style={styles.input}
//                             value={email}
//                             onChangeText={setEmail}
//                         />
//                         <TouchableOpacity style={styles.verifyBtn}>
//                             <Text style={{ color: "#6C63FF", fontWeight: "600", fontSize: wp("2.8%") }}>Verify</Text>
//                         </TouchableOpacity>
//                     </View>

//                     {/* Languages with Icon in Label */}
//                     <View style={styles.inputWrapper}>
//                         <View style={styles.labelIconRow}>
//                             <Ionicons name="language" size={12} color="gray" style={{ marginRight: 4 }} />
//                             <Text style={styles.labelText}>Languages</Text>
//                         </View>
//                         <TextInput
//                             style={styles.input}
//                             value={languages}
//                             onChangeText={setLanguages}
//                         />
//                         <Ionicons name="create-outline" size={14} color="#6B4EFF" style={styles.inputIcon} />
//                     </View>

//                     {/* PAN */}
//                     <View style={styles.inputWrapper}>
//                         <Text style={styles.label}>PAN</Text>
//                         <TextInput
//                             style={styles.input}
//                             value={pan}
//                             onChangeText={setPan}
//                         />
//                     </View>
//                 </View>

//                 {/* Update Profile Button */}
//                 <TouchableOpacity style={styles.updateBtn} onPress={() => navigation.navigate('PANCardUplaod')}>
//                     <Text style={styles.updateText}>Update Profile</Text>
//                 </TouchableOpacity>
//             </ScrollView>
//         </View>
//     );
// };

// export default VerifyEmailProfileScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff",
//     },
//     header: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         paddingHorizontal: wp("5%"),
//         paddingTop: hp("4%"),
//         paddingBottom: hp("1%"),
//         borderBottomWidth: 1,
//         borderColor: "#eee",
//         backgroundColor: "#fff",
//         position: "absolute",
//         top: 0,
//         left: 0,
//         right: 0,
//         zIndex: 10,
//     },
//     titleContainer: {
//         flex: 1,
//         marginLeft: wp("3%"),
//     },
//     headerTitle: {
//         fontSize: wp("4%"),
//         color: "#000",
//         fontFamily: "Poppins-Regular",
//     },
//     subtitleRow: {
//         flexDirection: "row",
//         alignItems: "center",
//     },
//     headerSubtitle: {
//         fontSize: wp("2.8%"),
//         color: "#6E533F",
//         marginRight: wp("2%"),
//     },
//     smallImage: {
//         width: wp("5%"),
//         height: wp("5%"),
//         borderRadius: wp("2.5%"),
//     },
//     rightImage: {
//         width: wp("6%"),
//         height: wp("6%"),
//         borderRadius: wp("3%"),
//     },
//     profileContainer: {
//         alignItems: "center",
//         marginTop: hp("15%"),
//         marginBottom: hp(3),
//     },
//     profileImage: {
//         width: wp("30%"),
//         height: wp("30%"),
//         borderRadius: wp("15%"),
//         borderWidth: 2,
//         borderColor: "#6B4EFF",
//     },
//     cameraCenter: {
//         position: "absolute",
//         justifyContent: "center",
//         alignItems: "center",
//         width: wp("30%"),
//         height: wp("30%"),
//         borderRadius: wp("15%"),
//     },
//     verifyBadge: {
//         position: "absolute",
//         bottom: hp("0.5%"),
//         right: wp("37%"),
//         width: wp("7%"),
//         height: wp("7%"),
//         borderRadius: wp("3.5%"),
//     },
//     inputContainer: {
//         marginTop: hp("2%"),
//         paddingHorizontal: wp("5%"),
//     },
//     inputWrapper: {
//         marginBottom: hp("3%"),
//         position: "relative",
//     },
//     label: {
//         position: "absolute",
//         top: -hp("1%"),
//         left: wp("5%"),
//         backgroundColor: "#fff",
//         paddingHorizontal: wp("1%"),
//         fontSize: wp("2.8%"),
//         color: "#00000099",
//         fontWeight: "600",
//         zIndex: 1,
//     },
//     labelIconRow: {
//         flexDirection: "row",
//         alignItems: "center",
//         position: "absolute",
//         top: -hp("1%"),
//         left: wp("3%"),
//         backgroundColor: "#fff",
//         paddingHorizontal: wp("1%"),
//         zIndex: 2,
//     },
//     labelText: {
//         fontSize: wp("2.8%"),
//         color: "#00000099",
//         fontWeight: "600",
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: "#ddd",
//         borderRadius: 8,
//         paddingVertical: hp("1.5%"),
//         paddingHorizontal: wp("3%"),
//         fontSize: wp("3.5%"),
//     },
//     inputIcon: {
//         position: "absolute",
//         right: wp("3%"),
//         top: "30%",
//     },
//     verifyBtn: {
//         position: "absolute",
//         right: wp("3%"),
//         top: "28%",
//         flexDirection: "row",
//         alignItems: "center",
//     },
//     updateBtn: {
//         backgroundColor: "#6B4EFF",
//         borderRadius: 20,
//         paddingVertical: hp("1.8%"),
//         marginTop: hp("2%"),
//         alignItems: "center",
//         marginHorizontal: wp("5%"),
//     },
//     updateText: {
//         color: "#fff",
//         fontSize: wp("4%"),
//         fontWeight: "600",
//     },
// });
