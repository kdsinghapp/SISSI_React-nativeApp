import React, { useState, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    Image,
    Animated,
    Easing
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import CategoryDetailsScreen from "./CategoryDetailsScreen";


const BuySellSearchScreen = () => {
    const navigation = useNavigation<any>();
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [recentSearches, setRecentSearches] = useState([
        "BMW Sports car",
        "BMW cars",
        "Villa",
        "Lands",
        "Mobiles",
    ]);

    const animatedHeight = useRef(new Animated.Value(0)).current;
    const overlayOpacity = useRef(new Animated.Value(0)).current;

    const openDetails = () => {
        setDetailsVisible(true);
        Animated.parallel([
            Animated.timing(animatedHeight, {
                toValue: hp("90%"),
                duration: 400,
                easing: Easing.ease,
                useNativeDriver: false,
            }),
            Animated.timing(overlayOpacity, {
                toValue: 0.5,
                duration: 400,
                useNativeDriver: false,
            }),
        ]).start();
    };

    const closeDetails = () => {
        Animated.parallel([
            Animated.timing(animatedHeight, {
                toValue: 0,
                duration: 400,
                easing: Easing.ease,
                useNativeDriver: false,
            }),
            Animated.timing(overlayOpacity, {
                toValue: 0,
                duration: 400,
                useNativeDriver: false,
            }),
        ]).start(() => setDetailsVisible(false));
    };

    const categories = [
        { title: "Bikes" },
        { title: "Cars" },
        { title: "Commercial Vehicles" },
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/* Fixed Header */}
            <View style={styles.topHeader}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={wp("5%")} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Search for cars, bikes, etc.</Text>
            </View>

            {/* Search Bar Section */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <TextInput
                        placeholder='Search "cars"'
                        placeholderTextColor="#999"
                        style={styles.searchInput}
                    />
                    {/* Mic Image inside search bar */}
                    <TouchableOpacity>
                        <Image
                            source={require("../../assets/images/mic.png")}
                            style={styles.micImage}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>

                {/* QR Code Icon */}
                <TouchableOpacity style={styles.qrButton}>
                    <MaterialIcons name="qr-code-scanner" size={wp("7%")} color="black" />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: hp("12%") }}
            >
                {/* Recent Searches */}
                <View style={styles.recentContainer}>
                    <View style={styles.recentHeader}>
                        <Text style={styles.recentTitle}>YOUR RECENT SEARCHES</Text>
                        <TouchableOpacity>
                            <Text style={styles.clearText}>Clear</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.searchTags}>
                        {recentSearches.map((item, index) => (
                            <View key={index} style={styles.tag}>
                                <FontAwesome6
                                    name="clock-rotate-left"
                                    size={10}
                                    style={{ marginRight: wp("1%") }}
                                    color="#00000099"
                                />
                                <Text style={styles.tagText}>{item}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Categories Section */}
                <View style={styles.categorySection}>
                    {/* Title with horizontal lines */}
                    <View style={styles.categoryTitleWrapper}>
                        <View style={styles.line} />
                        <Text style={styles.categoryHeading}>CATEGORIES</Text>
                        <View style={styles.line} />
                    </View>

                    <Text style={styles.subHeading}>Vehicles</Text>

                    <View style={styles.categoryList}>
                        {categories.map((cat, index) => (
                            <TouchableOpacity key={index} style={styles.categoryCard}>
                                <View style={styles.iconPlaceholder} />
                                <Text style={styles.categoryText}>{cat.title}</Text>
                            </TouchableOpacity>
                        ))}
                        {/* Updated View More Card */}
                        <TouchableOpacity style={styles.viewMoreCard} onPress={openDetails}>
                            <View style={styles.arrowndown}>
                                <Feather name="arrow-down" size={wp("6%")} color="#6C63FF" />
                            </View>
                            <Text style={styles.viewMoreText}>View more</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Overlay */}
            {(detailsVisible) && (
                <Animated.View
                    style={[
                        StyleSheet.absoluteFill,
                        styles.overlay,
                        { opacity: overlayOpacity },
                    ]}
                />
            )}

            {/* Close Icon */}
            {detailsVisible && (
                <TouchableOpacity style={styles.closeIcon} onPress={closeDetails}>
                    <Ionicons name="close" size={22} color="#000" />
                </TouchableOpacity>
            )}

            {/* Bottom Sheet: Category Details */}
            <Animated.View style={[styles.bottomSheet, { height: animatedHeight }]}>
                <CategoryDetailsScreen />
            </Animated.View>


            {/* Floating Image Button (Bottom Right) */}
            <TouchableOpacity style={styles.voiceButton}>
                <Image
                    source={require("../../assets/images/mic.png")}
                    style={styles.voiceImage}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default BuySellSearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    topHeader: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: wp("4%"),
        paddingVertical: hp("1.5%"),
        borderBottomWidth: 0.5,
        borderColor: "#ddd",
        backgroundColor: "#fff",
        marginTop: hp(3.5),
    },
    backButton: {
        marginRight: wp("3%"),
    },
    headerTitle: {
        fontSize: wp("3%"),
        color: "#6E533F",
        fontFamily: "Poppins-Medium",
        marginTop: hp(0.5),
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: wp("4%"),
        marginTop: hp("1.5%"),
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: wp("3%"),
        flex: 1,
        paddingHorizontal: wp("2%"),
        height: hp("5.5%"),
        borderColor: "#ddd",
        borderWidth: 1,
    },
    qrButton: {
        marginLeft: wp("3%"),
    },
    searchInput: {
        flex: 1,
        fontSize: wp("3.8%"),
        color: "#000",
    },
    micImage: {
        width: wp("5%"),
        height: wp("5%"),
        resizeMode: "contain",
    },
    recentContainer: {
        marginTop: hp("3%"),
        paddingHorizontal: wp("5%"),
    },
    recentHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: hp(2),
    },
    recentTitle: {
        fontSize: wp("3%"),
        color: "#555555AB",
        fontFamily: "Poppins-Medium",
    },
    clearText: {
        fontSize: wp("3.3%"),
        color: "#FF0303",
        fontFamily: "Poppins-Medium",
    },
    searchTags: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: hp("1%"),
    },
    tag: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: wp("2.5%"),
        paddingHorizontal: wp("2%"),
        paddingVertical: hp("0.6%"),
        marginRight: wp("2%"),
        marginBottom: hp("1%"),
        borderColor: "#00000033",
        borderWidth: 1,
    },
    tagText: {
        color: "#00000099",
        fontSize: wp("2.8%"),
    },
    categorySection: {
        marginTop: hp("2%"),
        paddingHorizontal: wp("5%"),
    },
    categoryTitleWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: hp("1.5%"),
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: "#D9D9D9",
        marginHorizontal: wp("2%"),
    },
    categoryHeading: {
        fontSize: wp("3.2%"),
        color: "#777",
        fontFamily: "Poppins-Medium",
        marginTop: hp(0.5),
    },
    subHeading: {
        fontSize: wp("4.5%"),
        color: "#000000",
        marginBottom: hp("2%"),
        textAlign: "left",
        fontFamily: "Poppins-Bold",
        marginTop: hp(1),
    },
    categoryList: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    categoryCard: {
        alignItems: "center",
        width: wp("20%"),
    },
    iconPlaceholder: {
        width: wp("14%"),
        height: wp("14%"),
        borderRadius: wp("3%"),
        backgroundColor: "#f0f0f0",
        marginBottom: hp("1%"),
    },
    categoryText: {
        fontSize: wp("3%"),
        color: "#000",
        textAlign: "center",
    },
    // Updated View More Card
    viewMoreCard: {
        alignItems: "center",
        justifyContent: "center",
        width: wp("20%"),
        paddingVertical: hp("1%"),
    },
    arrowndown: {
        backgroundColor: "#fff",
        borderRadius: wp("10%"),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 4,
        padding: 5
    },
    viewMoreText: {
        fontSize: wp("3%"),
        color: "#000",
        marginTop: hp("0.5%"),
    },
    // Updated Bottom Image Button
    voiceButton: {
        position: "absolute",
        bottom: hp("3%"),
        right: wp("5%"),
        backgroundColor: "#fff",
        borderRadius: wp("10%"),
        padding: wp("4%"),
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
    },
    voiceImage: {
        width: wp("6%"),
        height: wp("6%"),
    },
    bottomSheet: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden",
        zIndex: 100,
        elevation: 100,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "black",
        zIndex: 99,
        elevation: 99,
    },
    closeIcon: {
        position: "absolute",
        top: hp(5),
        right: 15,
        zIndex: 101,
        padding: 5,
        backgroundColor: "#fff",
        borderRadius: 20,
    },
});
