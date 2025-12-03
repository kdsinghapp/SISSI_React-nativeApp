// screens/ReportedPostQueryScreen.tsx
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
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MainHomeCard from "../Components/Home/MainHomeCard";

const ReportedPostQueryScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const [activeFilter, setActiveFilter] = useState("All");

    /** Filter Components */
    const AllComponent = () => (
        <View style={styles.componentContainer}>
            {/* Added clear horizontal spacing */}
            <View style={styles.cardWrapper}>
                <MainHomeCard />
            </View>
        </View>
    );

    const VehicleComponent = () => (
        <View style={styles.componentContainer}>
            <Text style={styles.componentTitle}>Vehicle Content</Text>
            <Text style={styles.componentText}>This is the Vehicle filter content</Text>
        </View>
    );

    const PropertiesComponent = () => (
        <View style={styles.componentContainer}>
            <Text style={styles.componentTitle}>Properties Content</Text>
            <Text style={styles.componentText}>This is the Properties filter content</Text>
        </View>
    );

    const BikesComponent = () => (
        <View style={styles.componentContainer}>
            <Text style={styles.componentTitle}>Bikes Content</Text>
            <Text style={styles.componentText}>This is the Bikes filter content</Text>
        </View>
    );

    const renderFilterContent = () => {
        switch (activeFilter) {
            case "All":
                return <AllComponent />;
            case "Vehicle":
                return <VehicleComponent />;
            case "Properties":
                return <PropertiesComponent />;
            case "Bikes":
                return <BikesComponent />;
            default:
                return <AllComponent />;
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={wp("4.4%")} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Contact us</Text>
                </View>
            </View>

            <Text style={styles.topText}>What do you need help with?</Text>

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
                                activeFilter === "Filter" && styles.activeFilterBtn,
                            ]}
                            onPress={() => {
                                setActiveFilter("Filter");
                            }}
                        >
                            <Image
                                source={require("../../assets/images/filter.png")}
                                style={{
                                    width: wp(3.5),
                                    height: hp(2.3),
                                    resizeMode: "contain",
                                }}
                            />
                        </TouchableOpacity>
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
                            activeFilter === "Vehicle" && styles.activeFilterBtn,
                        ]}
                        onPress={() => setActiveFilter("Vehicle")}
                    >
                        <View style={styles.squareBox} />
                        <Text
                            style={[
                                styles.filterText,
                                activeFilter === "Vehicle" && styles.activeFilterText,
                            ]}
                        >
                            1 Vehicle
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.filterBtn,
                            activeFilter === "Properties" && styles.activeFilterBtn,
                        ]}
                        onPress={() => setActiveFilter("Properties")}
                    >
                        <View style={styles.squareBox} />
                        <Text
                            style={[
                                styles.filterText,
                                activeFilter === "Properties" && styles.activeFilterText,
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

                {/* Filter Content */}
                {renderFilterContent()}
            </ScrollView>
        </View>
    );
};

export default ReportedPostQueryScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },

    topText: {
        fontSize: hp(2),
        color: "#000",
        marginBottom: hp(0),
        paddingHorizontal: wp(4),
        marginTop: hp(2),
        fontFamily: 'Poppins-Medium'
    },
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
        paddingRight: wp(3),
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

    /** Component Styles */
    componentContainer: {
        marginTop: hp(2),
        borderRadius: wp(2),
        alignItems: "center",
        justifyContent: "center",
    },
    cardWrapper: {
        width: "100%",
        marginHorizontal: wp(4),
        alignSelf: "center",
    },
    componentTitle: {
        fontSize: hp(2),
        fontWeight: "600",
        color: "#000",
        marginBottom: hp(1),
    },
    componentText: {
        fontSize: hp(1.6),
        color: "#666",
        textAlign: "center",
    },
});
