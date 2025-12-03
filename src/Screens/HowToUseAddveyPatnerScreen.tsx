import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    StatusBar,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HowToUseAddveyPatnerScreen: React.FC = () => {
    const navigation = useNavigation<any>();

    // Language state
    const [selectedLang, setSelectedLang] = useState("English");

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Ionicons
                        name="arrow-back"
                        size={wp("4.5%")}
                        color="black"
                        onPress={() => navigation.goBack()}
                    />
                    <Text style={styles.headerTitle}>
                        How to use Addvey
                    </Text>
                </View>
            </View>

            {/* Buy/Sell row */}
            <View style={styles.buySellRow}>
                <Text style={styles.buySellText}>Buy/Sell</Text>
                <View style={styles.buySellActiveIndicator} />
            </View>

            {/* Content */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: wp(4),
                    paddingBottom: hp(10),
                }}
            >
                {/* Language Switcher */}
                <View style={styles.langRow}>
                    {["English", "తెలుగు", "हिंदी"].map((lang) => (
                        <TouchableOpacity
                            key={lang}
                            style={[
                                styles.langBtn,
                                selectedLang === lang && styles.activeLang,
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
                </View>

                {/* Card */}
                <View style={styles.card}>
                    {/* Video Thumbnail */}
                    <View style={styles.videoBox}>
                        {/* Play Icon Center */}
                        <Feather
                            name="play-circle"
                            size={wp("10%")}
                            color="#fff"
                        />
                        {/* Bottom-right Image */}
                        <Image
                            source={require("../../assets/images/you.png")}
                            style={styles.youtubeIcon}
                        />
                    </View>

                    {/* Title */}
                    <View style={styles.cardContent}>
                        <View style={styles.iconRow}>
                            <Image
                                source={require("../../assets/images/bycir.png")}
                                style={{
                                    width: wp(10),
                                    height: hp(4),
                                    resizeMode: "contain",
                                }}
                            />
                            <Text style={styles.cardTitle}> Buy/Sell</Text>
                        </View>

                        <Text style={styles.subTitle}>
                            How to use Addvey Buy & Sell?
                        </Text>
                        <Text style={styles.description}>
                            Open Addvey Partner app, tap "Buy/Sell," and post ads
                            for electronics, furniture, clothes, and more.
                            Contact the buyer, negotiate, and complete the deal
                            directly.
                        </Text>
                    </View>

                    {/* Divider above Share */}
                    <View style={styles.shareDivider} />

                    {/* Share */}
                    <TouchableOpacity style={styles.shareRow}>
                        <Ionicons
                            name="share-outline"
                            size={wp("4.5%")}
                            color="#6C63FF"
                        />
                        <Text style={styles.shareText}> Share</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default HowToUseAddveyPatnerScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },

    /** Header */
    header: {
        paddingHorizontal: wp("5%"),
        paddingVertical: hp("1.5%"),
        marginTop: hp(4),
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    headerLeft: { flexDirection: "row", alignItems: "center" },
    headerTitle: {
        fontSize: wp("4%"),
        fontWeight: "600",
        marginLeft: wp(3),
        color: "black",
    },

    /** Buy/Sell Row */
    buySellRow: {
        borderBottomWidth: 1,
        borderBottomColor: "#D9D9D9",
        paddingHorizontal: wp("5%"),
        paddingVertical: hp(1),
        position: "relative",
    },
    buySellText: {
        fontSize: wp("3.8%"),
        color: "#000",
        fontWeight: "500",
    },
    buySellActiveIndicator: {
        position: "absolute",
        bottom: 0,
        left: wp("5%"),
        width: wp("15%"),
        height: 3,
        backgroundColor: "#6A5AE0",
        borderTopLeftRadius: wp(2),
        borderTopRightRadius: wp(2),
    },

    /** Language buttons */
    langRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: hp(4),
    },
    langBtn: {
        paddingVertical: hp(0.5),
        paddingHorizontal: wp(5),
        borderRadius: wp(5),
        borderWidth: 1,
        borderColor: "#ccc",
        marginHorizontal: wp(1.5),
    },
    langText: { fontSize: wp(3.5), color: "#000" },
    activeLang: {
        borderColor: "#6C63FF",
    },
    activeLangText: { color: "#6C63FF", fontWeight: "600" },

    /** Card */
    card: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: wp(3),
        backgroundColor: "#fff",
        overflow: "hidden",
    },
    videoBox: {
        height: hp(20),
        backgroundColor: "#D9D9D980",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        margin: 10,
        borderRadius: 10,
    },
    youtubeIcon: {
        width: wp(10),
        height: wp(10),
        position: "absolute",
        bottom: hp(0),
        right: wp(2),
        resizeMode: "contain",
    },
    cardContent: { padding: wp(4) },
    iconRow: { flexDirection: "row", alignItems: "center" },
    cardTitle: {
        fontSize: wp(4.5),
        color: "#000",
        fontFamily: "Poppins-Medium",
        marginTop: hp(0.5),
    },
    subTitle: {
        marginTop: hp(1.5),
        fontSize: wp(3),
        color: "#000",
        fontFamily: "Poppins-Regular",
    },
    description: {
        marginTop: hp(1),
        fontSize: wp(2.5),
        color: "#555",
        lineHeight: hp(2),
        fontFamily: "Poppins-Regular",
    },

    /** Divider above Share */
    shareDivider: {
        height: 1,
        backgroundColor: "#E5E5E5",
    },

    /** Share Row */
    shareRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: hp(1.5),
        borderBottomWidth: 2,
        borderBottomColor: "#6C63FF",
    },
    shareText: {
        fontSize: wp(3.5),
        color: "#6C63FF",
        fontWeight: "500",
    },
});
