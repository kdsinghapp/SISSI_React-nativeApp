import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StatusBar,
    Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";


const ConfirmDetailScreen = () => {
    const navigation = useNavigation<any>();
    const [isEditable, setIsEditable] = useState(false);
    const [issueText, setIssueText] = useState(
        "Getting an annual inspection and cleaning is recommended for most systems. Beyond checking the components..."
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: hp("5%") }}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Image
                        source={require("../../assets/images/bycir.png")}
                        style={styles.headerImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.headerText}>
                        <Text style={styles.bold}>Buy/Sell </Text>
                        | Confirmed details
                    </Text>
                </View>

                {/* Described Issue Section */}
                <Text style={styles.sectionTitle}>Described issue</Text>
                <View
                    style={[
                        styles.inputContainer,
                        isEditable && { borderColor: "#4B4BFF" },
                    ]}
                >
                    <TextInput
                        style={styles.textInput}
                        multiline
                        editable={isEditable}
                        value={issueText}
                        onChangeText={setIssueText}
                        placeholder="Describe your issue here..."
                        placeholderTextColor="#444"
                    />

                    {/* Mic Image */}
                    <TouchableOpacity style={styles.micIcon}>
                        <Image
                            source={require("../../assets/images/mic.png")}
                            style={styles.micImage}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

                    {/* Edit Icon */}
                    <TouchableOpacity
                        style={styles.editIcon}
                        onPress={() => setIsEditable(!isEditable)}
                    >
                        <Feather
                            name={isEditable ? "edit" : "edit"}
                            size={wp("4.5%")}
                            color={isEditable ? "#6E533F" : "#6E533F"}
                        />
                    </TouchableOpacity>
                </View>

                {/* Call Information */}
                <Text style={styles.callText}>
                    We will call you on this number in{" "}
                    <Text style={styles.linkText}>Telugu తెలుగు</Text>
                </Text>
                <Text style={styles.phoneText}>9392322767</Text>

                {/* Info Box */}
                <View style={styles.infoBox}>
                    <View style={{ marginBottom: hp("1.5%") }}>
                        <Text style={styles.infoText}>
                            We will review your request and contact you within
                        </Text>
                        <Text style={styles.infoText}>
                            <Text style={styles.bold}> 1 hour </Text> or during our response
                            time from <Text style={styles.bold}>08:00AM to 12:00AM.</Text>
                        </Text>
                        <Text style={styles.infoText}>We appreciate your patience.</Text>
                    </View>

                    <Text style={styles.infoText}>
                        “Customer care is available daily from{" "}
                        <Text style={styles.bold}>10:00 AM to 12:00 AM</Text> by phone,
                        chat, and email.”
                    </Text>

                    {/* Centered Last Line */}
                    <Text style={[styles.infoText, styles.centeredText]}>
                        At other times email {"\n"} us, or visit the ‘FAQ section’
                    </Text>
                </View>

                {/* Button */}
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Back to home</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default ConfirmDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: wp("5%"),
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: hp("9%"),
    },
    headerImage: {
        width: wp("8%"),
        height: wp("8%"),
        marginRight: wp("1%"),
        resizeMode: "contain",
    },
    headerText: {
        fontSize: wp("4%"),
        color: "#000",
    },
    bold: {
        fontWeight: "700",
    },
    sectionTitle: {
        fontSize: wp("3.8%"),
        fontWeight: "600",
        color: "#000",
        marginTop: hp("3%"),
        marginBottom: hp("1%"),
    },
    inputContainer: {
        backgroundColor: "#fff",
        borderRadius: wp("2%"),
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: wp("3%"),
        position: "relative",
        minHeight: hp("15%"),
        justifyContent: "center",
    },
    textInput: {
        fontSize: wp("3.4%"),
        color: "#333",
        textAlignVertical: "top",
        lineHeight: hp("2.5%"),
        paddingRight: wp("14%"),
    },
    micIcon: {
        position: "absolute",
        right: wp("5%"),
        bottom: wp("3%"),
    },
    micImage: {
        width: wp("4.5%"),
        height: wp("4.5%"),
        resizeMode: 'contain'
    },
    editIcon: {
        position: "absolute",
        right: wp("13%"),
        bottom: wp("3%"),
    },
    callText: {
        fontSize: wp("3.7%"),
        color: "#333",
        marginTop: hp("4%"),
    },
    linkText: {
        color: "#4B4BFF",
        fontWeight: "500",
    },
    phoneText: {
        fontSize: wp("4%"),
        fontWeight: "700",
        color: "#000",
        marginTop: hp("0.5%"),
    },
    infoBox: {
        borderWidth: 1,
        borderColor: "#D6FC3D",
        borderRadius: wp("2%"),
        padding: wp("4%"),
        backgroundColor: "#FAFAFA",
        marginTop: hp("4%"),
    },
    infoText: {
        fontSize: wp("3.3%"),
        color: "#333",
        lineHeight: hp("2.5%"),
    },
    centeredText: {
        textAlign: "center",
        marginTop: hp("2%"),
    },
    button: {
        backgroundColor: "#6C63FF",
        borderRadius: wp("3%"),
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: hp("1.3%"),
        marginTop: hp("5%"),
    },
    buttonText: {
        color: "#fff",
        fontSize: wp("3.8%"),
        fontFamily: 'Poppins-Medium'
    },
});
