import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView,
    StatusBar,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const OtherIssuesScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const [images, setImages] = useState<string[]>([]);
    const [issue, setIssue] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("English");

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled) {
            const selected = result.assets.map((a) => a.uri);
            setImages((prev) => [...prev, ...selected]);
        }
    };

    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={hp("2%")} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Contact us</Text>
            </View>

            <ScrollView
                contentContainerStyle={{ paddingBottom: hp("5%") }}
                showsVerticalScrollIndicator={false}
            >
                {/* Section 1: Title */}
                <Text style={styles.title}>
                    <Text style={styles.bold}>Buy/Sell</Text> | Confirm your details so we can call you
                </Text>

                {/* Section 2: Help with this */}
                <Text style={styles.label}>Help you with this</Text>
                <TouchableOpacity style={styles.dropdown}>
                    <Text style={styles.dropdownText}>Other issues</Text>
                    <Ionicons name="chevron-forward" size={hp("1.8%")} color="#000" />
                </TouchableOpacity>

                {/* Section 3: Upload Images */}
                <Text style={styles.label}>If applicable, Please upload related images</Text>

                <View style={styles.imageUploadBox}>
                    {/* Always show camera icon and text */}
                    <TouchableOpacity onPress={pickImage} style={styles.addImageContainer}>
                        <Ionicons name="camera-outline" size={hp("7%")} color="#6C63FF" />
                        <Text style={styles.addImageText}>Add images</Text>
                        <Text style={styles.imageNote}>jpeg, png or jpg formats up-to 5MB</Text>
                    </TouchableOpacity>

                    {/* Show selected images and plus icon if any */}
                    {images.length > 0 && (
                        <View style={{ width: "100%", marginTop: hp("2%") }}>
                            <View style={styles.selectedImagesContainer}>
                                <Text style={styles.imageSectionTitle}>
                                    Added{" "}
                                    <Text style={{ color: "#6A5AE0" }}>({images.length})</Text> Images
                                </Text>

                                <View style={styles.imageRow}>
                                    {/* Image List */}
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        <View style={styles.imageGrid}>
                                            {images.map((uri, index) => (
                                                <View key={index} style={styles.imageContainer}>
                                                    <Image
                                                        source={{ uri }}
                                                        style={styles.selectedImage}
                                                    />
                                                    <TouchableOpacity
                                                        style={styles.removeIcon}
                                                        onPress={() => removeImage(index)}
                                                    >
                                                        <Ionicons
                                                            name="close-circle"
                                                            size={wp("4.5%")}
                                                            color="#ff4444"
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            ))}

                                            {/* Plus (+) icon to add more — same height as image */}
                                            <TouchableOpacity
                                                onPress={pickImage}
                                                style={[
                                                    styles.addMoreBox,
                                                    { height: wp("20%"), width: wp("20%") },
                                                ]}
                                            >
                                                <Text style={styles.plusText}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                    )}
                </View>

                {/* Describe issue with mic icon */}
                <View style={styles.inputWrapper}>
                    <TextInput
                        placeholder="Describe issue"
                        placeholderTextColor="#999"
                        value={issue}
                        onChangeText={setIssue}
                        style={styles.input}
                        multiline
                    />
                    <TouchableOpacity style={styles.micIconContainer}>
                        <Ionicons name="mic-outline" size={hp("2.5%")} color="#6C63FF" />
                    </TouchableOpacity>
                </View>

                {/* Talk to us in */}
                <Text style={styles.talkLabel}>Talk to us in :</Text>
                <View style={styles.languageRow}>
                    {["తెలుగు", "हिंदी", "English"].map((lang) => (
                        <TouchableOpacity
                            key={lang}
                            style={[
                                styles.languageButton,
                                selectedLanguage === lang && styles.selectedLang,
                            ]}
                            onPress={() => setSelectedLanguage(lang)}
                        >
                            <Text
                                style={[
                                    styles.languageText,
                                    selectedLanguage === lang && styles.selectedLangText,
                                ]}
                            >
                                {lang}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Phone Number */}
                <Text style={styles.callLabel}>We will call you on this number :</Text>
                <View style={styles.phoneContainer}>
                    <Text style={styles.countryCode}>+91</Text>
                    <View style={styles.phoneBox}>
                        <TextInput
                            style={styles.phoneInput}
                            keyboardType="numeric"
                            placeholder="9392322767"
                            placeholderTextColor="#000"
                        />
                    </View>
                </View>

                <TouchableOpacity>
                    <Text style={styles.addAltNumber}>+Add Alternative Phone Number</Text>
                </TouchableOpacity>

                {/* Call Me Button */}
                <TouchableOpacity
                    style={styles.callButton}
                    onPress={() => navigation.navigate("ConfirmDetail")}
                >
                    <Ionicons name="call" size={hp("2.2%")} color="#fff" />
                    <Text style={styles.callButtonText}>Call me</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default OtherIssuesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: wp("5%"),
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: hp("3.8%"),
    },
    headerTitle: {
        fontSize: hp("2%"),
        color: "#000",
        marginLeft: wp("3%"),
        fontFamily: "Poppins-Medium",
        marginTop: hp(0.6),
    },
    title: {
        fontSize: hp("1.6%"),
        color: "#000",
        marginTop: hp("2.5%"),
    },
    bold: { fontFamily: "Poppins-Bold" },
    label: {
        fontSize: hp("1.5%"),
        color: "#00000099",
        marginTop: hp("3%"),
        marginBottom: hp("1%"),
        fontWeight: "500",
    },
    dropdown: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingVertical: hp("1.4%"),
        paddingHorizontal: wp("4%"),
    },
    dropdownText: { fontSize: hp("1.6%"), color: "#000" },

    imageUploadBox: {
        borderWidth: 1.5,
        borderColor: "#6C63FF",
        borderStyle: "dashed",
        borderRadius: wp("3%"),
        backgroundColor: "#F9F9F9",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: hp("2%"),
        marginBottom: hp("2%"),
        marginTop: hp(1),
    },
    addImageContainer: { alignItems: "center", justifyContent: "center" },
    addImageText: {
        fontSize: wp("3.5%"),
        color: "#6A5AE0",
        marginTop: hp("1%"),
    },
    imageNote: {
        fontSize: wp("3%"),
        color: "#999",
        marginTop: hp("1%"),
        textAlign: "center",
        marginBottom: hp(1),
    },
    addMoreBox: {
        alignSelf: "center",
        backgroundColor: "#ECEBFF",
        borderRadius: wp("2%"),
        alignItems: "center",
        justifyContent: "center",
        marginLeft: wp("2%"),
    },
    plusText: { color: "#6A5AE0", fontSize: wp("6%"), fontWeight: "bold" },
    selectedImagesContainer: { width: "100%", paddingHorizontal: wp("2%") },
    imageSectionTitle: {
        fontSize: wp("3.8%"),
        color: "#000",
        fontWeight: "500",
        marginBottom: hp("1%"),
    },
    imageRow: { flexDirection: "row", alignItems: "center" },
    imageGrid: { flexDirection: "row", alignItems: "center" },
    imageContainer: { position: "relative", marginRight: wp("2%") },
    selectedImage: {
        width: wp("20%"),
        height: wp("20%"),
        borderRadius: wp("2%"),
    },
    removeIcon: {
        position: "absolute",
        top: -wp("1%"),
        right: -wp("1%"),
        backgroundColor: "#fff",
        borderRadius: wp("3%"),
    },

    // Input with Mic
    inputWrapper: {
        position: "relative",
        marginTop: hp("2%"),
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: wp("4%"),
        paddingVertical: hp("1.4%"),
        fontSize: hp("1.6%"),
        color: "#000",
    },
    micIconContainer: {
        position: "absolute",
        right: wp("3%"),
        top: hp("1.2%"),
    },

    talkLabel: {
        fontSize: hp("1.8%"),
        color: "#000",
        marginTop: hp("3%"),
        fontWeight: "500",
    },
    languageRow: { flexDirection: "row", marginTop: hp("1.5%") },
    languageButton: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 20,
        paddingVertical: hp("0.8%"),
        paddingHorizontal: wp("6%"),
        marginRight: wp("2%"),
    },
    selectedLang: { backgroundColor: "#fff", borderColor: "#6C63FF" },
    languageText: { color: "#000", fontSize: hp("1.6%") },
    selectedLangText: { color: "#6C63FF" },

    callLabel: {
        fontSize: hp("1.6%"),
        color: "#00000099",
        marginTop: hp("3%"),
        fontWeight: "500",
    },

    phoneContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: hp("1%"),
    },
    countryCode: {
        fontSize: hp("1.8%"),
        color: "#000",
        fontWeight: "600",
        marginRight: wp("2%"),
    },
    phoneBox: {
        flex: 0,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: wp("3%"),
    },
    phoneInput: {
        fontSize: hp("1.7%"),
        color: "#00000099",
        paddingVertical: hp("1%"),
    },
    addAltNumber: {
        color: "#6C63FFCC",
        fontSize: hp("1.5%"),
        marginTop: hp("1%"),
    },
    callButton: {
        backgroundColor: "#6C63FF",
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: hp("1%"),
        marginTop: hp("4%"),
    },
    callButtonText: {
        color: "#fff",
        fontSize: hp("1.8%"),
        marginLeft: wp("2%"),
        fontFamily: "Poppins-Medium",
        marginTop: hp(0.3),
    },
});
