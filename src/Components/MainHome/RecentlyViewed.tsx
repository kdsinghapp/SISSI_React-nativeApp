import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Image,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import RecentCard from "./RecentCard";
import RecentCardSecond from "./RecentCardSecond";
import { useNavigation } from "@react-navigation/native";

const RecentViewedScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const [activeTab, setActiveTab] = useState("Cars");

    const tabs = [
        { label: "Cars", count: 5, icon: require("../../../assets/images/cars.png") },
        { label: "Apartments", count: 3, icon: require("../../../assets/images/apart.png") },
        { label: "Crops", count: 1, icon: require("../../../assets/images/crop.png") },
        { label: "Dogs", count: 3, icon: require("../../../assets/images/dog.png") },
    ];

    // Dummy data for rendering identical RecentCards
    const cards = [
        { id: "1", title: "Sample Product", price: "₹10,000 / day" },
        { id: "2", title: "Sample Product", price: "₹10,000 / day" },
        { id: "3", title: "Sample Product", price: "₹10,000 / day" },
        { id: "4", title: "Sample Product", price: "₹10,000 / day" },
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerRow}>
                <Text style={styles.headerTitle}>Recently viewed</Text>
                <TouchableOpacity style={styles.viewAllContainer} onPress={() => navigation.navigate('MapsCategories')}>
                    <Text style={styles.viewAllText}>View all</Text>
                    <Feather
                        name="arrow-right"
                        size={10}
                        color="#6C63FF"
                        style={{ marginLeft: wp(0.5) }}
                    />
                </TouchableOpacity>
            </View>

            {/* Tabs */}
            <View style={styles.tabsMainContainer}>
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab.label}
                        style={styles.tabWrapper}
                        onPress={() => setActiveTab(tab.label)}
                    >
                        <View style={styles.tabInner}>
                            <Image source={tab.icon} style={styles.tabIcon} />
                            <Text
                                style={[
                                    styles.tabText,
                                    activeTab === tab.label && styles.activeText,
                                ]}
                            >
                                {tab.count} {tab.label}
                            </Text>
                        </View>

                        {activeTab === tab.label && (
                            <View style={styles.activeIndicator} />
                        )}
                    </TouchableOpacity>
                ))}
            </View>

            {/* Cards Section */}
            <View style={{ marginTop: hp(2) }}>
                <RecentCard />
            </View>
        </View>
    );
};

export default RecentViewedScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: wp(4),
        paddingVertical: hp(1),
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: hp(3),
    },
    headerTitle: {
        fontSize: wp(4),
        color: "#000",
        fontFamily: "Poppins-Medium",
    },
    viewAllContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    viewAllText: {
        fontSize: wp(3),
        color: "#6C63FF",
        fontFamily: "Poppins-Medium",
        marginTop: hp(0.2),
    },
    tabsMainContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#D9D9D9DE",
    },
    tabWrapper: {
        alignItems: "center",
        width: wp(18),
        position: "relative",
        paddingBottom: hp(1.2),
    },
    tabInner: {
        alignItems: "center",
        justifyContent: "center",
    },
    tabIcon: {
        width: wp(9),
        height: wp(9),
        resizeMode: "contain",
    },
    tabText: {
        fontSize: wp(2.3),
        color: "#888",
        textAlign: "center",
        fontFamily: "Poppins-Medium",
        paddingTop: hp(0.5),
    },
    activeText: {
        color: "#000",
        fontWeight: "700",
    },
    activeIndicator: {
        position: "absolute",
        bottom: -2,
        width: "100%",
        height: 4,
        backgroundColor: "#6C63FF",
        borderTopLeftRadius: wp(2),
        borderTopRightRadius: wp(2),
    },
});
