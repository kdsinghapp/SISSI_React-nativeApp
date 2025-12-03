import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    FlatList,
    SafeAreaView,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import ListViewTypesScreen from "../Components/HomeType/ListViewTypes";

interface Item {
    id: string;
    title: string;
    image: any;
}

const DATA: Item[] = [
    { id: "1", title: "1BHK", image: require("../../assets/images/apart.png") },
    { id: "2", title: "2BHK", image: require("../../assets/images/apart.png") },
    { id: "3", title: "3BHK", image: require("../../assets/images/apart.png") },
    { id: "4", title: "4BHK", image: require("../../assets/images/apart.png") },
];

export default function ListViewScreen() {
    const navigation = useNavigation<any>();
    const [activeId, setActiveId] = useState("1");

    return (
        <SafeAreaView style={styles.safeArea}>

            {/* Top Header */}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons
                        name="arrow-back"
                        style={{ marginRight: wp(2) }}
                        size={hp("2%")}
                        color="#000"
                    />
                </TouchableOpacity>
                <Text style={styles.topTitle}>Apartments</Text>
                <View style={{ width: wp("6%") }} />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: hp("4%") }}
            >

                {/* Search Section */}
                <View style={styles.searchSection}>
                    <View style={styles.searchBox}>
                        <Ionicons
                            name="search-outline"
                            size={hp("2.2%")}
                            color="#777"
                            style={styles.searchIcon}
                        />
                        <TextInput
                            placeholder="Search for more"
                            placeholderTextColor="#999"
                            style={styles.searchInput}
                        />
                        <Image
                            source={require("../../assets/images/mic.png")}
                            style={styles.micIcon}
                        />
                    </View>
                    <TouchableOpacity>
                        <Image
                            source={require("../../assets/images/qrcode.png")}
                            style={styles.qrIcon}
                        />
                    </TouchableOpacity>
                </View>

                {/* Category List */}
                <View style={styles.listWrapper}>
                    <FlatList
                        data={DATA}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{
                            justifyContent: "space-between",
                            width: wp("100%"),
                            paddingHorizontal: wp("4%"),
                        }}
                        renderItem={({ item }) => {
                            const isActive = item.id === activeId;
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => setActiveId(item.id)}
                                    style={[
                                        styles.cardContainer,
                                        isActive && styles.activeCardContainer,
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.imageWrapper,
                                            {
                                                borderWidth: isActive ? 2 : 0,
                                                borderColor: isActive ? "#eee" : "transparent",
                                                borderRadius: wp("8.5%"),
                                            },
                                        ]}
                                    >
                                        <Image
                                            source={item.image}
                                            style={styles.image}
                                            resizeMode="cover"
                                        />
                                    </View>
                                    <Text
                                        style={[
                                            styles.cardText,
                                            isActive && styles.activeCardText,
                                        ]}
                                    >
                                        {item.title}
                                    </Text>

                                    {isActive && <View style={styles.activeBottomLine} />}
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>

                <ListViewTypesScreen />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    topBar: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: wp("4%"),
        paddingVertical: hp("1.8%"),
        borderBottomColor: "#ddd",
        marginTop: hp(3),
    },
    topTitle: {
        fontSize: hp("1.7%"),
        color: "#000",
        fontFamily: "Poppins-Medium",
        marginTop: hp(0.4),
    },
    searchSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: wp("4%"),
        marginTop: hp("0.5%"),
    },
    searchBox: {
        flex: 1,
        height: hp("5%"),
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: hp("1%"),
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: wp("3%"),
        backgroundColor: "#fff",
    },
    searchIcon: {
        marginRight: wp("2%"),
    },
    searchInput: {
        flex: 1,
        fontSize: hp("1.8%"),
        color: "#000",
        paddingVertical: 0,
    },
    micIcon: {
        width: wp("5%"),
        height: wp("5%"),
        resizeMode: "contain",
    },
    qrIcon: {
        width: wp("7%"),
        height: wp("7%"),
        resizeMode: "contain",
        marginLeft: wp("3%"),
    },
    listWrapper: {
        marginTop: hp("2%"),
        position: "relative",
        paddingBottom: hp("0.3%"),
    },
    cardContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: hp("1%"),
        backgroundColor: "#fff",
        position: "relative",
    },
    activeCardContainer: {
        backgroundColor: "#fff",
    },
    imageWrapper: {
        width: wp("17%"),
        height: wp("17%"),
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    image: {
        width: "85%",
        height: "85%",
        borderRadius: wp("8.5%"),
    },
    cardText: {
        marginTop: hp("0.8%"),
        fontSize: hp("1.4%"),
        color: "#555",
        fontFamily: "Poppins-Medium",
    },
    activeCardText: {
        color: "#000",
        fontWeight: "600",
    },
    activeBottomLine: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: hp("0.5%"),
        backgroundColor: "#6C63FF",
        borderTopLeftRadius: hp("2%"),
        borderTopRightRadius: hp("2%"),
    },
});
