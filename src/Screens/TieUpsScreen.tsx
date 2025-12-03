import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image,
    StatusBar,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const MicImage = require("../../assets/images/mic.png");

const TieUpsScreen = () => {
    const navigation = useNavigation<any>();
    const [corporateType, setCorporateType] = useState("");
    const [expanded, setExpanded] = useState(false);
    const [speaks, setSpeaks] = useState("Telugu, English");
    const [comment, setComment] = useState("");

    const handleCorporateToggle = () => {
        setExpanded(!expanded);
        setCorporateType(expanded ? "" : "Social network collaborator");
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={hp("2%")} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Tie Up</Text>
            </View>

            {/* Scrollable Content */}
            <ScrollView
                style={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: hp("5%") }}
            >
                {/* YouTube Section */}
                <View style={styles.videoCard}>
                    <Text style={styles.videoText}>How do I fill in the details?</Text>

                    <TouchableOpacity activeOpacity={0.8}>
                        <Image
                            source={{
                                uri: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
                            }}
                            style={styles.videoImage}
                        />

                        <View style={styles.playOverlay}>
                            <Ionicons name="play-circle" size={hp("6%")} color="#fff" />
                        </View>

                        <Image
                            source={require("../../assets/images/you.png")}
                            style={styles.youtubeLogo}
                        />
                    </TouchableOpacity>
                </View>

                {/* Form Fields */}
                <View style={styles.formContainer}>
                    {/* Corporate Type Dropdown */}
                    <TouchableOpacity
                        style={styles.dropdownContainer}
                        onPress={handleCorporateToggle}
                        activeOpacity={0.8}
                    >
                        <View style={styles.dropdownHeader}>
                            <Text style={styles.dropdownLabel}>Corporate Tie Up</Text>
                            <Ionicons
                                name={expanded ? "chevron-up" : "chevron-down"}
                                size={hp("1.6%")}
                                color="#6C63FF"
                            />
                        </View>

                        {expanded && (
                            <Text style={styles.dropdownValue}>
                                Social network collaborator
                            </Text>
                        )}
                    </TouchableOpacity>

                    {/* Name */}
                    <TextInput
                        placeholder="Name"
                        style={styles.input}
                        placeholderTextColor="#B0B0B0"
                    />

                    {/* Contact Number */}
                    <TextInput
                        placeholder="Contact number"
                        keyboardType="numeric"
                        style={styles.input}
                        placeholderTextColor="#B0B0B0"
                    />

                    {/* Speaks */}
                    <TouchableOpacity style={styles.dropdownRow}>
                        <Text style={styles.dropdownText}>Speaks : {speaks}</Text>
                        <Ionicons name="chevron-forward" size={hp("1.8%")} color="#000" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.dropdownRow} onPress={() => navigation.navigate('AddLink')}>
                        <Text style={styles.dropdownText}>Social network profile links</Text>
                        <Ionicons name="chevron-forward" size={hp("1.8%")} color="#000" />
                    </TouchableOpacity>


                    {/* Company */}
                    <TextInput
                        placeholder="Company"
                        style={styles.input}
                        placeholderTextColor="#B0B0B0"
                    />

                    {/* Comments Section */}
                    <View style={styles.commentContainer}>
                        <View style={styles.commentHeaderRow}>
                            <Text style={styles.commentHeader}>Comments</Text>
                            <Feather name="edit" size={hp("1.5%")} style={{ marginLeft: wp('2') }} color="black" />
                        </View>

                        <View style={styles.commentInputRow}>
                            <TextInput
                                style={styles.commentInput}
                                multiline
                                value={comment}
                                onChangeText={setComment}
                                placeholderTextColor="#B0B0B0"
                            />
                            <TouchableOpacity style={styles.micButton}>
                                <Image source={MicImage} style={styles.micImage} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity style={styles.submitBtn}>
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default TieUpsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: wp("5%"),
        marginTop: hp(4),
    },
    headerTitle: {
        fontSize: hp("2%"),
        color: "#000",
        marginLeft: wp("3%"),
        marginTop: hp(0.5),
        fontFamily: "Poppins-Medium",
    },
    scrollContainer: {
        marginTop: hp("2%"),
        paddingHorizontal: wp("5%"),
    },
    videoCard: {
        borderRadius: wp("3%"),
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#eee",
        marginBottom: hp("2%"),
    },
    videoText: {
        fontSize: hp("1.5%"),
        color: "#00000099",
        textAlign: "center",
        paddingVertical: hp(1),
        fontFamily: "Poppins-Medium",
    },
    videoImage: {
        width: "100%",
        height: hp("20%"),
        borderRadius: wp("3%"),
    },
    playOverlay: {
        position: "absolute",
        top: "40%",
        left: "45%",
    },
    youtubeLogo: {
        width: wp("10%"),
        height: hp("5%"),
        position: "absolute",
        bottom: hp("0.5%"),
        right: wp("2%"),
        resizeMode: "contain",
    },
    formContainer: {
        marginTop: hp("2%"),
    },
    dropdownContainer: {
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: wp("2%"),
        padding: wp("3%"),
        marginBottom: hp("2%"),
    },
    dropdownHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    dropdownLabel: {
        fontSize: hp("1.5%"),
        color: "#000",
        fontFamily: "Poppins-Medium",
    },
    dropdownValue: {
        marginTop: hp("1%"),
        color: "#666",
        fontSize: hp("1.5%"),
    },
    input: {
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: wp("2%"),
        paddingHorizontal: wp("3%"),
        height: hp("6%"),
        fontSize: hp("1.5%"),
        color: "#000",
        marginBottom: hp("2%"),
    },
    dropdownRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: wp("2%"),
        paddingHorizontal: wp("3%"),
        height: hp("6%"),
        marginBottom: hp("2%"),
    },
    dropdownText: {
        color: "#00000099",
        fontSize: hp("1.5%"),
    },
    commentContainer: {
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: wp("2%"),
        paddingHorizontal: wp("3%"),
        paddingVertical: hp("1.5%"),
        marginBottom: hp("3%"),
    },
    commentHeaderRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: hp("1%"),
    },
    commentHeader: {
        fontSize: hp("1.7%"),
        color: "#000",
        fontFamily: "Poppins-Medium",
    },
    commentInputRow: {
        flexDirection: "row",
        alignItems: "flex-end",
    },
    commentInput: {
        flex: 1,
        fontSize: hp("1.5%"),
        color: "#00000099",
        minHeight: hp("8%"),
        paddingRight: wp("2%"),
    },
    micButton: {
        justifyContent: "flex-end",
        paddingBottom: hp("0.5%"),
    },
    micImage: {
        width: wp("5%"),
        height: wp("5%"),
        resizeMode: "contain",
    },
    submitBtn: {
        backgroundColor: "#C8B5FF",
        borderRadius: wp("4%"),
        height: hp("5.5%"),
        justifyContent: "center",
        alignItems: "center",
    },
    submitText: {
        fontSize: hp("2%"),
        color: "#fff",
        fontWeight: "600",
    },
});
