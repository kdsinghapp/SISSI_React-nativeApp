// screens/PersonalizationScreen.tsx
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Platform,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons, Octicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PersonalizationScreen: React.FC = () => {
    const navigation = useNavigation<any>();

    const [activeTopTab, setActiveTopTab] = useState("Searched");

    // Checkbox states
    const [activeCheckbox, setActiveCheckbox] = useState<"show" | "pause" | "none">("none");
    const [dontAutoDelete, setDontAutoDelete] = useState(false);

    // Auto-delete dropdown states
    const [autoDeleteValue, setAutoDeleteValue] = useState("1 month");
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const topTabs = [
        { key: "Searched", label: "Searched", icon: <Ionicons name="search" size={hp(2)} color="#00000099" /> },
        { key: "Viewed", label: "Viewed", icon: <Octicons name="eye" size={hp(2)} color="#00000099" /> },
        { key: "Shared", label: "Shared", icon: <Ionicons name="share-outline" size={hp(2)} color="#00000099" /> },
        { key: "Commented", label: "Commented", icon: <MaterialIcons name="chat-bubble-outline" size={hp(2)} color="#00000099" /> },
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={wp("4.5%")} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Personalization</Text>
            </View>

            {/* Buy/Sell Row */}
            <View style={styles.buySellRow}>
                <Text style={styles.buySellText}>
                    Buy/Sell <Text style={{ color: "#6C63FF" }}> (3) </Text>
                </Text>
                <View style={styles.buySellActiveIndicator} />
            </View>

            {/* Main Content */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: wp(4),
                    paddingBottom: hp(10),
                }}
            >
                {/* Top small tabs */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: hp(2) }}>
                    <View style={{ flexDirection: "row" }}>
                        {topTabs.map((t) => {
                            const active = activeTopTab === t.key;
                            return (
                                <TouchableOpacity
                                    key={t.key}
                                    style={[styles.smallTabBtn, active && styles.smallTabBtnActive]}
                                    onPress={() => setActiveTopTab(t.key)}
                                >
                                    <View style={styles.smallTabLeftIcon}>{t.icon}</View>
                                    <Text style={[styles.smallTabText, active && styles.smallTabTextActive]}>
                                        {t.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </ScrollView>

                {/* History Preferences */}
                <View style={styles.sectionBlock}>
                    <Text style={styles.sectionHeading}>History preferences</Text>

                    {/* Show searched history */}
                    <TouchableOpacity
                        style={styles.rowCheckbox}
                        activeOpacity={0.8}
                        onPress={() => setActiveCheckbox(activeCheckbox === "show" ? "none" : "show")}
                    >
                        <View style={styles.checkbox}>
                            {activeCheckbox === "show" && (
                                <Ionicons name="checkmark" size={hp(2)} color="#6C63FF" />
                            )}
                        </View>
                        <Text style={styles.rowText}>Show searched history</Text>
                    </TouchableOpacity>

                    {activeCheckbox === "show" && (
                        <View style={styles.infoBox}>
                            <View style={styles.bulletItem}>
                                <Text style={styles.bulletDot}>•</Text>
                                <Text style={styles.bulletText}>🕒 Once deleted, chats can’t be recovered. Keep chat history for dispute resolution.</Text>
                            </View>
                            <View style={styles.bulletItem}>
                                <Text style={styles.bulletDot}>•</Text>
                                <Text style={styles.bulletText}>⚠️ Good for privacy, reduces stored data will make users feel it’s a feature, not a limitation.</Text>
                            </View>
                            <View style={styles.bulletItem}>
                                <Text style={styles.bulletDot}>•</Text>
                                <Text style={styles.bulletText}>💬 Messages disappear only after both you and the other person have seen them.</Text>
                            </View>
                        </View>
                    )}

                    {/* Pause searched history */}
                    <TouchableOpacity
                        style={styles.rowCheckbox}
                        activeOpacity={0.8}
                        onPress={() => setActiveCheckbox(activeCheckbox === "pause" ? "none" : "pause")}
                    >
                        <View style={styles.checkbox}>
                            {activeCheckbox === "pause" && (
                                <Ionicons name="checkmark" size={hp(2)} color="#6C63FF" />
                            )}
                        </View>
                        <Text style={styles.rowText}>Pause searched history</Text>
                    </TouchableOpacity>
                </View>

                {/* Auto-delete Section */}
                <View style={styles.sectionBlock}>
                    <Text style={styles.sectionHeading}>Auto-delete searched history</Text>

                    {/* Dropdown Box */}
                    <View style={styles.dropdownBox}>
                        <TouchableOpacity
                            style={styles.dropdownHeader}
                            onPress={() => setIsDropdownVisible(!isDropdownVisible)}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.dropdownText}>{autoDeleteValue}</Text>
                            <Ionicons
                                name={isDropdownVisible ? "chevron-up" : "chevron-down"}
                                size={hp(1.8)}
                                color="#6C63FF"
                            />
                        </TouchableOpacity>

                        {isDropdownVisible && (
                            <View style={styles.dropdownInsideBox}>
                                {["1 month", "2 months", "3 months", "4 months"].map((opt) => (
                                    <TouchableOpacity
                                        key={opt}
                                        style={[
                                            styles.dropdownItem,
                                            autoDeleteValue === opt && styles.dropdownItemActive,
                                        ]}
                                        onPress={() => {
                                            setAutoDeleteValue(opt);
                                            setIsDropdownVisible(false);
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.dropdownItemText,
                                                autoDeleteValue === opt && styles.dropdownItemTextActive,
                                            ]}
                                        >
                                            {opt}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Don't auto delete searched history */}
                    <TouchableOpacity
                        style={[styles.rowCheckbox, { marginTop: hp(1.5) }]}
                        activeOpacity={0.8}
                        onPress={() => setDontAutoDelete(!dontAutoDelete)}
                    >
                        <View style={styles.checkbox}>
                            {dontAutoDelete && (
                                <Ionicons name="checkmark" size={hp(2)} color="#6C63FF" />
                            )}
                        </View>
                        <Text style={styles.rowText}>Don’t auto delete searched history</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default PersonalizationScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: hp(Platform.OS === "ios" ? 6 : 5),
        paddingHorizontal: wp(5),
    },
    headerTitle: {
        fontSize: wp(4),
        fontWeight: "600",
        color: "#000",
        marginLeft: wp(2),
    },
    buySellRow: {
        borderBottomWidth: 1,
        borderBottomColor: "#D9D9D9",
        paddingHorizontal: wp(5),
        paddingVertical: hp(1),
        position: "relative",
        marginTop: hp(1.5)
    },
    buySellText: { fontSize: wp(3.8), color: "#000" },
    buySellActiveIndicator: {
        position: "absolute",
        bottom: 0,
        left: wp(5),
        width: wp(19),
        height: 3,
        backgroundColor: "#6A5AE0",
        borderTopLeftRadius: wp(2),
        borderTopRightRadius: wp(2),
    },
    smallTabBtn: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: hp(0.8),
        paddingHorizontal: wp(2),
        borderWidth: 1,
        borderColor: "#E6E6E6",
        borderRadius: wp(2),
        marginRight: wp(2),
        backgroundColor: "#fff",
        marginTop: hp(2),
    },
    smallTabBtnActive: { borderColor: "#6A5AE0", elevation: 2 },
    smallTabLeftIcon: { marginRight: wp(2) },
    smallTabText: { fontSize: hp(1.6), color: "#666" },
    smallTabTextActive: { color: "black", fontWeight: "600" },
    sectionBlock: { marginBottom: hp(2), paddingHorizontal: wp(1) },
    sectionHeading: {
        fontSize: wp(3.6),
        fontWeight: "600",
        color: "#000",
        marginBottom: hp(1),
    },
    rowCheckbox: { flexDirection: "row", alignItems: "center", marginVertical: hp(0.8) },
    checkbox: {
        width: wp(6),
        height: wp(6),
        borderRadius: wp(2),
        borderWidth: 1,
        borderColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
        marginRight: wp(3),
    },
    rowText: { fontSize: wp(3.4), color: "#000" },
    infoBox: {
        marginTop: hp(1),
        padding: hp(1.5),
        borderWidth: 1,
        borderColor: "#E6E6E6",
        borderRadius: wp(2),
        backgroundColor: "#FBFBFB",
    },
    bulletItem: { flexDirection: "row", alignItems: "flex-start", marginBottom: hp(0.5) },
    bulletDot: { fontSize: wp(4), marginRight: wp(2), color: "#000" },
    bulletText: { fontSize: wp(2.8), color: "#6E533F", flexShrink: 1 },
    dropdownBox: {
        borderWidth: 1,
        borderColor: "#E6E6E6",
        borderRadius: wp(2),
        overflow: "hidden",
        marginTop: hp(1),
        backgroundColor: "#fff",
    },
    dropdownHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: hp(1.2),
        paddingHorizontal: wp(4),
    },
    dropdownText: { fontSize: wp(3.4), color: "#000" },
    dropdownInsideBox: { borderTopWidth: 1, borderColor: "#E6E6E6" },
    dropdownItem: { paddingVertical: hp(1.2), paddingHorizontal: wp(4) },
    dropdownItemActive: { backgroundColor: "#fff" },
    dropdownItemText: { fontSize: wp(3.4), color: "#000" },
    dropdownItemTextActive: { color: "#000", fontWeight: "600" },
});
