import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import imageIndex from "../../../assets/imageIndex";
import PostSuccessfull from "../../../compoent/PostSuccessfull";
import ScreenNameEnum from "../../../routes/screenName.enum";
import CustomHeader from "../../../compoent/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../../../compoent/SearchBar";
import { useSelector } from "react-redux";
import { AcceptRequest, CompleteBooking, GetApi } from "../../../api/apiRequest";
import moment from "moment";
import { color } from "../../../constant";
import LoadingModal from "../../../utils/Loader";
import { language } from "../../../constant/Language";
import { useLanguage } from "../../../LanguageContext";

const BookedShifts = () => {
  const { labels} = useLanguage(); // Reference Finnish strings
  const [visible, setvisible] = useState(false)
  const [Decline, setDecline] = useState(false)
  const isLogin = useSelector((state: any) => state.auth); 
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Code to run on component mount
    (async () => {
      console.log("PostedShifts component mounted");
      const param = {
        url: "shift/accept_shift_list_institution",
        user_id: isLogin?.userData?.id,
        token: isLogin?.token,
        data: {
          status: "completed"
        }
      }
      const dd = await GetApi(param, setLoading);
      console.log(dd?.data, 'this is data')
      setData(dd?.data || []);
      setFilteredData(dd?.data || []);
    })()
  }, [])
  const navigator = useNavigation()
  const handleAcceptRequest = async (id) => {
    if (!id) return;
    console.log(id,
      isLogin?.token,
      setLoading)
    const param = {
      shift_id: id,
      token: isLogin?.token,
      // data: {
      //   status: "completed"
      // }
    }
    const res = await CompleteBooking(
      param,
      setLoading
    );

    if (res?.status == "1") {
      // ✅ remove from UI instantly
      const updated = data.filter(item => item.shift_id !== id);
// console.log(updated, 'data===========================')
      setData(updated);
      setFilteredData(updated);
      setvisible(true);
      // setSelectedShiftId(null);
    }
  };

  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredData(data);
      return;
    }

    const text = searchText.toLowerCase();

    const filtered = data.filter(item => {
      return (
        item?.user_name?.toLowerCase().includes(text) ||
        item?.mobile_number?.includes(text) ||
        moment(item?.shift_date).format("DD MMMM YYYY").toLowerCase().includes(text) ||
        item?.time_start?.includes(text) ||
        item?.time_end?.includes(text)
      );
    });

    setFilteredData(filtered);
  }, [searchText, data]);

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      {/* NAME ROW */}
      <View style={styles.headerRow}>
        <Text style={styles.name}>{moment(item.shift_date).format("dddd, DD MMMM YYYY")}</Text>

      </View>

      {/* DATE */}
      <View style={styles.row}>
        <Image source={imageIndex.time2}
          style={styles.image}
          tintColor={color.primary}
        />
        <Text style={styles.value}>{moment(item.time_start, "HH:mm:ss").format("hh:mm A")} – {moment(item.time_end, "HH:mm:ss").format("hh:mm A")} </Text>
      </View>

      {/* TIME */}
      <View style={styles.row}>
        <Image source={imageIndex.pfioel12}
          style={[styles.image, {
            tintColor: color.primary
          }]}

        />
        <Text style={styles.value}>{item?.user_name}</Text>
      </View>

      {/* SECTION */}
      <View style={styles.row}>
        <Image source={imageIndex.call}
          style={[styles.image, {
            tintColor: color.primary
          }]}

        />
        <Text style={styles.value}>{item?.mobile_number}</Text>
      </View>

      {/* BUTTONS */}
      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.approveBtn} onPress={() => handleAcceptRequest(item?.shift_id)}
        >
          <Text style={styles.btnTextWhite}>{labels.tabCompleted} </Text>
          <Image
            style={{
              height: 22,

              width: 22,
              marginLeft: 11
            }}
            source={imageIndex.post1}

          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.declineBtn}
          onPress={() => {
            navigator.navigate(ScreenNameEnum.ChatScreen, {
            item: {
              user_name: item?.user_name,
              id: item?.user_id,
              image: item?.req_user_image,
            },
          })
          }}
        >
          <Text style={styles.btnTextWhite}>{labels.openChat}</Text>
          <Image
            style={{
              height: 22,
              width: 22,
              marginLeft: 11
            }}
            source={imageIndex.mess1}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading && <LoadingModal/>}
      <StatusBarComponent />
      <CustomHeader label={labels.bookedShifts} />
      <SearchBar
        value={searchText}
        onSearchChange={text => setSearchText(text)}
        placeholder={labels.searchPlace}
      />
      <FlatList data={filteredData}

        showsVerticalScrollIndicator={false}
        style={{
          marginTop: 11,
          padding: 16,

        }}
        renderItem={renderCard} keyExtractor={item => item.id} />
    </SafeAreaView>
  );
};

export default BookedShifts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    height: 21,
    width: 21,
    resizeMode: "contain"

  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 16,

    // ANDROID shadow
    elevation: 3,

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222",
  },

  statusChip: {
    backgroundColor: "#FF8D28",
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 12,
    color: "white",
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  value: {
    marginLeft: 8,
    fontSize: 14,
    color: "#444",
    fontWeight: "500"
  },

  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  approveBtn: {
    backgroundColor: "#34C759",
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 25,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    flex: 1

  },

  declineBtn: {
    backgroundColor: color.primary,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 25,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },

  btnTextWhite: {
    color: "#FFF",
    fontWeight: "600",
  },
});
