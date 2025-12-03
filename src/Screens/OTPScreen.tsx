import React, { useState, useRef, useEffect } from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    NativeSyntheticEvent,
    TextInputKeyPressEventData,
    StatusBar,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { loginApi } from "../api/authApi/AuthApi";
import AsyncStorage from '@react-native-async-storage/async-storage';
const OTPScreen: React.FC = () => {
    const route = useRoute<any>();
    const {numberToCheck} = route.params || {};
    const navigation = useNavigation<any>();
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState<number>(30);
    const inputs = useRef<Array<TextInput | null>>([]);
  const [loading, setLoading] = useState(false);
//   const [identifier, setIdentifier] = useState("+9124530145");
const [identifier, setIdentifier] = useState(`${numberToCheck}`);



    // Timer
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text || ""; // ensure always string
        setOtp(newOtp);

        if (text && index < 5) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (
        e: NativeSyntheticEvent<TextInputKeyPressEventData>,
        index: number
    ) => {
        if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };


const handleVerifyOtp = async () => {
  const otpValue = otp.join("");
  
  if (otpValue.length < 6) {
    alert("Please enter a 6-digit OTP");
    return;
  }

  setLoading(true);
  try {
    const res = await loginApi(
      {
        url: "/auth/verify-login-otp",
        body: {
          identifier,
          otp: otpValue,
        },
      },
      setLoading
    );

    console.log("✅ Verify OTP Response:", res);

    if (res?.success) {
  console.log("OTP verified successfully ✅", res.data.token);

  try {
    await AsyncStorage.setItem('authToken', res.data.token);
    console.log("Token stored successfully_ - - - ");
  } catch (error) {
    console.error("Error storing token:", error);
  }

  navigation.navigate('Language');
} else {
      alert(res?.message || "Invalid OTP");
    }
  } catch (error) {
    console.log("OTP verification error:", error);
    alert("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};



    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerRow}>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <MaterialIcons name="arrow-back" size={20} color="#000" />
                        </TouchableOpacity>
                        <Text style={styles.title}>OTP Verification</Text>
                    </View>
                    <Text style={styles.subtitle}>
                        We have sent a verification code to
                    </Text>
                    <View style={styles.phoneRow}>
                        <Text style={styles.phone}>+91 {numberToCheck}</Text>
                        <Image
                            source={require("../../assets/images/phone.png")}
                            style={styles.phoneImage}
                            resizeMode="contain"
                        />
                    </View>
                </View>

                {/* OTP Boxes */}
                <View style={styles.otpRow}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => {
                                inputs.current[index] = ref;
                            }}
                            style={[styles.input, otp[index] !== "" && styles.filledInput]}
                            keyboardType="numeric"
                            maxLength={1}
                            value={digit}
                            onChangeText={(text) => handleChange(text, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                        />
                    ))}
                </View>

                {/* Info Text */}
                <Text style={styles.infoText}>Check text messages for your OTP</Text>

                {/* Resend Section */}
                <View style={styles.resendRow}>
                    <Text style={styles.normalText}>Didn’t get the OTP?</Text>
                    <Text> </Text>
                    {timer > 0 ? (
                        <Text style={styles.resendText}>Resend SMS in {timer}s</Text>
                    ) : (
                        <TouchableOpacity onPress={() => setTimer(30)}>
                            <Text style={[styles.resendText, { color: "#6C63FF" }]}>
                                Resend SMS
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>

            {/* Verify Button at Bottom */}
            <TouchableOpacity
                style={[
                    styles.verifyBtn,
                    otp.join("").length < 6 && { backgroundColor: "#bba8f2" },
                ]}
                disabled={otp.join("").length < 6}
                // onPress={() => navigation.navigate('Language')}
                onPress={handleVerifyOtp}
            >
                <Text style={styles.verifyText}>Verify</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: "center",
        padding: wp("5%"),
        paddingBottom: hp("12%"),
    },
    header: {
        width: "100%",
        marginBottom: hp("3%"),
        marginTop: hp(4),
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: hp("1%"),
    },
    title: {
        fontSize: wp(5),
        fontWeight: "400",
        marginLeft: wp("3%"),
        fontFamily: "Poppins-Regular",
        marginTop: hp(0.6),
    },
    subtitle: {
        fontSize: wp("4%"),
        color: "black",
    },
    phoneRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: hp(3),
    },
    phone: {
        fontSize: wp(4),
        fontWeight: "bold",
        marginRight: wp("2%"),
        fontFamily: 'Poppins-Bold'
    },
    phoneImage: {
        width: wp(4),
        height: wp(4),
    },
    otpRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginVertical: hp("0%"),
    },
    input: {
        width: wp("12%"),
        height: hp("6%"),
        borderWidth: 1,
        borderColor: "#00000017",
        borderRadius: 8,
        textAlign: "center",
        fontSize: wp("5%"),
        color: "#000",
        backgroundColor: "#fff",
        shadowColor: "#00000017",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    filledInput: {
        borderColor: "#6C63FF",
        borderWidth: 0.9,
        shadowColor: "#6C63FF",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    infoText: {
        color: "#6E533F7A",
        marginBottom: hp("2%"),
        fontSize: wp("2.4%"),
        fontFamily: 'Poppins-Medium',
        marginTop: hp(2.5)
    },
    resendRow: {
        flexDirection: "row",
        marginBottom: hp("5%"),
        alignItems: "center",
    },
    normalText: {
        fontSize: wp("3.5%"),
        color: 'black',
    },
    resendText: {
        fontSize: wp("3.5%"),
        color: "red",
        fontWeight: "500",
    },
    verifyBtn: {
        backgroundColor: "#6C63FF",
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        paddingVertical: hp("1.5%"),
        borderRadius: 16,
        alignItems: "center",
        marginBottom: hp(5)
    },
    verifyText: {
        color: "#fff",
        fontSize: wp("4.5%"),
        fontWeight: "600",
    },
});

export default OTPScreen;



// import React, { useState, useRef, useEffect } from "react";
// import {
//     SafeAreaView,
//     ScrollView,
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     StyleSheet,
//     Image,
//     NativeSyntheticEvent,
//     TextInputKeyPressEventData,
//     StatusBar,
// } from "react-native";
// import {
//     widthPercentageToDP as wp,
//     heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import { MaterialIcons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";

// const OTPScreen: React.FC = () => {
//     const navigation = useNavigation<any>();
//     const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
//     const [timer, setTimer] = useState<number>(30);
//     const inputs = useRef<Array<TextInput | null>>([]);

//     // Timer
//     useEffect(() => {
//         if (timer > 0) {
//             const interval = setInterval(() => {
//                 setTimer((prev) => prev - 1);
//             }, 1000);
//             return () => clearInterval(interval);
//         }
//     }, [timer]);

//     const handleChange = (text: string, index: number) => {
//         const newOtp = [...otp];
//         newOtp[index] = text || ""; // ensure always string
//         setOtp(newOtp);

//         if (text && index < 5) {
//             inputs.current[index + 1]?.focus();
//         }
//     };

//     const handleKeyPress = (
//         e: NativeSyntheticEvent<TextInputKeyPressEventData>,
//         index: number
//     ) => {
//         if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
//             inputs.current[index - 1]?.focus();
//         }
//     };

//     return (
//         <SafeAreaView style={styles.safeArea}>
//             <ScrollView contentContainerStyle={styles.scrollContainer}>
//                 <StatusBar barStyle="dark-content" backgroundColor="#fff" />
//                 {/* Header */}
//                 <View style={styles.header}>
//                     <View style={styles.headerRow}>
//                         <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//                             <MaterialIcons name="arrow-back" size={20} color="#000" />
//                         </TouchableOpacity>
//                         <Text style={styles.title}>OTP Verification</Text>
//                     </View>
//                     <Text style={styles.subtitle}>
//                         We have sent a verification code to
//                     </Text>
//                     <View style={styles.phoneRow}>
//                         <Text style={styles.phone}>+91 9392322767</Text>
//                         <Image
//                             source={require("../../assets/images/phone.png")}
//                             style={styles.phoneImage}
//                             resizeMode="contain"
//                         />
//                     </View>
//                 </View>

//                 {/* OTP Boxes */}
//                 <View style={styles.otpRow}>
//                     {otp.map((digit, index) => (
//                         <TextInput
//                             key={index}
//                             ref={(ref) => {
//                                 inputs.current[index] = ref;
//                             }}
//                             style={[styles.input, otp[index] !== "" && styles.filledInput]}
//                             keyboardType="numeric"
//                             maxLength={1}
//                             value={digit}
//                             onChangeText={(text) => handleChange(text, index)}
//                             onKeyPress={(e) => handleKeyPress(e, index)}
//                         />
//                     ))}
//                 </View>

//                 {/* Info Text */}
//                 <Text style={styles.infoText}>Check text messages for your OTP</Text>

//                 {/* Resend Section */}
//                 <View style={styles.resendRow}>
//                     <Text style={styles.normalText}>Didn’t get the OTP?</Text>
//                     <Text> </Text>
//                     {timer > 0 ? (
//                         <Text style={styles.resendText}>Resend SMS in {timer}s</Text>
//                     ) : (
//                         <TouchableOpacity onPress={() => setTimer(30)}>
//                             <Text style={[styles.resendText, { color: "#6C63FF" }]}>
//                                 Resend SMS
//                             </Text>
//                         </TouchableOpacity>
//                     )}
//                 </View>
//             </ScrollView>

//             {/* Verify Button at Bottom */}
//             <TouchableOpacity
//                 style={[
//                     styles.verifyBtn,
//                     otp.join("").length < 6 && { backgroundColor: "#bba8f2" },
//                 ]}
//                 disabled={otp.join("").length < 6}
//                 onPress={() => navigation.navigate('Language')}
//             >
//                 <Text style={styles.verifyText}>Verify</Text>
//             </TouchableOpacity>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     safeArea: {
//         flex: 1,
//         backgroundColor: "#fff",
//     },
//     scrollContainer: {
//         flexGrow: 1,
//         alignItems: "center",
//         padding: wp("5%"),
//         paddingBottom: hp("12%"),
//     },
//     header: {
//         width: "100%",
//         marginBottom: hp("3%"),
//         marginTop: hp(4),
//     },
//     headerRow: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: hp("1%"),
//     },
//     title: {
//         fontSize: wp(5),
//         fontWeight: "400",
//         marginLeft: wp("3%"),
//         fontFamily: "Poppins-Regular",
//         marginTop: hp(0.6),
//     },
//     subtitle: {
//         fontSize: wp("4%"),
//         color: "black",
//     },
//     phoneRow: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginTop: hp(3),
//     },
//     phone: {
//         fontSize: wp(4),
//         fontWeight: "bold",
//         marginRight: wp("2%"),
//         fontFamily: 'Poppins-Bold'
//     },
//     phoneImage: {
//         width: wp(4),
//         height: wp(4),
//     },
//     otpRow: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         width: "100%",
//         marginVertical: hp("0%"),
//     },
//     input: {
//         width: wp("12%"),
//         height: hp("6%"),
//         borderWidth: 1,
//         borderColor: "#00000017",
//         borderRadius: 8,
//         textAlign: "center",
//         fontSize: wp("5%"),
//         color: "#000",
//         backgroundColor: "#fff",
//         shadowColor: "#00000017",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 3,
//         elevation: 3,
//     },
//     filledInput: {
//         borderColor: "#6C63FF",
//         borderWidth: 0.9,
//         shadowColor: "#6C63FF",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 3,
//         elevation: 3,
//     },
//     infoText: {
//         color: "#6E533F7A",
//         marginBottom: hp("2%"),
//         fontSize: wp("2.4%"),
//         fontFamily: 'Poppins-Medium',
//         marginTop: hp(2.5)
//     },
//     resendRow: {
//         flexDirection: "row",
//         marginBottom: hp("5%"),
//         alignItems: "center",
//     },
//     normalText: {
//         fontSize: wp("3.5%"),
//         color: 'black',
//     },
//     resendText: {
//         fontSize: wp("3.5%"),
//         color: "red",
//         fontWeight: "500",
//     },
//     verifyBtn: {
//         backgroundColor: "#6C63FF",
//         position: "absolute",
//         bottom: 20,
//         left: 20,
//         right: 20,
//         paddingVertical: hp("1.5%"),
//         borderRadius: 16,
//         alignItems: "center",
//         marginBottom: hp(5)
//     },
//     verifyText: {
//         color: "#fff",
//         fontSize: wp("4.5%"),
//         fontWeight: "600",
//     },
// });

// export default OTPScreen;
