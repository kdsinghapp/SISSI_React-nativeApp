import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../../compoent/CustomHeader";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import SearchBar from "../../../compoent/SearchBar";
import { color } from "../../../constant";
import { useSelector } from "react-redux";
import { GetApi, onFavoriteShift } from "../../../api/apiRequest";
import LoadingModal from "../../../utils/Loader";
import moment from "moment";
import ScreenNameEnum from "../../../routes/screenName.enum";
import { useNavigation } from "@react-navigation/native";

const DATA = [1, 2, 3];

export default function FavoriteScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const isLogin = useSelector((state: any) => state.auth);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Code to run on component mount
    (async () => {
      console.log("PostedShifts component mounted");
      const param = {
        url: "shift/myFavoriteShifts",
        token: isLogin?.token,
        method: 'POST'
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
  const onFavorite = async (item) => {
    // Logic to handle booking the shift
    console.log("Book Now pressed for item:", item);
    const param = {
      shift_id: item?.id,
      token: isLogin?.token,
    }
    const dd = await onFavoriteShift(param, setLoading)
    if (dd?.status == '1') {
      setFilteredData(prev =>
        prev.filter(i => i.id !== item.id)
      );
    }

  }
  const navigation = useNavigation()
  const renderCard = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Institution Name</Text>
            <Text style={styles.value}>{item?.user_name}</Text>
          </View>

          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Text style={styles.label}>Unit Example</Text>
            <Text style={styles.value}>{item?.unit_name}</Text>
          </View>
        </View>

        {/* Row 2 */}
        <View style={[styles.row, { marginTop: 12 }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Location</Text>
            <Text style={styles.value}>{item?.location}</Text>
          </View>

          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Text style={styles.label}>Badge</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeTxt}>{item?.status}</Text>
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.removeBtn} onPress={() => onFavorite(item)}>
            <Text style={styles.removeTxt}>Remove</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.detailsBtn} onPress={() =>
            navigation.navigate(ScreenNameEnum.ShiftDetailScreen, {
              item: item,
            })
          }>
            <Text style={styles.detailsTxt}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && <LoadingModal />}
      <StatusBarComponent />
      <CustomHeader label="Favorite Institutions" />
      <SearchBar value={searchText} onSearchChange={onSearch}
        placeholder="Search by name, date, time, location" />

      <View style={{ flex: 1, marginTop: 18, marginHorizontal: 16 }}>
        <FlatList
          data={filteredData}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          ListEmptyComponent={()=><View>
            <Text style={{textAlign:'center'}}>No Favorite Institutions Found</Text>
            </View>}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },

   card: {
    borderWidth: 1.5,
    borderColor: "#FF007A", // PINK BORDER
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    backgroundColor: "#fff",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  label: {
    fontSize: 15,
    color: "#0056B3",
    marginBottom: 4,
    fontWeight: "500"
  },

  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },

  badge: {
    backgroundColor: "#54C270",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 2,
  },

  badgeTxt: { color: "#fff", fontSize: 12, fontWeight: "600" },

  /* Buttons bottom */
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
    justifyContent: "center"

  },

  removeTxt: {
    color: color.primary,
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center"
  },

  detailsBtn: {
    backgroundColor: color.primary,
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: "center"
  },

  detailsTxt: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center"

  },
});
