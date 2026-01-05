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
import CustomHeader from "../../../compoent/CustomHeader";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import SearchBar from "../../../compoent/SearchBar";
import imageIndex from "../../../assets/imageIndex";
import BookingSuccessModal from "../../../compoent/BookingModal";
import { useSelector } from "react-redux";
import { BookShiftByUserApi, GetApi, onFavoriteShift } from "../../../api/apiRequest";
import moment from "moment";
import LoadingModal from "../../../utils/Loader";
import { color } from "../../../constant";
import { useNavigation } from "@react-navigation/native";
import ScreenNameEnum from "../../../routes/screenName.enum";

const DATA = [1, 2, 3];

export default function BrowseShifts() {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const isLogin = useSelector((state: any) => state.auth);
  const [bookedItem, setBookedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Code to run on component mount
    (async () => {
      console.log("PostedShifts component mounted");
      const param = {
        url: "shift/all_shift_list_user",
        token: isLogin?.token,
        method: 'GET'
      }


      const dd = await GetApi(param, setLoading);
      setData(dd?.data || []);
      console.log(dd?.data, 'this is data')
      setFilteredData(dd?.data || []);
    })()
  }, [])

  const onSearch = (text) => {
    setSearchText(text);

    if (!text.trim()) {
      setFilteredData(data);
      return;
    }

    const search = text.toLowerCase();

    const filtered = data.filter(item => {
      return (
        item?.user_name?.toLowerCase().includes(search) ||
        item?.unit_name?.toLowerCase().includes(search) ||
        item?.location?.toLowerCase().includes(search) ||
        item?.description?.toLowerCase().includes(search) ||
        moment(item?.shift_date, 'YYYY-MM-DD')
          .format('dddd, DD MMMM YYYY')
          .toLowerCase()
          .includes(search) ||
        `${item?.time_start} ${item?.time_end}`
          .toLowerCase()
          .includes(search)
      );
    });

    setFilteredData(filtered);
  };

  const BookNow = async (item) => {
    // Logic to handle booking the shift
    console.log("Book Now pressed for item:", item);
    const param = {
      shift_id: item?.id,
      token: isLogin?.token,
    }
    const dd = await BookShiftByUserApi(param, setLoading)
    if (dd?.status == '1') {
      setBookedItem(item);
      setModalVisible(true);
    }
  }
  const onFavorite = async (item) => {
    // Logic to handle booking the shift
    console.log("Book Now pressed for item:", item);
    const param = {
      shift_id: item?.id,
      token: isLogin?.token,
    }
    const dd = await onFavoriteShift(param, setLoading)
    if (dd?.status == '1') {
      // setModalVisible(true);
      setFilteredData(prev =>
        prev.map(i =>
          i.id === item.id
            ? { ...i, favorite_status: i.favorite_status == 1 ? 0 : 1 }
            : i
        )
      );
    }
  }
  const navigation = useNavigation()
  const renderCard = ({ item }: any) => (
    <TouchableOpacity onPress={() =>
      navigation.navigate(ScreenNameEnum.ShiftDetailScreen, {
        item: item, // 👈 passing single object
      })
    } style={styles.card}>
      {/* Row 1 */}
      <View style={{
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16
      }}>

        <Image source={imageIndex.home1}
          tintColor={color.primary}
          style={{
            height: 44,
            width: 44,
            resizeMode: "contain",
          }}
        />
      </View>


      <View style={styles.row}>
        <View style={styles.flex1}>
          <Text style={styles.label}>Institution Name</Text>
          <Text style={styles.value}>{item?.user_name}</Text>
        </View>

        <View style={styles.rightView}>
          <Text style={styles.label}>Unit Name</Text>
          <Text style={styles.value}>{item?.unit_name}</Text>
        </View>
      </View>

      {/* Row 2 */}
      <View style={[styles.row, styles.mt12]}>
        <View style={styles.flex1}>
          <Text style={styles.label}>Date & Time</Text>
          <Text style={styles.value}>
            {moment(item?.shift_date, 'YYYY-MM-DD')
              .format('dddd, DD MMMM YYYY')}{"\n"}{item?.time_start} – {item?.time_end}
          </Text>
        </View>

        <View style={styles.rightView}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.value}>{item?.location}</Text>
        </View>
      </View>

      {/* Row 3 */}
      <View style={[styles.row, styles.mt12]}>
        <View style={styles.flex1}>
          <Text style={styles.label}>Short Description</Text>
          <Text style={styles.value}>
            {item?.description}
          </Text>
        </View>

        <View style={styles.rightView}>
          <Text style={styles.label}>Badge</Text>
          <View style={[styles.badge, styles.mt12]}>
            <Text style={styles.badgeTxt}>{item?.status == "Pending" ? 'Available' : 'Not Available'}</Text>
          </View>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.removeBtn}
          onPress={() => onFavorite(item)}
        >
          <Text style={styles.removeTxt}>
            {item?.favorite_status == 0 ? 'Favorite' : 'Unfavorite'}{" "}
            <Text style={{ fontSize: 22, color: color.primary }}>
              ✩
            </Text>
          </Text>

        </TouchableOpacity>

        <TouchableOpacity

          onPress={() =>
            BookNow(item)
            // {
            //   console.log(item,
            //     item?.user_id,
            //     item?.users_image,)

            // }
          }

          style={styles.detailsBtn}>
          <Text style={styles.detailsTxt}>Book Now</Text>
        </TouchableOpacity>
      </View>

    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      {loading && <LoadingModal />}
      <StatusBarComponent />
      <CustomHeader label="Browse Shifts" />
      <SearchBar value={searchText} onSearchChange={onSearch}
        placeholder="Search by name, date, time, location" />

      <View style={styles.listWrapper}>
        <FlatList
          data={filteredData}
          renderItem={renderCard}
          keyExtractor={(item) => item?.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </View>


      <BookingSuccessModal
        visible={modalVisible}
        userName={bookedItem?.user_name}
        userImage= {bookedItem?.users_image} // replace with real image URL
        onClose={() => setModalVisible(false)}
        onOpenChat={() => {
          // navigate to chat screen
          console.log('Open Chat Pressed');
          setModalVisible(false);
          setModalVisible(false);
          navigation.navigate(ScreenNameEnum.ChatScreen, {
            item: {
              user_name: bookedItem?.user_name,
              id: bookedItem?.user_id,
              image: bookedItem?.users_image,
            },
          });
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /* Screen Container */
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  listWrapper: {
    flex: 1,
    marginTop: 18,
    marginHorizontal: 16,
  },

  /* Card */
  card: {
    borderWidth: 1.5,
    borderColor: "#FF007A",
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    backgroundColor: "#fff",

    // Shadow for iOS + Android
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  flex1: {
    flex: 1,
  },

  rightView: {
    flex: 1,
    alignItems: "flex-end",
  },

  label: {
    fontSize: 15,
    color: "#0056B3",
    fontWeight: "500",
  },

  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginTop: 5,
    lineHeight: 20,
  },

  mt12: { marginTop: 12 },

  /* Badge */
  badge: {
    backgroundColor: "#54C270",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },

  badgeTxt: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  /* Buttons Bottom */
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  removeBtn: {
    borderWidth: 2,
    borderColor: color.primary,
    paddingHorizontal: 35,
    paddingVertical: 11,
    borderRadius: 30,
    justifyContent: "center",
  },

  removeTxt: {
    color: color.primary,
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
  },

  detailsBtn: {
    backgroundColor: color.primary,
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: "center",
  },

  detailsTxt: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
  },
});
