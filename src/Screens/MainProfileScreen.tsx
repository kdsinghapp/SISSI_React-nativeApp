import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Animated,
    Easing
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import SuggestScreen from "../Components/Category/SuggestProductScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EndPointUser } from "../api/serciveUser/EndPiontUser";
import { getApi } from "../api/getApi/getApi";
import { IMAGE_BASE_URL } from "../api/authApi/BaseUrl";

const MainProfileScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const [selectedLang, setSelectedLang] = useState("English");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [suggestVisible, setSuggestVisible] = useState(false);
    const [token, setToken] = useState('');
    const [profileData, setProfileData] = useState({});
    const animatedSuggestHeight = useRef(new Animated.Value(0)).current;

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const init = async () => {
            const storedToken = await AsyncStorage.getItem('authToken');
            if (storedToken) setToken(storedToken);
        };

        init(); // <-- yahan call karna zaroori hai
    }, []);
    useEffect(() => {
        const getProfile = async () => {
            const response = await getApi(EndPointUser.MainProfile, setLoading, token)
            // const dd = response
            if (response.success) setIsLoggedIn(true)

            setProfileData(response.data)
            console.log(response?.data, 'get__api__from__you')
        }
        if (token) getProfile()

    }, [token])


    const openSuggest = () => {
        setSuggestVisible(true);
        Animated.timing(animatedSuggestHeight, {
            toValue: hp("50%"),
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();
    };

    const closeSuggest = () => {
        Animated.timing(animatedSuggestHeight, {
            toValue: 0,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start(() => setSuggestVisible(false));
    };
console.log("🖼️ Image URL:", profileData?.image?.startsWith('http')
  ? profileData.image
  : IMAGE_BASE_URL + profileData.image);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#D9D9D940" />

            {/* Top Bar */}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={wp("4.5%")} color="#000" />
                </TouchableOpacity>
                <Text style={styles.topBarTitle}>You</Text>
                <View style={styles.topBarRight}>
                    <TouchableOpacity onPress={() => navigation.navigate('AddveySettings')}>
                        <Image
                            source={require("../../assets/images/verify.png")}
                            style={styles.profileImageTopbar}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('BuySellContactUs')}>
                        <Image
                            source={require("../../assets/images/setting.png")}
                            style={styles.profileImageTopbar}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Login Section */}
            {!isLoggedIn && (
                <View style={styles.loginCard}>
                    <View>
                        <Text style={styles.loginTitle}>Account</Text>
                        <Text style={styles.loginSubtitle}>
                            Login to access nearby services,{'\n'}store & more...
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={() => setIsLoggedIn(true)}
                    >
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Profile Card (after login) */}
            {isLoggedIn && (
                <View style={styles.profileCard}>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={() => navigation.navigate('VerifyEmailProfile')}>
                            {/* <Image
                                source={{ uri : IMAGE_BASE_URL+profileData?.image}} 
                                style={styles.profileImage}
                            /> */}

                            <Image
                                source={{
                                    uri: profileData?.image?.startsWith('http')
                                        ? profileData?.image
                                        : IMAGE_BASE_URL + profileData?.image,
                                }}
                                style={styles.profileImage}
                            />
                        </TouchableOpacity>
                        <View style={styles.profileDetails}>
                            <View style={styles.row}>
                                <Text style={styles.name}>{profileData?.name}</Text>
                            </View>
                            <Text style={styles.phone}>{profileData?.phone}</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('Following')}>
                        <View style={styles.followRow}>
                            <Text style={styles.followText}>Following</Text>
                            <MaterialIcons
                                name="keyboard-arrow-right"
                                size={16}
                                color="#6C63FF"
                                style={{ marginLeft: 0.5, marginTop: hp(0.5) }}
                            />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.detailsBlock}>
                        <Text style={styles.langLabel}>
                            Languages I Know{" "}
                            <Feather name="arrow-right" size={10} color="#6C63FF" />
                        </Text>
                        <Text style={styles.languages}>
                            Telugu • Hindi • English
                        </Text>
                    </View>

                    <View style={styles.partnerIdContainer}>
                        <Text style={styles.partnerId}>
                            Addvey Partner ID :{" "}
                            <Text style={{ fontWeight: "600" }}>{profileData?.partnerId}</Text>
                        </Text>
                        <Image
                            source={require("../../assets/images/profilesave.png")}
                            style={styles.partnerIdIcon}
                        />
                    </View>
                </View>
            )}

            {/* Scrollable Content */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Language Section */}
                <View style={styles.cardLanguage}>
                    <View style={styles.row}>
                        <View style={styles.shortLeftBorder} />
                        <Text style={styles.sectionTitle}>
                            Try Addvey in your language
                        </Text>
                    </View>
                    <View style={styles.langRow}>
                        {["English", "తెలుగు", "हिंदी"].map((lang) => (
                            <TouchableOpacity
                                key={lang}
                                style={[
                                    styles.langChip,
                                    selectedLang === lang && styles.activeLangChip,
                                ]}
                                onPress={() => setSelectedLang(lang)}
                            >
                                <Text
                                    style={[
                                        styles.langText,
                                        selectedLang === lang && styles.activeLangText,
                                    ]}
                                >
                                    {lang}
                                </Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity>
                            <Text style={styles.moreText}>more+</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* How to use */}
                <TouchableOpacity style={styles.cardRow} onPress={() => navigation.navigate('HowTouse')}>
                    <View style={styles.row}>
                        <SimpleLineIcons name="question" style={{ marginRight: wp(2) }} size={18} color="black" />
                        <Text style={styles.sectionTitle}>How to use Addvey Partner</Text>
                    </View>
                    <Feather name="arrow-right" size={20} color="black" />
                </TouchableOpacity>

                {/* Start selling */}
                <View style={styles.cardLanguage}>
                    <View style={styles.row}>
                        <View style={styles.shortLeftBorder} />
                        <Text style={styles.sectionTitle}>
                            Start selling for free
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.cardRowPostAdd}>
                        <View style={styles.row}>
                            <Image
                                source={require("../../assets/images/3.png")}
                                style={styles.leftIcon}
                            />
                            <Text style={styles.sectionTitle}>Addvey Partner</Text>
                        </View>
                        <Image
                            source={require("../../assets/images/share.png")}
                            style={styles.leftIcon}
                        />
                    </TouchableOpacity>
                </View>

                {/* Feedback */}
                <View style={styles.cardLanguage}>
                    <View style={styles.row}>
                        <View style={styles.shortLeftBorder} />
                        <Text style={styles.sectionTitle}>FEEDBACK</Text>
                    </View>
                    <TouchableOpacity style={styles.cardRowPostAdd}>
                        <TouchableOpacity onPress={() => navigation.navigate('ShareSuggestion')}>
                            <View style={styles.row}>
                                <Image
                                    source={require("../../assets/images/edit.png")}
                                    style={styles.leftIcon}
                                />
                                <Text style={styles.sectionTitle}>Share Your Suggestions </Text>
                            </View>
                        </TouchableOpacity>
                        <MaterialIcons name="keyboard-arrow-right" size={22} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cardRowPostAdd}>
                        <View style={styles.row}>
                            <Image
                                source={require("../../assets/images/star.png")}
                                style={styles.leftIcon}
                            />
                            <Text style={styles.sectionTitle}>Rate Us</Text>
                        </View>
                        <Image
                            source={require("../../assets/images/share.png")}
                            style={styles.leftIcon}
                        />
                    </TouchableOpacity>
                </View>

                {/* Others */}
                <View style={styles.cardLanguage}>
                    <View style={styles.row}>
                        <View style={styles.shortLeftBorder} />
                        <Text style={styles.sectionTitle}>OTHERS</Text>
                    </View>
                    <TouchableOpacity style={styles.cardRowPostAdd}>
                        <View style={styles.row}>
                            <Image
                                source={require("../../assets/images/plus.png")}
                                style={styles.leftIcon}
                            />
                            <Text style={styles.sectionTitle}>What’s New</Text>
                        </View>
                        <Image
                            source={require("../../assets/images/share.png")}
                            style={styles.leftIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cardRowPostAdd} onPress={() => navigation.navigate('SocialLinks', { socialLinks: profileData?.socialLinks })}>
                        <View style={styles.row}>
                            <Image
                                source={require("../../assets/images/link.png")}
                                style={styles.leftIcon}
                            />
                            <Text style={styles.sectionTitle}>Social Links</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={22} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cardRowPostAdd} onPress={() => navigation.navigate('TieUps')}>
                        <View style={styles.row}>
                            <Image
                                source={require("../../assets/images/tie.png")}
                                style={styles.leftIcon}
                            />
                            <Text style={styles.sectionTitle}>Tie-ups</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={22} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cardRowPostAdd} onPress={openSuggest}>
                        <View style={styles.row}>
                            <Image
                                source={require("../../assets/images/starplus.png")}
                                style={styles.leftIcon}
                            />
                            <Text style={styles.sectionTitle}>Suggest a Product</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={22} color="black" />
                    </TouchableOpacity>
                </View>

                {/* About */}
                <TouchableOpacity style={styles.cardRow} onPress={() => navigation.navigate('Policy')}>
                    <View style={styles.row}>
                        <Image
                            source={require("../../assets/images/tablet.png")}
                            style={styles.leftIcon}
                        />
                        <Text style={styles.sectionTitle}>About Addvey Partner</Text>
                    </View>
                    <Ionicons
                        name="chevron-forward"
                        size={wp("6%")}
                        color="#000"
                    />
                </TouchableOpacity>

                {/* Share app */}
                <TouchableOpacity style={styles.Bottombutton}>
                    <View style={styles.row}>
                        <Feather name="share" size={18} style={{ marginRight: wp(2) }} color="black" />
                        <Text style={styles.sectionTitle}>Share the app</Text>
                    </View>
                </TouchableOpacity>

                {/* Logout */}
                <TouchableOpacity style={styles.BottombuttonLogin}>
                    <View style={styles.row}>
                        <Image
                            source={require("../../assets/images/log-in.png")}
                            style={styles.leftIcon}
                        />
                        <Text style={styles.sectionTitleLogin}>Log out</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>

            {/* Suggest Modal with Overlay */}
            {suggestVisible && (
                <View style={styles.overlay}>
                    {/* Close Icon on top-right of overlay */}
                    <TouchableOpacity style={styles.suggestCloseIcon} onPress={closeSuggest}>
                        <Ionicons name="close" size={24} color="black" />
                    </TouchableOpacity>

                    {/* Animated Bottom Sheet */}
                    <Animated.View style={[styles.bottomSheet, { height: animatedSuggestHeight }]}>
                        <SuggestScreen />
                    </Animated.View>
                </View>
            )}
        </View>
    );
};

export default MainProfileScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#D9D9D940" },
    topBar: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-between",
        paddingHorizontal: wp("4%"), paddingVertical: hp("2%"),
        borderBottomWidth: 1, borderBottomColor: "#eee", marginTop: hp(4),
    },
    topBarTitle: {
        fontSize: wp("4%"), flex: 1, marginLeft: wp(3),
        fontFamily: "Poppins-Medium", marginTop: hp(0.5),
    },
    topBarRight: { flexDirection: "row", alignItems: "center", gap: 13 },
    scrollContent: { padding: wp("4%"), paddingBottom: hp("4%") },

    // Login Card
    loginCard: {
        backgroundColor: "#FFFFFF", borderRadius: 12,
        paddingVertical: wp("4%"), paddingHorizontal: wp(6),
        marginBottom: hp("1%"), marginHorizontal: wp(4),
        flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    },
    loginTitle: { fontSize: wp("4%"), fontFamily: "Poppins-Medium", color: "#000" },
    loginSubtitle: {
        fontSize: wp("3%"), color: "#666", marginTop: hp(0.5),
        fontFamily: "Poppins-Regular",
    },
    loginButton: {
        paddingVertical: hp("0.8%"), paddingHorizontal: wp("5%"),
        borderRadius: 12, borderColor: '#6C63FF', borderWidth: 1
    },
    loginButtonText: { color: "#6C63FF", fontFamily: "Poppins-Medium", fontSize: wp(3.2) },

    profileCard: {
        backgroundColor: "#FFFFFF", borderRadius: 12,
        paddingVertical: wp("4%"), paddingHorizontal: wp(6),
        marginBottom: hp("1%"), marginHorizontal: wp(4)
    },
    row: { flexDirection: "row", alignItems: "center" },
    profileImage: {
        width: wp("16%"), height: wp("16%"), borderRadius: wp("9%"), resizeMode: "contain",
    },
    profileDetails: { marginLeft: wp("3.2%"), justifyContent: "center" },
    profileImageTopbar: { width: wp("5.8%"), height: wp("5.8%"), resizeMode: "contain" },
    name: { fontSize: wp("4%"), fontWeight: "600", marginRight: wp("2%"), fontFamily: "Poppins-Medium" },
    phone: { fontSize: wp("2.8%"), color: "#000000", marginTop: hp("0.2%") },
    detailsBlock: { marginTop: hp("1%"), alignItems: "flex-start" },
    langLabel: { fontSize: wp("3%"), color: "#6E533F", marginBottom: hp("0.5%") },
    followRow: { flexDirection: "row", alignItems: "center", marginTop: hp(1) },
    followText: { fontSize: hp(1.6), color: "#6C63FF" },
    languages: { fontSize: wp("3%"), marginTop: hp(0.4), fontFamily: "Poppins-Medium" },
    partnerIdContainer: {
        borderTopWidth: 1, borderTopColor: "#ccc", width: "100%",
        flexDirection: "row", alignItems: "center", justifyContent: "center",
        marginTop: hp("2%"), paddingTop: hp("1%"),
    },
    partnerId: { fontSize: wp("3.5%"), color: "#6E533F", textAlign: "center" },
    partnerIdIcon: { width: wp("5%"), height: wp("5%"), resizeMode: "contain", marginLeft: wp("2%") },

    cardLanguage: {
        backgroundColor: "#fff", borderRadius: 12,
        paddingVertical: wp("4%"), paddingHorizontal: wp(3.2),
        marginBottom: hp("2%"),
    },
    sectionTitle: { fontSize: wp("3.8%"), fontFamily: "Poppins-Medium", marginTop: hp(0.4) },
    sectionTitleLogin: { fontSize: wp("3.8%"), fontFamily: "Poppins-Medium", marginTop: hp(0.4), color: '#FF0303' },
    leftIcon: { width: wp("5%"), height: wp("5%"), marginRight: wp("2%"), resizeMode: "contain" },

    langRow: { flexDirection: "row", flexWrap: "wrap", marginTop: hp("1%"), paddingHorizontal: wp(3), paddingTop: hp(1) },
    langChip: {
        borderWidth: 1, borderColor: "#ccc", borderRadius: 20,
        paddingHorizontal: wp("5%"), paddingVertical: hp("0.8%"),
        marginRight: wp("2%"), marginBottom: hp("1%"),
    },
    activeLangChip: { borderColor: "#6C63FF" },
    langText: { fontSize: wp(2.8), color: "#444" },
    activeLangText: { color: "#6C63FF", fontFamily: 'Poppins-Medium' },
    moreText: { color: "#6C63FF", alignSelf: "center", marginLeft: wp("2%"), marginTop: hp(0.5), fontFamily: 'Poppins-Medium', fontSize: wp(3.8) },

    cardRow: {
        backgroundColor: "#fff", borderRadius: 12, padding: wp("4%"),
        marginBottom: hp("2%"), flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    },
    Bottombutton: {
        backgroundColor: "#fff", borderRadius: 12, padding: wp("4%"),
        marginBottom: hp("2%"), flexDirection: "row", justifyContent: "center", alignItems: "center",
        borderColor: '#6C63FF33', borderWidth: 1
    },
    BottombuttonLogin: {
        backgroundColor: "#fff", borderRadius: 12, padding: wp("4%"),
        marginBottom: hp("2%"), flexDirection: "row", justifyContent: "center", alignItems: "center",
        borderColor: '#FF030333', borderWidth: 1
    },
    cardRowPostAdd: {
        marginTop: hp("1%"), flexDirection: "row", justifyContent: "space-between",
        alignItems: "center", paddingHorizontal: wp(3), paddingTop: hp(1), marginBottom: hp(0.6)
    },
    shortLeftBorder: {
        width: 3, height: hp("3.2%"), backgroundColor: "black",
        borderTopRightRadius: 2, borderBottomRightRadius: 2, left: '-3.6%'
    },

    // Overlay background
    overlay: {
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
    },
    suggestCloseIcon: {
        position: "absolute", top: hp(43), right: wp(4), zIndex: 101,
        padding: 8, backgroundColor: "#fff", borderRadius: 20,
    },
    bottomSheet: {
        backgroundColor: "#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20,
        overflow: "hidden", zIndex: 100, elevation: 100,
    },
});
