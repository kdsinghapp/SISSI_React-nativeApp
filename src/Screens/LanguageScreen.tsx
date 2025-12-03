import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import apiClient, { BaseUrl } from "../api/authApi/BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Language {
  id: string;
  name: string;
  native_name?: string;
}

const LanguageScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  //  Fetch Languages API
const fetchLanguages = async () => {
  try {
    setLoading(true);

    // 🔹 Get token from AsyncStorage
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      console.warn("No token found — user might not be logged in");
      return;
    }else {
        console.log('token__save')
    }

    // 🔹 Send request with Authorization header
    const response = await apiClient.get("/languages/view-languages?target=vendor", {
      headers: {
        Authorization: `Bearer ${token}`, // <--  attach token here
      },
    });

    if (response?.data?.success) {
      const languagesData = response.data.data?.data || [];
      console.log("✅ Languages fetched successfully:", languagesData);
      setLanguages(languagesData);
    } else {
      console.warn("⚠️ Unexpected API response:", response.data);
    }

  } catch (error) {
    console.error("Error fetching languages:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchLanguages();
  }, []);

  const toggleLanguage = (id: string) => {
    setSelectedLangs((prev) =>
      prev.includes(id) ? prev.filter((lang) => lang !== id) : [...prev, id]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.heading}>Which languages do you speak?</Text>
      </View>

      {/* Loader */}
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#6C63FF" />
        </View>
      ) : (
        <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
          <View style={{ marginBottom: hp(12) }}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.id}
                style={styles.optionRow}
                onPress={() => toggleLanguage(lang.id)}
              >
                <Text
                  style={[
                    styles.langText,
                    selectedLangs.includes(lang?.id) && { color: "#6C63FF" },
                  ]}
                >
                  {lang.name}
                  {lang.native_name ? ` . ${lang.native_name}` : ""}
                </Text>

                <View
                  style={[
                    styles.radioOuter,
                    selectedLangs.includes(lang.id) && {
                      borderColor: "#6C63FF",
                      borderWidth: 3,
                    },
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}

      {/* Bottom Button */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("EnableLocation")}
        >
          <Text style={styles.buttonText}>Save & Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LanguageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: wp("5%"),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp(6),
    marginBottom: hp(2),
  },
  heading: {
    fontSize: wp(4.6),
    fontWeight: "600",
    color: "#111",
    marginLeft: wp("3%"),
  },
  scrollArea: {
    flex: 1,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(5),
  },
  langText: {
    fontSize: wp("4%"),
    color: "#333",
  },
  radioOuter: {
    width: wp("4%"),
    height: wp("4%"),
    borderRadius: wp("4%"),
    borderWidth: 1.2,
    borderColor: "#0000005E",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    position: "absolute",
    bottom: hp(4),
    left: wp(5),
    right: wp(5),
  },
  button: {
    backgroundColor: "#6C63FF",
    paddingVertical: hp(1.5),
    borderRadius: wp(4),
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: wp("4.5%"),
    fontWeight: "600",
  },
});


// // LanguageScreen.tsx
// import React, { useState } from "react";
// import {
//     SafeAreaView,
//     View,
//     Text,
//     TouchableOpacity,
//     ScrollView,
//     StyleSheet,
//     StatusBar,
// } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";
// import {
//     widthPercentageToDP as wp,
//     heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import { useNavigation } from "@react-navigation/native";

// const languages = [
//     { id: "en", name: "English", native: "" },
//     { id: "hi", name: "Hindi", native: "हिन्दी" },
//     { id: "te", name: "Telugu", native: "తెలుగు" },
//     { id: "ta", name: "Tamil", native: "தமிழ்" },
//     { id: "ml", name: "Malayalam", native: "മലയാളം" },
//     { id: "mr", name: "Marathi", native: "मराठी" },
//     { id: "gu", name: "Gujarati", native: "ગુજરાતી" },
//     { id: "bn", name: "Bengali", native: "বাংলা" },
//     { id: "pa", name: "Punjabi", native: "" },
//     { id: "or", name: "Odia", native: "" },
//     { id: "as", name: "Assamese", native: "অসমীয়া" },
//     { id: "ur", name: "Urdu", native: "اردو" },
//     { id: "fr", name: "French", native: "Français" },
//     { id: "es", name: "Spanish", native: "Español" },
// ];

// const LanguageScreen: React.FC = () => {
//     const navigation = useNavigation<any>();
//     const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
//   const [languages, setLanguages] = useState<Language[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//     // const toggleLanguage = (id: string) => {
//     //     setSelectedLangs((prev) =>
//     //         prev.includes(id) ? prev.filter((lang) => lang !== id) : [...prev, id]
//     //     );
//     // };



//       useEffect(() => {
//     fetchLanguages();
//   }, []);


//     const toggleLanguage = (id: string) => {
//     setSelectedLangs((prev) =>
//       prev.includes(id) ? prev.filter((lang) => lang !== id) : [...prev, id]
//     );
//   };
//     return (
//         <SafeAreaView style={styles.container}>
//             {/* StatusBar set according to bg */}
//             <StatusBar barStyle="dark-content" backgroundColor="#fff" />

//             {/* Header fixed */}
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => navigation.navigate('OTP')}>
//                     <MaterialIcons name="arrow-back" size={20} color="#000" />
//                 </TouchableOpacity>
//                 <Text style={styles.heading}>Which languages do you speak?</Text>
//             </View>

//             {/* Scrollable languages list */}
//             <ScrollView
//                 style={styles.scrollArea}
//                 showsVerticalScrollIndicator={false}
//             >
//                 <View style={{ marginBottom: hp(12) }}>
//                     {languages.map((lang) => (
//                         <TouchableOpacity
//                             key={lang.id}
//                             style={styles.optionRow}
//                             onPress={() => toggleLanguage(lang.id)}
//                         >
//                             <Text
//                                 style={[
//                                     styles.langText,
//                                     selectedLangs.includes(lang.id) && { color: "#6C63FF" },
//                                 ]}
//                             >
//                                 {lang.name}
//                                 {lang.native ? ` . ${lang.native}` : ""}
//                             </Text>

//                             {/* Checkbox style selection */}
//                             <View
//                                 style={[
//                                     styles.radioOuter,
//                                     selectedLangs.includes(lang.id) && {
//                                         borderColor: "#6C63FF",
//                                         borderWidth: 3,
//                                     },
//                                 ]}
//                             />
//                         </TouchableOpacity>
//                     ))}
//                 </View>
//             </ScrollView>

//             {/* Fixed Bottom Button */}
//             <View style={styles.buttonWrapper}>
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={() => navigation.navigate("EnableLocation")}
//                 >
//                     <Text style={styles.buttonText}>Save & Continue</Text>
//                 </TouchableOpacity>
//             </View>
//         </SafeAreaView>
//     );
// };

// export default LanguageScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff",
//         paddingHorizontal: wp("5%"),
//     },
//     header: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginTop: hp(6),
//         marginBottom: hp(2),
//     },
//     heading: {
//         fontSize: wp(4.6),
//         fontWeight: "600",
//         color: "#111",
//         marginLeft: wp("3%"),
//         fontFamily: "Poppins-Bold",
//         marginTop: hp(0.3),
//     },
//     scrollArea: {
//         flex: 1,
//     },
//     optionRow: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         paddingVertical: hp(1.2),
//         paddingHorizontal: wp(5),
//     },
//     langText: {
//         fontSize: wp("4%"),
//         color: "#333",
//     },
//     radioOuter: {
//         width: wp("4%"),
//         height: wp("4%"),
//         borderRadius: wp("4%"),
//         borderWidth: 1.2,
//         borderColor: "#0000005E",
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     buttonWrapper: {
//         position: "absolute",
//         bottom: hp(4),
//         left: wp(5),
//         right: wp(5),
//     },
//     button: {
//         backgroundColor: "#6C63FF",
//         paddingVertical: hp(1.5),
//         width: "100%",
//         borderRadius: wp(4),
//         alignItems: "center",
//     },
//     buttonText: {
//         color: "#fff",
//         fontSize: wp("4.5%"),
//         fontWeight: "600",
//     },
// });


// // LanguageScreen.tsx
// import React, { useState } from "react";
// import {
//     SafeAreaView,
//     View,
//     Text,
//     TouchableOpacity,
//     ScrollView,
//     StyleSheet,
//     StatusBar,
// } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";
// import {
//     widthPercentageToDP as wp,
//     heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import { useNavigation } from "@react-navigation/native";

// const languages = [
//     { id: "en", name: "English", native: "" },
//     { id: "hi", name: "Hindi", native: "हिन्दी" },
//     { id: "te", name: "Telugu", native: "తెలుగు" },
//     { id: "ta", name: "Tamil", native: "தமிழ்" },
//     { id: "ml", name: "Malayalam", native: "മലയാളം" },
//     { id: "mr", name: "Marathi", native: "मराठी" },
//     { id: "gu", name: "Gujarati", native: "ગુજરાતી" },
//     { id: "bn", name: "Bengali", native: "বাংলা" },
//     { id: "pa", name: "Punjabi", native: "" },
//     { id: "or", name: "Odia", native: "" },
//     { id: "as", name: "Assamese", native: "অসমীয়া" },
//     { id: "ur", name: "Urdu", native: "اردو" },
//     { id: "fr", name: "French", native: "Français" },
//     { id: "es", name: "Spanish", native: "Español" },
// ];

// const LanguageScreen: React.FC = () => {
//     const navigation = useNavigation<any>();
//     const [selectedLangs, setSelectedLangs] = useState<string[]>([]);

//     const toggleLanguage = (id: string) => {
//         setSelectedLangs((prev) =>
//             prev.includes(id) ? prev.filter((lang) => lang !== id) : [...prev, id]
//         );
//     };

//     return (
//         <SafeAreaView style={styles.container}>
//             {/* StatusBar set according to bg */}
//             <StatusBar barStyle="dark-content" backgroundColor="#fff" />

//             {/* Header fixed */}
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => navigation.navigate('OTP')}>
//                     <MaterialIcons name="arrow-back" size={20} color="#000" />
//                 </TouchableOpacity>
//                 <Text style={styles.heading}>Which languages do you speak?</Text>
//             </View>

//             {/* Scrollable languages list */}
//             <ScrollView
//                 style={styles.scrollArea}
//                 showsVerticalScrollIndicator={false}
//             >
//                 <View style={{ marginBottom: hp(12) }}>
//                     {languages.map((lang) => (
//                         <TouchableOpacity
//                             key={lang.id}
//                             style={styles.optionRow}
//                             onPress={() => toggleLanguage(lang.id)}
//                         >
//                             <Text
//                                 style={[
//                                     styles.langText,
//                                     selectedLangs.includes(lang.id) && { color: "#6C63FF" },
//                                 ]}
//                             >
//                                 {lang.name}
//                                 {lang.native ? ` . ${lang.native}` : ""}
//                             </Text>

//                             {/* Checkbox style selection */}
//                             <View
//                                 style={[
//                                     styles.radioOuter,
//                                     selectedLangs.includes(lang.id) && {
//                                         borderColor: "#6C63FF",
//                                         borderWidth: 3,
//                                     },
//                                 ]}
//                             />
//                         </TouchableOpacity>
//                     ))}
//                 </View>
//             </ScrollView>

//             {/* Fixed Bottom Button */}
//             <View style={styles.buttonWrapper}>
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={() => navigation.navigate("EnableLocation")}
//                 >
//                     <Text style={styles.buttonText}>Save & Continue</Text>
//                 </TouchableOpacity>
//             </View>
//         </SafeAreaView>
//     );
// };

// export default LanguageScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff",
//         paddingHorizontal: wp("5%"),
//     },
//     header: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginTop: hp(6),
//         marginBottom: hp(2),
//     },
//     heading: {
//         fontSize: wp(4.6),
//         fontWeight: "600",
//         color: "#111",
//         marginLeft: wp("3%"),
//         fontFamily: "Poppins-Bold",
//         marginTop: hp(0.3),
//     },
//     scrollArea: {
//         flex: 1,
//     },
//     optionRow: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         paddingVertical: hp(1.2),
//         paddingHorizontal: wp(5),
//     },
//     langText: {
//         fontSize: wp("4%"),
//         color: "#333",
//     },
//     radioOuter: {
//         width: wp("4%"),
//         height: wp("4%"),
//         borderRadius: wp("4%"),
//         borderWidth: 1.2,
//         borderColor: "#0000005E",
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     buttonWrapper: {
//         position: "absolute",
//         bottom: hp(4),
//         left: wp(5),
//         right: wp(5),
//     },
//     button: {
//         backgroundColor: "#6C63FF",
//         paddingVertical: hp(1.5),
//         width: "100%",
//         borderRadius: wp(4),
//         alignItems: "center",
//     },
//     buttonText: {
//         color: "#fff",
//         fontSize: wp("4.5%"),
//         fontWeight: "600",
//     },
// });
