// CategoriesScreen.tsx
import React, { useState, useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    Image,
    Animated,
    Easing,
    StatusBar
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import CategoryDetailsScreen from "./CategoryDetailsScreen";
import SuggestScreen from "../Components/Category/SuggestProductScreen";
import { useNavigation } from "@react-navigation/native";

type SubCategory = {
    id: string;
    name: string;
    icon: any;
};

type Category = {
    id: string;
    name: string;
    icon: any;
    subCategories?: SubCategory[];
};

const categories: Category[] = [
    {
        id: "1",
        name: "Vehicles",
        icon: require("../../assets/images/catcar.png"),
        subCategories: [
            { id: "1-1", name: "Bikes", icon: require("../../assets/images/moter.png") },
            { id: "1-2", name: "Cars", icon: require("../../assets/images/rish.png") },
            {
                id: "1-3",
                name: "Commercial Vehicles",
                icon: require("../../assets/images/moter.png"),
            },
        ],
    },
    {
        id: "2",
        name: "Properties",
        icon: require("../../assets/images/properties.png"),
    },
    {
        id: "3",
        name: "Mobiles",
        icon: require("../../assets/images/mbl.png"),
    },
    {
        id: "4",
        name: "Electronics",
        icon: require("../../assets/images/elec.png"),
    },
    {
        id: "5",
        name: "Appliances",
        icon: require("../../assets/images/app.png"),
    },
    {
        id: "6",
        name: "Fashion",
        icon: require("../../assets/images/fash.png"),
    },
    {
        id: "7",
        name: "Hobbies & More",
        icon: require("../../assets/images/app.png"),
    },
    {
        id: "8",
        name: "Farming",
        icon: require("../../assets/images/far.png"),
    },
    {
        id: "9",
        name: "Pets",
        icon: require("../../assets/images/pet.png"),
    },
];

const CategoriesScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [suggestVisible, setSuggestVisible] = useState(false);

    const animatedHeight = useRef(new Animated.Value(0)).current;
    const overlayOpacity = useRef(new Animated.Value(0)).current;

    const animatedSuggestHeight = useRef(new Animated.Value(0)).current;

    const toggleCategory = (id: string) => {
        setExpandedCategory((prev) => (prev === id ? null : id));
    };

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

    const openSuggest = () => {
        setSuggestVisible(true);
        Animated.parallel([
            Animated.timing(animatedSuggestHeight, {
                toValue: hp("50%"),
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

    const closeSuggest = () => {
        Animated.parallel([
            Animated.timing(animatedSuggestHeight, {
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
        ]).start(() => setSuggestVisible(false));
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            {/* Topbar */}
            <View style={styles.topBar}>
                <Ionicons name="arrow-back" size={16} color="black" />
                <Image
                    source={require("../../assets/images/sel.png")}
                    style={styles.topBarImage}
                />
                <View>
                    <Text style={styles.topBarTitle}>Addvey Buy/Sell</Text>
                    <Text style={styles.topBarSubtitle}>Partner App</Text>
                </View>
            </View>

            {/* Content */}
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={{ paddingBottom: hp("12%"), marginTop: hp(5) }}
            >
                <Text style={styles.heading}>Select category</Text>

                {categories.map((category) => {
                    const isExpanded = expandedCategory === category.id;

                    return (
                        <View key={category.id} style={styles.categoryContainer}>
                            {/* Category Row */}
                            <TouchableOpacity
                                style={[
                                    styles.categoryRow,
                                    isExpanded && styles.activeCategoryRow,
                                ]}
                                onPress={() => toggleCategory(category.id)}
                            >
                                <Image source={category.icon} style={styles.categoryIcon} />
                                <Text style={styles.categoryText}>{category.name}</Text>

                                <View style={styles.plusMinusContainer}>
                                    <Ionicons
                                        name={isExpanded ? "remove" : "add"}
                                        size={14}
                                        color="#6E533F"
                                    />
                                </View>

                                <View
                                    style={[
                                        styles.circularIndicator,
                                        isExpanded && styles.circularActive,
                                    ]}
                                />
                            </TouchableOpacity>

                            {/* Subcategories */}
                            {isExpanded && category.subCategories && (
                                <View style={styles.subCategoryContainer}>
                                    {category.subCategories.map((sub) => (
                                        <View key={sub.id} style={styles.subCategoryItem}>
                                            <View style={styles.subCategoryImg}>
                                                <Image source={sub.icon} style={styles.subCategoryIcon} />
                                            </View>
                                            <Text style={styles.subCategoryText}>{sub.name}</Text>
                                        </View>
                                    ))}

                                    {/* View More Item */}
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        style={styles.subCategoryItem}
                                        onPress={openDetails}
                                    >
                                        <View style={styles.subCategoryImgBottom}>
                                            <FontAwesome5 name="arrow-up" size={20} color="#6C63FF" />
                                        </View>
                                        <Text style={styles.subCategoryText}>View More</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    );
                })}

                {/* Suggest Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.title}>
                        Didn’t find what you were looking for?
                        <Image
                            source={require("../../assets/images/emo.png")}
                            style={styles.inlineIcon}
                        />
                    </Text>
                    <Text style={styles.subTitle}>
                        Suggest something & we’ll look into it
                    </Text>
                    <TouchableOpacity
                        style={styles.outlineButton}
                        onPress={openSuggest}
                    >
                        <Text style={styles.outlineButtonText}>Suggest a Product</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Bottom Fixed Button */}
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.navigate("MainCategoryDetail")}>
                    <Text style={styles.confirmButtonText}>Confirm Category</Text>
                </TouchableOpacity>
            </View>

            {/* Overlay */}
            {(detailsVisible || suggestVisible) && (
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
            {suggestVisible && (
                <TouchableOpacity style={styles.suggestCloseIcon} onPress={closeSuggest}>
                    <Ionicons name="close" size={22} color="#000" />
                </TouchableOpacity>
            )}

            {/* Bottom Sheet: Category Details */}
            <Animated.View style={[styles.bottomSheet, { height: animatedHeight }]}>
                <CategoryDetailsScreen />
            </Animated.View>

            {/* Bottom Sheet: Suggest Screen */}
            <Animated.View style={[styles.bottomSheet, { height: animatedSuggestHeight }]}>
                <SuggestScreen />
            </Animated.View>
        </SafeAreaView>
    );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#fff" },
    topBar: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: hp("2%"),
        borderBottomWidth: 1,
        borderColor: "#eee",
        backgroundColor: "#fff",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        paddingHorizontal: wp(4),
        marginTop: hp(4),
    },
    topBarImage: {
        width: wp(10),
        height: wp(10),
        resizeMode: "contain",
        marginHorizontal: wp(2),
    },
    topBarTitle: { fontSize: wp("4.2%"), fontFamily: "Poppins-Medium" },
    topBarSubtitle: {
        fontSize: wp("2.2%"),
        color: "#6E533F",
        fontFamily: "Poppins-Regular",
    },
    scrollContainer: { marginTop: hp("10%") },
    heading: {
        fontSize: wp("5%"),
        marginBottom: hp("2%"),
        paddingHorizontal: wp(6),
        color: "#000000",
        fontFamily: "Poppins-Medium",
    },
    categoryContainer: { marginBottom: hp("2%"), paddingHorizontal: wp(6) },
    categoryRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: hp("1%"),
    },
    activeCategoryRow: { borderColor: "#6C63FF" },
    categoryIcon: {
        width: wp("11%"),
        height: wp("11%"),
        resizeMode: "contain",
        marginRight: wp("3%"),
    },
    categoryText: {
        fontSize: wp("3.5%"),
        fontFamily: "Poppins-Medium",
        color: "#000000",
    },
    plusMinusContainer: {
        backgroundColor: "white",
        borderColor: "#eee",
        borderWidth: 1,
        borderRadius: 10,
        padding: 2,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: wp(3),
    },
    circularIndicator: {
        width: wp(4),
        height: wp(4),
        borderRadius: wp(3),
        borderWidth: 1,
        borderColor: "#0000008A",
        marginLeft: "auto",
    },
    circularActive: {
        borderColor: "#6C63FF",
        borderWidth: 4,
    },
    subCategoryContainer: { flexDirection: "row", flexWrap: "wrap", marginTop: hp("1%") },
    subCategoryItem: { width: "25%", alignItems: "center", marginVertical: hp("1%") },
    subCategoryIcon: {
        width: wp("12%"),
        height: wp("12%"),
        resizeMode: "contain",
        marginBottom: hp("0.5%"),
    },
    subCategoryText: {
        fontSize: wp("2.6%"),
        textAlign: "center",
        fontFamily: "Poppins-Regular",
    },
    subCategoryImg: {
        borderColor: "#eee",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 5,
    },
    subCategoryImgBottom: {
        borderColor: "#eee",
        borderWidth: 1,
        width: wp("12%"),
        height: wp("12%"),
        borderRadius: wp("6%"),
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 4,
    },
    sectionContainer: {
        backgroundColor: "#D9D9D940",
        paddingVertical: hp("3%"),
        paddingHorizontal: wp("5%"),
        borderRadius: 12,
        marginVertical: hp("10%"),
    },
    title: {
        fontSize: wp("6%"),
        fontFamily: "Poppins-Bold",
        color: "#00000099",
        flexWrap: "wrap",
    },
    inlineIcon: { width: wp("6%"), height: wp("6%"), resizeMode: "contain" },
    subTitle: {
        fontSize: wp("3.3%"),
        fontFamily: "Poppins-Regular",
        color: "#555555",
        marginVertical: hp("1%"),
    },
    outlineButton: {
        borderWidth: 1,
        borderColor: "#6C63FF",
        borderRadius: 14,
        paddingVertical: hp("1.5%"),
        width: "50%",
        alignItems: "center",
        marginTop: hp(1),
    },
    outlineButtonText: {
        color: "#6C63FF",
        fontSize: wp("3.8%"),
        fontFamily: "Poppins-Medium",
    },
    bottomButtonContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: wp("4%"),
        backgroundColor: "#fff",
        zIndex: 20,
    },
    confirmButton: {
        backgroundColor: "#6C63FF",
        paddingVertical: hp("1.5%"),
        borderRadius: 15,
        alignItems: "center",
    },
    confirmButtonText: { color: "#fff", fontSize: wp("4%"), fontFamily: "Poppins-Medium" },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "black",
        zIndex: 99,
        elevation: 99,
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
    closeIcon: {
        position: "absolute",
        top: hp(5),
        right: 15,
        zIndex: 101,
        padding: 5,
        backgroundColor: "#fff",
        borderRadius: 20,
    },
    suggestCloseIcon: {
        position: "absolute",
        top: hp(44),
        right: 10,
        zIndex: 101,
        padding: 6,
        backgroundColor: "#fff",
        borderRadius: 20,
    }
});
