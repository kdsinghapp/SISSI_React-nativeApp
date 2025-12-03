// EnableLocationScreen.tsx
import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    Platform,
} from "react-native";
import * as Location from "expo-location";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const EnableLocationScreen: React.FC = () => {
    const navigation = useNavigation<any>();

    const enableLocation = async () => {
        try {
            // Request foreground permissions
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                return;
            }

            await Location.getCurrentPositionAsync({});
        } catch (error) {
            console.log("Location error:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    alignItems: "center",
                    paddingHorizontal: wp("6%"),
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* Heading */}
                <View style={styles.textContainer}>
                    <Text style={styles.heading}>Set your location to start</Text>
                    <Text style={styles.subText}>
                        Rides, Groceries, Services, Poojas, jobs & more exploring near you
                    </Text>
                </View>

                {/* Illustration Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={require("../../assets/images/location.png")}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={enableLocation}
                    >
                        <Text style={styles.primaryText}>Enable Device Location</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => navigation.navigate("LocationManually")}
                    >
                        <Text style={styles.secondaryText}>
                            Enter Your Location Manually
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EnableLocationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    textContainer: {
        marginTop: hp("3%"),
        alignItems: "center",
    },
    heading: {
        fontSize: wp(3.9),
        color: "black",
        marginBottom: hp(0),
        textAlign: "center",
        marginTop: hp(4),
        fontFamily: "Poppins-Regular",
    },
    subText: {
        fontSize: wp(3.9),
        color: "black",
        textAlign: "center",
        lineHeight: hp("2.8%"),
        width: wp("100%"),
        fontFamily: "Poppins-Regular",
    },
    imageContainer: {
        marginTop: hp(7),
        marginBottom: hp("5%"),
        width: wp("96%"),
        height: hp("50%"),
    },
    image: {
        width: "100%",
        height: "100%",
    },
    buttonContainer: {
        width: "100%",
        marginTop: "auto",
        marginBottom: hp("5%"),
        alignItems: "center",
    },
    primaryButton: {
        backgroundColor: "#6C63FF",
        paddingVertical: hp(1.8),
        borderRadius: wp(5),
        alignItems: "center",
        marginBottom: hp("2%"),
        width: "100%",
    },
    primaryText: {
        color: "#fff",
        fontSize: wp("3.8%"),
        fontWeight: "600",
        fontFamily: "Poppins-Regular",
    },
    secondaryButton: {
        borderWidth: 1,
        borderColor: "#4F46E5",
        paddingVertical: hp(1.5),
        borderRadius: wp(5),
        alignItems: "center",
        width: "100%",
    },
    secondaryText: {
        color: "#4F46E5",
        fontSize: wp("3.8%"),
        fontWeight: "600",
        fontFamily: "Poppins-Regular",
    },
});
