import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    StatusBar,
    Modal
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-swiper";
import AppCard from "../Components/Home/AppCard";
import SearchBar from "../Components/MainHome/Searchbar";

const images: { [key: string]: any } = {
    buysell: require("../../assets/images/buysell.png"),
    bike: require("../../assets/images/bike.png"),
    near: require("../../assets/images/near.png"),
    Services: require("../../assets/images/Services.png"),
    jobs: require("../../assets/images/jobs.png"),
    Puja: require("../../assets/images/Puja.png"),
    bolt: require("../../assets/images/bolt.png"),
    globe: require("../../assets/images/globe.png"),
    bulb: require("../../assets/images/bulb.png"),
    img1: require("../../assets/images/1.png"),
    img2: require("../../assets/images/2.png"),
    img3: require("../../assets/images/3.png"),
    tabAddvey: require("../../assets/images/add.png"),
    tabBuySell: require("../../assets/images/by.png"),
    profile: require("../../assets/images/profile.png"),
    slide1: require("../../assets/images/1.png"),
    slide2: require("../../assets/images/2.png"),
    slide3: require("../../assets/images/3.png"),
    slide4: require("../../assets/images/bike.png"),
    slide5: require("../../assets/images/buysell.png"),
    slide6: require("../../assets/images/jobs.png"),
};

const HomeScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState("Addvey");
    const navigation = useNavigation<any>();
    const [isModalVisible, setModalVisible] = useState(false);
    const [isEnableLocationModal, setEnableLocationModal] = useState(false);

    const enableLocationToggle = () => {
        setEnableLocationModal(!isEnableLocationModal)
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const gridItems = [
        { id: 1, title: "Buy/Sell", img: "buysell", comingSoon: false },
        { id: 2, title: "Bike", img: "bike", comingSoon: true },
        { id: 3, title: "Near Us", img: "near", comingSoon: true },
        { id: 4, title: "Services", img: "Services", comingSoon: true },
        { id: 5, title: "Jobs", img: "jobs", comingSoon: true },
        { id: 6, title: "Pooja", img: "Puja", comingSoon: true },
    ];

    return (
        <View style={styles.container}>
            {/* Fixed Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={toggleModal}>
                    <View>
                        <View style={styles.locationContainer}>
                            <Text style={styles.location}>
                                <MaterialIcons
                                    name="location-on"
                                    size={wp("4%")}
                                    color="red"
                                />{" "}
                                KPHB
                            </Text>
                            <Ionicons
                                name="chevron-down"
                                size={wp("3.5%")}
                                color="#FF0303"
                            />
                        </View>
                        <Text style={styles.address} numberOfLines={1}>
                            G3, Floor 1st, Srinivasa Residency, Road...
                        </Text>
                    </View>
                </TouchableOpacity>

                {/* Bottom Slide Modal */}
                <Modal
                    transparent={true}
                    visible={isModalVisible}
                    animationType="slide"
                    onRequestClose={toggleModal}
                >
                    <View style={styles.swiperModalOverlay}>
                        <TouchableOpacity
                            style={styles.swiperModalCloseOutside}
                            onPress={toggleModal}
                        >
                            <Ionicons name="close" size={20} color="black" />
                        </TouchableOpacity>

                        {/* Modal Content */}
                        <View style={styles.swiperModalContent}>
                            {/* Image */}
                            <Image
                                source={require("../../assets/images/locationbottom.png")}
                                style={styles.swiperModalImage}
                            />

                            {/* Title */}
                            <Text style={styles.swiperModalTitle}>
                                Device location not enabled
                            </Text>

                            <Text style={styles.swiperModalSubtitle}>
                                Enable your device location for a better
                                buying experience.
                            </Text>

                            <TouchableOpacity style={styles.swiperModalBtn}>
                                <Text style={styles.swiperModalBtnText}>
                                    Enable location permission
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.swiperModalBtn, styles.swiperModalBtnOutline]}
                                onPress={toggleModal}
                            >
                                <Text
                                    style={[
                                        styles.swiperModalBtnText,
                                        { color: "#6C63FF" },
                                    ]}
                                >
                                    Search location manually
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Right Side (Bell + Profile) */}
                <View style={styles.rightIcons}>
                    <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
                        <View style={styles.bellContainer}>
                            <Octicons name="bell" size={20} color="black" />
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>12</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.main} onPress={() => navigation.navigate("MainProfile")}>
                        <Image
                            source={images.profile}
                            style={styles.profileIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Scroll Content */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />

                <SearchBar />

                <View style={styles.sliderContainer}>
                    <Swiper
                        autoplay
                        autoplayTimeout={3}
                        showsPagination
                        dotStyle={styles.dot}
                        activeDotStyle={styles.activeDot}
                    >
                        <Image source={require('../../assets/images/slidcar.jpg')} style={styles.slideImage} />
                        <Image source={require('../../assets/images/slidbike.jpeg')} style={styles.slideImage} />
                        <Image source={require('../../assets/images/slidphone.jpg')} style={styles.slideImage} />
                        <Image source={require('../../assets/images/slidcar.jpg')} style={styles.slideImage} />
                        <Image source={require('../../assets/images/slidbike.jpeg')} style={styles.slideImage} />
                        <Image source={require('../../assets/images/slidphone.jpg')} style={styles.slideImage} />
                    </Swiper>
                </View>

                {/* Grid Section */}
                <View style={styles.grid}>
                    {gridItems.map((item) =>
                        item.id === 1 ? (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.gridItem}
                                onPress={() => navigation.navigate("BuySell")}
                            >
                                <View style={{ position: "relative" }}>
                                    <Image
                                        source={images[item.img]}
                                        style={styles.icon}
                                        resizeMode="contain"
                                    />
                                    {item.comingSoon && (
                                        <View style={styles.overlay}>
                                            <Text style={styles.overlayText}>
                                                Coming Soon
                                            </Text>
                                        </View>
                                    )}
                                </View>
                                <Text
                                    style={[styles.gridText, { color: "black" }]}
                                >
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            <View key={item.id} style={styles.gridItem}>
                                <View style={{ position: "relative" }}>
                                    <Image
                                        source={images[item.img]}
                                        style={styles.icon}
                                        resizeMode="contain"
                                    />
                                    {item.comingSoon && (
                                        <View style={styles.overlay}>
                                            <Text style={styles.overlayText}>
                                                Coming Soon
                                            </Text>
                                        </View>
                                    )}
                                </View>
                                <Text
                                    style={[
                                        styles.gridText,
                                        { color: "#00000061" },
                                    ]}
                                >
                                    {item.title}
                                </Text>
                            </View>
                        )
                    )}
                </View>

                {/* Get Started */}
                <View style={styles.section}>
                    <Text style={styles.getStarted}>Get started</Text>
                    <View style={styles.underline} />

                    <View style={styles.bulletRow}>
                        <Image
                            source={images.bolt}
                            style={styles.bulletIcon}
                            resizeMode="contain"
                        />
                        <Text style={styles.bulletText}>
                            START WHERE YOU ARE
                        </Text>
                    </View>
                    <View style={styles.bulletRow}>
                        <Image
                            source={images.globe}
                            style={styles.bulletIcon}
                            resizeMode="contain"
                        />
                        <Text style={styles.bulletText}>
                            USE WHAT YOU HAVE
                        </Text>
                    </View>
                    <View style={styles.bulletRow}>
                        <Image
                            source={images.bulb}
                            style={styles.bulletIcon}
                            resizeMode="contain"
                        />
                        <Text style={styles.bulletText}>DO WHAT YOU CAN</Text>
                    </View>
                </View>

                <AppCard
                    heading="Addvey User App"
                    image={require("../../assets/images/blackvend.png")}
                    title="Addvey"
                    subtitle="Online marketplace"
                    category="Property"
                    buttonText="Install"
                    showDivider={true}
                />

                <AppCard
                    heading="Delivery Support Partner"
                    image={require("../../assets/images/redend.png")}
                    title="Addvey Delivery Partner app"
                    subtitle="Delivery"
                    category="Business"
                    buttonText="Install"
                    comingSoon={true}
                    disabled={true}
                />

                {/* The perfect place section */}
                <View style={styles.sectionBottomPerfect}>
                    <Text style={styles.title}>The perfect</Text>
                    <Text style={styles.subtitle}>place for your needs!</Text>

                    <Text style={styles.footerText}>
                        Crafted with ❤️ love in India.
                    </Text>

                    <View style={styles.imageRow}>
                        <Image source={images.img1} style={styles.rowImage} />
                        <Image source={images.img2} style={styles.rowImage} />
                        <Image source={images.img3} style={styles.rowImage} />
                    </View>
                </View>

                {/* Slogan */}
                <View style={styles.sectionBottom}>
                    <Text style={styles.addveyText}>
                        <Text
                            style={{
                                color: "black",
                                fontWeight: "600",
                                fontFamily: "Poppins-Bold",
                            }}
                        >
                            Addvey
                        </Text>{" "}
                        <Text
                            style={{
                                color: "gray",
                                fontFamily: "Poppins-Medium",
                            }}
                        >
                            - Adding multiple ways
                        </Text>
                    </Text>
                </View>
            </ScrollView>

            {/* Bottom Tabs with active indicator */}
            <View style={styles.bottomTabs}>
                <View
                    style={[
                        styles.activeLine,
                        activeTab === "Addvey"
                            ? { left: "25%" }
                            : { left: "75%" },
                    ]}
                />

                <TouchableOpacity
                    style={styles.tab}
                    onPress={() => setActiveTab("Addvey")}
                >
                    <Image source={images.tabAddvey} style={styles.tabIcon} />
                    <Text style={styles.tabText}>Addvey</Text>
                </TouchableOpacity>

                <View style={styles.verticalLine} />

                <TouchableOpacity
                    style={styles.tab}
                    onPress={() => navigation.navigate('BuyAndSellStartup')}
                >
                    <Image source={images.tabBuySell} style={styles.tabIcon} />
                    <Text style={styles.tabText}>Buy/Sell</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    scrollContent: { paddingBottom: hp("12%") },
    header: {
        paddingHorizontal: wp("5%"),
        paddingVertical: hp("1.5%"),
        marginTop: hp(4),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        backgroundColor: "#fff",
    },
    locationContainer: { flexDirection: "row", alignItems: "center" },
    main: {
        backgroundColor: "#eee",
        padding: wp("1.5%"),
        borderRadius: wp("5%"),
    },
    location: {
        fontSize: wp("4%"),
        fontWeight: "600",
        color: "black",
        marginRight: wp("1%"),
        fontFamily: "Poppins-Bold",
    },
    address: {
        fontSize: wp("3.2%"),
        color: "#6E533F",
        fontFamily: "Poppins-Regular",
    },
    rightIcons: { flexDirection: "row", alignItems: "center" },
    bellContainer: { marginRight: wp("2.5%") },
    badge: {
        position: "absolute",
        top: -hp("0.8%"),
        right: -wp("0.2%"),
        backgroundColor: "#6C63FF",
        borderRadius: wp("5%"),
        padding: 3,
    },
    badgeText: { color: "#fff", fontSize: wp("1.5%"), fontWeight: "700" },
    profileIcon: {
        width: wp("5%"),
        height: wp("5%"),
        borderRadius: wp("4%"),
    },

    /* Slider */
    sliderContainer: {
        height: hp("20%"),
        width: "100%",
    },
    slideImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    dot: {
        backgroundColor: "#ccc",
        width: 5,
        height: 5,
        borderRadius: 4,
        margin: 0,
    },
    activeDot: {
        backgroundColor: "#6C63FF",
        width: 5,
        height: 5,
        borderRadius: 5,
        margin: 0,
    },

    /* Grid */
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        marginTop: hp("2%"),
    },
    gridItem: {
        width: wp("28%"),
        height: hp("14%"),
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: hp("1%"),
    },
    icon: {
        width: wp("15%"),
        height: wp("15%"),
        marginBottom: hp("1%"),
    },
    gridText: {
        fontSize: wp("3%"),
        textAlign: "center",
        fontFamily: "Poppins-Medium",
    },
    overlay: {
        position: "absolute",
        top: "42%",
        left: "35%",
        transform: [
            { translateX: -wp("10%") },
            { translateY: -hp("1%") },
        ],
        backgroundColor: "white",
        borderRadius: 6,
        paddingHorizontal: wp("1%"),
        paddingVertical: hp("0.2%"),
    },
    overlayText: {
        color: "#007AFF",
        fontSize: wp("2.1%"),
        fontWeight: "600",
        fontFamily: "Poppins-Medium",
    },

    /* Sections */
    section: { marginTop: hp("1%"), paddingHorizontal: wp("6%"), marginBottom: hp(4) },
    sectionBottomPerfect: { marginTop: hp("4%"), paddingHorizontal: wp("6%") },
    sectionBottom: { paddingHorizontal: wp("6%") },
    getStarted: {
        fontSize: wp("6%"),
        textAlign: "center",
        marginBottom: hp("1%"),
        marginTop: hp(3),
        fontFamily: "Boogaloo-Regular",
    },
    underline: {
        alignSelf: "center",
        width: wp("60%"),
        height: 0.5,
        backgroundColor: "#D9D9D9DE",
        marginBottom: hp(4),
    },
    bulletRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: hp("1%"),
        marginLeft: wp(2),
    },
    bulletIcon: {
        width: wp("4%"),
        height: wp("4%"),
        marginRight: wp(1),
    },
    bulletText: { fontSize: wp("3.2%"), marginLeft: wp("2%"), color: "#00000080" },
    title: {
        fontSize: wp("7%"),
        fontWeight: "700",
        textAlign: "left",
        color: "#00000099",
        fontFamily: "Poppins-Bold",
    },
    subtitle: {
        fontSize: wp("7%"),
        fontWeight: "700",
        marginBottom: hp("2%"),
        color: "#00000099",
        fontFamily: "Poppins-Bold",
    },
    imageRow: { flexDirection: "row", marginTop: hp("2%") },
    rowImage: {
        width: wp("10%"),
        height: hp("8%"),
        borderRadius: 10,
        resizeMode: "contain",
        marginRight: wp(2),
    },
    footerText: {
        color: "black",
        fontSize: wp("3.5%"),
        marginTop: hp(1.8),
        fontFamily: "Poppins-Regular",
    },
    addveyText: { fontSize: wp("4%"), fontWeight: "600" },

    /* Bottom Tabs */
    bottomTabs: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        width: "100%",
        backgroundColor: "#fff",
        paddingVertical: hp("1.5%"),
        borderTopWidth: 1,
        borderTopColor: "#eee",
        alignItems: "center",
        justifyContent: "space-between",
    },
    tab: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingVertical: hp(1),
    },
    tabIcon: {
        width: wp("6.5%"),
        height: wp("6.5%"),
        resizeMode: "contain",
        marginRight: wp(3),
    },
    tabText: { fontSize: wp("4%"), fontWeight: "600", fontFamily: "Poppins-Medium" },
    verticalLine: { width: 1, backgroundColor: "#ccc", height: hp("2.8%") },
    activeLine: {
        position: "absolute",
        top: 0,
        width: "28%",
        height: 3,
        backgroundColor: "#6C63FF",
        transform: [{ translateX: -wp("12.5%") }],
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
    },

    swiperModalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    swiperModalCloseOutside: {
        position: "absolute",
        top: hp(44),
        right: wp(3),
        zIndex: 10,
        backgroundColor: '#fff',
        borderRadius: wp(14),
        padding: 8
    },
    swiperModalContent: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: wp(5),
        alignItems: "center",
    },
    swiperModalImage: {
        width: wp(30),
        height: wp(30),
        resizeMode: "contain",
        marginBottom: hp(2),
    },
    swiperModalTitle: {
        fontSize: wp(3.8),
        textAlign: "center",
        marginBottom: hp(0.5),
        fontFamily: 'Poppins-Medium'
    },
    swiperModalSubtitle: {
        fontSize: wp(3),
        textAlign: "center",
        marginBottom: hp(3),
        fontFamily: 'Poppins-Regular',
        paddingHorizontal: wp(10),
        color: '#00000080'
    },
    swiperModalBtn: {
        width: "100%",
        backgroundColor: "#6C63FF",
        paddingVertical: hp(1.8),
        marginBottom: hp(1.5),
        borderRadius: 16,
        alignItems: "center",
    },
    swiperModalBtnText: {
        color: "#fff",
        fontSize: wp(4),
        fontWeight: "600",
    },
    swiperModalBtnOutline: {
        backgroundColor: "#fff",
    },
});
