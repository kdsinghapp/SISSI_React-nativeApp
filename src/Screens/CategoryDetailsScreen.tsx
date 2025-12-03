import React from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const CategoryDetailsScreen: React.FC = () => {
    const SectionHeading = ({ title, image }: { title: string; image: any }) => (
        <View style={styles.headingRow}>
            <View style={styles.line} />
            <View style={styles.centerHeading}>
                <Image source={image} style={styles.headingIcon} />
                <Text style={styles.headingText}>{title}</Text>
            </View>
            <View style={styles.line} />
        </View>
    );

    const renderSubCategory = (items: string[]) => (
        <View style={styles.subCategoryRow}>
            {items.map((item, i) => (
                <View key={i} style={styles.subCategoryWrapper}>
                    <View style={styles.subCategoryItem} />
                    <Text style={styles.subCategoryText}>{item}</Text>
                </View>
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.topHeading}>
                <Image
                    source={require("../../assets/images/car.png")}
                    style={styles.topIcon}
                />
                <Text style={styles.topHeadingText}>Vehicles</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Bikes Section */}
                <SectionHeading
                    title="Bikes"
                    image={require("../../assets/images/moter.png")}
                />
                {renderSubCategory([
                    "Motorcycles",
                    "Scooter",
                    "Electric Bikes",
                    "Bicycles",
                    "Spare Parts",
                    "Accessories",
                ])}

                {/* Cars Section */}
                <SectionHeading
                    title="Cars"
                    image={require("../../assets/images/cars.png")}
                />
                {renderSubCategory([
                    "Cars",
                    "Luxury Cars",
                    "Electric Cars",
                    "Sports Cars",
                ])}

                {/* Commercial Vehicles Section */}
                <SectionHeading
                    title="Commercial Vehicles"
                    image={require("../../assets/images/rish.png")}
                />
                {renderSubCategory([
                    "Autos",
                    "Vans",
                    "Trucks",
                    "Electric Commercial",
                    "Buses",
                    "Tractors",
                    "Construction Vehicles",
                    "Commercial Spare Parts",
                    "Heavy Duty",
                    "Accessories",
                ])}
            </ScrollView>
        </View>
    );
};

export default CategoryDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: wp("4%"),
    },
    // Top Heading (Vehicles)
    topHeading: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: hp("1.5%"),
    },
    topIcon: {
        width: wp(15),
        height: hp(6),
        resizeMode: "contain",
    },
    topHeadingText: {
        fontSize: wp("4.5%"),
        marginLeft: 8,
        fontFamily: "Poppins-Medium",
    },
    // Section Heading
    headingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: hp("2%"),
    },
    line: {
        flex: 1,
        height: hp(0.1),
        backgroundColor: "#D9D9D9DE",
    },
    centerHeading: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 10,
    },
    headingText: {
        fontSize: wp("3.3%"),
        marginLeft: 4,
        fontFamily: 'Poppins-Medium',
        marginTop: hp(0.3)
    },
    headingIcon: {
        width: wp(6),
        height: 20,
        resizeMode: "contain",
    },
    // Sub Categories
    subCategoryRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        gap: 4
    },
    subCategoryWrapper: {
        marginBottom: hp("3%"),
        width: wp("22%"),
        alignItems: "center",
    },
    subCategoryItem: {
        width: wp("14%"),
        height: wp("13%"),
        backgroundColor: "#D9D9D97D",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    subCategoryText: {
        fontSize: wp("3%"),
        textAlign: "center",
        color: "#000000",
        marginTop: 4,
        fontFamily: 'Poppins-Medium'
    },
});
