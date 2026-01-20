import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import imageIndex from "../../../assets/imageIndex";
import PostSuccessfull from "../../../compoent/PostSuccessfull";
import ScreenNameEnum from "../../../routes/screenName.enum";
import { color } from "../../../constant";
import { AcceptRequest, DeclineRequest, GetApi } from "../../../api/apiRequest";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import LoadingModal from "../../../utils/Loader";
import moment from "moment";
import CustomHeader from "../../../compoent/CustomHeader";
import SearchBar from "../../../compoent/SearchBar";
import { language } from "../../../constant/Language";
import { useLanguage } from "../../../LanguageContext";


const ShiftBooking = () => {
  const [visible, setvisible] = useState(false)
  const [Decline, setDecline] = useState(false)
  const isLogin = useSelector((state: any) => state.auth);
  const { labels} = useLanguage(); // Reference Finnish strings
  console.log(isLogin)
  const navigatorv = useNavigation()
  const [loading, setLoading] = useState(false);
  const [selectedShiftId, setSelectedShiftId] = useState(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // Code to run on component mount
    (async () => {
      console.log("PostedShifts component mounted");
      const param = {
        url: "shift/allShiftRequestsForinstitution",
        user_id: isLogin?.userData?.id,
        token: isLogin?.token,
        data:{
          status: "Pending"
        }
      }
      const dd = await GetApi(param, setLoading);
      console.log(dd?.data, 'this is data')
      setData(dd?.data || []);
      setFilteredData(dd?.data || []);
    })()
  }, [])
  const onSearch = (text) => {
    setSearchText(text);

    if (!text.trim()) {
      setFilteredData(data);
      return;
    }

    const lower = text.toLowerCase();

    const filtered = data.filter(item =>
      item?.shift_date?.toLowerCase().includes(lower) ||
      item?.time_start?.toLowerCase().includes(lower) ||
      item?.time_end?.toLowerCase().includes(lower) ||
      item?.description?.toLowerCase().includes(lower)
    );

    setFilteredData(filtered);
  };

  const handleAcceptRequest = async (id) => {
    if (!id) return;
    console.log(id,
      isLogin?.token,
      setLoading)
    const param = {
      request_id: id,
      token: isLogin?.token,
    }
    const res = await AcceptRequest(
      param,
      setLoading
    );

    if (res?.status == "1") {
      // ✅ remove from UI instantly
      const updated = data.filter(item => item.request_id !== id);

      setData(updated);
      setFilteredData(updated);
      setvisible(true);
      setSelectedShiftId(null);
    }
  };



   const handleDeclineRequest = async (id) => {
    if (!id) return;
    console.log(id,
      isLogin?.token,
      setLoading)
    const param = {
      request_id: id,
      token: isLogin?.token,
    }
    const res = await DeclineRequest(
      param,
      setLoading
    );

    if (res?.status == "1") {
      // ✅ remove from UI instantly
      const updated = data.filter(item => item.request_id !== id);

      setData(updated);
      setFilteredData(updated);
      // setvisible(false);
      setDecline(true);
      setSelectedShiftId(null);
    }
  };
  // const data = [ 
  //   {
  //     id: 1,
  //     name: "Davis Bergson",
  //     date: "14 Feb 2025",
  //     time: "08:00 AM – 04:00 PM",
  //     section: "Child Care – Section B",
  //   },
  //   {
  //     id: 2,
  //     name: "Jaydon Bergson",
  //     date: "14 Feb 2025",
  //     time: "08:00 AM – 04:00 PM",
  //     section: "Child Care – Section B",
  //   },
  //   {
  //     id: 3,
  //     name: "Ann Workman",
  //     date: "14 Feb 2025",
  //     time: "08:00 AM – 04:00 PM",
  //     section: "Child Care – Section B",
  //   },
  // ];

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      {/* NAME ROW */}
      <View style={styles.headerRow}>
        <Text style={styles.name}>{item.user_name}</Text>
        <View style={styles.statusChip}>
          <Text style={styles.statusText}>{labels.waiting}</Text>
        </View>
      </View>

      {/* DATE */}
      <View style={styles.row}>
        <Image source={imageIndex.calneder}
          style={styles.image}
          tintColor = {color.primary}

        />
        <Text style={styles.value}>{moment(item.shift_date).format("DD MMM YYYY")}</Text>
      </View>

      {/* TIME */}
      <View style={styles.row}>
        <Image source={imageIndex.time2}
          style={[styles.image, {
            tintColor: color.primary
          }]}

        />
        <Text style={styles.value}>{moment(item.time_start, "HH:mm:ss").format("hh:mm A")} - {moment(item.time_end, "HH:mm:ss").format("hh:mm A")}</Text>
      </View>

      {/* SECTION */}
      <View style={styles.row}>
        <Image source={imageIndex.Health}
          style={[styles.image, {
            tintColor: color.primary
          }]}

        />
        <Text style={styles.value}>{item.location}</Text>
      </View>

      {/* BUTTONS */}
      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.approveBtn}
          onPress={() => {
            handleAcceptRequest(item?.request_id)
          }}
        >
          <Text style={styles.btnTextWhite}>{labels.approve}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.declineBtn}
          onPress={() => {
            
            handleDeclineRequest(item?.request_id);

          }}

        >
          <Text style={styles.btnTextWhite}>{labels.decline}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
        <CustomHeader label={labels.shiftBookingRequest} />
      {loading && <LoadingModal />}

      <SearchBar
        value={searchText}
        onSearchChange={onSearch}
        placeholder={labels.searchPlaceholder}
      />
      {/* <Text style={{
        fontWeight: "600",
        color: "black",
        fontSize: 16
      }}>Shift Booking Request</Text> */}
      <FlatList data={data}

        showsVerticalScrollIndicator={false}
        style={{
          marginTop: 4
        }}
        renderItem={renderCard} keyExtractor={item => item.id} />
      <PostSuccessfull
        userImage={imageIndex.post1}
        visible={visible}
        title={labels.shiftApprovedSuccessfully}
        subTitle={labels.workerHasBeenNotified}
        butt={labels.done}
        onOpenChat={() => {
          setvisible(false);
          // navgation.navigate(ScreenNameEnum.Tab2Navigator);
        }}

        onClose={() => {
          setvisible(false)
        }}
      />
      <PostSuccessfull
        userImage={imageIndex.Decline}
        visible={Decline}
        title={labels.shiftRequestDeclined}
        subTitle={labels.workerWillSeeDeclineReason}
        butt={labels.done}
        onOpenChat={() => {
          setDecline(false);
          // navgation.navigate(ScreenNameEnum.Tab2Navigator);
        }}

        onClose={() => {
          setDecline(false);
        }}
      />
    </SafeAreaView>
  );
};

export default ShiftBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
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

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    borderWidth: 1.5,
    borderColor: color.borderColor
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
    paddingHorizontal: 30,
    borderRadius: 25,
    justifyContent: "center"

  },

  declineBtn: {
    backgroundColor: "#FF383C",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    justifyContent: "center"
  },

  btnTextWhite: {
    color: "#FFF",
    fontWeight: "600",
  },
});
