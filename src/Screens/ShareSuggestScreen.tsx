import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    StatusBar,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, Entypo } from "@expo/vector-icons";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


const MicImage = require("../../assets/images/mic.png");
const UploadImage = require("../../assets/images/camera.png");

const ShareSuggestScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const [images, setImages] = useState<string[]>([]);
    const [comment, setComment] = useState("");

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
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={wp("5%")} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Share your suggestions</Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Name */}
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor="#999"
                />
                {/* Mobile */}
                <TextInput
                    style={styles.input}
                    placeholder="Mobile number"
                    keyboardType="phone-pad"
                    placeholderTextColor="#999"
                />

                {/* Location Box */}
                <View style={styles.locationBox}>
                    <Text style={styles.locationLabel}>Your location</Text>
                    <View style={styles.locationRow}>
                        <Entypo name="location-pin" size={wp("4.5%")} style={{ marginTop: hp(2) }} color="red" />
                        <Text style={styles.locationText}>Hyderabad</Text>
                        <TouchableOpacity style={{ marginLeft: "auto" }}>
                            <Text style={styles.changeText}>CHANGE</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Upload Section */}
                <Text style={styles.uploadLabel}>
                    If applicable, please upload related images
                </Text>

                <View style={styles.imageMainContainer}>
                    <View style={styles.imageUploadBox}>
                        <TouchableOpacity
                            style={styles.addImageContainer}
                            onPress={pickImage}
                        >
                            <Image
                                source={UploadImage}
                                style={styles.uploadIconImage}
                            />
                            <Text style={styles.addImageText}>Add images</Text>
                            <Text style={styles.imageNote}>
                                jpeg, png or jpg formats up to 5MB
                            </Text>
                        </TouchableOpacity>

                        {/* Selected Images */}
                        {images.length > 0 && (
                            <View style={styles.selectedImagesContainer}>
                                <Text style={styles.imageSectionTitle}>
                                    Added{" "}
                                    <Text style={{ color: "#6A5AE0" }}>
                                        ({images.length})
                                    </Text>{" "}
                                    Images
                                </Text>
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
                                    <TouchableOpacity
                                        style={styles.plusBox}
                                        onPress={pickImage}
                                    >
                                        <Text style={styles.plusText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                </View>

                {/* Comments */}
                <View style={styles.commentContainer}>
                    <View style={styles.commentHeaderInsideBox}>
                        <Text style={styles.commentHeader}>Comments</Text>
                        <Feather name="edit" size={14} color="black" />
                    </View>

                    <View style={styles.commentInputRow}>
                        <TextInput
                            style={styles.commentInput}
                            multiline
                            value={comment}
                            onChangeText={setComment}
                        />
                        <TouchableOpacity style={styles.micButton}>
                            <Image source={MicImage} style={styles.micImage} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Submit */}
                <TouchableOpacity style={styles.submitBtn}>
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default ShareSuggestScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: wp("5%"),
        paddingVertical: hp("2%"),
        marginTop: hp(4),
    },
    headerTitle: {
        fontSize: wp("4%"),
        fontWeight: "600",
        marginLeft: wp(3),
        color: "#000",
    },
    scrollContent: { paddingHorizontal: wp("5%"), paddingBottom: hp("4%") },
    input: {
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: wp("2%"),
        paddingHorizontal: wp("4%"),
        paddingVertical: hp("1.5%"),
        fontSize: wp("3.5%"),
        color: "#000",
        marginTop: hp("1.5%"),
    },

    locationBox: {
        borderWidth: 1,
        borderColor: "#6C63FF80",
        borderRadius: wp("2%"),
        padding: wp("3.5%"),
        marginTop: hp("1.5%"),
        backgroundColor: '#ffff'
    },
    locationLabel: {
        fontSize: wp("3.4%"),
        color: "#999",
        marginBottom: hp("0.5%"),
    },
    locationRow: { flexDirection: "row", alignItems: "center" },
    locationText: {
        fontSize: wp("3.5%"),
        color: "#6E533F",
        marginLeft: wp("1%"),
        marginTop: hp(2.2),
        fontFamily: 'Poppins-Medium'
    },
    changeText: {
        color: "#6C63FF",
        fontSize: wp("3.3%"),
        marginTop: hp(2.6),
        fontFamily: 'Poppins-Medium'
    },

    uploadLabel: {
        fontSize: wp("3.5%"),
        color: "#000",
        marginTop: hp("3%"),
        marginBottom: hp("1.3%"),
        fontWeight: "500",
    },
    imageUploadBox: {
        borderWidth: 1.5,
        borderColor: "#7f79feff",
        borderStyle: "dashed",
        borderRadius: wp("3%"),
        paddingVertical: hp("2%"),
        alignItems: "center",
        backgroundColor: "#F9F9F9",
    },
    addImageContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    uploadIconImage: {
        width: wp("20%"),
        height: wp("20%"),
        resizeMode: "contain",
    },
    addImageText: {
        fontSize: wp("3.5%"),
        color: "#6A5AE0",
        marginTop: hp("1%"),
    },
    imageNote: {
        fontSize: wp("3%"),
        color: "#999",
        marginTop: hp("0.5%"),
        marginBottom: hp(1)
    },

    selectedImagesContainer: {
        width: "100%",
        marginTop: hp("2%"),
        paddingHorizontal: wp("4%"),
    },
    imageMainContainer: {
        backgroundColor: '#D9D9D959',
        paddingVertical: hp(2.5),
        paddingHorizontal: wp(6),
        borderRadius: 12
    },
    imageSectionTitle: {
        fontSize: wp("3.8%"),
        color: "#000",
        fontWeight: "500",
        marginBottom: hp("1%"),
    },
    imageGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: wp("2%"),
    },
    imageContainer: { position: "relative" },
    selectedImage: {
        width: wp("18%"),
        height: wp("18%"),
        borderRadius: wp("2%"),
    },
    removeIcon: {
        position: "absolute",
        top: -wp("1%"),
        right: -wp("1%"),
        backgroundColor: "#fff",
        borderRadius: wp("2%"),
    },
    plusBox: {
        width: wp("18%"),
        height: wp("18%"),
        borderRadius: wp("2%"),
        backgroundColor: "#eee",
        alignItems: "center",
        justifyContent: "center",
    },
    plusText: {
        fontSize: wp("7%"),
        color: "#6A5AE0",
    },

    commentContainer: {
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: wp("2%"),
        paddingHorizontal: wp("3%"),
        paddingVertical: hp("1%"),
        marginTop: hp("2.5%"),
    },
    commentHeaderInsideBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: wp("2%"),
        marginBottom: hp("1%"),
    },
    commentHeader: {
        fontSize: wp("3.8%"),
        fontWeight: "500",
        color: "#000",
    },
    commentInputRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    commentInput: {
        flex: 1,
        fontSize: wp("3.5%"),
        color: "#00000099",
        minHeight: hp("8%"),
    },
    micButton: {
        paddingLeft: wp("2%"),
    },
    micImage: {
        width: wp("5%"),
        height: wp("5%"),
        resizeMode: "contain",
        bottom: hp(-2)
    },

    submitBtn: {
        backgroundColor: "#6C63FF99",
        borderRadius: wp("3%"),
        marginTop: hp("3%"),
        paddingVertical: hp("1.5%"),
        alignItems: "center",
    },
    submitText: {
        color: "#fff",
        fontSize: wp("4%"),
        fontWeight: "600",
    },
});
