import React, { useEffect, useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    TextInput,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
    Keyboard,
    Modal,
    Pressable,
    FlatList,
    Animated,
    StatusBar,
    TouchableWithoutFeedback,
    ScrollView,
    Alert
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import { loginApi } from "../api/authApi/AuthApi";

const logoImg = require("../../assets/images/1.png");
const indiaFlag = require("../../assets/images/ind.png");
const googleLogo = require("../../assets/images/google.png");

const LANGUAGES = [
    { id: "en", label: "Eng", native: "English" },
    { id: "hi", label: "Hind", native: "हिंदी" },
    { id: "te", label: "Tel", native: "తెలుగు" },
];

const LoginScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [langModalVisible, setLangModalVisible] = useState(false);
    const [selectedLang, setSelectedLang] = useState("en");
    const [tempLang, setTempLang] = useState("en");

    const logoAnim = useRef(new Animated.Value(0)).current;
    const cardAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(hp(40))).current;

    // Swiper animation
    const swiperAnim = useRef(new Animated.Value(hp(100))).current;
    const [swiperVisible, setSwiperVisible] = useState(false);

    // Permission Modal
    const [permissionModalVisible, setPermissionModalVisible] = useState(false);

    // Checkbox for email
    const [emailSelected, setEmailSelected] = useState(false);
    const [numberToCheck, setNumberToCheck] = useState("6305301918");

    useEffect(() => {
        const keyboardDidShow = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardVisible(true);
            Animated.parallel([
                Animated.timing(logoAnim, {
                    toValue: -hp("6%"),
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(cardAnim, {
                    toValue: -hp("10%"),
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        });

        const keyboardDidHide = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisible(false);
            Animated.parallel([
                Animated.timing(logoAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(cardAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        });

        return () => {
            keyboardDidShow.remove();
            keyboardDidHide.remove();
        };
    }, []);

    const openLangModal = () => {
        setTempLang(selectedLang);
        setLangModalVisible(true);
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const closeLangModal = () => {
        Animated.timing(slideAnim, {
            toValue: hp(40),
            duration: 300,
            useNativeDriver: true,
        }).start(() => setLangModalVisible(false));
    };

    const confirmLangSelection = () => {
        setSelectedLang(tempLang);
        closeLangModal();
    };

    // Open swiper automatically on load
    useEffect(() => {
        setSwiperVisible(true);
        Animated.timing(swiperAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }, []);

    const closeSwiper = () => {
        Animated.timing(swiperAnim, {
            toValue: hp(100),
            duration: 400,
            useNativeDriver: true,
        }).start(() => setSwiperVisible(false));
    };

    const handleContinuePress = () => {
        closeSwiper();
        setTimeout(() => {
            setPermissionModalVisible(true);
        }, 300);
    };

// const handleLogin = async () => {
//     const res = await PostApi(
//       {
//         url: "/auth/login-with-password",
//         body: {
//           email "",
//           password,
//           deviceId: 12345,
//           token: "12345dummyoktne",
//           deviceName: "Redmi note 9 pro max",
//           lastActiveAt: null,
//           isSyncing: false,
//           status: "online",
//         },
//       },
//       setLoading
//     );

//     console.log("Login Response:", res);

//     if (res?.success) {
//       // ✅ Login success
//       console.log("Logged in!");
//       // e.g., navigation.navigate("Home");
//     } else {
//       // ❌ Show error
//       console.log("Login failed:", res?.message || "Something went wrong");
//     }
//   };


const validatePhoneNumber = (phone: string) => {
  const phoneRegex = /^[6-9]\d{9}$/; // ✅ Indian mobile format
  return phoneRegex.test(phone);
};

const [error, setError] = useState("");
const [loading, setLoading] = useState(false);
//  let numberToCheck = '6305301918'; // Replace with actual number input
    console.log('___numberToCheck',numberToCheck)
  const otpLoginApi = async () => {
     setError(""); // reset
  // ✅ Step 1: Empty check
  if (!numberToCheck) {
     setError("Please enter your mobile number.");
     setTimeout(() => {
     setError(""); // reset
        
     }, 3000);
    // Alert.alert("Error", "Please enter your mobile number.");
    return;
  }



   // ✅ Step 2: Format check
  if (!validatePhoneNumber(numberToCheck)) {
     setError("Enter a valid 10-digit number.");
     setTimeout(() => {
     setError(""); // reset
        
     }, 3000);
    // Alert.alert("Invalid Number", "Please enter a valid 10-digit mobile number.");
    return;
  }

    const res = await loginApi(
      {
        url: "/auth/login-with-otp",
        body: {
        //   identifier: "activedeveloper18@gmail.com",
             identifier: `+91${numberToCheck}`,
          deviceId: 212345,
          token: "12345dummytoken",
          deviceName: "Redmi note 10 pro max",
          lastActiveAt: null,
          isSyncing: false,
          status: "online",

        },
      },
      setLoading
    );

    console.log("OTP Login Response:", res);

    if (res?.success) {
      // ✅ OTP sent successfully
      navigation.navigate("OTP" , {numberToCheck: numberToCheck});
    //   Alert.alert("Success", "OTP sent successfully!");
      console.log("OTP sent successfully!");
      // e.g. navigate to OTP verify screen
    } else {
      // ❌ error case
      console.log("OTP Login failed:", res?.message || "Something went wrong");
    }
  };


    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="black" />

            <TouchableWithoutFeedback onPress={closeSwiper}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
                >
                    {/* Top blue area */}
                    <View style={styles.topArea}>
                        <TouchableOpacity
                            style={styles.langButton}
                            activeOpacity={0.8}
                            onPress={openLangModal}
                        >
                            <MaterialIcons name="language" size={18} color="#fff" />
                            <Text style={styles.langText}>
                                {LANGUAGES.find((l) => l.id === selectedLang)?.label}
                            </Text>
                            <MaterialIcons name="arrow-drop-down" size={18} color="#fff" />
                        </TouchableOpacity>

                        <Animated.View
                            style={[styles.logoWrapper, { transform: [{ translateY: logoAnim }] }]}
                        >
                            <Image source={logoImg} style={styles.logo} resizeMode="contain" />
                        </Animated.View>
                    </View>

                    {/* Bottom fixed card */}
                    <Animated.View
                        style={[
                            styles.card,
                            { transform: [{ translateY: cardAnim }], position: "absolute", bottom: 0, left: 0, right: 0 },
                        ]}
                    >
                        <Text style={styles.heading}>
                            Partner with Addvey: Rides, Restaurants, Stores, Services, Poojas & more
                        </Text>

                        <View style={styles.phoneRow}>
                            <View style={styles.countryBox}>
                                <Image source={indiaFlag} style={styles.flag} resizeMode="contain" />
                                <Text style={styles.countryCode}>+91</Text>
                            </View>

                            <TextInput
                                style={styles.phoneInput}
                                placeholder="Enter Your Mobile Number"
                                placeholderTextColor="#8b8b8b"
                                keyboardType="phone-pad"
                                maxLength={10}
                                returnKeyType="done"
                                value={numberToCheck}
                                onChangeText={setNumberToCheck}
                                
                            />
                        </View>
{error ? <Text style={{ color: "red", marginBottom: 8 }}>{error}</Text> : null}

                        <TouchableOpacity
                            style={styles.otpButton}
                            activeOpacity={0.8}
                            // onPress={() => navigation.navigate("OTP")}
                            onPress={() =>otpLoginApi()}
                        >
                            <Text style={styles.otpButtonText}>Get OTP</Text>
                        </TouchableOpacity>

                        <View style={styles.separator}>
                            <View style={styles.line} />
                            <Text style={styles.orText}>or</Text>
                            <View style={styles.line} />
                        </View>

                        <TouchableOpacity style={styles.googleButton} activeOpacity={0.8}>
                            <Image source={googleLogo} style={styles.googleIcon} resizeMode="contain" />
                            <Text style={styles.googleText}>Continue with Google</Text>
                        </TouchableOpacity>

                        <Text style={styles.smallText}>
                            I accept all the <Text style={styles.linkText}>Terms</Text> and{" "}
                            <Text style={styles.linkText}>Privacy policy</Text>
                        </Text>
                    </Animated.View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>

            {/* Swiper Panel with Overlay */}
            {swiperVisible && (
                <View style={styles.swiperOverlay}>
                    <Pressable style={styles.overlayTouchable} onPress={closeSwiper} />
                    <Animated.View style={[styles.swiperPanel, { transform: [{ translateY: swiperAnim }] }]}>
                        <View style={styles.swiperRow}>
                            <Image source={logoImg} style={styles.swiperImage} resizeMode="contain" />
                            <View style={styles.swiperTextBox}>
                                <Text style={styles.swiperTitle}>Login to Addvey</Text>
                                <Text style={styles.swiperSubtitle}>Nanda Kumar</Text>
                                <Text style={styles.swiperExtra}>92663838362</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.swiperButton} activeOpacity={0.8} onPress={handleContinuePress}>
                            <Text style={styles.swiperButtonText}>Continue with 9392322767</Text>
                        </TouchableOpacity>

                        <Text style={styles.swiperSmallText}>USE ANOTHER METHOD</Text>
                        <View style={styles.lineSwiper} />

                        {/* ✅ Fixed swiperDesc inline links */}
                        <Text style={styles.swiperDesc}>
                            By continuing you consent to share your{" "}
                            <Text style={styles.linkText}>Profile information</Text> with Addvey, and agree to the{" "}
                            <Text style={styles.linkText}>Terms</Text> and{" "}
                            <Text style={styles.linkText}>Privacy policy</Text> of Addvey
                        </Text>
                    </Animated.View>
                </View>
            )}

            {/* Permission Modal */}
            <Modal visible={permissionModalVisible} transparent animationType="slide">
                <View style={styles.permissionOverlay}>
                    <View style={styles.permissionCard}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* Top header row */}
                            <View style={styles.permissionHeader}>
                                <Image source={logoImg} style={{ width: wp(14), height: wp(14), marginRight: wp(3) }} />
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: hp(2), fontWeight: "600", color: "#111", fontFamily: 'Poppins-Medium' }}>Addvey</Text>
                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: hp(0.3) }}>
                                        <Feather name="mail" size={12} color="gray" />
                                        <Text style={{ fontSize: hp(1.2), color: "gray", marginLeft: wp(1), fontFamily: 'Poppins-Regular' }}>support@addvey.com</Text>
                                    </View>
                                </View>
                            </View>

                            <Text style={{ fontSize: hp(1.5), color: "#444", marginVertical: hp(2) }}>
                                Only the following permissions will be shared with Addvey:
                            </Text>

                            <View style={styles.permissionBoxRow}>
                                <View>
                                    <Text style={styles.permissionText}>Read Mobile Number</Text>
                                    <Text style={styles.permissionSub}>+919392322767</Text>
                                </View>
                                <Text style={styles.required}>Required</Text>
                            </View>

                            <View style={styles.permissionBoxRow}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.permissionText}>Read profile information</Text>
                                    <Text style={styles.permissionSub}>Name, avatar image, date of birth and gender (if present)</Text>
                                </View>
                                <Text style={styles.required}>Required</Text>
                            </View>

                            <TouchableOpacity style={styles.permissionBoxRow} onPress={() => setEmailSelected(!emailSelected)}>
                                <View>
                                    <Text style={styles.permissionText}>Read email id</Text>
                                    <Text style={styles.permissionSub}>Email id (if present)</Text>
                                </View>
                                <View style={[styles.checkbox, emailSelected && styles.checkboxSelected]}>
                                    {emailSelected && <MaterialIcons name="check" size={16} color="white" />}
                                </View>
                            </TouchableOpacity>

                            <View style={styles.permissionBoxRow}>
                                <View>
                                    <Text style={styles.permissionText}>Stay Logged In</Text>
                                    <Text style={styles.permissionSub}>Remember your identity</Text>
                                </View>
                                <Text style={styles.required}>Required</Text>
                            </View>

                            <TouchableOpacity style={styles.permissionBtn} onPress={() => setPermissionModalVisible(false)}>
                                <Text style={styles.permissionBtnText}>Ok</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {/* Language Modal */}
            <Modal visible={langModalVisible} transparent animationType="none" statusBarTranslucent>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={styles.modalCloseOutside} onPress={closeLangModal}>
                        <MaterialIcons name="close" size={18} color="black" />
                    </TouchableOpacity>
                    <Pressable style={styles.overlay} onPress={closeLangModal} />
                    <Animated.View style={[styles.langPanel, { transform: [{ translateY: slideAnim }] }]}>
                        <Text style={styles.langHeading}>Choose App Language</Text>
                        <FlatList
                            data={LANGUAGES}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.langRow} onPress={() => setTempLang(item.id)}>
                                    <Text style={styles.langLabel}>{item.label} ({item.native})</Text>
                                    <View
                                        style={[
                                            styles.radioOuter,
                                            tempLang === item.id && { borderColor: "#6C63FF", borderWidth: 3 },
                                        ]}
                                    />
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity style={styles.selectButton} activeOpacity={0.8} onPress={confirmLangSelection}>
                            <Text style={styles.selectButtonText}>Select</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "black" },
    topArea: { flex: 1, alignItems: "center", justifyContent: "flex-start", paddingTop: hp("3%") },
    langButton: { position: "absolute", top: hp(6), right: wp("4%"), flexDirection: "row", alignItems: "center", paddingHorizontal: wp("2%"), paddingVertical: hp("0.6%"), borderRadius: wp("6%"), borderWidth: 1, borderColor: "white" },
    langText: { color: "#fff", fontSize: hp("1.6%"), fontWeight: "bold", marginLeft: wp("1%") },
    logoWrapper: { marginTop: hp(15), justifyContent: "center", alignItems: "center" },
    logo: { width: wp(30), height: wp(40) },

    card: { backgroundColor: "#FAFAFA", borderTopLeftRadius: wp("6%"), borderTopRightRadius: wp("6%"), paddingVertical: hp("4%"), paddingHorizontal: wp("4%"), height: hp(52) },
    heading: { textAlign: "center", fontWeight: "bold", fontSize: hp(2), color: "#111", marginBottom: hp("3.2%") },

    phoneRow: { flexDirection: "row", alignItems: "center", marginBottom: hp("2.5%") },
    countryBox: { flexDirection: "row", alignItems: "center", borderColor: "#e6e6e6", borderWidth: 1, borderRadius: wp(4), paddingHorizontal: wp("3%"), marginRight: wp("2%"), backgroundColor: "white" },
    flag: { width: wp(7), height: hp(5), marginRight: wp("2%") },
    countryCode: { fontSize: hp("1.9%"), fontWeight: "600", color: "#333" },
    phoneInput: { flex: 1, borderColor: "#e6e6e6", borderWidth: 1, borderRadius: wp(4), paddingHorizontal: wp("4%"), fontSize: hp(1.7), height: hp("5.3%"), color: "#111", backgroundColor: "white" },

    otpButton: { marginTop: hp(0.1), backgroundColor: "#C9B9FF", paddingVertical: hp(1.5), borderRadius: wp(4), alignItems: "center" },
    otpButtonText: { fontSize: hp("1.9%"), fontWeight: "700", color: "#FFF" },

    separator: { flexDirection: "row", alignItems: "center", marginVertical: hp("2%") },
    line: { flex: 1, height: 1, backgroundColor: "#EDEBEB" },
    orText: { marginHorizontal: wp("3%"), color: "#888", fontSize: hp("1.6%") },

    googleButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#ddd", borderRadius: wp(4), paddingVertical: hp("1.8%"), marginBottom: hp("2%"), backgroundColor: "white" },
    googleIcon: { width: wp("5%"), height: wp("5%") },
    googleText: { marginLeft: wp("1.7%"), fontSize: hp("1.6%"), fontWeight: "600", color: "#444" },
    smallText: { marginTop: hp("1%"), fontSize: hp("1.4%"), color: "#8b8b8b", textAlign: "center" },
    linkText: { color: "#1877F2", fontWeight: "600", fontSize: hp("1.4%"), textAlignVertical: "center" },

    overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
    langPanel: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", borderTopLeftRadius: wp(6), borderTopRightRadius: wp(6), padding: wp(5), maxHeight: hp(45) },
    modalCloseOutside: { position: "absolute", bottom: hp(38), right: wp(2), zIndex: 20, backgroundColor: 'white', borderRadius: 50, padding: 8 },
    langHeading: { fontSize: hp(2.2), fontWeight: "bold", marginBottom: hp(2), textAlign: "center", marginTop: hp(2) },
    langRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: hp(1.5) },
    langLabel: { fontSize: hp(1.8), color: "#333" },
    radioOuter: { width: wp("4.5%"), height: wp("4.5%"), borderRadius: wp("3%"), borderWidth: 1, borderColor: "#0000005E", alignItems: "center", justifyContent: "center" },
    radioSelected: { borderColor: "#6C63FF", borderWidth: 2 },
    radioInner: { width: wp("2.5%"), height: wp("2.5%"), borderRadius: wp("1.5%"), backgroundColor: "#6C63FF" },
    selectButton: { marginTop: hp(2), backgroundColor: "#6C63FF", paddingVertical: hp(1.6), borderRadius: wp(3), alignItems: "center", marginBottom: hp(1) },
    selectButtonText: { color: "#fff", fontSize: hp(1.8), fontWeight: "600" },

    // Swiper
    swiperOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
    overlayTouchable: { ...StyleSheet.absoluteFillObject },
    swiperPanel: { backgroundColor: "#fff", borderTopLeftRadius: wp(6), borderTopRightRadius: wp(6), paddingHorizontal: wp(3), paddingVertical: hp(3), minHeight: hp(36) },
    swiperRow: { flexDirection: "row", alignItems: "center", marginBottom: hp(2) },
    swiperImage: { width: wp(16), height: wp(16), marginRight: wp(4) },
    swiperTextBox: { flex: 1 },
    swiperTitle: { fontSize: hp(1.8), fontFamily: 'Poppins-Medium', color: "#111" },
    swiperSubtitle: { fontSize: hp(1.2), color: "gray", marginBottom: hp(0.5) },
    swiperExtra: { fontSize: hp(1.2), color: "#999" },

    swiperButton: { backgroundColor: "#6C63FF", paddingVertical: hp(1.8), borderRadius: wp(3), alignItems: "center", width: "100%", marginBottom: hp(1.5), marginTop: hp(1) },
    swiperButtonText: { color: "#fff", fontSize: hp(1.5), fontWeight: "600", },
    swiperSmallText: { fontSize: hp(1.2), color: "black", marginBottom: hp(1.5), textAlign: "center" },
    swiperDesc: { fontSize: hp(1.6), color: "#666", marginTop: hp(1.5) },
    lineSwiper: { height: 1, backgroundColor: '#ddd', },

    // Permission Modal
    permissionOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center" },
    permissionCard: { width: wp(90), backgroundColor: "#fff", borderRadius: wp(5), padding: wp(5), maxHeight: hp(80), borderWidth: 1, borderColor: "#ccc" },
    permissionHeader: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#eee", paddingBottom: hp(1.5), paddingHorizontal: wp(2), paddingVertical: hp(2), borderRadius: 10 },

    permissionBoxRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: hp(1.5), paddingHorizontal: wp(3) },
    permissionText: { fontWeight: "600", fontSize: hp(1.7), color: "#00000085", lineHeight: hp(2.2) },
    permissionSub: { fontSize: hp(1.4), color: "black", marginTop: hp(0.5), lineHeight: hp(2) },
    required: { fontSize: hp(1.3), color: "#00000085", lineHeight: hp(2) },

    checkbox: { width: wp(5), height: wp(5), borderWidth: 1.5, borderColor: "#666", borderRadius: 4, alignItems: "center", justifyContent: "center" },
    checkboxSelected: { backgroundColor: "#6C63FF", borderColor: "#6C63FF" },

    permissionBtn: { backgroundColor: "#6C63FF", paddingVertical: hp(1.6), borderRadius: wp(3), alignItems: "center", justifyContent: 'center', marginTop: hp(3), width: wp(45), alignSelf: "center" },
    permissionBtnText: { color: "#fff", fontWeight: "600", fontSize: hp(1.6), lineHeight: hp(2.2) }
});



// import React, { useEffect, useState, useRef } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     SafeAreaView,
//     Image,
//     TextInput,
//     TouchableOpacity,
//     Platform,
//     KeyboardAvoidingView,
//     Keyboard,
//     Modal,
//     Pressable,
//     FlatList,
//     Animated,
//     StatusBar,
//     TouchableWithoutFeedback,
//     ScrollView
// } from "react-native";
// import {
//     widthPercentageToDP as wp,
//     heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import { useNavigation } from "@react-navigation/native";
// import { MaterialIcons } from "@expo/vector-icons";
// import { Feather } from '@expo/vector-icons';

// const logoImg = require("../../assets/images/1.png");
// const indiaFlag = require("../../assets/images/ind.png");
// const googleLogo = require("../../assets/images/google.png");

// const LANGUAGES = [
//     { id: "en", label: "Eng", native: "English" },
//     { id: "hi", label: "Hind", native: "हिंदी" },
//     { id: "te", label: "Tel", native: "తెలుగు" },
// ];

// const LoginScreen: React.FC = () => {
//     const navigation = useNavigation<any>();
//     const [keyboardVisible, setKeyboardVisible] = useState(false);
//     const [langModalVisible, setLangModalVisible] = useState(false);
//     const [selectedLang, setSelectedLang] = useState("en");
//     const [tempLang, setTempLang] = useState("en");

//     const logoAnim = useRef(new Animated.Value(0)).current;
//     const cardAnim = useRef(new Animated.Value(0)).current;
//     const slideAnim = useRef(new Animated.Value(hp(40))).current;

//     // Swiper animation
//     const swiperAnim = useRef(new Animated.Value(hp(100))).current;
//     const [swiperVisible, setSwiperVisible] = useState(false);

//     // Permission Modal
//     const [permissionModalVisible, setPermissionModalVisible] = useState(false);

//     // Checkbox for email
//     const [emailSelected, setEmailSelected] = useState(false);

//     useEffect(() => {
//         const keyboardDidShow = Keyboard.addListener("keyboardDidShow", () => {
//             setKeyboardVisible(true);
//             Animated.parallel([
//                 Animated.timing(logoAnim, {
//                     toValue: -hp("6%"),
//                     duration: 300,
//                     useNativeDriver: true,
//                 }),
//                 Animated.timing(cardAnim, {
//                     toValue: -hp("10%"),
//                     duration: 300,
//                     useNativeDriver: true,
//                 }),
//             ]).start();
//         });

//         const keyboardDidHide = Keyboard.addListener("keyboardDidHide", () => {
//             setKeyboardVisible(false);
//             Animated.parallel([
//                 Animated.timing(logoAnim, {
//                     toValue: 0,
//                     duration: 300,
//                     useNativeDriver: true,
//                 }),
//                 Animated.timing(cardAnim, {
//                     toValue: 0,
//                     duration: 300,
//                     useNativeDriver: true,
//                 }),
//             ]).start();
//         });

//         return () => {
//             keyboardDidShow.remove();
//             keyboardDidHide.remove();
//         };
//     }, []);

//     const openLangModal = () => {
//         setTempLang(selectedLang);
//         setLangModalVisible(true);
//         Animated.timing(slideAnim, {
//             toValue: 0,
//             duration: 300,
//             useNativeDriver: true,
//         }).start();
//     };

//     const closeLangModal = () => {
//         Animated.timing(slideAnim, {
//             toValue: hp(40),
//             duration: 300,
//             useNativeDriver: true,
//         }).start(() => setLangModalVisible(false));
//     };

//     const confirmLangSelection = () => {
//         setSelectedLang(tempLang);
//         closeLangModal();
//     };

//     // Open swiper automatically on load
//     useEffect(() => {
//         setSwiperVisible(true);
//         Animated.timing(swiperAnim, {
//             toValue: 0,
//             duration: 400,
//             useNativeDriver: true,
//         }).start();
//     }, []);

//     const closeSwiper = () => {
//         Animated.timing(swiperAnim, {
//             toValue: hp(100),
//             duration: 400,
//             useNativeDriver: true,
//         }).start(() => setSwiperVisible(false));
//     };

//     const handleContinuePress = () => {
//         closeSwiper();
//         setTimeout(() => {
//             setPermissionModalVisible(true);
//         }, 300);
//     };

//     return (
//         <SafeAreaView style={styles.safeArea}>
//             <StatusBar barStyle="dark-content" backgroundColor="black" />

//             <TouchableWithoutFeedback onPress={closeSwiper}>
//                 <KeyboardAvoidingView
//                     style={{ flex: 1 }}
//                     behavior={Platform.OS === "ios" ? "padding" : undefined}
//                     keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
//                 >
//                     {/* Top blue area */}
//                     <View style={styles.topArea}>
//                         <TouchableOpacity
//                             style={styles.langButton}
//                             activeOpacity={0.8}
//                             onPress={openLangModal}
//                         >
//                             <MaterialIcons name="language" size={18} color="#fff" />
//                             <Text style={styles.langText}>
//                                 {LANGUAGES.find((l) => l.id === selectedLang)?.label}
//                             </Text>
//                             <MaterialIcons name="arrow-drop-down" size={18} color="#fff" />
//                         </TouchableOpacity>

//                         <Animated.View
//                             style={[styles.logoWrapper, { transform: [{ translateY: logoAnim }] }]}
//                         >
//                             <Image source={logoImg} style={styles.logo} resizeMode="contain" />
//                         </Animated.View>
//                     </View>

//                     {/* Bottom fixed card */}
//                     <Animated.View
//                         style={[
//                             styles.card,
//                             { transform: [{ translateY: cardAnim }], position: "absolute", bottom: 0, left: 0, right: 0 },
//                         ]}
//                     >
//                         <Text style={styles.heading}>
//                             Partner Anna with Addvey: Rides, Restaurants, Stores, Services, Poojas & more
//                         </Text>

//                         <View style={styles.phoneRow}>
//                             <View style={styles.countryBox}>
//                                 <Image source={indiaFlag} style={styles.flag} resizeMode="contain" />
//                                 <Text style={styles.countryCode}>+91</Text>
//                             </View>

//                             <TextInput
//                                 style={styles.phoneInput}
//                                 placeholder="Enter Your Mobile Number"
//                                 placeholderTextColor="#8b8b8b"
//                                 keyboardType="phone-pad"
//                                 maxLength={15}
//                                 returnKeyType="done"
//                             />
//                         </View>

//                         <TouchableOpacity
//                             style={styles.otpButton}
//                             activeOpacity={0.8}
//                             onPress={() => navigation.navigate("OTP")}
//                         >
//                             <Text style={styles.otpButtonText}>Get OTP</Text>
//                         </TouchableOpacity>

//                         <View style={styles.separator}>
//                             <View style={styles.line} />
//                             <Text style={styles.orText}>or</Text>
//                             <View style={styles.line} />
//                         </View>

//                         <TouchableOpacity style={styles.googleButton} activeOpacity={0.8}>
//                             <Image source={googleLogo} style={styles.googleIcon} resizeMode="contain" />
//                             <Text style={styles.googleText}>Continue with Google</Text>
//                         </TouchableOpacity>

//                         <Text style={styles.smallText}>
//                             I accept all the <Text style={styles.linkText}>Terms</Text> and{" "}
//                             <Text style={styles.linkText}>Privacy policy</Text>
//                         </Text>
//                     </Animated.View>
//                 </KeyboardAvoidingView>
//             </TouchableWithoutFeedback>

//             {/* Swiper Panel with Overlay */}
//             {swiperVisible && (
//                 <View style={styles.swiperOverlay}>
//                     <Pressable style={styles.overlayTouchable} onPress={closeSwiper} />
//                     <Animated.View style={[styles.swiperPanel, { transform: [{ translateY: swiperAnim }] }]}>
//                         <View style={styles.swiperRow}>
//                             <Image source={logoImg} style={styles.swiperImage} resizeMode="contain" />
//                             <View style={styles.swiperTextBox}>
//                                 <Text style={styles.swiperTitle}>Login to Addvey</Text>
//                                 <Text style={styles.swiperSubtitle}>Nanda Kumar</Text>
//                                 <Text style={styles.swiperExtra}>92663838362</Text>
//                             </View>
//                         </View>

//                         <TouchableOpacity style={styles.swiperButton} activeOpacity={0.8} onPress={handleContinuePress}>
//                             <Text style={styles.swiperButtonText}>Continue with 9392322767</Text>
//                         </TouchableOpacity>

//                         <Text style={styles.swiperSmallText}>USE ANOTHER METHOD</Text>
//                         <View style={styles.lineSwiper} />

//                         {/* ✅ Fixed swiperDesc inline links */}
//                         <Text style={styles.swiperDesc}>
//                             By continuing you consent to share your{" "}
//                             <Text style={styles.linkText}>Profile information</Text> with Addvey, and agree to the{" "}
//                             <Text style={styles.linkText}>Terms</Text> and{" "}
//                             <Text style={styles.linkText}>Privacy policy</Text> of Addvey
//                         </Text>
//                     </Animated.View>
//                 </View>
//             )}

//             {/* Permission Modal */}
//             <Modal visible={permissionModalVisible} transparent animationType="slide">
//                 <View style={styles.permissionOverlay}>
//                     <View style={styles.permissionCard}>
//                         <ScrollView showsVerticalScrollIndicator={false}>
//                             {/* Top header row */}
//                             <View style={styles.permissionHeader}>
//                                 <Image source={logoImg} style={{ width: wp(14), height: wp(14), marginRight: wp(3) }} />
//                                 <View style={{ flex: 1 }}>
//                                     <Text style={{ fontSize: hp(2), fontWeight: "600", color: "#111", fontFamily: 'Poppins-Medium' }}>Addvey</Text>
//                                     <View style={{ flexDirection: "row", alignItems: "center", marginTop: hp(0.3) }}>
//                                         <Feather name="mail" size={12} color="gray" />
//                                         <Text style={{ fontSize: hp(1.2), color: "gray", marginLeft: wp(1), fontFamily: 'Poppins-Regular' }}>support@addvey.com</Text>
//                                     </View>
//                                 </View>
//                             </View>

//                             <Text style={{ fontSize: hp(1.5), color: "#444", marginVertical: hp(2) }}>
//                                 Only the following permissions will be shared with Addvey:
//                             </Text>

//                             <View style={styles.permissionBoxRow}>
//                                 <View>
//                                     <Text style={styles.permissionText}>Read Mobile Number</Text>
//                                     <Text style={styles.permissionSub}>+919392322767</Text>
//                                 </View>
//                                 <Text style={styles.required}>Required</Text>
//                             </View>

//                             <View style={styles.permissionBoxRow}>
//                                 <View style={{ flex: 1 }}>
//                                     <Text style={styles.permissionText}>Read profile information</Text>
//                                     <Text style={styles.permissionSub}>Name, avatar image, date of birth and gender (if present)</Text>
//                                 </View>
//                                 <Text style={styles.required}>Required</Text>
//                             </View>

//                             <TouchableOpacity style={styles.permissionBoxRow} onPress={() => setEmailSelected(!emailSelected)}>
//                                 <View>
//                                     <Text style={styles.permissionText}>Read email id</Text>
//                                     <Text style={styles.permissionSub}>Email id (if present)</Text>
//                                 </View>
//                                 <View style={[styles.checkbox, emailSelected && styles.checkboxSelected]}>
//                                     {emailSelected && <MaterialIcons name="check" size={16} color="white" />}
//                                 </View>
//                             </TouchableOpacity>

//                             <View style={styles.permissionBoxRow}>
//                                 <View>
//                                     <Text style={styles.permissionText}>Stay Logged In</Text>
//                                     <Text style={styles.permissionSub}>Remember your identity</Text>
//                                 </View>
//                                 <Text style={styles.required}>Required</Text>
//                             </View>

//                             <TouchableOpacity style={styles.permissionBtn} onPress={() => setPermissionModalVisible(false)}>
//                                 <Text style={styles.permissionBtnText}>Ok</Text>
//                             </TouchableOpacity>
//                         </ScrollView>
//                     </View>
//                 </View>
//             </Modal>

//             {/* Language Modal */}
//             <Modal visible={langModalVisible} transparent animationType="none" statusBarTranslucent>
//                 <View style={{ flex: 1 }}>
//                     <TouchableOpacity style={styles.modalCloseOutside} onPress={closeLangModal}>
//                         <MaterialIcons name="close" size={18} color="black" />
//                     </TouchableOpacity>
//                     <Pressable style={styles.overlay} onPress={closeLangModal} />
//                     <Animated.View style={[styles.langPanel, { transform: [{ translateY: slideAnim }] }]}>
//                         <Text style={styles.langHeading}>Choose App Language</Text>
//                         <FlatList
//                             data={LANGUAGES}
//                             keyExtractor={(item) => item.id}
//                             renderItem={({ item }) => (
//                                 <TouchableOpacity style={styles.langRow} onPress={() => setTempLang(item.id)}>
//                                     <Text style={styles.langLabel}>{item.label} ({item.native})</Text>
//                                     <View
//                                         style={[
//                                             styles.radioOuter,
//                                             tempLang === item.id && { borderColor: "#6C63FF", borderWidth: 3 },
//                                         ]}
//                                     />
//                                 </TouchableOpacity>
//                             )}
//                         />
//                         <TouchableOpacity style={styles.selectButton} activeOpacity={0.8} onPress={confirmLangSelection}>
//                             <Text style={styles.selectButtonText}>Select</Text>
//                         </TouchableOpacity>
//                     </Animated.View>
//                 </View>
//             </Modal>
//         </SafeAreaView>
//     );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//     safeArea: { flex: 1, backgroundColor: "black" },
//     topArea: { flex: 1, alignItems: "center", justifyContent: "flex-start", paddingTop: hp("3%") },
//     langButton: { position: "absolute", top: hp(6), right: wp("4%"), flexDirection: "row", alignItems: "center", paddingHorizontal: wp("2%"), paddingVertical: hp("0.6%"), borderRadius: wp("6%"), borderWidth: 1, borderColor: "white" },
//     langText: { color: "#fff", fontSize: hp("1.6%"), fontWeight: "bold", marginLeft: wp("1%") },
//     logoWrapper: { marginTop: hp(15), justifyContent: "center", alignItems: "center" },
//     logo: { width: wp(30), height: wp(40) },

//     card: { backgroundColor: "#FAFAFA", borderTopLeftRadius: wp("6%"), borderTopRightRadius: wp("6%"), paddingVertical: hp("4%"), paddingHorizontal: wp("4%"), height: hp(52) },
//     heading: { textAlign: "center", fontWeight: "bold", fontSize: hp(2), color: "#111", marginBottom: hp("3.2%") },

//     phoneRow: { flexDirection: "row", alignItems: "center", marginBottom: hp("2.5%") },
//     countryBox: { flexDirection: "row", alignItems: "center", borderColor: "#e6e6e6", borderWidth: 1, borderRadius: wp(4), paddingHorizontal: wp("3%"), marginRight: wp("2%"), backgroundColor: "white" },
//     flag: { width: wp(7), height: hp(5), marginRight: wp("2%") },
//     countryCode: { fontSize: hp("1.9%"), fontWeight: "600", color: "#333" },
//     phoneInput: { flex: 1, borderColor: "#e6e6e6", borderWidth: 1, borderRadius: wp(4), paddingHorizontal: wp("4%"), fontSize: hp(1.7), height: hp("5.3%"), color: "#111", backgroundColor: "white" },

//     otpButton: { marginTop: hp(0.1), backgroundColor: "#C9B9FF", paddingVertical: hp(1.5), borderRadius: wp(4), alignItems: "center" },
//     otpButtonText: { fontSize: hp("1.9%"), fontWeight: "700", color: "#FFF" },

//     separator: { flexDirection: "row", alignItems: "center", marginVertical: hp("2%") },
//     line: { flex: 1, height: 1, backgroundColor: "#EDEBEB" },
//     orText: { marginHorizontal: wp("3%"), color: "#888", fontSize: hp("1.6%") },

//     googleButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#ddd", borderRadius: wp(4), paddingVertical: hp("1.8%"), marginBottom: hp("2%"), backgroundColor: "white" },
//     googleIcon: { width: wp("5%"), height: wp("5%") },
//     googleText: { marginLeft: wp("1.7%"), fontSize: hp("1.6%"), fontWeight: "600", color: "#444" },
//     smallText: { marginTop: hp("1%"), fontSize: hp("1.4%"), color: "#8b8b8b", textAlign: "center" },
//     linkText: { color: "#1877F2", fontWeight: "600", fontSize: hp("1.4%"), textAlignVertical: "center" },

//     overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
//     langPanel: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", borderTopLeftRadius: wp(6), borderTopRightRadius: wp(6), padding: wp(5), maxHeight: hp(45) },
//     modalCloseOutside: { position: "absolute", bottom: hp(38), right: wp(2), zIndex: 20, backgroundColor: 'white', borderRadius: 50, padding: 8 },
//     langHeading: { fontSize: hp(2.2), fontWeight: "bold", marginBottom: hp(2), textAlign: "center", marginTop: hp(2) },
//     langRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: hp(1.5) },
//     langLabel: { fontSize: hp(1.8), color: "#333" },
//     radioOuter: { width: wp("4.5%"), height: wp("4.5%"), borderRadius: wp("3%"), borderWidth: 1, borderColor: "#0000005E", alignItems: "center", justifyContent: "center" },
//     radioSelected: { borderColor: "#6C63FF", borderWidth: 2 },
//     radioInner: { width: wp("2.5%"), height: wp("2.5%"), borderRadius: wp("1.5%"), backgroundColor: "#6C63FF" },
//     selectButton: { marginTop: hp(2), backgroundColor: "#6C63FF", paddingVertical: hp(1.6), borderRadius: wp(3), alignItems: "center", marginBottom: hp(1) },
//     selectButtonText: { color: "#fff", fontSize: hp(1.8), fontWeight: "600" },

//     // Swiper
//     swiperOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
//     overlayTouchable: { ...StyleSheet.absoluteFillObject },
//     swiperPanel: { backgroundColor: "#fff", borderTopLeftRadius: wp(6), borderTopRightRadius: wp(6), paddingHorizontal: wp(3), paddingVertical: hp(3), minHeight: hp(36) },
//     swiperRow: { flexDirection: "row", alignItems: "center", marginBottom: hp(2) },
//     swiperImage: { width: wp(16), height: wp(16), marginRight: wp(4) },
//     swiperTextBox: { flex: 1 },
//     swiperTitle: { fontSize: hp(1.8), fontFamily: 'Poppins-Medium', color: "#111" },
//     swiperSubtitle: { fontSize: hp(1.2), color: "gray", marginBottom: hp(0.5) },
//     swiperExtra: { fontSize: hp(1.2), color: "#999" },

//     swiperButton: { backgroundColor: "#6C63FF", paddingVertical: hp(1.8), borderRadius: wp(3), alignItems: "center", width: "100%", marginBottom: hp(1.5), marginTop: hp(1) },
//     swiperButtonText: { color: "#fff", fontSize: hp(1.5), fontWeight: "600", },
//     swiperSmallText: { fontSize: hp(1.2), color: "black", marginBottom: hp(1.5), textAlign: "center" },
//     swiperDesc: { fontSize: hp(1.6), color: "#666", marginTop: hp(1.5) },
//     lineSwiper: { height: 1, backgroundColor: '#ddd', },

//     // Permission Modal
//     permissionOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center" },
//     permissionCard: { width: wp(90), backgroundColor: "#fff", borderRadius: wp(5), padding: wp(5), maxHeight: hp(80), borderWidth: 1, borderColor: "#ccc" },
//     permissionHeader: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#eee", paddingBottom: hp(1.5), paddingHorizontal: wp(2), paddingVertical: hp(2), borderRadius: 10 },

//     permissionBoxRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: hp(1.5), paddingHorizontal: wp(3) },
//     permissionText: { fontWeight: "600", fontSize: hp(1.7), color: "#00000085", lineHeight: hp(2.2) },
//     permissionSub: { fontSize: hp(1.4), color: "black", marginTop: hp(0.5), lineHeight: hp(2) },
//     required: { fontSize: hp(1.3), color: "#00000085", lineHeight: hp(2) },

//     checkbox: { width: wp(5), height: wp(5), borderWidth: 1.5, borderColor: "#666", borderRadius: 4, alignItems: "center", justifyContent: "center" },
//     checkboxSelected: { backgroundColor: "#6C63FF", borderColor: "#6C63FF" },

//     permissionBtn: { backgroundColor: "#6C63FF", paddingVertical: hp(1.6), borderRadius: wp(3), alignItems: "center", justifyContent: 'center', marginTop: hp(3), width: wp(45), alignSelf: "center" },
//     permissionBtnText: { color: "#fff", fontWeight: "600", fontSize: hp(1.6), lineHeight: hp(2.2) }
// });
