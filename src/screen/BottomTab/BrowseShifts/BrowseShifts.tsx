import React, { useState } from "react";
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

const DATA = [1, 2, 3];

export default function BrowseShifts() {
  const [modalVisible, setModalVisible] = useState(false);
  const renderCard = () => (
    <View style={styles.card}>
      {/* Row 1 */}
      <View style={{
        alignItems:"center",
        justifyContent:"center", 
        marginBottom:16
      }}>

          <Image source={imageIndex.home1}  
          
          style={{
            height:44,
            width:44 ,
            resizeMode:"contain" ,
          }}
          />
      </View>

    
      <View style={styles.row}>
        <View style={styles.flex1}>
          <Text style={styles.label}>Institution Name</Text>
          <Text style={styles.value}>BrightCare Child Protection Unit</Text>
        </View>

        <View style={styles.rightView}>
          <Text style={styles.label}>Unit Name</Text>
          <Text style={styles.value}>Early Development Wing</Text>
        </View>
      </View>

      {/* Row 2 */}
      <View style={[styles.row, styles.mt12]}>
        <View style={styles.flex1}>
          <Text style={styles.label}>Date & Time</Text>
          <Text style={styles.value}>
            Wednesday, 12 February 2025 {"\n"}10:00 AM – 4:00 PM
          </Text>
        </View>

        <View style={styles.rightView}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.value}>Sector 12, City Center</Text>
        </View>
      </View>

      {/* Row 3 */}
      <View style={[styles.row, styles.mt12]}>
        <View style={styles.flex1}>
          <Text style={styles.label}>Short Description</Text>
          <Text style={styles.value}>
            Assist staff with daily care routines, supervision & meal support.
          </Text>
        </View>

        <View style={styles.rightView}>
          <Text style={styles.label}>Badge</Text>
          <View style={[styles.badge, styles.mt12]}>
            <Text style={styles.badgeTxt}>Approved</Text>
          </View>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.removeBtn}>
       <Text style={styles.removeTxt}>
  Favorite{" "}
  <Text style={{ fontSize: 22, color: "#FF007A" }}>
    ✩
  </Text>
</Text>

        </TouchableOpacity>

        <TouchableOpacity 
        
        onPress={() => setModalVisible(true)}
        style={styles.detailsBtn}>
          <Text style={styles.detailsTxt}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent />
      <CustomHeader label="Browse Shifts" />
      <SearchBar />

      <View style={styles.listWrapper}>
        <FlatList
          data={DATA}
          renderItem={renderCard}
          keyExtractor={(item) => item.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </View>
      

<BookingSuccessModal
  visible={modalVisible}
  userName="Jocelyn Levin"
  userImage="https://example.com/user.jpg" // replace with real image URL
  onClose={() => setModalVisible(false)}
  onOpenChat={() => {
    // navigate to chat screen
    console.log('Open Chat Pressed');
    setModalVisible(false);
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
    borderColor: "#F3178B",
    paddingHorizontal: 35,
    paddingVertical: 11,
    borderRadius: 30,
    justifyContent: "center",
  },

  removeTxt: {
    color: "#FF007A",
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
  },

  detailsBtn: {
    backgroundColor: "#F3178B",
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
