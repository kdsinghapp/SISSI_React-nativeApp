import React, { useState } from "react";
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
    Pressable,
    Text,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState("");
    const [focused, setFocused] = useState(false);

    return (
        <View>
            <Modal visible={focused} transparent animationType="fade">
                <Pressable style={styles.overlay} onPress={() => setFocused(false)} />
                <View style={styles.fixedTop}>
                    <View style={styles.headerRow}>
                        <TouchableOpacity onPress={() => setFocused(false)}>
                            <Ionicons name="arrow-back" size={15} color="#000" />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>
                            Search for stores, pets, PG, & more
                        </Text>
                    </View>

                    <View style={styles.container}>
                        <View style={styles.searchBox}>
                            <Feather
                                name="search"
                                size={20}
                                color="#aaa"
                                style={styles.iconLeft}
                            />

                            <TextInput
                                value={query}
                                onChangeText={setQuery}
                                placeholder="Search nearby “Properties”"
                                placeholderTextColor="#aaa"
                                style={styles.input}
                                autoFocus={true}
                                onFocus={() => setFocused(true)}
                            />

                            <View style={styles.rightWrapper}>
                                <View style={styles.divider} />
                                <TouchableOpacity>
                                    <Image
                                        source={require("../../../assets/images/mic.png")}
                                        style={styles.rightImage}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.qrWrapper}>
                            <Image
                                source={require("../../../assets/images/qrcode.png")}
                                style={styles.qrImage}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.sectionWrapper}>
                        <Text style={styles.recentTitle}>RECENTLY SEARCHED</Text>

                        <TouchableOpacity style={styles.recentItem}>
                            <Ionicons name="refresh" size={14} color="#444" />
                            <Text style={styles.recentText}>Dron</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style={styles.container}>
                <View style={styles.searchBox}>
                    <Feather
                        name="search"
                        size={20}
                        color="#aaa"
                        style={styles.iconLeft}
                    />

                    <TextInput
                        value={query}
                        onChangeText={setQuery}
                        placeholder="Search nearby “Properties”"
                        placeholderTextColor="#aaa"
                        style={styles.input}
                        onFocus={() => setFocused(true)}
                    />

                    <View style={styles.rightWrapper}>
                        <View style={styles.divider} />
                        <TouchableOpacity>
                            <Image
                                source={require("../../../assets/images/mic.png")}
                                style={styles.rightImage}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.qrWrapper}>
                    <Image
                        source={require("../../../assets/images/qrcode.png")}
                        style={styles.qrImage}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: wp(2),
        marginVertical: hp(1.5),
    },
    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: wp(3),
        paddingHorizontal: wp(3),
        height: hp(5.5),
        width: wp(83),
        borderWidth: 1,
        borderColor: "#ddd",
    },
    iconLeft: {
        marginRight: wp(2),
    },
    input: {
        flex: 1,
        color: "#000",
        fontSize: hp(1.5),
    },
    rightWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
    divider: {
        width: 1,
        height: "60%",
        backgroundColor: "#ddd",
        marginRight: wp(2),
    },
    rightImage: {
        width: wp(5.5),
        height: wp(5.5),
        resizeMode: "contain",
    },
    qrWrapper: {
        marginLeft: wp(4),
    },
    qrImage: {
        width: wp(7),
        height: wp(7),
        resizeMode: "contain",
    },

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
    },

    fixedTop: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        paddingTop: hp(2),
        borderBottomLeftRadius: wp(4),
        borderBottomRightRadius: wp(4),
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },

    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: wp(4),
        marginBottom: hp(1),
    },
    headerText: {
        fontSize: hp(1.5),
        color: "#6E533F",
        marginLeft: wp(2),
        fontWeight: "600",
    },

    sectionWrapper: {
        backgroundColor: "#fff",
        paddingHorizontal: wp(4),
        paddingBottom: hp(2),
        borderBottomLeftRadius: wp(4),
        borderBottomRightRadius: wp(4),
    },
    recentTitle: {
        fontSize: hp(1.2),
        color: "#888",
        marginBottom: hp(1),
    },

    recentItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: hp(0.8),
        paddingHorizontal: wp(2),
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: wp(4),
        alignSelf: "flex-start",
        backgroundColor: "#fff",
    },
    recentText: {
        marginLeft: wp(2),
        fontSize: hp(1.3),
        color: "#333",
    },
});
