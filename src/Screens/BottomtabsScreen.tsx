// navigation/BottomTabs.tsx
import React, { useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    TextInput,
    Image,
    Animated,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Feather, MaterialIcons, Octicons } from "@expo/vector-icons";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MainHomeScreen from "./MainHomeScreen";
import ChatMainScreen from "./ChatMainScreen";
import GrowNavigator from "./GrowNavigator";
import ExampleListingModal from "../Components/MainHome/ExampleListingModal";
import HomeStack from "../Components/Home/HomeStack";
import VerifyEmailProfileScreen from "./VerifyEmailProfileScreen";
import MainProfileScreen from "./MainProfileScreen";

const Tab = createBottomTabNavigator();

const DummyScreen = () => (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Dummy Screen</Text>
    </View>
);

const BottomTabs = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [exampleVisible, setExampleVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(0)).current;

    const openModal = () => {
        setModalVisible(true);
        Animated.timing(slideAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const closeModal = () => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
        }).start(() => setModalVisible(false));
    };

    const handleTapHere = () => {
        closeModal();
        setTimeout(() => setExampleVisible(true), 300);
    };

    const translateY = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [hp(100), 0],
    });

    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: true,
                    tabBarStyle: {
                        height: 70,
                        paddingBottom: 10,
                        paddingTop: 5,
                        paddingHorizontal: wp(2),
                    },
                    tabBarActiveTintColor: "black",
                    tabBarInactiveTintColor: "gray",
                }}
            >
                {/* Addvey */}
                <Tab.Screen
                    name="Ads"
                    component={MainHomeScreen}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <Text
                                style={{
                                    color: "red",
                                    fontSize: wp(2.2),
                                    fontWeight: focused ? "600" : "400",
                                    fontFamily: "Poppins-Medium",
                                }}
                            >
                                Addvey
                            </Text>
                        ),
                        tabBarIcon: () => (
                            <Feather name="arrow-left-circle" size={22} color="red" />
                        ),
                    }}
                />

                {/* Buy/Sell */}
                <Tab.Screen
                    name="Home"
                    component={HomeStack}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <Text
                                style={{
                                    fontSize: wp(2.2),
                                    fontWeight: focused ? "600" : "400",
                                    fontFamily: "Poppins-Medium",
                                }}
                            >
                                Buy/Sell
                            </Text>
                        ),
                        tabBarIcon: ({ color, focused }) => (
                            <Octicons
                                name={focused ? "home-fill" : "home"}
                                size={22}
                                color={color}
                            />
                        ),
                    }}
                />

                {/* Search/Scan */}
                <Tab.Screen
                    name="SearchScan"
                    component={DummyScreen}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <Text
                                style={{
                                    fontSize: wp(2.2),
                                    fontWeight: focused ? "600" : "400",
                                    fontFamily: "Poppins-Medium",
                                }}
                            >
                                Search/Scan
                            </Text>
                        ),
                        tabBarIcon: () => (
                            <Feather name="search" size={22} color="#00000099" />
                        ),
                    }}
                    listeners={{
                        tabPress: (e) => {
                            e.preventDefault();
                            openModal();
                        },
                    }}
                />

                {/* Chats */}
                <Tab.Screen
                    name="Chats"
                    component={ChatMainScreen}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <Text
                                style={{
                                    fontSize: wp(2.2),
                                    fontWeight: focused ? "600" : "400",
                                    fontFamily: "Poppins-Medium",
                                }}
                            >
                                Chats
                            </Text>
                        ),
                        tabBarIcon: ({ color, focused }) => (
                            <MaterialIcons
                                name={
                                    focused
                                        ? "chat-bubble"
                                        : "chat-bubble-outline"
                                }
                                size={22}
                                color={color}
                            />
                        ),
                    }}
                />

                {/* You */}
                <Tab.Screen
                    name="You"
                    component={MainProfileScreen}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <Text
                                style={{
                                    fontSize: wp(2.2),
                                    fontWeight: focused ? "600" : "400",
                                    fontFamily: "Poppins-Medium",
                                }}
                            >
                                You
                            </Text>
                        ),
                        tabBarIcon: ({ color }) => (
                            <Octicons name="person" size={22} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>

            {/* Bottom Modal */}
            <Modal
                transparent
                visible={modalVisible}
                animationType="none"
                onRequestClose={closeModal}
            >
                <View style={styles.overlay}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={closeModal}
                    >
                        <Ionicons name="close" size={22} color="#000" />
                    </TouchableOpacity>

                    <Animated.View
                        style={[
                            styles.modalContainer,
                            { transform: [{ translateY }] },
                        ]}
                    >
                        <View style={styles.modalContent}>
                            <View style={styles.topRow}>
                                <Image
                                    source={require("../../assets/images/1.png")}
                                    style={{
                                        width: wp(8),
                                        height: wp(8),
                                        marginRight: wp(2),
                                    }}
                                    resizeMode="contain"
                                />
                                <Text style={styles.modalTitle}>Addvey</Text>
                            </View>

                            <View style={styles.qrContainer}>
                                <View style={styles.qrBox}>
                                    <Ionicons
                                        name="qr-code-outline"
                                        size={wp(14)}
                                        color="black"
                                    />
                                    <View style={{ alignItems: "center" }}>
                                        <TouchableOpacity onPress={handleTapHere}>
                                            <Text
                                                style={{
                                                    color: "#6385FF",
                                                    marginTop: hp(1),
                                                    fontSize: wp(3.2),
                                                    textAlign: "center",
                                                }}
                                            >
                                                Tap here to enable your camera
                                            </Text>
                                        </TouchableOpacity>

                                        <View
                                            style={{
                                                width: wp(80),
                                                height: 1,
                                                backgroundColor: "#00000018",
                                                marginVertical: hp(1.5),
                                            }}
                                        />

                                        <Text
                                            style={{
                                                color: "#000",
                                                fontSize: wp(2.8),
                                                fontFamily: "Poppins-Medium",
                                            }}
                                        >
                                            Scan Addvey QR code
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.searchBar}>
                                <Feather
                                    name="search"
                                    size={18}
                                    color="#888"
                                    style={{ marginRight: wp(2) }}
                                />
                                <TextInput
                                    placeholder="Search nearby"
                                    placeholderTextColor="#888"
                                    style={{ flex: 1, fontSize: wp(3.5) }}
                                />
                                <Image
                                    source={require("../../assets/images/mic.png")}
                                    style={{
                                        width: wp(4.5),
                                        height: wp(4.5),
                                        resizeMode: "contain",
                                    }}
                                />
                            </View>
                        </View>
                    </Animated.View>
                </View>
            </Modal>

            <ExampleListingModal
                visible={exampleVisible}
                onClose={() => setExampleVisible(false)}
            />
        </>
    );
};

export default BottomTabs;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
    },
    closeButton: {
        position: "absolute",
        top: hp(45),
        right: wp(3),
        zIndex: 10,
        backgroundColor: "#fff",
        borderRadius: wp(5),
        padding: wp(1.5),
        elevation: 4,
    },
    modalContainer: {
        backgroundColor: "#fff",
        borderTopLeftRadius: wp(6),
        borderTopRightRadius: wp(6),
        paddingHorizontal: wp(5),
        paddingTop: hp(3),
        paddingBottom: hp(5),
    },
    modalContent: {
        alignItems: "center",
    },
    topRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: hp(1),
    },
    modalTitle: {
        fontSize: wp(5),
        fontFamily: "Poppins-Medium",
        marginTop: hp(0.8),
    },
    qrContainer: {
        alignItems: "center",
        marginTop: hp(2.5),
        width: "100%",
    },
    qrBox: {
        width: "100%",
        borderRadius: wp(3),
        borderWidth: 1,
        borderColor: "#eee",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: hp(3),
        backgroundColor: "#eee",
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: wp(3),
        marginTop: hp(3),
        width: "100%",
        paddingHorizontal: wp(3),
        backgroundColor: "#fff",
    },
});
