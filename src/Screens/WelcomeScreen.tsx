import React, { useEffect } from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Image,
    StyleSheet,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate("Login" as never);
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Image
                        source={require("../../assets/images/welcome.png")}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <Text style={styles.title}>Addvey Partner</Text>
                    <Text style={styles.subtitle}>ADDING MULTIPLE WAYS</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "black",
    },
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: wp(50),
        height: hp(14),
        marginBottom: hp(0),
    },
    title: {
        fontSize: hp(2.8),
        color: "white",
        marginBottom: hp(0),
        fontFamily: "Poppins-Bold",
    },
    subtitle: {
        fontSize: hp(1),
        color: "white",
        textAlign: "center",
        fontFamily: "Poppins-Regular",
    },
});
