// govind sir ui 


// screens/AddReviewScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  StatusBar,
} from "react-native";
import { Ionicons, Entypo, Feather } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
// import { Base_URL } from "../services/mutations";
// import { EndPoints } from "../services/EndPoints";
// import { mutationHandler } from "../services/mutations/mutationHandler";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import {  } from "../../srcGovindSir/services/mutations";
import { EndPointUser } from "../api/serciveUser/EndPiontUser";
// import  from "../Components/Loader";
import { BaseUrl, IMAGE_BASE_URL } from "../api/authApi/BaseUrl";
import LoadingModal from "../Components/Loader";

const { width } = Dimensions.get("window");
// Replace with your custom images (local or remote)


const AddReviewScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const [token, setToken] = useState("");
  const [ready, setReady] = useState(false);
  const route = useRoute();
  const data = route?.params?.data;
  const from = route?.params?.from;
  console.log(data, "this__is preview data----", from);
  const onViewableItemsChanged = React.useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const formatKey = (key) => {
    // Convert camelCase or lowercase keys into readable text
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str);
  };

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    setToken(userToken || "");
    setReady(true);
  };

  // const onSuccess = async (res: any) => {
  //   console.log("><><><><><><><><>Success", res);
  //   if (res?.success) {
  //   //   navigation.navigate("AddDetailSecond", { data: res?.data });
  //   navigation.navigate("Botomtabs")
  //   }
  //   setLoading(false);
  //   setTimeout(() => {}, 1000);
  //   reset();
    
  // };

  // const onError = (err: any) => {
  //   console.log("<><><><><", err);
  //   setLoading(false);

  //   reset();
  // };

  // const { mutate, isPending, reset } = mutationHandler(
  //   EndPoints.createProduct,
  //   token, // todo
  //   onSuccess,
  //   onError
  // );
const Next=()=>{
    setLoading(true)
    // mutate(data)
}
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {loading && <LoadingModal />}
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={{ marginRight: wp("2%") }} onPress={()=>navigation.goBack()}>
          <Ionicons name="arrow-back" size={wp("5%")} color="#333" />
        </TouchableOpacity>

        {/* Title + SimpleText + Promote */}
        <View style={styles.titleWrapper}>
          <View>
            <Text style={styles.topBarTitle}>Ad Preview</Text>
            <Text style={styles.simpleText}>AD ID : 2134354</Text>
          </View>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Verification Pending</Text>
          </TouchableOpacity>
        </View>

        {/* Right side trash icon */}
        <TouchableOpacity>
          <Ionicons name="trash-outline" size={wp("5%")} color="#FF0303" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Subtitle Section (2 lines) */}
        <View style={styles.subtitleSection}>
          {/* Top line: Nanda + icon */}
          <View style={styles.subtitleTop}>
            <Text style={styles.subtitleText}>Nanda</Text>
            <Image
              source={require("../../assets/images/save.png")}
              style={styles.saveimage}
            />
          </View>

          {/* Bottom line: icon + text + icon + text */}
          <View style={styles.subtitleBottom}>
            <Entypo name="location-pin" size={wp("4%")} color="red" />
            <Text style={styles.locationText}>
              1.2 km away . Kphb Bagyanagar Colony
            </Text>

            <Image
              source={require("../../assets/images/save2.png")}
              style={styles.saveimage}
            />
          </View>
        </View>

        {/* Image Slider */}
        <View style={styles.sliderWrapper}>
          <FlatList
            data={data?.images}
            horizontal
            pagingEnabled
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <Image
                source={
                  typeof item === "string" ? { uri: IMAGE_BASE_URL + item } : item
                }
                style={styles.image}
              />
            )}
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
          />

          {/* Slider dots */}
          <View style={styles.dotsContainer}>
            {data?.images?.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, currentIndex === index && styles.activeDot]}
              />
            ))}
          </View>

          {/* Top-right icons */}
          <View style={styles.topRightIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons
                name="trash-outline"
                size={wp("4.5%")}
                color="#FF0303"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="camera" size={wp("4.5%")} color="#6C63FF" />
            </TouchableOpacity>
          </View>

          {/* Bottom-right icons with text */}
          <View style={styles.bottomRight}>
            <TouchableOpacity style={styles.rowIcon}>
              <EvilIcons name="heart" size={24} color="white" />
              <Text style={styles.iconText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rowIcon}>
              <Feather
                name="share"
                size={16}
                style={{ marginLeft: wp(3) }}
                color="white"
              />
              <Text style={styles.iconText}>1</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom-left views */}
          <View style={styles.bottomLeft}>
            <Ionicons name="eye-outline" size={wp("4%")} color="#fff" />
            <Text style={styles.iconText}>3</Text>
          </View>
        </View>

        {/* Details Section */}
        <View style={styles.detailsCard}>
          {/* Row 1 */}
          <View style={styles.detailRowCustom}>
            <View style={styles.leftBox}>
              <Image
                source={{uri:IMAGE_BASE_URL + data?.subsubcategory?.image}}
                style={{ width: wp(5), height: hp(5), objectFit: "contain" }}
              />
              <Text style={styles.detailTextCar}>{data?.subsubcategory?.name}</Text>
            </View>
            <Text style={styles.rightTextCar}>29 JUL 2024</Text>
          </View>

          {/* Row 2 */}
          <View style={styles.detailRowCustom}>
            <View style={styles.leftBox}>
              <Text style={styles.detailText}>{data?.name}</Text>
            </View>
            <Text style={styles.rightText}>₹ {data?.price}</Text>
          </View>
        </View>

        {/* Extra Details Section (UPDATED) */}
        <View style={styles.detailsCard}>
          <View style={styles.sectionTitleRow}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.sectionTitle}>Details</Text>
              <TouchableOpacity onPress={()=>navigation.pop(3)} style={{display:from == 'home'? 'none':'flex'}}>
              <Image
                source={require("../../assets/images/save2.png")}
                style={{
                  width: wp(3),
                  height: hp(3),
                  resizeMode: "contain",
                  marginLeft: wp(2),
                }}
              />
              </TouchableOpacity>
            </View>
          </View>

          {/* Two rows with 3 items each (icon left + text right) */}
          {/* <View style={styles.threeColumnRow}>
            <View style={styles.iconWithTextRow}>
              <Ionicons
                name="car-outline"
                size={wp(4)}
                style={{ marginRight: wp(1) }}
                color="#00000080"
              />
              <Text style={styles.valueText}>Diesel</Text>
            </View>
            <View style={styles.iconWithTextRow}>
              <Ionicons
                name="speedometer-outline"
                size={wp(4)}
                style={{ marginRight: wp(1) }}
                color="#00000080"
              />
              <Text style={styles.valueText}>12000.0 km</Text>
            </View>
            <View style={styles.iconWithTextRow}>
              <Ionicons
                name="color-palette-outline"
                size={wp(4)}
                style={{ marginRight: wp(1) }}
                color="#00000080"
              />
              <Text style={styles.valueText}>Automatic</Text>
            </View>
          </View> */}

          {/* <View style={styles.threeColumnRow}>
            <View style={styles.iconWithTextRow}>
              <Ionicons
                name="person"
                size={wp(4)}
                style={{ marginRight: wp(1) }}
                color="#00000080"
              />
              <Text style={styles.valueText}>2nd Owner</Text>
            </View>
            <View style={styles.iconWithTextRow}>
              <Ionicons
                name="calendar-outline"
                size={wp(4)}
                style={{ marginRight: wp(1) }}
                color="#00000080"
              />
              <Text style={styles.valueText}>2nd Owner</Text>
            </View>
            <View style={styles.iconWithTextRow}>
              <MaterialIcons
                name="star"
                size={wp(4)}
                style={{ marginRight: wp(1) }}
                color="#CDFF03"
              />
              <Text style={styles.valueText}>5 Star</Text>
            </View>
          </View> */}

          {/* Brand / Model / Variant with title top, subtitle bottom (2 per row) */}

          {Object.entries(data?.attributes).map(([key, value], index) => {
            // Render two items per row
            if (index % 2 === 0) {
              const next = Object.entries(data?.attributes)[index + 1];
              return (
                <View key={key} style={styles.brandRows}>
                  <View style={styles.brandBox}>
                    <Text style={styles.keyText}>{formatKey(key)}</Text>
                    <Text style={styles.valueText}>{String(value)}</Text>
                  </View>
                  {next && (
                    <View style={styles.brandBox}>
                      <Text style={styles.keyText}>{formatKey(next[0])}</Text>
                      <Text style={styles.valueText}>{String(next[1])}</Text>
                    </View>
                  )}
                </View>
              );
            }
            return null;
          })}
          <View style={styles.sectionTitleRow}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.sectionTitle}>Description</Text>
              <TouchableOpacity onPress={()=>navigation.pop(1)} style={{display:from == 'home'? 'none':'flex'}}>
              <Image
                source={require("../../assets/images/save2.png")}
                style={{
                  width: wp(3),
                  height: hp(3),
                  resizeMode: "contain",
                  marginLeft: wp(2),
                }}
              />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.textRow}>
            <Text style={styles.valueTextBottom}>{data?.description}</Text>
          </View>

          {/* Bottom full width image */}
        </View>
        {data?.images?.map((item) => (
          <Image
            source={{ uri: IMAGE_BASE_URL + item }}
            style={styles.fullWidthImage}
          />
        ))}

        {/* <Image
          source={require("../../assets/images/slidecar.png")}
          style={styles.fullWidthImage}
        /> */}

        <View style={[styles.bottomSection, {display:from == 'home'? 'none':'flex'}]}>
          {/* Top Info Row */}
          <View style={styles.bottomLeftButton}>
            <Image
              source={require("../../assets/images/bottombutton.png")}
              style={styles.bottomImage}
            />
            <Text style={styles.bottomText}>
              I am authorised to make ad edits & responsible for the information
              shared including ad details & prices
            </Text>
          </View>

          {/* Buttons Row */}
          <View style={[styles.bottomButtonsRow, {display:from == 'home'? 'none':'flex'}]}>
            {/* Edit Button */}
            <TouchableOpacity style={styles.editButton} 
            onPress={()=>navigation.pop(3)}
            // onPress={()=>navigation.navigate('AddDetailFirst',{ subsubcategory:data?.subsubcategory})}
            
            >
              <Image
                source={require("../../assets/images/save2.png")}
                style={styles.editImage}
              />
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>

            {/* Next Button */}
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => Next()}
            >
              <Text style={styles.bottomButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddReviewScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("1.5%"),
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    marginTop: hp(4),
  },
  titleWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: wp(1),
  },
  topBarTitle: {
    fontSize: wp("3.5%"),
    color: "#000",
    fontWeight: "600",
    marginRight: wp("2%"),
  },
  simpleText: {
    fontSize: wp("2.2%"),
    color: "#6E533F",
    marginRight: wp("3%"),
  },
  actionButton: {
    borderWidth: 1,
    borderColor: "#6C63FF",
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("0.4%"),
    borderRadius: wp("5%"),
    marginLeft: wp("2%"),
  },
  actionButtonText: {
    fontSize: wp("2.8%"),
    color: "#6C63FF",
    fontWeight: "600",
  },

  subtitleSection: {
    paddingHorizontal: wp("4%"),
    marginTop: hp("1.8%"),
    marginVertical: hp(0.8),
  },
  subtitleTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("0.5%"),
  },
  subtitleBottom: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitleText: {
    fontWeight: "600",
    fontSize: wp("3.8%"),
    color: "#000",
  },
  locationText: {
    fontSize: wp("3%"),
    color: "gray",
    marginLeft: wp("1%"),
  },

  sliderWrapper: {
    width: "100%",
    height: hp("25%"),
    marginTop: hp("1.5%"),
  },
  image: {
    width,
    height: hp("28%"),
    resizeMode: "cover",
  },
  dotsContainer: {
    position: "absolute",
    bottom: hp("1.5%"),
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: wp("1.3%"),
    height: wp("1.3%"),
    borderRadius: wp("1%"),
    backgroundColor: "white",
    marginHorizontal: wp("1%"),
  },
  activeDot: {
    backgroundColor: "#6C63FF",
    width: wp("1.3%"),
    height: wp("1.3%"),
  },
  topRightIcons: {
    position: "absolute",
    top: hp("1.5%"),
    right: wp("2%"),
    flexDirection: "row",
  },
  iconButton: {
    backgroundColor: "white",
    padding: wp("1.5%"),
    borderRadius: wp("6%"),
    marginLeft: wp("2%"),
  },
  bottomRight: {
    position: "absolute",
    bottom: hp("1%"),
    right: wp("2%"),
    flexDirection: "row",
  },
  rowIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: wp("3%"),
  },
  bottomLeft: {
    position: "absolute",
    bottom: hp("1%"),
    left: wp("2%"),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(45, 45, 45, 0.5)",
    paddingHorizontal: wp("2.5%"),
    paddingVertical: hp("0.5%"),
    borderRadius: wp("3%"),
  },
  iconText: {
    color: "#fff",
    fontSize: wp("3%"),
    marginLeft: wp("1%"),
  },

  detailsCard: {
    marginTop: hp("2%"),
    marginHorizontal: wp("4%"),
    backgroundColor: "#fff",
    marginBottom: hp(1),
  },
  detailRowCustom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    fontSize: wp("3.9%"),
    marginLeft: wp("1.5%"),
    color: "#333",
  },
  rightText: {
    fontSize: wp("3.5%"),
    fontWeight: "600",
    color: "#000",
  },
  detailTextCar: {
    fontSize: wp("2.8%"),
    marginLeft: wp("1.5%"),
    color: "#00000080",
  },
  rightTextCar: {
    fontSize: wp("2.8%"),
    fontWeight: "600",
    color: "#000",
  },
  saveimage: {
    width: wp("6%"),
    height: hp("1.6%"),
    resizeMode: "contain",
    marginTop: wp(1),
  },

  sectionTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp("1%"),
  },
  sectionTitle: {
    fontSize: wp("4%"),
    fontWeight: "600",
    color: "#000",
  },

  threeColumnRow: {
    flexDirection: "row",
    marginLeft: wp(2),
    paddingVertical: hp(0.5),
    width: "100%",
  },
  threeColumnRowBottom: {
    flexDirection: "row",
    marginBottom: hp(1.5),
    marginLeft: wp(2),
  },
  iconWithTextRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "30%",
  },

  brandRows: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp(1.5),
    paddingHorizontal: wp(3),
    marginTop: hp(1.8),
  },
  brandBox: {
    width: "60%",
  },

  twoColumnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp("1%"),
  },
  keyText: {
    fontSize: wp("3.4%"),
    color: "#00000099",
    marginBottom: hp(0.3),
  },
  valueText: {
    fontSize: wp("3.5%"),
    fontWeight: "600",
    color: "#000",
  },
  valueTextBottom: {
    marginBottom: hp(1),
    fontSize: wp(3),
  },
  fullWidthImage: {
    width: "100%",
    height: hp("20%"),
    resizeMode: "cover",
    marginTop: hp(1),
  },
  fullWidthImageBottom: {
    marginBottom: hp(10),
  },
  textRow: {
    marginTop: hp(0.1),
  },

  bottomSection: {
    position: "relative",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#D9D9D959",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    padding: wp(4),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: hp(2),
  },
  bottomLeftButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(1.5),
  },
  bottomImage: {
    width: wp("8%"),
    height: wp("8%"),
    resizeMode: "contain",
    marginRight: wp(2),
  },
  bottomText: {
    fontSize: wp("2.8%"),
    fontFamily: "Poppins-Medium",
    color: "#6E533F",
    lineHeight: hp(1.9),
  },
  bottomButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#6C63FF",
    borderRadius: 12,
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    marginRight: wp(2),
  },
  editImage: {
    width: wp("4.5%"),
    height: wp("4.5%"),
    resizeMode: "contain",
    marginRight: wp(1.5),
  },
  editButtonText: {
    fontSize: wp("3.5%"),
    fontFamily: "Poppins-Medium",
    color: "#6C63FF",
  },
  bottomButton: {
    flex: 1,
    backgroundColor: "#6C63FF",
    paddingVertical: hp(1.2),
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: wp(1),
  },
  bottomButtonText: {
    color: "#fff",
    fontSize: wp("3.8%"),
    fontFamily: "Poppins-Medium",
  },
});




// // screens/AddReviewScreen.tsx
// import React, { useState } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     Image,
//     SafeAreaView,
//     TouchableOpacity,
//     FlatList,
//     Dimensions,
//     ScrollView,
//     StatusBar,
// } from "react-native";
// import { Ionicons, Entypo, Feather } from "@expo/vector-icons";
// import {
//     widthPercentageToDP as wp,
//     heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import { EvilIcons } from '@expo/vector-icons';
// import { MaterialIcons } from '@expo/vector-icons';
// import { useNavigation } from "@react-navigation/native";

// const { width } = Dimensions.get("window");

// // Replace with your custom images (local or remote)
// const images = [
//     require("../../assets/images/slidecar.png"),
//     require("../../assets/images/slidecar.png"),
//     require("../../assets/images/slidcar.jpg"),
// ];

// const AddReviewScreen: React.FC = () => {
//     const navigation = useNavigation<any>();
//     const [currentIndex, setCurrentIndex] = useState(0);

//     const onViewableItemsChanged = React.useRef(({ viewableItems }: any) => {
//         if (viewableItems.length > 0) {
//             setCurrentIndex(viewableItems[0].index);
//         }
//     }).current;

//     return (
//         <SafeAreaView style={styles.container}>
//             <StatusBar barStyle="dark-content" backgroundColor="#fff" />

//             {/* Top Bar */}
//             <View style={styles.topBar}>
//                 <TouchableOpacity style={{ marginRight: wp("2%") }}>
//                     <Ionicons name="arrow-back" size={wp("5%")} color="#333" />
//                 </TouchableOpacity>

//                 {/* Title + SimpleText + Promote */}
//                 <View style={styles.titleWrapper}>
//                     <View>
//                         <Text style={styles.topBarTitle}>Ad Preview</Text>
//                         <Text style={styles.simpleText}>AD ID : 2134354</Text>
//                     </View>

//                     <TouchableOpacity style={styles.actionButton}>
//                         <Text style={styles.actionButtonText}>Verification Pending</Text>
//                     </TouchableOpacity>
//                 </View>

//                 {/* Right side trash icon */}
//                 <TouchableOpacity>
//                     <Ionicons name="trash-outline" size={wp("5%")} color="#FF0303" />
//                 </TouchableOpacity>
//             </View>

//             <ScrollView showsVerticalScrollIndicator={false}>
//                 {/* Subtitle Section (2 lines) */}
//                 <View style={styles.subtitleSection}>
//                     {/* Top line: Nanda + icon */}
//                     <View style={styles.subtitleTop}>
//                         <Text style={styles.subtitleText}>Nanda</Text>
//                         <Image
//                             source={require('../../assets/images/save.png')}
//                             style={styles.saveimage}
//                         />
//                     </View>

//                     {/* Bottom line: icon + text + icon + text */}
//                     <View style={styles.subtitleBottom}>
//                         <Entypo name="location-pin" size={wp("4%")} color="red" />
//                         <Text style={styles.locationText}>1.2 km away . Kphb Bagyanagar Colony</Text>

//                         <Image
//                             source={require('../../assets/images/save2.png')}
//                             style={styles.saveimage}
//                         />
//                     </View>
//                 </View>

//                 {/* Image Slider */}
//                 <View style={styles.sliderWrapper}>
//                     <FlatList
//                         data={images}
//                         horizontal
//                         pagingEnabled
//                         keyExtractor={(_, index) => index.toString()}
//                         renderItem={({ item }) => (
//                             <Image
//                                 source={typeof item === "string" ? { uri: item } : item}
//                                 style={styles.image}
//                             />
//                         )}
//                         showsHorizontalScrollIndicator={false}
//                         onViewableItemsChanged={onViewableItemsChanged}
//                     />

//                     {/* Slider dots */}
//                     <View style={styles.dotsContainer}>
//                         {images.map((_, index) => (
//                             <View
//                                 key={index}
//                                 style={[
//                                     styles.dot,
//                                     currentIndex === index && styles.activeDot,
//                                 ]}
//                             />
//                         ))}
//                     </View>

//                     {/* Top-right icons */}
//                     <View style={styles.topRightIcons}>
//                         <TouchableOpacity style={styles.iconButton}>
//                             <Ionicons name="trash-outline" size={wp("4.5%")} color="#FF0303" />
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.iconButton}>
//                             <Feather name="camera" size={wp('4.5%')} color="#6C63FF" />
//                         </TouchableOpacity>
//                     </View>

//                     {/* Bottom-right icons with text */}
//                     <View style={styles.bottomRight}>
//                         <TouchableOpacity style={styles.rowIcon}>
//                             <EvilIcons name="heart" size={24} color="white" />
//                             <Text style={styles.iconText}>1</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.rowIcon}>
//                             <Feather name="share" size={16} style={{ marginLeft: wp(3) }} color="white" />
//                             <Text style={styles.iconText}>1</Text>
//                         </TouchableOpacity>
//                     </View>

//                     {/* Bottom-left views */}
//                     <View style={styles.bottomLeft}>
//                         <Ionicons name="eye-outline" size={wp("4%")} color="#fff" />
//                         <Text style={styles.iconText}>3</Text>
//                     </View>
//                 </View>

//                 {/* Details Section */}
//                 <View style={styles.detailsCard}>
//                     {/* Row 1 */}
//                     <View style={styles.detailRowCustom}>
//                         <View style={styles.leftBox}>
//                             <Image
//                                 source={require('../../assets/images/car.png')}
//                                 style={{ width: wp(5), height: hp(5), objectFit: 'contain' }}
//                             />
//                             <Text style={styles.detailTextCar}>Car</Text>
//                         </View>
//                         <Text style={styles.rightTextCar}>29 JUL 2024</Text>
//                     </View>

//                     {/* Row 2 */}
//                     <View style={styles.detailRowCustom}>
//                         <View style={styles.leftBox}>
//                             <Text style={styles.detailText}>Bugatti</Text>
//                         </View>
//                         <Text style={styles.rightText}>₹2,30,00,000</Text>
//                     </View>
//                 </View>

//                 {/* Extra Details Section (UPDATED) */}
//                 <View style={styles.detailsCard}>
//                     {/* Section Title with image */}
//                     <View style={styles.sectionTitleRow}>
//                         <View style={{ flexDirection: "row", alignItems: "center" }}>
//                             <Text style={styles.sectionTitle}>Details</Text>
//                             <Image
//                                 source={require("../../assets/images/save2.png")}
//                                 style={{ width: wp(3), height: hp(3), resizeMode: "contain", marginLeft: wp(2) }}
//                             />
//                         </View>
//                     </View>

//                     {/* Two rows with 3 items each (icon left + text right) */}
//                     <View style={styles.threeColumnRow}>
//                         <View style={styles.iconWithTextRow}>
//                             <Ionicons name="car-outline" size={wp(4)} style={{ marginRight: wp(1) }} color="#00000080" />
//                             <Text style={styles.valueText}>Diesel</Text>
//                         </View>
//                         <View style={styles.iconWithTextRow}>
//                             <Ionicons name="speedometer-outline" size={wp(4)} style={{ marginRight: wp(1) }} color="#00000080" />
//                             <Text style={styles.valueText}>12000.0 km</Text>
//                         </View>
//                         <View style={styles.iconWithTextRow}>
//                             <Ionicons name="color-palette-outline" size={wp(4)} style={{ marginRight: wp(1) }} color="#00000080" />
//                             <Text style={styles.valueText}>Automatic</Text>
//                         </View>
//                     </View>

//                     <View style={styles.threeColumnRow}>
//                         <View style={styles.iconWithTextRow}>
//                             <Ionicons name="person" size={wp(4)} style={{ marginRight: wp(1) }} color="#00000080" />
//                             <Text style={styles.valueText}>2nd Owner</Text>
//                         </View>
//                         <View style={styles.iconWithTextRow}>
//                             <Ionicons name="calendar-outline" size={wp(4)} style={{ marginRight: wp(1) }} color="#00000080" />
//                             <Text style={styles.valueText}>2nd Owner</Text>
//                         </View>
//                         <View style={styles.iconWithTextRow}>
//                             <MaterialIcons name="star" size={wp(4)} style={{ marginRight: wp(1) }} color="#CDFF03" />
//                             <Text style={styles.valueText}>5 Star</Text>
//                         </View>
//                     </View>

//                     {/* Brand / Model / Variant with title top, subtitle bottom (2 per row) */}
//                     <View style={styles.brandRows}>
//                         <View style={styles.brandBox}>
//                             <Text style={styles.keyText}>Brand</Text>
//                             <Text style={styles.valueText}>Bugatti</Text>
//                         </View>
//                         <View style={styles.brandBox}>
//                             <Text style={styles.keyText}>Model</Text>
//                             <Text style={styles.valueText}>Bugatti chiron</Text>
//                         </View>
//                     </View>
//                     <View style={styles.brandRows}>
//                         <View style={styles.brandBox}>
//                             <Text style={styles.keyText}>Listing Type</Text>
//                             <Text style={styles.valueText}>Sell</Text>
//                         </View>
//                         <View style={styles.brandBox}>
//                             <Text style={styles.keyText}>Variant </Text>
//                             <Text style={styles.valueText}>Variant </Text>
//                         </View>
//                     </View>
//                     <View style={styles.brandRows}>
//                         <View style={styles.brandBox}>
//                             <Text style={styles.keyText}>Seats</Text>
//                             <Text style={styles.valueText}>4</Text>
//                         </View>
//                         <View style={styles.brandBox}>
//                             <Text style={styles.keyText}>Doors</Text>
//                             <Text style={styles.valueText}>2</Text>
//                         </View>
//                     </View>
//                     <View style={styles.brandRows}>
//                         <View style={styles.brandBox}>
//                             <Text style={styles.keyText}>Listing Type</Text>
//                             <Text style={styles.valueText}>Sell</Text>
//                         </View>
//                         <View style={styles.brandBox}>
//                             <Text style={styles.keyText}>Variant </Text>
//                             <Text style={styles.valueText}>Variant </Text>
//                         </View>
//                     </View>
//                     <View style={styles.brandRows}>
//                         <View style={styles.brandBox}>
//                             <Text style={styles.keyText}>Seats</Text>
//                             <Text style={styles.valueText}>4</Text>
//                         </View>
//                         <View style={styles.brandBox}>
//                             <Text style={styles.keyText}>Doors</Text>
//                             <Text style={styles.valueText}>2</Text>
//                         </View>
//                     </View>
//                     <View style={styles.brandRows}>
//                         <View style={styles.brandBox}>
//                             <Text style={styles.keyText}>Seats</Text>
//                             <Text style={styles.valueText}>4</Text>
//                         </View>
//                     </View>

//                     <View style={styles.sectionTitleRow}>
//                         <View style={{ flexDirection: "row", alignItems: "center" }}>
//                             <Text style={styles.sectionTitle}>Additional Details</Text>
//                             <Image
//                                 source={require("../../assets/images/save2.png")}
//                                 style={{ width: wp(3), height: hp(3), resizeMode: "contain", marginLeft: wp(2) }}
//                             />
//                         </View>
//                     </View>

//                     <View style={styles.brandRows}>
//                         <View style={styles.brandBox}>
//                             <Text style={styles.keyText}>Listed by</Text>
//                             <Text style={styles.valueText}>Owner</Text>
//                         </View>
//                         <View style={styles.brandBox}>
//                             <Text style={styles.keyText}>Seller Speaks</Text>
//                             <Text style={styles.valueText}>English, Telugu, Hindi</Text>
//                         </View>
//                     </View>
//                     <View style={styles.brandRows}>
//                         <View style={styles.brandBox}>
//                             <Text style={styles.keyText}>Additional Security</Text>
//                             <Text style={styles.valueText}>Driving License Claimed</Text>
//                         </View>
//                         <View style={styles.brandBox}>
//                             <Text style={styles.keyText}>Respond in</Text>
//                             <Text style={styles.valueText}>10 mins</Text>
//                         </View>
//                     </View>

//                     <View style={styles.sectionTitleRow}>
//                         <View style={{ flexDirection: "row", alignItems: "center" }}>
//                             <Text style={styles.sectionTitle}>Description</Text>
//                             <Image
//                                 source={require("../../assets/images/save2.png")}
//                                 style={{ width: wp(3), height: hp(3), resizeMode: "contain", marginLeft: wp(2) }}
//                             />
//                         </View>
//                     </View>

//                     <View style={styles.textRow}>
//                         <Text style={styles.valueTextBottom}>Genuine Apple part</Text>
//                     </View>
//                     <View style={styles.textRow}>
//                         <Text style={styles.valueTextBottom}>1500 nts Brightness, High Touch capcity</Text>
//                     </View>

//                     {/* Bottom full width image */}

//                 </View>
//                 <Image
//                     source={require("../../assets/images/slidecar.png")}
//                     style={styles.fullWidthImage}
//                 />
//                 <Image
//                     source={require("../../assets/images/slidecar.png")}
//                     style={styles.fullWidthImage}
//                 />

//                 <View style={styles.bottomSection}>
//                     {/* Top Info Row */}
//                     <View style={styles.bottomLeftButton}>
//                         <Image
//                             source={require("../../assets/images/bottombutton.png")}
//                             style={styles.bottomImage}
//                         />
//                         <Text style={styles.bottomText}>
//                             I am authorised to make ad edits & responsible for the information shared including ad details & prices
//                         </Text>
//                     </View>

//                     {/* Buttons Row */}
//                     <View style={styles.bottomButtonsRow}>
//                         {/* Edit Button */}
//                         <TouchableOpacity style={styles.editButton}>
//                             <Image
//                                 source={require("../../assets/images/save2.png")}
//                                 style={styles.editImage}
//                             />
//                             <Text style={styles.editButtonText}>Edit</Text>
//                         </TouchableOpacity>

//                         {/* Next Button */}
//                         <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate("Botomtabs")}>
//                             <Text style={styles.bottomButtonText}>Next</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </ScrollView>
//         </SafeAreaView >
//     );
// };

// export default AddReviewScreen;

// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: "#fff" },
//     topBar: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         paddingHorizontal: wp("4%"),
//         paddingVertical: hp("1.5%"),
//         borderBottomWidth: 0.5,
//         borderColor: "#ddd",
//         backgroundColor: "#fff",
//         marginTop: hp(4),
//     },
//     titleWrapper: {
//         flex: 1,
//         flexDirection: "row",
//         alignItems: "center",
//         marginLeft: wp(1),
//     },
//     topBarTitle: {
//         fontSize: wp("3.5%"),
//         color: "#000",
//         fontWeight: "600",
//         marginRight: wp("2%"),
//     },
//     simpleText: {
//         fontSize: wp("2.2%"),
//         color: "#6E533F",
//         marginRight: wp("3%"),
//     },
//     actionButton: {
//         borderWidth: 1,
//         borderColor: "#6C63FF",
//         paddingHorizontal: wp("3%"),
//         paddingVertical: hp("0.4%"),
//         borderRadius: wp("5%"),
//         marginLeft: wp("2%"),
//     },
//     actionButtonText: {
//         fontSize: wp("2.8%"),
//         color: "#6C63FF",
//         fontWeight: "600",
//     },

//     subtitleSection: {
//         paddingHorizontal: wp("4%"),
//         marginTop: hp("1.8%"),
//         marginVertical: hp(0.8)
//     },
//     subtitleTop: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: hp("0.5%"),
//     },
//     subtitleBottom: {
//         flexDirection: "row",
//         alignItems: "center",
//     },
//     subtitleText: {
//         fontWeight: "600",
//         fontSize: wp("3.8%"),
//         color: "#000",
//     },
//     locationText: {
//         fontSize: wp("3%"),
//         color: "gray",
//         marginLeft: wp("1%"),
//     },

//     sliderWrapper: {
//         width: "100%",
//         height: hp("25%"),
//         marginTop: hp("1.5%"),
//     },
//     image: {
//         width,
//         height: hp("28%"),
//         resizeMode: "cover",
//     },
//     dotsContainer: {
//         position: "absolute",
//         bottom: hp("1.5%"),
//         left: 0,
//         right: 0,
//         flexDirection: "row",
//         justifyContent: "center",
//     },
//     dot: {
//         width: wp("1.3%"),
//         height: wp("1.3%"),
//         borderRadius: wp("1%"),
//         backgroundColor: "white",
//         marginHorizontal: wp("1%"),
//     },
//     activeDot: {
//         backgroundColor: "#6C63FF",
//         width: wp("1.3%"),
//         height: wp("1.3%"),
//     },
//     topRightIcons: {
//         position: "absolute",
//         top: hp("1.5%"),
//         right: wp("2%"),
//         flexDirection: "row",
//     },
//     iconButton: {
//         backgroundColor: "white",
//         padding: wp("1.5%"),
//         borderRadius: wp("6%"),
//         marginLeft: wp("2%"),
//     },
//     bottomRight: {
//         position: "absolute",
//         bottom: hp("1%"),
//         right: wp("2%"),
//         flexDirection: "row",
//     },
//     rowIcon: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginLeft: wp("3%"),
//     },
//     bottomLeft: {
//         position: "absolute",
//         bottom: hp("1%"),
//         left: wp("2%"),
//         flexDirection: "row",
//         alignItems: "center",
//         backgroundColor: "rgba(45, 45, 45, 0.5)",
//         paddingHorizontal: wp("2.5%"),
//         paddingVertical: hp("0.5%"),
//         borderRadius: wp("3%"),
//     },
//     iconText: {
//         color: "#fff",
//         fontSize: wp("3%"),
//         marginLeft: wp("1%"),
//     },

//     detailsCard: {
//         marginTop: hp("2%"),
//         marginHorizontal: wp("4%"),
//         backgroundColor: "#fff",
//         marginBottom: hp(1)
//     },
//     detailRowCustom: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//     },
//     leftBox: {
//         flexDirection: "row",
//         alignItems: "center",
//     },
//     detailText: {
//         fontSize: wp("3.9%"),
//         marginLeft: wp("1.5%"),
//         color: "#333",
//     },
//     rightText: {
//         fontSize: wp("3.5%"),
//         fontWeight: "600",
//         color: "#000",
//     },
//     detailTextCar: {
//         fontSize: wp("2.8%"),
//         marginLeft: wp("1.5%"),
//         color: "#00000080",
//     },
//     rightTextCar: {
//         fontSize: wp("2.8%"),
//         fontWeight: "600",
//         color: "#000",
//     },
//     saveimage: {
//         width: wp('6%'),
//         height: hp('1.6%'),
//         resizeMode: 'contain',
//         marginTop: wp(1)
//     },

//     sectionTitleRow: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: hp("1%"),
//     },
//     sectionTitle: {
//         fontSize: wp("4%"),
//         fontWeight: "600",
//         color: "#000",
//     },

//     threeColumnRow: {
//         flexDirection: "row",
//         marginLeft: wp(2),
//         paddingVertical: hp(0.5),
//         width: '100%'
//     },
//     threeColumnRowBottom: {
//         flexDirection: "row",
//         marginBottom: hp(1.5),
//         marginLeft: wp(2),
//     },
//     iconWithTextRow: {
//         flexDirection: "row",
//         alignItems: "center",
//         width: "30%",
//     },

//     brandRows: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         marginBottom: hp(1.5),
//         paddingHorizontal: wp(3),
//         marginTop: hp(1.8)
//     },
//     brandBox: {
//         width: "60%",
//     },

//     twoColumnRow: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         marginBottom: hp("1%"),
//     },
//     keyText: {
//         fontSize: wp("3.4%"),
//         color: "#00000099",
//         marginBottom: hp(0.3)
//     },
//     valueText: {
//         fontSize: wp("3.5%"),
//         fontWeight: "600",
//         color: "#000",
//     },
//     valueTextBottom: {
//         marginBottom: hp(1),
//         fontSize: wp(3)
//     },
//     fullWidthImage: {
//         width: "100%",
//         height: hp("20%"),
//         resizeMode: "cover",
//         marginTop: hp(1),
//     },
//     fullWidthImageBottom: {
//         marginBottom: hp(10)
//     },
//     textRow: {
//         marginTop: hp(0.1)
//     },


//     bottomSection: {
//         position: "relative",
//         bottom: 0,
//         left: 0,
//         right: 0,
//         backgroundColor: "#D9D9D959",
//         borderTopWidth: 1,
//         borderTopColor: "#eee",
//         padding: wp(4),
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20,
//         marginTop: hp(2)
//     },
//     bottomLeftButton: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: hp(1.5)
//     },
//     bottomImage: {
//         width: wp("8%"),
//         height: wp("8%"),
//         resizeMode: "contain",
//         marginRight: wp(2),
//     },
//     bottomText: {
//         fontSize: wp("2.8%"),
//         fontFamily: "Poppins-Medium",
//         color: "#6E533F",
//         lineHeight: hp(1.9),
//     },
//     bottomButtonsRow: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//     },
//     editButton: {
//         flexDirection: "row",
//         alignItems: "center",
//         backgroundColor: "#fff",
//         borderWidth: 1,
//         borderColor: "#6C63FF",
//         borderRadius: 12,
//         paddingVertical: hp(1),
//         paddingHorizontal: wp(4),
//         marginRight: wp(2),
//     },
//     editImage: {
//         width: wp("4.5%"),
//         height: wp("4.5%"),
//         resizeMode: "contain",
//         marginRight: wp(1.5),
//     },
//     editButtonText: {
//         fontSize: wp("3.5%"),
//         fontFamily: "Poppins-Medium",
//         color: "#6C63FF",
//     },
//     bottomButton: {
//         flex: 1,
//         backgroundColor: "#6C63FF",
//         paddingVertical: hp(1.2),
//         borderRadius: 12,
//         alignItems: "center",
//         justifyContent: "center",
//         marginLeft: wp(1),
//     },
//     bottomButtonText: {
//         color: "#fff",
//         fontSize: wp("3.8%"),
//         fontFamily: "Poppins-Medium",
//     },

// });


