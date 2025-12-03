// screens/MainHomeScreen.tsx
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput,
    StatusBar,
    Modal,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons, Octicons, EvilIcons, Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const NotificationScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const [activeTab, setActiveTab] = useState("Under review");
    const [activeFilter, setActiveFilter] = useState("All");

    // Modal visibility state
    const [isModalVisible, setIsModalVisible] = useState(false);

    /** Tabs Content Components */
    const ActiveTab = () => (
        <View>
            {/* Filters */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filtersRow}
            >
                <TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.filterBtn,
                            activeFilter === "All" && styles.activeFilterBtn,
                        ]}
                        onPress={() => {
                            setActiveFilter("All");
                            navigation.navigate("Filter");
                        }}
                    >
                        <Image
                            source={require("../../assets/images/filter.png")}
                            style={{
                                width: wp(3.5),
                                height: hp(2),
                                resizeMode: "contain",
                            }}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.filterBtn,
                        activeFilter === "Cars" && styles.activeFilterBtn,
                    ]}
                    onPress={() => setActiveFilter("Cars")}
                >
                    <Text
                        style={[
                            styles.filterText,
                            activeFilter === "Cars" && styles.activeFilterText,
                        ]}
                    >
                        All
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.filterBtn,
                        activeFilter === "Bikes" && styles.activeFilterBtn,
                    ]}
                    onPress={() => setActiveFilter("Bikes")}
                >
                    <View style={styles.squareBox} />
                    <Text
                        style={[
                            styles.filterText,
                            activeFilter === "Bikes" && styles.activeFilterText,
                        ]}
                    >
                        1 Vehicle
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.filterBtn,
                        activeFilter === "Bikes" && styles.activeFilterBtn,
                    ]}
                    onPress={() => setActiveFilter("Bikes")}
                >
                    <View style={styles.squareBox} />
                    <Text
                        style={[
                            styles.filterText,
                            activeFilter === "Bikes" && styles.activeFilterText,
                        ]}
                    >
                        1 Properties
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.filterBtn,
                        activeFilter === "Bikes" && styles.activeFilterBtn,
                    ]}
                    onPress={() => setActiveFilter("Bikes")}
                >
                    <View style={styles.squareBox} />
                    <Text
                        style={[
                            styles.filterText,
                            activeFilter === "Bikes" && styles.activeFilterText,
                        ]}
                    >
                        1 Properties
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Notifications List */}
            <View style={styles.notificationsSection}>
                {[
                    {
                        title: "Way to",
                        subtitle: "can re-enable them from the settings page",
                        rightText: "2 w",
                    },
                    {
                        title: "Way to",
                        subtitle: "can re-enable them from the settings page",
                        rightText: "1 w",
                    },
                    {
                        title: "Way to",
                        subtitle: "can re-enable them from the settings page",
                        rightText: "1 w",
                    },
                ].map((n, i) => (
                    <View key={i} style={styles.notificationItem}>
                        {/* Circular Left Icon */}
                        <View style={styles.notificationCircle}></View>

                        {/* Title + Subtitle */}
                        <View style={{ flex: 1 }}>
                            <Text style={styles.notificationTitle}>{n.title}</Text>
                            <Text style={styles.notificationSubtitle}>{n.subtitle}</Text>
                        </View>

                        {/* Right Side Text + Icon */}
                        <View style={styles.notificationRight}>
                            <Text style={styles.notificationTime}>{n.rightText}</Text>
                            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                                <Entypo name="dots-three-vertical" size={14} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );

    const ExpiredTab = () => (
        <View>
            <Text style={styles.sectionTitle}>Expired Ads</Text>
            <Text style={{ textAlign: "center", color: "#999" }}>
                No expired ads
            </Text>
        </View>
    );

    const DeactivatedTab = () => (
        <View>
            <Text style={styles.sectionTitle}>Deactivated Ads</Text>
            <Text style={{ textAlign: "center", color: "#999" }}>
                No deactivated ads
            </Text>
        </View>
    );

    const UnderReviewTab = () => (
        <View>
            <Text style={styles.sectionTitle}>Under review</Text>
            <Text style={{ textAlign: "center", color: "#999" }}>
                No expired ads
            </Text>
        </View>
    );

    const renderTabContent = () => {
        switch (activeTab) {
            case "All":
                return <ActiveTab />;
            case "Reports":
                return <ExpiredTab />;
            case "Alerts":
                return <DeactivatedTab />;
            case "Promotional":
                return <UnderReviewTab />;
            default:
                return <UnderReviewTab />;
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={wp("4.5%")} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Notification</Text>
                </View>

                <View style={styles.rightIcons}>
                    <View style={styles.bellContainer}>
                        <EvilIcons name="search" size={24} color="black" />
                    </View>
                    <TouchableOpacity style={styles.main} onPress={() => navigation.navigate("NotificationSetting")}>
                        <Ionicons name="settings-outline" size={20} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Buy/Sell row */}
            <View style={styles.buySellRow}>
                <Text style={styles.buySellText}>Buy/Sell <Text style={{ color: '#6C63FF' }}> (3) </Text></Text>
                <View style={styles.buySellActiveIndicator} />
            </View>

            {/* Search Bar */}
            <View style={styles.searchBar}>
                <Ionicons
                    name="search"
                    size={20}
                    color="#999"
                    style={{ marginRight: 6 }}
                />
                <TextInput
                    placeholder="Search ads..."
                    placeholderTextColor="#999"
                    style={styles.searchInput}
                />
            </View>

            {/* Content */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: wp(4),
                    paddingBottom: hp(10),
                }}
            >
                {/* Tabs (Horizontal Scrollable) */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginBottom: hp(1) }}
                >
                    <View style={styles.tabs}>
                        {["All", "Reports", "Alerts", "Promotional"].map(
                            (t, i) => (
                                <TouchableOpacity
                                    key={i}
                                    style={styles.tabBtn}
                                    onPress={() => setActiveTab(t)}
                                >
                                    <Text
                                        style={[
                                            styles.tabText,
                                            activeTab === t && styles.activeText,
                                        ]}
                                    >
                                        {t}
                                    </Text>
                                    {activeTab === t && (
                                        <View style={styles.activeIndicator} />
                                    )}
                                </TouchableOpacity>
                            )
                        )}
                    </View>
                </ScrollView>

                {/* Tab Content */}
                {renderTabContent()}
            </ScrollView>

            {/* Swipe-up Modal */}
            <Modal
                visible={isModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    {/* Close Icon (outside modal box, top right) */}
                    <TouchableOpacity
                        style={styles.outsideCloseBtn}
                        onPress={() => setIsModalVisible(false)}
                    >
                        <Ionicons name="close" size={24} color="black" />
                    </TouchableOpacity>

                    <View style={styles.modalContent}>
                        {/* Center Content */}
                        <View style={styles.modalBody}>
                            <View style={styles.modalItem}>
                                <MaterialCommunityIcons name="delete-outline" size={24} color="#FF0303" />
                                <Text style={styles.modalItemTextDel}>Delete notification</Text>
                            </View>
                            <View style={styles.modalItem}>
                                <Ionicons name="notifications-off-outline" size={24} color="#6E533F" />
                                <Text style={styles.modalItemText}>Turn off this notification type</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default NotificationScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },

    /** Header */
    header: {
        paddingHorizontal: wp("5%"),
        paddingVertical: hp("1.5%"),
        marginTop: hp(4),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    headerLeft: { flexDirection: "row", alignItems: "center" },
    headerTitle: {
        fontSize: wp("4%"),
        fontWeight: "600",
        marginLeft: wp(2),
        color: "black",
    },
    main: {},
    rightIcons: { flexDirection: "row", alignItems: "center" },
    bellContainer: { marginRight: wp("2%") },

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
        fontFamily: 'Poppins-Medium'
    },
    buySellActiveIndicator: {
        position: "absolute",
        bottom: 0,
        left: wp("5%"),
        width: wp("19%"),
        height: 3,
        backgroundColor: "#6A5AE0",
        borderTopLeftRadius: wp(2),
        borderTopRightRadius: wp(2),
    },

    /** Tabs */
    tabs: {
        flexDirection: "row",
    },
    tabBtn: {
        paddingVertical: hp(0.8),
        paddingHorizontal: wp(4),
    },
    tabText: {
        fontSize: hp(1.6),
        color: "#666",
    },
    activeText: {
        color: "#000000",
        fontWeight: "600",
    },
    activeIndicator: {
        position: "absolute",
        bottom: -1,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: "#6A5AE0",
        borderTopLeftRadius: wp(2),
        borderTopRightRadius: wp(2),
    },

    /** Search bar */
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: wp(2),
        paddingHorizontal: wp(3),
        marginBottom: hp(0.5),
        marginTop: hp(2),
        marginHorizontal: wp(3.9),
    },
    searchInput: { flex: 1, fontSize: hp(1.8), color: "#000" },

    /** Filters */
    filtersRow: {
        flexDirection: "row",
        marginBottom: hp(2),
        paddingRight: wp(3)
    },
    filterBtn: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: hp(0.6),
        paddingHorizontal: wp(3),
        marginRight: wp(2),
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: wp(2),
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        elevation: 2,
        marginTop: hp(1),
    },
    activeFilterBtn: {
        borderColor: "#6A5AE0",
        backgroundColor: "#fff",
    },
    filterText: { marginLeft: 0, fontSize: hp(1.5), color: "#00000099" },
    activeFilterText: { color: "#6A5AE0", fontWeight: "600" },
    squareBox: {
        width: wp(5),
        height: wp(5),
        backgroundColor: "#D9D9D980",
        marginRight: wp(1.5),
        borderRadius: 4,
    },

    /** Section Title */
    sectionTitle: { fontSize: hp(1.8), color: "#666", marginBottom: hp(1) },

    /** Notifications Section */
    notificationsSection: {
        marginTop: hp(0),
    },
    notificationItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: hp(1.4),
    },
    notificationCircle: {
        width: wp(10),
        height: wp(10),
        borderRadius: wp(5),
        backgroundColor: "#f0f0f0",
        alignItems: "center",
        justifyContent: "center",
        marginRight: wp(3),
    },
    notificationTitle: {
        fontSize: wp(2.5),
        color: "#000",
        fontFamily: 'Poppins-Regular'
    },
    notificationSubtitle: {
        fontSize: wp(3),
        color: "#666",
    },
    notificationRight: {
        flexDirection: "column",
        alignItems: "center",
        marginLeft: wp(2),
    },
    notificationTime: {
        fontSize: wp(2.5),
        color: "#999",
        paddingVertical: hp(0.4)
    },

    /** Modal Styles */
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    outsideCloseBtn: {
        position: "absolute",
        top: hp(75),
        right: wp(3),
        zIndex: 2,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 3
    },
    modalContent: {
        backgroundColor: "#fff",
        borderTopLeftRadius: wp(10),
        borderTopRightRadius: wp(10),
        paddingVertical: hp(2),
        paddingHorizontal: wp(5),
        alignItems: "center",
        justifyContent: "center",
    },
    modalBody: {
        alignItems: "center",
        justifyContent: "center",
    },
    modalItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: hp(2.5),
    },
    modalItemText: {
        marginLeft: wp(1),
        fontSize: wp(3.5),
        color: "#000000",
        fontFamily: 'Poppins-Medium',
        marginTop: hp(0.5)
    },
    modalItemTextDel: {
        marginLeft: wp(1),
        fontSize: wp(3.8),
        color: "#FF0303",
        fontFamily: 'Poppins-Medium',
        marginTop: hp(0.5)
    },
});
