import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imageIndex from "../../../assets/imageIndex";
import { color } from "../../../constant";
import { GetApi } from "../../../api/apiRequest";
import { useSelector } from "react-redux";
import moment from "moment";
import LoadingModal from "../../../utils/Loader";
import { useNavigation } from "@react-navigation/native";
import ScreenNameEnum from "../../../routes/screenName.enum";

const TABS = ["In Progress", "Completed",];

const ShiftsScreen = () => {
  const [activeTab, setActiveTab] = useState("In Progress");
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const isLogin = useSelector((state: any) => state.auth);
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   // Code to run on component mount
  //   (async () => {
  //     console.log("PostedShifts component mounted");
  //     const param = {
  //       url: "shift/myShiftListUser",
  //       token: isLogin?.token,
  //       method: 'POST'
  //     }


  //     const dd = await GetApi(param, setLoading);
  //     setData(dd?.data || []);
  //     console.log(dd?.data, 'this is data')
  //   })()
  // }, [])

  const getApiConfigByTab = (tab: string) => {
    if (tab === "Completed") {
      return {
        url: "shift/myShiftListUser",
        body: { status: "Complete" },
      };
    } else if (tab === "In Progress") {
      return {
        url: "shift/myShiftRequestListUser",
        body: { request_status: "pending" },
      };

    }
  };
  useEffect(() => {
    fetchShifts();
  }, [activeTab]);

  const fetchShifts = async () => {
    try {
      setLoading(true);

      const { url, body } = getApiConfigByTab(activeTab);

      const param = {
        url,
        token: isLogin?.token,
        method: "POST",
        data: body, // 👈 POST BODY
      };

      const res = await GetApi(param, setLoading);

      setData(res?.data || []);
    } catch (error) {
      console.log("Shift API error:", error);
    } finally {
      setLoading(false);
    }
  };

  //   const filteredData = data.filter(item => {
  //   if (activeTab === "Completed") {
  //     return item?.status === "Complete";
  //   }
  //   if (activeTab === "In Progress") {
  //     return item?.status === "Accept";
  //   }
  //   return true;
  //   // return item
  // });
  const navigation = useNavigation()

  const ShiftCard = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardInner}>
          {/* Icon */}
          <View style={styles.iconCircle}>
            <Image
              source={imageIndex.calneder}
              style={{ height: 26, width: 26, tintColor: "white" }}
            />
          </View>

          {/* Info */}
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.cardDate}>{moment(item.shift_date).format('dddd, DD MMMM YYYY')} </Text>
            <Text style={styles.cardTitle}>{item.user_name} - {item.unit_name} </Text>

            {item.user_name && <Text style={styles.cardTime}>{moment(item.time_start, "HH:mm:ss").format("hh:mm A")} – {moment(item.time_end, "HH:mm:ss").format("hh:mm A")}</Text>
            }
            {activeTab == "Completed" ?
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{item?.status}</Text>
              </View>
              :
              <TouchableOpacity onPress={() => navigation.navigate(ScreenNameEnum.ChatScreen, 
                { 
                item: {
                 user_name: item?.user_name, 
                 id: item?.shift_user_id, 
                 image: item?.manager_image 
                } 
              })} style={[styles.statusBadge, {
                backgroundColor: color.primary,
                flexDirection: "row",
                alignItems: "center"
              }]}>
                <Text style={styles.statusText}>Open Chat</Text>
                <Image style={{
                  height: 18,
                  width: 18,
                  resizeMode: "contain",
                  marginTop: 5,
                  marginLeft: 5
                }} source={imageIndex.mess1} />
              </TouchableOpacity>
            }

          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
      {loading && <LoadingModal />}
      <Text style={styles.header}>Shifts</Text>

      {/* Tabs */}
      <View style={styles.tabWrapper}>
        <View style={styles.tabContainer}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>




      {/* <View style={{
        marginTop: 15,
      }}> */}
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 15 }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ShiftCard item={item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      {/* </View> */}
    </SafeAreaView>
  );
};

// ---------------- CARD COMPONENT ------------------


// ---------------- STYLES --------------------

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 15,
  },

  // Tabs
  tabWrapper: {
    alignItems: "center",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    padding: 5,
    borderRadius: 40,
    width: "90%",
    justifyContent: "space-between",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 40,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: color.primary,
  },
  tabText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#999",
  },
  activeTabText: {
    color: "white",
  },

  // Search
  searchInput: {
    marginTop: 15,
    backgroundColor: "#F4F4F4",
    padding: 12,
    borderRadius: 10,
  },

  // Card
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    marginVertical: 10,
    borderWidth: 0.1,
    borderColor: "#000",
    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    // Android shadow
  },
  cardInner: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconCircle: {
    height: 45,
    width: 45,
    backgroundColor: color.thirdColor,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  cardDate: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },
  cardTitle: {
    fontSize: 13,
    color: "#000",
    marginTop: 3,
    fontWeight: "600",
  },
  cardTime: {
    marginTop: 8,
    fontSize: 13,
    color: "#777",
  },

  statusBadge: {
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: "#1CDE65",
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignItems: "center"
  },
  statusText: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
  },
});

export default ShiftsScreen;
