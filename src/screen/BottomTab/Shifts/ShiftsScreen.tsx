import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imageIndex from "../../../assets/imageIndex";
import { color } from "../../../constant";
import { GetApi } from "../../../api/apiRequest";
import { useSelector } from "react-redux";
import moment from "moment";
import 'moment/locale/fi';
import LoadingModal from "../../../utils/Loader";
import { useNavigation } from "@react-navigation/native";
import ScreenNameEnum from "../../../routes/screenName.enum";
import { useLanguage } from "../../../LanguageContext";

const ShiftsScreen = () => {
  const { labels } = useLanguage();
  moment.locale('fi');
  const TABS = [labels.tabInProgress, labels.tabCompleted];
  const [activeTab, setActiveTab] = useState(labels.tabInProgress);

  const [data, setData] = useState([]);
  const isLogin = useSelector((state: any) => state.auth);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  const getApiConfigByTab = (tab: string) => {
    if (tab === labels.tabCompleted) {
      return {
        url: "shift/myShiftListUser",
        body: { status: "Complete" },
      };
    } else {
      return {
        url: "shift/myShiftRequestListUser",
        body: { request_status: "Pending" },
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
        data: body,
      };

      const res = await GetApi(param, setLoading);
      console.log(res)
      if (activeTab === labels.tabCompleted) {
        const completedOnly = (res?.data || []).filter(item => item.status === "Complete");
        setData(completedOnly);
      } else {
        const removeRejected = (res?.data || []).filter(item => item.request_status != "rejected");
        setData(removeRejected || []);
        // console.log(removeRejected)
      }
    } catch (error) {
      console.log("Shift API error:", error);
    } finally {
      setLoading(false);
    }
  };

  const ShiftCard = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardInner}>
          <View style={styles.iconCircle}>
            <Image
              source={imageIndex.calneder}
              style={{ height: 26, width: 26, tintColor: "white" }}
            />
          </View>

          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.cardDate}>
              {moment(item.shift_date).format('dddd, DD MMMM YYYY')}
            </Text>
            <Text style={styles.cardTitle}>
              {item.user_name} - {item.unit_name}
            </Text>

            {item.user_name && (
              <Text style={styles.cardTime}>
                {moment(item.time_start, "HH:mm:ss").format("HH:mm")} – {moment(item.time_end, "HH:mm:ss").format("HH:mm")}
              </Text>
            )}

            {activeTab === labels.tabCompleted ? (
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>
                  {item?.status === "Complete" ? labels.statusComplete : item?.status}
                </Text>
              </View>
            ) : (
              <View style={{flexDirection:'row', }}>
              <TouchableOpacity
                onPress={() => navigation.navigate(ScreenNameEnum.ChatScreen, {
                  item: {
                    user_name: item?.user_name,
                    id: item?.shift_user_id,
                    image: item?.manager_image
                  }
                })}
                style={[styles.statusBadge, styles.chatBadge]}
              >
                <Text style={styles.statusText}>{labels.openChat}</Text>
                <Image style={styles.chatIcon} source={imageIndex.mess1} />
              </TouchableOpacity>

               <View style={[styles.statusBadge, {height:35, alignItems:'center', justifyContent:'center', marginLeft:20}]}>
                <Text style={styles.statusText}>
                  {item?.request_status === "Complete" ? labels.statusComplete : item?.request_status == "pending" ? labels.statusPending:item?.request_status == "approved" ? labels.aproved:item?.request_status}
                </Text>
              </View>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
      {loading && <LoadingModal />}
      <Text style={styles.header}>{labels.shiftsHeader}</Text>

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

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 15 }}
        data={data}
        keyExtractor={(item) => item?.id}
        renderItem={({ item }) => <ShiftCard item={item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </SafeAreaView>
  );
};;

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
  chatBadge: {
    backgroundColor: color.primary,
    flexDirection: "row",
    alignItems: "center"
  },
  chatIcon: {
    height: 18,
    width: 18,
    resizeMode: "contain",
    marginTop: 5,
    marginLeft: 5
  }
});

export default ShiftsScreen;
