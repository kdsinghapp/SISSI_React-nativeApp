import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    StatusBar,
    ScrollView,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import RecentViewedScreen from "../Components/MainHome/RecentlyViewed";
import HomeTypeScreen from "./HomeTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiHelper } from "../api/getApi/getApi";
import { IMAGE_BASE_URL } from "../api/authApi/BaseUrl";

const MainHomeScreen: React.FC = () => {
const navigation = useNavigation<any>();
const [categories, setCategories]  = useState([])
  const [sliders, setSliders] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
    



    const fetchSliders = async () => {
  console.log("✅ Fetching categories...");

  const token = await AsyncStorage.getItem("authToken");

  const res = await apiHelper("/general/view-all-sliders", {
    method: "GET",
    token,
  });
  console.log(res, "✅ API response");

  if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
        const sliderData = res.data[0]; // usually id=2 ka home slider hota hai
        setSliders(sliderData.imagesUrl || []);
      } else {
        console.warn("⚠️ No sliders found!");
      }
};


//   const fetchSliders = async () => {
//     try {
//       setLoading(true);
//       const token = await AsyncStorage.getItem("authToken");

//       const res = await apiHelper("general/view-all-sliders", {
//         method: "GET",
//         token,
//       });

//       console.log("✅ Slider API Response:", res);

//       if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
//         const sliderData = res.data[0]; // usually id=2 ka home slider hota hai
//         setSliders(sliderData.imagesUrl || []);
//       } else {
//         console.warn("⚠️ No sliders found!");
//       }
//     } catch (err) {
//       console.error("❌ Fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

const fetchMainCategories = async () => {
  console.log("✅ Fetching categories...");

  const token = await AsyncStorage.getItem("authToken");

  const res = await apiHelper("/main-categories/view-all?page=1&limit&isActiv", {
    method: "GET",
    token,
  });

  console.log(res, "✅ API response");

  if (res?.success) {
    console.log("✅ Categories:", res.data?.data);
    setCategories(res.data?.data)
     {res.data?.data.map((item, index) => (
                      console.log(item.name , 'ceck___item_dta')
                    ))}
  } else {
    console.warn("⚠️ Failed to fetch:", res.message);
  }
};



// const fetchSubCategories = async () => {
//   try {
//     const token = await AsyncStorage.getItem("authToken");

//     const res = await getApi(
//       "/sub-categories/view-all?page=1&limit=20&parentId=4&getAllSuperSubCategories=true",
//     //   "/category-headings/view-all?page=1",
//       undefined,
//       undefined,
//       token || undefined
//     );
// console.log('call__sub__category__d__s')
//     if (res?.success) {
//       console.log("✅ Sub Categories:", res.data);
//     } else {
//       console.warn("⚠️ Failed to fetch sub-categories:", res.message);
//     }
//   } catch (err) {
//     console.error("Error fetching sub-categories:", err);
//   }
// };

useEffect(()=> {
    console.log('slider)_dataaafff',sliders)
})

useEffect(()=> {
    // fetchProductCart()
    fetchSliders()
    fetchMainCategories()
    // fetchSubCategories()
},[])




    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <View style={styles.locationContainer}>
                        <Text style={styles.location}>
                            <MaterialIcons
                                name="location-on"
                                size={wp("4%")}
                                color="red"
                            />{" "}
                            KPHB
                        </Text>
                        <Ionicons
                            name="chevron-down"
                            size={wp("3.5%")}
                            color="#FF0303"
                        />
                    </View>
                    <Text style={styles.address} numberOfLines={1}>
                        G3, Floor 1st, Srinivasa Residency, Road...
                    </Text>
                </View>

                <View style={styles.rightIcons}>
                    <View style={styles.bellContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Favourite')}>
                            <FontAwesome name="heart-o" size={18} color="#FF0303" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Notification")}
                    >
                        <Feather name="bell" size={19} color="#000000" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Content */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: hp(10) }}
            >
                {/* Search Bar */}
                <TouchableOpacity onPress={() => navigation.navigate('BuySellSearch')}>
                    <View style={styles.searchRow}>
                        <View style={styles.searchContainer}>
                            <Ionicons
                                name="search"
                                size={20}
                                color="#999"
                                style={styles.searchIcon}
                            />
                            <TextInput
                                placeholder="Search ads..."
                                placeholderTextColor="#999"
                                style={styles.searchInput}
                            />
                            <Image
                                source={require("../../assets/images/mic.png")}
                                style={styles.micIcon}
                            />
                        </View>
                        <TouchableOpacity style={styles.qrContainer}>
                            <Image
                                source={require("../../assets/images/qrcode.png")}
                                style={styles.qrIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>


                {/* Slider */}
                {/* <View style={styles.sliderWrapper}>
                    <View style={styles.sliderContainer}>
                        <Swiper
                            autoplay
                            loop
                            autoplayTimeout={3.5}
                            showsPagination={true}
                            dotStyle={styles.dot}
                            activeDotStyle={styles.activeDot}
                        >
                            <Image
                                source={require("../../assets/images/slider.png")}
                                style={styles.sliderImage}
                            />
                            <Image
                                source={require("../../assets/images/slider.png")}
                                style={styles.sliderImage}
                            />
                            <Image
                                source={require("../../assets/images/slider.png")}
                                style={styles.sliderImage}
                            />
                            <Image
                                source={require("../../assets/images/slider.png")}
                                style={styles.sliderImage}
                            />
                            <Image
                                source={require("../../assets/images/slider.png")}
                                style={styles.sliderImage}
                            />
                        </Swiper>
                    </View>
                </View> */}


 <View style={styles.sliderContainer}>
        {sliders.length > 0 ? (
          <Swiper
            autoplay
            loop
            autoplayTimeout={3.5}
            showsPagination
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot}
          >
            {sliders.map((img, index) => (
              <Image
                key={index}
                source={{ uri: `${IMAGE_BASE_URL}${img}` }}
                style={styles.sliderImage}
              />
            ))}
          </Swiper>
        ) : (
          <Image
            source={require("../../assets/images/slider.png")}
            style={styles.sliderImage}
          />
        )}
      </View>


               {/* Categories */}
                              <View style={styles.categoriesContainer}>
                                  {categories.map((item, index) => (
                                      <TouchableOpacity   key={index} style={styles.categoryItem}>
                                          <Image   source={{ uri: `${IMAGE_BASE_URL}${item?.image}` }} style={styles.categoryIcon} />
                                          <Text style={styles.categoryText}>{item?.name}</Text>
              
                                      </TouchableOpacity>
                                  ))}
                              </View>
                <RecentViewedScreen />
                <HomeTypeScreen />
            </ScrollView>
        </View>
    );
};

export default MainHomeScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },

    /** Header */
    header: {
        paddingHorizontal: wp("4%"),
        paddingVertical: hp("1.5%"),
        marginTop: hp(4),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    locationContainer: { flexDirection: "row", alignItems: "center" },
    location: {
        fontSize: wp("4%"),
        fontWeight: "600",
        color: "black",
        marginRight: wp("1%"),
        fontFamily: "Poppins-Bold",
    },
    address: {
        fontSize: wp("3.2%"),
        color: "#6E533F",
        fontFamily: "Poppins-Regular",
    },
    rightIcons: { flexDirection: "row", alignItems: "center" },
    bellContainer: { marginRight: wp("3%") },

    /** Search Section */
    searchRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: wp(3.5),
        marginTop: hp(0),
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: wp(3),
        paddingHorizontal: wp(3),
        height: hp(5.2),
    },
    searchIcon: { marginRight: wp(2) },
    searchInput: { flex: 1, fontSize: hp(1.8), color: "#000" },
    micIcon: { width: wp(5), height: wp(5), resizeMode: "contain" },
    qrContainer: {
        marginLeft: wp(3),
    },
    qrIcon: {
        width: wp(7.5),
        height: wp(7.5),
        resizeMode: "contain",
    },

    /** Slider Section */
    sliderWrapper: {
        backgroundColor: "#fff",
        alignItems: "center",
        marginTop: hp(1.5),
    },
    sliderContainer: {
        width: wp(100),
        height: hp(20),
        borderBottomLeftRadius: wp(12),
        borderBottomRightRadius: wp(12),
        overflow: "hidden",
    },
    sliderImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    dot: {
        backgroundColor: "#fff",
        width: wp(1.5),
        height: wp(1.5),
        borderRadius: wp(2),
        marginHorizontal: wp(1),
    },
    activeDot: {
        backgroundColor: "#6C63FF",
        width: wp(1.5),
        height: wp(1.5),
        borderRadius: wp(2),
        marginHorizontal: wp(1),
    },

    /** Categories */
    categoriesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignSelf: "center",
        width: wp(95),
        marginTop: hp(3),
    },
    categoryItem: {
        width: wp(17),
        alignItems: "center",
        marginBottom: hp(3.5),
    },
    categoryIcon: {
        width: wp(10),
        height: wp(10),
        resizeMode: "contain",
    },
    categoryText: {
        fontSize: hp(1.2),
        color: "#000",
        textAlign: "center",
        marginTop: hp(0.5),
        fontFamily: "Poppins-Regular",
    },
});
