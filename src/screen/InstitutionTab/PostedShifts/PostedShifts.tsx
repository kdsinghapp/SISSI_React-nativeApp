import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBarComponent from "../../../compoent/StatusBarCompoent";
import imageIndex from "../../../assets/imageIndex";
import CustomHeader from "../../../compoent/CustomHeader";
import ScreenNameEnum from "../../../routes/screenName.enum";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../../../compoent/SearchBar";
import { color } from "../../../constant";
import { useSelector } from "react-redux";
import { deleteShiftApi, GetApi } from "../../../api/apiRequest";
import LoadingModal from "../../../utils/Loader";
import moment from "moment";
import 'moment/locale/fi'; // Import Finnish locale
import DeleteRequestModal from "../../../compoent/DeleteSuccessFull";
import { language } from "../../../constant/Language";
import { useLanguage } from "../../../LanguageContext";

const PostedShifts = () => {
  const { labels} = useLanguage(); // Reference Finnish strings
  moment.locale('fi'); // Set locale to Finnish

  const isLogin = useSelector((state: any) => state.auth);
  const navigatorv = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  const [selectedShiftId, setSelectedShiftId] = useState(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [visible, setvisible] = useState(false);

  useEffect(() => {
    (async () => {
      const param = {
        url: "shift/pending_shift_list_institution",
        user_id: isLogin?.userData?.id,
        token: isLogin?.token
      };
      const dd = await GetApi(param, setLoading);
      setData(dd?.data || []);
      setFilteredData(dd?.data || []);
    })();
  }, []);

  const onSearch = (text: string) => {
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

  const handleDeleteRequest = async () => {
    if (!selectedShiftId) return;
    const param = {
      shift_id: selectedShiftId,
      token: isLogin?.token,
    };
    const res = await deleteShiftApi(param, setLoading);

    if (res?.success) {
      const updated = data.filter(item => item.id !== selectedShiftId);
      setData(updated);
      setFilteredData(updated);
      setvisible(false);
      setSelectedShiftId(null);
    }
  };

  const renderCard = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.name}>
          {moment(item?.shift_date, 'YYYY-MM-DD').format('ddd, DD MMMM YYYY')}
        </Text>
        <View style={[styles.statusChip, { flexDirection: "row", alignItems: "center" }]}>
          <Image source={imageIndex.eye} style={{ height: 22, width: 22, resizeMode: "contain" }} />
          <Text style={[styles.statusText, { marginLeft: 8 }]}>2</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.value}>
          {moment(item.time_start, "HH:mm:ss").format("HH:mm")} – {moment(item.time_end, "HH:mm:ss").format("HH:mm")}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.value}>
          {labels.descriptionLabel} : {item?.description}
        </Text>
      </View>

      <View style={{
        backgroundColor: color.thirdColor,
        width: "45%",
        borderRadius: 20,
        height: 28,
        justifyContent: "center"
      }}>
        <Text style={[styles.value, { color: "white", textAlign: 'center' }]}>
          {labels.noBookings}
        </Text>
      </View>

      <View style={styles.btnRow}>
        <TouchableOpacity 
          style={styles.approveBtn}
          onPress={() => {
            setSelectedShiftId(item.id);
            setvisible(true);
          }}
        >
          <Text style={styles.btnTextWhite}>{labels.remove} </Text>
          <Image source={imageIndex.REMOVE} style={{ height: 22, width: 22 }} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.declineBtn}
          onPress={() => {
            navigatorv.navigate(ScreenNameEnum.CreateNewShift, {
              type: "Edit",
              shiftData: item
            });
          }}
        >
          <Text style={styles.btnTextWhite}>{labels.edit} </Text>
          <Image source={imageIndex.editp} style={{ height: 22, width: 22 }} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
      <CustomHeader label={labels.postedShifts} />
      {loading && <LoadingModal />}

      <SearchBar
        value={searchText}
        onSearchChange={onSearch}
        placeholder={labels.searchPlaceholder}
      />
      
      <FlatList
        data={filteredData}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 11, marginHorizontal: 15 }}
        renderItem={renderCard} 
        keyExtractor={item => item.id.toString()} 
      />

      <DeleteRequestModal
        visible={visible}
        onClose={() => setvisible(false)}
        onConfirm={handleDeleteRequest}
        title={labels.deleteRequestTitle}
        message={labels.deleteRequestMessage}
        confirmButtonText={labels.deleteBtn}
        cancelButtonText={labels.cancelBtn}
        icon={imageIndex.Decline}
        showCancelButton={true}
      />
    </SafeAreaView>
  );
};

export default PostedShifts;

// ... Styles (kept exactly as original) ...
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

    // Android shadow

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
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
    // paddingHorizontal: 11,
    // paddingVertical: 5,
    borderRadius: 20,
    alignItems:'center',
    justifyContent:'center',
  
    
  },

  statusText: {
    fontSize: 12,
    color: "#000",
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
    backgroundColor: "#FF383C",
    paddingVertical: 10,
    borderRadius: 25,
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    width:
      "40%"

  },

  declineBtn: {
    backgroundColor: color.primary,
    paddingVertical: 10,
    width:
      "40%", borderRadius: 25,
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center"
  },

  btnTextWhite: {
    color: "#FFF",
    fontWeight: "600",
  },
});
