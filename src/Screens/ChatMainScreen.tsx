// screens/ChatMainScreen.tsx
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    StatusBar,
    Image
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ChatMainScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const [activeTab, setActiveTab] = useState("All");
    const [activeFilter, setActiveFilter] = useState("All");

    /** Single Chat Card Component */
    const ChatCard = () => (
        <TouchableOpacity style={styles.chatCard} onPress={() => navigation.navigate('ChatMessaging')}>
            {/* Profile Circle */}
            <View style={styles.profileCircle}>
                {/* Bottom Badge (24hrs + icon) */}
                <View style={styles.storyBadge}>
                    <Ionicons name="time-outline" size={hp(1.2)} color="black" />
                    <Text style={styles.storyText}>24hrs</Text>
                </View>
            </View>

            {/* Message Content */}
            <View style={{ flex: 1, marginLeft: wp(3) }}>
                {/* Top row: Name + Date */}
                <View style={styles.rowBetween}>
                    <Text style={styles.userName}>Nanda</Text>
                    <Text style={styles.dateText}>29 JUL 2024</Text>
                </View>

                {/* Sub title (like BMW M5) */}
                <Text style={styles.userSub}>BMW M5</Text>

                {/* Bottom row: Message + Time */}
                <View style={styles.rowBetween}>
                    <Text style={styles.messageText}>hello where is ur address</Text>
                    <Text style={styles.timeText}>05:00 pm</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    /** All Tab Content */
    const AllTab = () => (
        <View>
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

            {/* Filters */}
            <View style={styles.filtersRow}>
                <TouchableOpacity
                    style={[styles.filterBtn]}
                    onPress={() => navigation.navigate("ChatFilter")}
                >
                    <Image
                        source={require("../../assets/images/filter.png")}
                        style={{
                            width: wp(3),
                            height: hp(2),
                            resizeMode: "contain",
                        }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.filterBtn,
                        activeFilter === "All" && styles.activeFilterBtn,
                    ]}
                    onPress={() => setActiveFilter("All")}
                >
                    <Text
                        style={[
                            styles.filterText,
                            activeFilter === "All" && styles.activeFilterText,
                        ]}
                    >
                        All
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.filterBtn,
                        activeFilter === "1 Vehicles" && styles.activeFilterBtn,
                    ]}
                    onPress={() => setActiveFilter("1 Vehicles")}
                >
                    <View style={styles.squareBox} />
                    <Text
                        style={[
                            styles.filterText,
                            activeFilter === "1 Vehicles" && styles.activeFilterText,
                        ]}
                    >
                        1 Vehicles
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Chat Cards List */}
            <ChatCard />
            <ChatCard />
            <ChatCard />
        </View>
    );

    /** Render content based on active tab */
    const renderTabContent = () => {
        if (activeTab === "All") {
            return <AllTab />;
        } else {
            return null;
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ flexDirection: "row", alignItems: "center" }}
                >
                    <Ionicons name="arrow-back" size={wp(5)} color="black" />
                    <Text style={styles.headerTitle}>Chats</Text>
                </TouchableOpacity>
            </View>

            {/* Tabs (All / Unread) */}
            <View style={styles.tabs}>
                {["All", "Unread"].map((t, i) => (
                    <TouchableOpacity
                        key={i}
                        style={styles.tabBtn}
                        onPress={() => setActiveTab(t)}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text
                                style={[
                                    styles.tabText,
                                    activeTab === t && styles.activeText,
                                ]}
                            >
                                {t}
                            </Text>
                        </View>
                        {activeTab === t && <View style={styles.activeIndicator} />}
                    </TouchableOpacity>
                ))}
            </View>

            {/* Tab Content */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: wp(3),
                    paddingBottom: hp(10),
                }}
            >
                {renderTabContent()}
            </ScrollView>
        </View>
    );
};

export default ChatMainScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },

    /** Header */
    header: {
        paddingHorizontal: wp("5%"),
        paddingVertical: hp("1.5%"),
        marginTop: hp(3.6),
        backgroundColor: "#fff",
    },
    headerTitle: {
        fontSize: wp(4.5),
        marginLeft: wp(3),
        color: "#000",
        fontFamily: "Poppins-Medium",
        marginTop: hp(0.5),
    },

    /** Tabs */
    tabs: {
        flexDirection: "row",
        marginTop: hp(0),
        borderBottomWidth: 1,
        borderBottomColor: "#D9D9D9",
        justifyContent: "flex-start",
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
        left: 5,
        right: 0,
        height: 2,
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
        marginBottom: hp(2.5),
        marginTop: hp(2.5),
    },
    searchInput: { flex: 1, fontSize: hp(1.8), color: "#000" },

    /** Filters */
    filtersRow: { flexDirection: "row", marginBottom: hp(2) },
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
    },
    activeFilterBtn: {
        borderColor: "#6A5AE0",
        backgroundColor: "#fff",
    },
    filterText: { fontSize: hp(1.5), color: "#00000099" },
    activeFilterText: { color: "#6A5AE0", fontWeight: "600" },

    /** Small Square Box */
    squareBox: {
        width: wp(4),
        height: wp(4),
        backgroundColor: "#D9D9D980",
        marginRight: wp(1.5),
        borderRadius: 4,
    },

    /** Chat Card */
    chatCard: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingVertical: hp(1.8),
        paddingHorizontal: wp(0),
        backgroundColor: "#fff",
        borderRadius: wp(3),
        marginBottom: hp(2),
    },
    profileCircle: {
        width: wp(17),
        height: wp(17),
        borderRadius: wp(16) / 2,
        backgroundColor: "#D9D9D980",
        borderWidth: 1.5,
        borderStyle: "dashed",
        borderColor: "#aaa",
        justifyContent: "flex-end",
        alignItems: "center",
        position: "relative",
    },
    storyBadge: {
        position: "absolute",
        bottom: -hp(0.8),
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: wp(1),
        paddingVertical: hp(0),
        borderRadius: wp(2),
        right: wp(-1)
    },
    storyText: {
        color: "black",
        fontSize: hp(0.8),
        marginLeft: wp(1),
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    userName: {
        fontSize: hp(1.6),
        fontWeight: "600",
        color: "#000",
    },
    userSub: {
        fontSize: hp(1.4),
        color: "#444",
        fontWeight: "500",
        marginBottom: hp(1)
    },
    messageText: {
        fontSize: hp(1.3),
        color: "#555",
        flexShrink: 1,
    },
    dateText: {
        fontSize: hp(1),
        color: "#555",
    },
    timeText: {
        fontSize: hp(1),
        color: "#555",
        marginLeft: wp(2),
    },
});
