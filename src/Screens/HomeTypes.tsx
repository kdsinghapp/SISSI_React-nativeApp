import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Modal,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AddCardPreview from "../Components/MainHome/AddCardPreview";
import ListTypeModal from "../Components/HomeType/ListTypeModal";
import Distance from "../Components/HomeType/Distance";
import LanguageModal from "../Components/HomeType/LanguagesModal";
import { apiHelper } from "../api/getApi/getApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FilterButton {
    id: string;
    label: string;
}

const HomeTypeScreen: React.FC = () => {
    const [selected, setSelected] = useState<string | null>(null);
    const [showListTypeModal, setShowListTypeModal] = useState<boolean>(false);
    const [showDistanceModal, setShowDistanceModal] = useState<boolean>(false);
    const [showLanguageModal, setShowLanguageModal] = useState<boolean>(false);
    
    const buttons: FilterButton[] = [
        { id: "category", label: "Category" },
        { id: "listType", label: "List Type" },
        { id: "distance", label: "Distance" },
        { id: "recent", label: "Recent" },
        { id: "Language", label: "Language" },
    ];

    const handleButtonPress = (id: string) => {
        if (id === "listType") {
            setShowListTypeModal(true);
        } else if (id === "distance") {
            setShowDistanceModal(true);
        } else if (id === "Language") {
            setShowLanguageModal(true);
        } else {
            setSelected(id === selected ? null : id);
        }
    };


 

 

    const renderContent = () => {
        switch (selected) {
            case "category":
                return <Text style={styles.contentText}>Category Component</Text>;
            case "recent":
                return <Text style={styles.contentText}>Recent Component</Text>;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            {/* Horizontal Buttons */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                {buttons.map((btn) => (
                    <TouchableOpacity
                        key={btn.id}
                        style={[
                            styles.button,
                            selected === btn.id && styles.activeButton,
                        ]}
                        onPress={() => handleButtonPress(btn.id)}
                    >
                        <Text
                            style={[
                                styles.buttonText,
                                selected === btn.id && styles.activeButtonText,
                            ]}
                        >
                            {btn.label}
                        </Text>
                        <MaterialIcons
                            name="arrow-drop-down"
                            size={wp("5%")}
                            color={selected === btn.id ? "#fff" : "#000"}
                            style={{ marginLeft: wp("1%") }}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Post Count Text */}
            <Text style={styles.postCount}>11 Posts</Text>

            {/* AddCardPreview with horizontal margin */}
            <View style={styles.cardWrapper}>
                <AddCardPreview />
            </View>

            {/* Dynamic Content */}
            <View style={styles.contentContainer}>{renderContent()}</View>

            {/* List Type Modal */}
            <Modal
                animationType="slide"
                transparent
                visible={showListTypeModal}
                onRequestClose={() => setShowListTypeModal(false)}
            >
                <ListTypeModal onClose={() => setShowListTypeModal(false)} />
            </Modal>

            {/* Distance Modal */}
            <Modal
                animationType="slide"
                transparent
                visible={showDistanceModal}
                onRequestClose={() => setShowDistanceModal(false)}
            >
                <Distance onClose={() => setShowDistanceModal(false)} />
            </Modal>

            {/* Language Modal */}
            <Modal
                animationType="slide"
                transparent
                visible={showLanguageModal}
                onRequestClose={() => setShowLanguageModal(false)}
            >
                <LanguageModal onClose={() => setShowLanguageModal(false)} />
            </Modal>
        </View>
    );
};

export default HomeTypeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingVertical: hp("2%"),
    },
    scrollContainer: {
        paddingHorizontal: wp("3%"),
        alignItems: "center",
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: wp("3%"),
        paddingVertical: hp("0.8%"),
        paddingHorizontal: wp("3%"),
        marginRight: wp("3%"),
        backgroundColor: "#fff",
    },
    activeButton: {
        backgroundColor: "#000",
        borderColor: "#000",
    },
    buttonText: {
        fontSize: wp("2.8%"),
        color: "#000",
        fontFamily: "Poppins-Medium",
        marginTop: hp(0.2),
    },
    activeButtonText: {
        color: "#fff",
    },
    postCount: {
        textAlign: "center",
        fontSize: wp("3.5%"),
        color: "#00000099",
        marginTop: hp("2%"),
        fontFamily: "Poppins-Medium",
    },
    cardWrapper: {
        marginHorizontal: wp("4%"),
        marginTop: hp("2%"),
    },
    contentContainer: {
        marginTop: hp("3%"),
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: wp("4%"),
    },
    contentText: {
        fontSize: wp("4%"),
        color: "#333",
        fontWeight: "600",
        textAlign: "center",
    },
});


// import React, { useState } from "react";
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     ScrollView,
//     StyleSheet,
//     Modal,
// } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";
// import {
//     widthPercentageToDP as wp,
//     heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import AddCardPreview from "../Components/MainHome/AddCardPreview";
// import ListTypeModal from "../Components/HomeType/ListTypeModal";
// import Distance from "../Components/HomeType/Distance";
// import LanguageModal from "../Components/HomeType/LanguagesModal";

// interface FilterButton {
//     id: string;
//     label: string;
// }

// const HomeTypeScreen: React.FC = () => {
//     const [selected, setSelected] = useState<string | null>(null);
//     const [showListTypeModal, setShowListTypeModal] = useState<boolean>(false);
//     const [showDistanceModal, setShowDistanceModal] = useState<boolean>(false);
//     const [showLanguageModal, setShowLanguageModal] = useState<boolean>(false);

//     const buttons: FilterButton[] = [
//         { id: "category", label: "Category" },
//         { id: "listType", label: "List Type" },
//         { id: "distance", label: "Distance" },
//         { id: "recent", label: "Recent" },
//         { id: "Language", label: "Language" },
//     ];

//     const handleButtonPress = (id: string) => {
//         if (id === "listType") {
//             setShowListTypeModal(true);
//         } else if (id === "distance") {
//             setShowDistanceModal(true);
//         } else if (id === "Language") {
//             setShowLanguageModal(true);
//         } else {
//             setSelected(id === selected ? null : id);
//         }
//     };

//     const renderContent = () => {
//         switch (selected) {
//             case "category":
//                 return <Text style={styles.contentText}>Category Component</Text>;
//             case "recent":
//                 return <Text style={styles.contentText}>Recent Component</Text>;
//             default:
//                 return null;
//         }
//     };

//     return (
//         <View style={styles.container}>
//             {/* Horizontal Buttons */}
//             <ScrollView
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//                 contentContainerStyle={styles.scrollContainer}
//             >
//                 {buttons.map((btn) => (
//                     <TouchableOpacity
//                         key={btn.id}
//                         style={[
//                             styles.button,
//                             selected === btn.id && styles.activeButton,
//                         ]}
//                         onPress={() => handleButtonPress(btn.id)}
//                     >
//                         <Text
//                             style={[
//                                 styles.buttonText,
//                                 selected === btn.id && styles.activeButtonText,
//                             ]}
//                         >
//                             {btn.label}
//                         </Text>
//                         <MaterialIcons
//                             name="arrow-drop-down"
//                             size={wp("5%")}
//                             color={selected === btn.id ? "#fff" : "#000"}
//                             style={{ marginLeft: wp("1%") }}
//                         />
//                     </TouchableOpacity>
//                 ))}
//             </ScrollView>

//             {/* Post Count Text */}
//             <Text style={styles.postCount}>11 Posts</Text>

//             {/* AddCardPreview with horizontal margin */}
//             <View style={styles.cardWrapper}>
//                 <AddCardPreview />
//             </View>

//             {/* Dynamic Content */}
//             <View style={styles.contentContainer}>{renderContent()}</View>

//             {/* List Type Modal */}
//             <Modal
//                 animationType="slide"
//                 transparent
//                 visible={showListTypeModal}
//                 onRequestClose={() => setShowListTypeModal(false)}
//             >
//                 <ListTypeModal onClose={() => setShowListTypeModal(false)} />
//             </Modal>

//             {/* Distance Modal */}
//             <Modal
//                 animationType="slide"
//                 transparent
//                 visible={showDistanceModal}
//                 onRequestClose={() => setShowDistanceModal(false)}
//             >
//                 <Distance onClose={() => setShowDistanceModal(false)} />
//             </Modal>

//             {/* Language Modal */}
//             <Modal
//                 animationType="slide"
//                 transparent
//                 visible={showLanguageModal}
//                 onRequestClose={() => setShowLanguageModal(false)}
//             >
//                 <LanguageModal onClose={() => setShowLanguageModal(false)} />
//             </Modal>
//         </View>
//     );
// };

// export default HomeTypeScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff",
//         paddingVertical: hp("2%"),
//     },
//     scrollContainer: {
//         paddingHorizontal: wp("3%"),
//         alignItems: "center",
//     },
//     button: {
//         flexDirection: "row",
//         alignItems: "center",
//         borderWidth: 1,
//         borderColor: "#ccc",
//         borderRadius: wp("3%"),
//         paddingVertical: hp("0.8%"),
//         paddingHorizontal: wp("3%"),
//         marginRight: wp("3%"),
//         backgroundColor: "#fff",
//     },
//     activeButton: {
//         backgroundColor: "#000",
//         borderColor: "#000",
//     },
//     buttonText: {
//         fontSize: wp("2.8%"),
//         color: "#000",
//         fontFamily: "Poppins-Medium",
//         marginTop: hp(0.2),
//     },
//     activeButtonText: {
//         color: "#fff",
//     },
//     postCount: {
//         textAlign: "center",
//         fontSize: wp("3.5%"),
//         color: "#00000099",
//         marginTop: hp("2%"),
//         fontFamily: "Poppins-Medium",
//     },
//     cardWrapper: {
//         marginHorizontal: wp("4%"),
//         marginTop: hp("2%"),
//     },
//     contentContainer: {
//         marginTop: hp("3%"),
//         alignItems: "center",
//         justifyContent: "center",
//         paddingHorizontal: wp("4%"),
//     },
//     contentText: {
//         fontSize: wp("4%"),
//         color: "#333",
//         fontWeight: "600",
//         textAlign: "center",
//     },
// });
